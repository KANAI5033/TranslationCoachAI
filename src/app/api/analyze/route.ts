import { NextRequest, NextResponse } from 'next/server';

// AI 分析结果的类型定义
interface AIAnalysisItem {
  errorType: 'VocabularyError' | 'GrammarError' | 'Chinglish' | 'StyleError';
  explanation: string;
  suggestion: string;
  example: string;
  severity: 'low' | 'medium' | 'high';
}

interface AIAnalysisResult {
  analyses: AIAnalysisItem[];
  overallScore: number;
  suggestedExercises: string[];
  rawResponse?: string;
}

// 基于规则的回退分析（当 AI 不可用时）
function fallbackAnalysis(
  chineseText: string,
  studentTranslation: string
): AIAnalysisResult {
  const analyses: AIAnalysisItem[] = [];
  const lowerText = studentTranslation.toLowerCase();

  // 语法错误检测
  if (lowerText.includes('has bring') || lowerText.includes('have bring')) {
    analyses.push({
      errorType: 'GrammarError',
      explanation: '"has/have bring" 是语法错误，bring 的过去分词是 brought',
      suggestion: '将 "bring" 改为 "brought"，使用正确的现在完成时结构',
      example: 'has bring → has brought',
      severity: 'high',
    });
  }

  if (lowerText.includes('is require') || lowerText.includes('are require')) {
    analyses.push({
      errorType: 'GrammarError',
      explanation: '"require" 缺少正确的动词形式，被动语态需要使用过去分词',
      suggestion: '使用 "is required" 或 "are required"，或直接使用主动语态 "requires"',
      example: 'is require → is required / requires',
      severity: 'high',
    });
  }

  // 词汇错误检测
  if (lowerText.includes('skill needs')) {
    analyses.push({
      errorType: 'VocabularyError',
      explanation: '"skill needs" 是中式英语直译，不符合英语表达习惯',
      suggestion: '改为 "skill requirements" 或 "required skills" 更地道',
      example: 'skill needs → skill requirements',
      severity: 'medium',
    });
  }

  if (lowerText.includes('all industries')) {
    analyses.push({
      errorType: 'VocabularyError',
      explanation: '"all industries" 语气过于绝对，在英语中不够自然',
      suggestion: '使用 "various industries"、"all sectors" 或 "every industry"',
      example: 'all industries → various industries',
      severity: 'medium',
    });
  }

  // 中式英语检测
  const chinglishPatterns = [
    { pattern: 'very much', fix: 'greatly / significantly' },
    { pattern: 'day day up', fix: 'improve day by day' },
    { pattern: 'good good study', fix: 'study hard' },
  ];

  for (const cp of chinglishPatterns) {
    if (lowerText.includes(cp.pattern)) {
      analyses.push({
        errorType: 'Chinglish',
        explanation: `"${cp.pattern}" 是典型的中式英语表达`,
        suggestion: `建议改为更地道的表达，如 "${cp.fix}"`,
        example: `${cp.pattern} → ${cp.fix}`,
        severity: 'medium',
      });
    }
  }

  // 风格检测
  const informalWords = ['gonna', 'wanna', 'gotta', 'kinda', 'sorta', "ain't"];
  for (const word of informalWords) {
    if (lowerText.includes(word)) {
      analyses.push({
        errorType: 'StyleError',
        explanation: `"${word}" 是口语化表达，在正式翻译中应避免使用`,
        suggestion: `将 "${word}" 替换为正式表达`,
        example: `${word} → ${getFormalReplacement(word)}`,
        severity: 'low',
      });
    }
  }

  const errorCount = analyses.length;
  const overallScore = Math.max(0, 100 - errorCount * 20);

  return {
    analyses,
    overallScore,
    suggestedExercises:
      analyses.length > 0
        ? ['基础语法练习', '词汇用法对比', '地道表达训练']
        : ['继续保持，尝试更复杂的翻译练习'],
  };
}

