export interface AIAnalysis {
  errorType: string;
  explanation: string;
  suggestion: string;
  example?: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
  analyses: AIAnalysis[];
  overallScore: number;
  suggestedExercises?: string[];
}

export async function analyzeTranslation(
  chineseText: string,
  studentTranslation: string
): Promise<AnalysisResult> {
  // 检查API密钥
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    // 回退到基于规则的分析
    return fallbackAnalysis(chineseText, studentTranslation);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的英语翻译教学助手。请分析学生的英文翻译，提供详细的错误分析和改进建议。

请按照以下格式提供分析：
1. 错误类型：VocabularyError/GrammarError/Chinglish/StyleError
2. 解释：详细说明错误原因
3. 建议：具体的改进建议
4. 示例：可选的错误示例
5. 严重程度：low/medium/high

同时提供一个总体评分（0-100）和相关的迁移练习建议。`
          },
          {
            role: 'user',
            content: `请分析以下翻译：

中文原文：${chineseText}
学生译文：${studentTranslation}

请提供详细的错误分析、改进建议和评分。`
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No analysis content received');
    }

    // 解析AI返回的分析结果
    return parseAIAnalysis(analysisText);
    
  } catch (error) {
    console.error('AI analysis failed:', error);
    // 失败时回退到基于规则的分析
    return fallbackAnalysis(chineseText, studentTranslation);
  }
}

function parseAIAnalysis(analysisText: string): AnalysisResult {
  // 这里实现解析AI返回的文本
  // 这是一个简化的示例实现
  
  const analyses: AIAnalysis[] = [];
  
  // 检测常见的错误模式
  if (analysisText.includes('grammar') || analysisText.includes('语法')) {
    analyses.push({
      errorType: 'GrammarError',
      explanation: '检测到语法结构问题',
      suggestion: '请检查句子结构和时态使用',
      severity: 'medium'
    });
  }
  
  if (analysisText.includes('vocabulary') || analysisText.includes('词汇')) {
    analyses.push({
      errorType: 'VocabularyError',
      explanation: '词汇使用不够准确',
      suggestion: '使用更地道的英语表达',
      severity: 'medium'
    });
  }
  
  if (analysisText.includes('chinglish') || analysisText.includes('中式英语')) {
    analyses.push({
      errorType: 'Chinglish',
      explanation: '翻译中出现了中式英语表达',
      suggestion: '避免字面直译，学习地道表达',
      severity: 'low'
    });
  }

  // 简单评分逻辑
  const errorCount = analyses.length;
  const overallScore = Math.max(0, 100 - (errorCount * 20));

  return {
    analyses,
    overallScore,
    suggestedExercises: ['语法练习', '词汇扩展', '表达训练']
  };
}

function fallbackAnalysis(chineseText: string, studentTranslation: string): AnalysisResult {
  // 基于规则的备用分析
  const analyses: AIAnalysis[] = [];
  
  // 简单的规则检测
  if (studentTranslation.includes(' has bring ')) {
    analyses.push({
      errorType: 'GrammarError',
      explanation: '"has bring"应该是"has brought"',
      suggestion: '使用正确的过去分词形式',
      severity: 'high'
    });
  }
  
  if (studentTranslation.includes(' skill needs ')) {
    analyses.push({
      errorType: 'VocabularyError',
      explanation: '"skill needs"应该是"skill requirements"',
      suggestion: '使用更准确的词汇表达',
      severity: 'medium'
    });
  }
  
  if (studentTranslation.includes(' all industries ')) {
    analyses.push({
      errorType: 'Chinglish',
      explanation: '"all industries"在英语中通常使用"various industries"',
      suggestion: '使用更自然的英语表达',
      severity: 'medium'
    });
  }

  const errorCount = analyses.length;
  const overallScore = Math.max(0, 100 - (errorCount * 25));

  return {
    analyses,
    overallScore,
    suggestedExercises: ['基础语法练习', '常用词汇训练']
  };
}

// 工具函数：提取错误类型
export function extractErrorTypes(analyses: AIAnalysis[]): string[] {
  return analyses.map(analysis => analysis.errorType);
}

// 工具函数：计算平均严重程度
export function calculateAverageSeverity(analyses: AIAnalysis[]): number {
  if (analyses.length === 0) return 0;
  
  const severityValues = analyses.map(analysis => {
    switch (analysis.severity) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 1;
    }
  });
  
  return severityValues.reduce((sum, value) => sum + value, 0) / severityValues.length;
}