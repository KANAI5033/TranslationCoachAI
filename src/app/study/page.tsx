"use client";

import { useState } from 'react';
import { analyzeTranslation, type AIAnalysis } from '@/lib/ai';

type ErrorType = 'VocabularyError' | 'GrammarError' | 'Chinglish' | 'StyleError';

interface ErrorFeedback {
  type: ErrorType;
  title: string;
  description: string;
  example: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  isFixed?: boolean;
}

interface LearningProgress {
  originalText: string;
  firstAttempt: string;
  improvedAttempt?: string;
  errors: ErrorFeedback[];
  improvementScore?: number;
  timestamp: Date;
}

export default function StudyPage() {
  // 学习闭环状态
  const [chineseOriginal, setChineseOriginal] = useState<string>(
    "人工智能的快速发展给各行各业带来了前所未有的机遇和挑战，需要我们重新思考传统的工作模式和技能要求。"
  );
  const [studentTranslation, setStudentTranslation] = useState<string>(
    "The rapid development of AI has bring unprecedented opportunities and challenges to all industries, requiring us to rethink traditional work patterns and skill needs."
  );
  const [improvedTranslation, setImprovedTranslation] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isResubmitting, setIsResubmitting] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<ErrorFeedback[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [currentStep, setCurrentStep] = useState<'input' | 'analysis' | 'improvement' | 'review'>('input');

  // Mock错误数据
  const mockErrorData: ErrorFeedback[] = [
    {
      type: 'VocabularyError',
      title: '词汇使用不准确',
      description: '学生使用了不准确的词汇表达，导致语义偏差',
      example: '使用了"skill needs"而不是更准确的"skill requirements"',
      suggestion: '建议使用"skill requirements"来更准确地表达"技能要求"',
      severity: 'medium'
    },
    {
      type: 'GrammarError',
      title: '语法结构错误',
      description: '句子结构存在语法问题，影响理解',
      example: '"has bring"应该是"has brought"',
      suggestion: '建议改为"has brought"使用正确的过去分词形式',
      severity: 'high'
    },
    {
      type: 'Chinglish',
      title: '中式英语表达',
      description: '翻译中出现了中式英语的表达方式',
      example: '"all industries"在英语中通常使用"various industries"或"all sectors"',
      suggestion: '建议使用"various industries"来更自然地表达"各行各业"',
      severity: 'medium'
    },
    {
      type: 'StyleError',
      title: '风格不一致',
      description: '翻译风格不够正式和专业',
      example: '"AI"在正式文档中通常译为"artificial intelligence"',
      suggestion: '在正式翻译中建议使用完整的"artificial intelligence"',
      severity: 'low'
    }
  ];

  // AI 分析状态
  const [aiPowered, setAiPowered] = useState<boolean>(false);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [overallScore, setOverallScore] = useState<number>(0);

  // 步骤1: 分析错误
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiPowered(false);
    setAiMessage('');

    try {
      // 调用AI分析服务（通过服务端 API 路由）
      const result = await analyzeTranslation(chineseOriginal, studentTranslation);

      // 记录 AI 状态
      setAiPowered(result.aiPowered || false);
      setAiMessage(result.message || '');
      setOverallScore(result.overallScore);

      // 将AI分析结果转换为ErrorFeedback格式
      const errors: ErrorFeedback[] = result.analyses.length > 0
        ? result.analyses.map(analysis => ({
            type: analysis.errorType as ErrorType,
            title: getErrorTitle(analysis.errorType),
            description: analysis.explanation,
            example: analysis.example || analysis.explanation,
            suggestion: analysis.suggestion,
            severity: analysis.severity,
            isFixed: false
          }))
        : [];

      setAnalysisResults(errors);
      setCurrentStep('analysis');

      // 记录第一次尝试
      const progress: LearningProgress = {
        originalText: chineseOriginal,
        firstAttempt: studentTranslation,
        errors,
        timestamp: new Date()
      };
      setLearningProgress([...learningProgress, progress]);
    } catch (error) {
      console.error('AI分析失败:', error);
      setAiPowered(false);
      setAiMessage('AI 服务暂时不可用，使用示例分析');

      // 如果AI分析失败，使用模拟数据
      const errors = mockErrorData.map(error => ({
        ...error,
        isFixed: false
      }));
      setAnalysisResults(errors);
      setCurrentStep('analysis');

      const progress: LearningProgress = {
        originalText: chineseOriginal,
        firstAttempt: studentTranslation,
        errors,
        timestamp: new Date()
      };
      setLearningProgress([...learningProgress, progress]);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // 根据错误类型获取标题
  const getErrorTitle = (errorType: string): string => {
    switch (errorType) {
      case 'VocabularyError': return '词汇使用不准确';
      case 'GrammarError': return '语法结构错误';
      case 'Chinglish': return '中式英语表达';
      case 'StyleError': return '风格不一致';
      default: return '翻译错误';
    }
  };

  // 步骤2: 应用改进建议
  const applySuggestion = (index: number) => {
    const updatedErrors = [...analysisResults];
    updatedErrors[index].isFixed = true;
    setAnalysisResults(updatedErrors);
    
    // 自动应用建议到改进翻译
    const suggestion = updatedErrors[index].suggestion;
    const example = updatedErrors[index].example;
    
    // 简单的文本替换逻辑
    if (example.includes('"skill needs"') && suggestion.includes('"skill requirements"')) {
      setImprovedTranslation(prev => 
        prev || studentTranslation.replace('skill needs', 'skill requirements')
      );
    }
    if (example.includes('"has bring"') && suggestion.includes('"has brought"')) {
      setImprovedTranslation(prev => 
        prev || studentTranslation.replace('has bring', 'has brought')
      );
    }
    if (example.includes('"all industries"') && suggestion.includes('"various industries"')) {
      setImprovedTranslation(prev => 
        prev || studentTranslation.replace('all industries', 'various industries')
      );
    }
    if (example.includes('"AI"') && suggestion.includes('"artificial intelligence"')) {
      setImprovedTranslation(prev => 
        prev || studentTranslation.replace('AI', 'artificial intelligence')
      );
    }
  };

  // 步骤3: 重新提交改进后的翻译
  const handleResubmit = () => {
    setIsResubmitting(true);
    
    setTimeout(() => {
      // 计算改进分数
      const fixedErrors = analysisResults.filter(error => error.isFixed).length;
      const totalErrors = analysisResults.length;
      const improvementScore = totalErrors > 0 ? Math.round((fixedErrors / totalErrors) * 100) : 100;
      
      // 更新学习进度
      const updatedProgress = [...learningProgress];
      const latestProgress = updatedProgress[updatedProgress.length - 1];
      latestProgress.improvedAttempt = improvedTranslation || studentTranslation;
      latestProgress.improvementScore = improvementScore;
      setLearningProgress(updatedProgress);
      
      setIsResubmitting(false);
      setCurrentStep('review');
    }, 800);
  };

  // 步骤4: 开始新的练习
  const handleNewPractice = () => {
    setChineseOriginal("技术创新正在改变我们的生活方式和工作方式。");
    setStudentTranslation("");
    setImprovedTranslation("");
    setAnalysisResults([]);
    setCurrentStep('input');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getErrorTypeColor = (type: ErrorType) => {
    switch (type) {
      case 'VocabularyError': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'GrammarError': return 'bg-red-100 text-red-800 border-red-300';
      case 'Chinglish': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'StyleError': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 学习进度指示器 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">翻译学习闭环</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'input' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`h-1 flex-1 ${currentStep === 'input' ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'analysis' ? 'bg-blue-600 text-white' : currentStep === 'improvement' || currentStep === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`h-1 flex-1 ${currentStep === 'input' || currentStep === 'analysis' ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'improvement' ? 'bg-blue-600 text-white' : currentStep === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <div className={`h-1 flex-1 ${currentStep === 'review' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  4
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm">输入翻译</span>
                <span className="text-sm">分析错误</span>
                <span className="text-sm">改进提交</span>
                <span className="text-sm">查看结果</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧主要内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 步骤1: 输入翻译 */}
            {currentStep === 'input' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">步骤1: 输入中文原文和翻译</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">中文原文</label>
                      <textarea
                        value={chineseOriginal}
                        onChange={(e) => setChineseOriginal(e.target.value)}
                        className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 resize-none text-gray-800"
                        placeholder="请输入中文原文..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">您的英文翻译</label>
                      <textarea
                        value={studentTranslation}
                        onChange={(e) => setStudentTranslation(e.target.value)}
                        className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 resize-none text-gray-800"
                        placeholder="请输入您的英文翻译..."
                      />
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={!studentTranslation.trim() || isAnalyzing}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isAnalyzing ? '分析中...' : '开始分析错误'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤2: 分析结果 */}
            {currentStep === 'analysis' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">步骤2: 错误分析结果</h2>

                  {/* AI 状态指示器 */}
                  <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 ${
                    aiPowered
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <span className="text-lg">{aiPowered ? '🤖' : '📋'}</span>
                    <div>
                      <span className={`text-sm font-medium ${
                        aiPowered ? 'text-green-700' : 'text-yellow-700'
                      }`}>
                        {aiPowered ? 'AI 智能分析' : '规则引擎分析'}
                      </span>
                      {aiMessage && (
                        <span className="text-xs text-gray-500 ml-2">({aiMessage})</span>
                      )}
                    </div>
                    {overallScore > 0 && (
                      <span className="ml-auto text-lg font-bold text-blue-600">
                        评分: {overallScore}/100
                      </span>
                    )}
                  </div>

                  {analysisResults.length === 0 ? (
                    <div className="p-6 text-center bg-green-50 rounded-xl border border-green-200">
                      <span className="text-2xl">🎉</span>
                      <p className="text-green-700 font-medium mt-2">没有发现错误，翻译得很好！</p>
                    </div>
                  ) : (
                  <div className="space-y-4">
                    {analysisResults.map((error, index) => (
                      <div key={index} className={`border-l-4 ${getErrorTypeColor(error.type)} p-4 rounded-r-xl`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(error.severity)}`}>
                              {error.severity.toUpperCase()}
                            </span>
                            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                              {error.type}
                            </span>
                          </div>
                          <button
                            onClick={() => applySuggestion(index)}
                            className={`px-3 py-1 rounded text-sm ${error.isFixed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                            disabled={error.isFixed}
                          >
                            {error.isFixed ? '✓ 已应用' : '应用建议'}
                          </button>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{error.title}</h3>
                        <p className="text-gray-700 mb-2">{error.description}</p>
                        <div className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">错误示例: </span>
                          {error.example}
                        </div>
                        <div className="text-sm text-green-700">
                          <span className="font-medium">改进建议: </span>
                          {error.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                  )}

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-bold text-blue-900 mb-2">💡 下一步</h3>
                    <p className="text-blue-800 mb-3">
                      请根据上面的建议修改您的翻译，然后点击"提交改进"按钮。
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setCurrentStep('input')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        返回修改
                      </button>
                      <button
                        onClick={() => setCurrentStep('improvement')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        继续改进
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤3: 改进提交 */}
            {currentStep === 'improvement' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">步骤3: 提交改进后的翻译</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">改进后的翻译</label>
                      <textarea
                        value={improvedTranslation}
                        onChange={(e) => setImprovedTranslation(e.target.value)}
                        className="w-full h-48 p-4 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 resize-none text-gray-800"
                        placeholder="请根据建议修改您的翻译..."
                        defaultValue={studentTranslation}
                      />
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <h4 className="font-bold text-yellow-800 mb-2">已应用的改进建议:</h4>
                      <ul className="space-y-1">
                        {analysisResults
                          .filter(error => error.isFixed)
                          .map((error, index) => (
                            <li key={index} className="text-sm text-yellow-700 flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              {error.suggestion}
                            </li>
                          ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setCurrentStep('analysis')}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        返回分析
                      </button>
                      <button
                        onClick={handleResubmit}
                        disabled={!improvedTranslation.trim() || isResubmitting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResubmitting ? '提交中...' : '提交改进'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤4: 查看结果 */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">步骤4: 学习成果</h2>
                  
                  {learningProgress.length > 0 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {learningProgress[learningProgress.length - 1].improvementScore}%
                          </div>
                          <p className="text-green-800">改进完成度</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-2">原始翻译</h4>
                          <p className="text-gray-700">{learningProgress[learningProgress.length - 1].firstAttempt}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <h4 className="font-bold text-green-900 mb-2">改进后的翻译</h4>
                          <p className="text-green-800">{learningProgress[learningProgress.length - 1].improvedAttempt}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-bold text-blue-900 mb-2">学习总结</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>发现了 {analysisResults.length} 个错误类型</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>应用了 {analysisResults.filter(e => e.isFixed).length} 个改进建议</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>翻译质量提升了 {learningProgress[learningProgress.length - 1].improvementScore}%</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={handleNewPractice}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700"
                        >
                          开始新的练习
                        </button>
                        <button
                          onClick={() => setCurrentStep('input')}
                          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          重新尝试
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 右侧统计面板 */}
          <div className="space-y-6">
            {/* 学习统计 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">学习统计</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">完成练习</span>
                  <span className="font-bold text-blue-600">{learningProgress.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">平均改进率</span>
                  <span className="font-bold text-green-600">
                    {learningProgress.length > 0 
                      ? Math.round(learningProgress.reduce((sum, p) => sum + (p.improvementScore || 0), 0) / learningProgress.length) 
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">错误类型</span>
                  <span className="font-bold text-purple-600">4种</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">学习时长</span>
                  <span className="font-bold text-orange-600">15分钟</span>
                </div>
              </div>
            </div>

            {/* 错误类型统计 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">错误类型统计</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">词汇错误</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {analysisResults.filter(e => e.type === 'VocabularyError').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">语法错误</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {analysisResults.filter(e => e.type === 'GrammarError').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">中式英语</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {analysisResults.filter(e => e.type === 'Chinglish').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">风格问题</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {analysisResults.filter(e => e.type === 'StyleError').length}
                  </span>
                </div>
              </div>
            </div>

            {/* 学习进度 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">学习进度</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">词汇准确性</span>
                    <span className="text-sm font-bold text-green-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">语法正确性</span>
                    <span className="text-sm font-bold text-blue-600">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">表达地道性</span>
                    <span className="text-sm font-bold text-purple-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}