function getFormalReplacement(word: string): string {
  const map: Record<string, string> = {
    gonna: 'going to',
    wanna: 'want to',
    gotta: 'have to / got to',
    kinda: 'kind of / somewhat',
    sorta: 'sort of / somewhat',
    "ain't": 'is not / am not',
  };
  return map[word] || '正式表达';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chineseText, studentTranslation } = body;

    if (!chineseText || !studentTranslation) {
      return NextResponse.json(
        { error: '请提供中文原文和学生译文' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // 如果没有有效的 API Key，直接使用回退分析
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      console.log('No valid OpenRouter API key, using fallback analysis');
      const result = fallbackAnalysis(chineseText, studentTranslation);
      return NextResponse.json({
        ...result,
        aiPowered: false,
        message: '使用基于规则的分析（未配置 AI）',
      });
    }

    // 调用 OpenRouter AI API
    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : 'http://localhost:3000',
            'X-Title': 'Translation Coach AI',
          },
          body: JSON.stringify({
            model: 'z-ai/glm-4.5-air:free',
            messages: [
              {
                role: 'system',
                content: `你是一个专业的英语翻译教学助手，专门帮助中国大学生提升中译英能力。请分析学生的英文翻译，找出所有错误并给出改进建议。

请严格按照以下 JSON 格式返回分析结果（直接返回 JSON，不要包含任何 markdown 标记或其他文字）：

{
  "analyses": [
    {
      "errorType": "GrammarError|VocabularyError|Chinglish|StyleError",
      "explanation": "用中文详细解释错误原因",
      "suggestion": "用中文给出具体的改进建议",
      "example": "错误用法 → 正确用法",
      "severity": "low|medium|high"
    }
  ],
  "overallScore": 85,
  "suggestedExercises": ["练习建议1", "练习建议2"]
}

错误类型说明：
- GrammarError: 语法错误（时态错误、主谓不一致、句子结构问题等）
- VocabularyError: 词汇错误（用词不准确、搭配不当、词义混淆等）
- Chinglish: 中式英语（不符合英语母语者表达习惯的直译）
- StyleError: 风格问题（口语化表达、冗余、正式度不一致等）

严重程度：
- high: 严重错误，影响理解和交流
- medium: 中等错误，表达不够地道
- low: 轻微问题，可以进一步优化

如果没有发现任何错误，analyses 为空数组，overallScore 为 100。`,
              },
              {
                role: 'user',
                content: `请分析以下中译英翻译，找出所有错误：

中文原文：${chineseText}
学生译文：${studentTranslation}

请严格按照 JSON 格式返回结果，不要包含任何其他内容。`,
              },
            ],
            max_tokens: 2000,
            temperature: 0.3,
          }),
          signal: AbortSignal.timeout(30000),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OpenRouter API error: ${response.status}`, errorText);

        // 如果是 402/429 等额度或限流问题，使用回退
        if (response.status === 402 || response.status === 429) {
          console.log('OpenRouter quota/rate limit, using fallback');
          const result = fallbackAnalysis(chineseText, studentTranslation);
          return NextResponse.json({
            ...result,
            aiPowered: false,
            message: 'AI 服务暂时不可用（额度或限流），使用基于规则的分析',
          });
        }

        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.choices?.[0]?.message?.content;

      if (!analysisText) {
        throw new Error('No analysis content received from AI');
      }

      // 尝试解析 AI 返回的 JSON
      let parsedAnalysis: AIAnalysisResult;
      try {
        // 提取 JSON（AI 可能返回了额外的文字）
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const aiResult = JSON.parse(jsonMatch[0]);
          parsedAnalysis = {
            analyses: Array.isArray(aiResult.analyses)
              ? aiResult.analyses.map((a: any) => ({
                  errorType: validateErrorType(a.errorType),
                  explanation: a.explanation || '',
                  suggestion: a.suggestion || '',
                  example: a.example || '',
                  severity: validateSeverity(a.severity),
                }))
              : [],
            overallScore:
              typeof aiResult.overallScore === 'number'
                ? Math.max(0, Math.min(100, aiResult.overallScore))
                : 85,
            suggestedExercises: Array.isArray(aiResult.suggestedExercises)
              ? aiResult.suggestedExercises
              : [],
            rawResponse: analysisText,
          };
        } else {
          throw new Error('No JSON found in AI response');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', parseError);
        // JSON 解析失败，回退到规则分析
        const result = fallbackAnalysis(chineseText, studentTranslation);
        return NextResponse.json({
          ...result,
          aiPowered: false,
          message: 'AI 返回格式异常，使用基于规则的分析',
        });
      }

      return NextResponse.json({
        ...parsedAnalysis,
        aiPowered: true,
        message: 'AI 分析完成',
      });
    } catch (fetchError: any) {
      console.error('OpenRouter fetch error:', fetchError);
      const result = fallbackAnalysis(chineseText, studentTranslation);
      return NextResponse.json({
        ...result,
        aiPowered: false,
        message: `AI 服务连接失败: ${fetchError.message}，使用基于规则的分析`,
      });
    }
  } catch (error: any) {
    console.error('API analyze error:', error);
    return NextResponse.json(
      { error: '分析请求处理失败', details: error.message },
      { status: 500 }
    );
  }
}

// 验证和规范化错误类型
function validateErrorType(
  type: string
): 'VocabularyError' | 'GrammarError' | 'Chinglish' | 'StyleError' {
  const validTypes = [
    'VocabularyError',
    'GrammarError',
    'Chinglish',
    'StyleError',
  ];
  if (validTypes.includes(type)) {
    return type as any;
  }
  // 模糊匹配
  const lower = type.toLowerCase();
  if (lower.includes('grammar')) return 'GrammarError';
  if (lower.includes('vocab')) return 'VocabularyError';
  if (lower.includes('chinglish') || lower.includes('中式'))
    return 'Chinglish';
  if (lower.includes('style')) return 'StyleError';
  return 'VocabularyError'; // 默认
}

// 验证和规范化严重程度
function validateSeverity(severity: string): 'low' | 'medium' | 'high' {
  const valid = ['low', 'medium', 'high'];
  if (valid.includes(severity?.toLowerCase())) {
    return severity.toLowerCase() as any;
  }
  return 'medium'; // 默认
}
