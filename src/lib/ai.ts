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
  aiPowered?: boolean;
  message?: string;
}

/**
 * 调用服务端 API 路由来分析翻译
 * 这样 API Key 只存在于服务端，不会暴露给客户端
 */
export async function analyzeTranslation(
  chineseText: string,
  studentTranslation: string
): Promise<AnalysisResult> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chineseText,
        studentTranslation,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API request failed: ${response.status}`
      );
    }

    const data = await response.json();
    return {
      analyses: data.analyses || [],
      overallScore: data.overallScore ?? 85,
      suggestedExercises: data.suggestedExercises || [],
      aiPowered: data.aiPowered ?? false,
      message: data.message,
    };
  } catch (error) {
    console.error('API analyze failed:', error);
    // 如果 API 路由不可用，返回本地回退分析
    return localFallbackAnalysis(chineseText, studentTranslation);
  }
}

/**
 * 本地回退分析 — 仅在 API 完全不可用时使用
 */
function localFallbackAnalysis(
  chineseText: string,
  studentTranslation: string
): AnalysisResult {
  const analyses: AIAnalysis[] = [];
  const lowerText = studentTranslation.toLowerCase();

  if (lowerText.includes('has bring') || lowerText.includes('have bring')) {
    analyses.push({
      errorType: 'GrammarError',
      explanation: '"has/have bring" 应该是 "has/have brought"',
      suggestion: '使用正确的过去分词形式 "brought"',
      example: 'has bring → has brought',
      severity: 'high',
    });
  }

  if (lowerText.includes('skill needs')) {
    analyses.push({
      errorType: 'VocabularyError',
      explanation: '"skill needs" 不够地道',
      suggestion: '改为 "skill requirements" 或 "required skills"',
      example: 'skill needs → skill requirements',
      severity: 'medium',
    });
  }

  if (lowerText.includes('all industries')) {
    analyses.push({
      errorType: 'Chinglish',
      explanation: '"all industries" 语气过于绝对',
      suggestion: '使用 "various industries" 或 "all sectors"',
      example: 'all industries → various industries',
      severity: 'medium',
    });
  }

  const errorCount = analyses.length;
  const overallScore = Math.max(0, 100 - errorCount * 25);

  return {
    analyses,
    overallScore,
    suggestedExercises:
      analyses.length > 0
        ? ['基础语法练习', '常用词汇训练']
        : ['继续保持！'],
    aiPowered: false,
    message: '使用本地回退分析',
  };
}

// 工具函数：提取错误类型
export function extractErrorTypes(analyses: AIAnalysis[]): string[] {
  return analyses.map((analysis) => analysis.errorType);
}

// 工具函数：计算平均严重程度
export function calculateAverageSeverity(analyses: AIAnalysis[]): number {
  if (analyses.length === 0) return 0;

  const severityValues = analyses.map((analysis) => {
    switch (analysis.severity) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 1;
    }
  });

  return (
    severityValues.reduce((sum, value) => sum + value, 0) / severityValues.length
  );
}
