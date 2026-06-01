"use client";

import { useState, useEffect } from 'react';

interface LearningRecord {
  id: string;
  originalText: string;
  studentTranslation: string;
  improvedTranslation?: string;
  accuracy: number;
  errorTypes: string[];
  timestamp: Date;
  improvementScore?: number;
}

interface UserStats {
  totalExercises: number;
  averageAccuracy: number;
  recentAccuracy: number;
  commonErrorTypes: { type: string; count: number }[];
  totalWords: number;
  learningStreak: number;
}

export default function ProfilePage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalExercises: 0,
    averageAccuracy: 0,
    recentAccuracy: 0,
    commonErrorTypes: [],
    totalWords: 0,
    learningStreak: 0
  });

  const [recentExercises, setRecentExercises] = useState<LearningRecord[]>([]);

  // 从LocalStorage加载学习数据
  useEffect(() => {
    const loadLearningData = () => {
      try {
        const savedData = localStorage.getItem('translationCoachLearningData');
        if (savedData) {
          const data = JSON.parse(savedData);
          
          // 计算统计数据
          const exercises: LearningRecord[] = data.exercises || [];
          const totalExercises = exercises.length;
          
          if (totalExercises > 0) {
            const totalAccuracy = exercises.reduce((sum, ex) => sum + ex.accuracy, 0);
            const averageAccuracy = Math.round(totalAccuracy / totalExercises);
            
            // 最近5次的平均准确率
            const recentExercises = exercises.slice(-5);
            const recentAccuracy = recentExercises.length > 0 
              ? Math.round(recentExercises.reduce((sum, ex) => sum + ex.accuracy, 0) / recentExercises.length)
              : 0;
            
            // 统计错误类型
            const errorCounts: Record<string, number> = {};
            exercises.forEach(ex => {
              ex.errorTypes.forEach(type => {
                errorCounts[type] = (errorCounts[type] || 0) + 1;
              });
            });
            
            const commonErrorTypes = Object.entries(errorCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([type, count]) => ({ type, count }));
            
            // 计算总单词数
            const totalWords = exercises.reduce((sum, ex) => {
              return sum + (ex.studentTranslation.split(' ').length || 0);
            }, 0);
            
            // 简单学习连续天数（模拟）
            const learningStreak = Math.min(7, Math.floor(totalExercises / 3));
            
            setUserStats({
              totalExercises,
              averageAccuracy,
              recentAccuracy,
              commonErrorTypes,
              totalWords,
              learningStreak
            });
            
            setRecentExercises(exercises.slice(-3).reverse());
          }
        }
      } catch (error) {
        console.error('Failed to load learning data:', error);
        
        // 使用模拟数据
        setUserStats({
          totalExercises: 24,
          averageAccuracy: 85,
          recentAccuracy: 92,
          commonErrorTypes: [
            { type: 'GrammarError', count: 18 },
            { type: 'VocabularyError', count: 12 },
            { type: 'Chinglish', count: 8 },
            { type: 'StyleError', count: 5 }
          ],
          totalWords: 1240,
          learningStreak: 7
        });
        
        setRecentExercises([
          {
            id: '1',
            originalText: '人工智能的快速发展给各行各业带来了前所未有的机遇和挑战',
            studentTranslation: 'The rapid development of AI has bring unprecedented opportunities',
            improvedTranslation: 'The rapid development of artificial intelligence has brought unprecedented opportunities',
            accuracy: 92,
            errorTypes: ['GrammarError', 'VocabularyError'],
            timestamp: new Date(),
            improvementScore: 85
          },
          {
            id: '2',
            originalText: '技术创新正在改变我们的生活方式',
            studentTranslation: 'Tech innovation is changing our life style',
            improvedTranslation: 'Technological innovation is changing our lifestyle',
            accuracy: 88,
            errorTypes: ['VocabularyError', 'StyleError'],
            timestamp: new Date(Date.now() - 86400000),
            improvementScore: 90
          },
          {
            id: '3',
            originalText: '全球化促进了文化交流和经济发展',
            studentTranslation: 'Globalization promotes culture exchange and economic development',
            improvedTranslation: 'Globalization promotes cultural exchange and economic development',
            accuracy: 95,
            errorTypes: ['VocabularyError'],
            timestamp: new Date(Date.now() - 172800000),
            improvementScore: 92
          }
        ]);
      }
    };

    loadLearningData();
  }, []);

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'GrammarError': return 'bg-red-100 text-red-800';
      case 'VocabularyError': return 'bg-purple-100 text-purple-800';
      case 'Chinglish': return 'bg-orange-100 text-orange-800';
      case 'StyleError': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    if (accuracy >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">学习画像</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 用户信息和统计数据 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 用户信息卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
                  JS
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">John Smith</h2>
                  <p className="text-gray-600">英语翻译学习者</p>
                  <p className="text-gray-500">语言大学 · 中级水平</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500">加入时间: 2023-09-01</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">学生ID: 20230012345</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">john.smith@example.com</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">专业</label>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">英语翻译</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-20">
                  热爱中英翻译，专注于技术和学术翻译技能提升。希望通过系统学习不断提高翻译准确性和表达能力。
                </div>
              </div>
            </div>

            {/* 学习统计数据 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">学习统计概览</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className={`text-3xl font-bold ${getAccuracyColor(userStats.totalExercises)}`}>
                    {userStats.totalExercises}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">累计练习</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className={`text-3xl font-bold ${getAccuracyColor(userStats.averageAccuracy)}`}>
                    {userStats.averageAccuracy}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">平均准确率</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className={`text-3xl font-bold ${getAccuracyColor(userStats.recentAccuracy)}`}>
                    {userStats.recentAccuracy}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">最近正确率</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">
                    {userStats.learningStreak}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">学习连续天数</div>
                </div>
              </div>

              {/* 最常见错误类型 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">最常见错误类型</h3>
                <div className="space-y-3">
                  {userStats.commonErrorTypes.map((error, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getErrorTypeColor(error.type)}`}>
                          {error.type}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {error.count} 次
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 最近练习记录 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">最近练习记录</h2>
              
              <div className="space-y-4">
                {recentExercises.map((exercise) => (
                  <div key={exercise.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {exercise.originalText.slice(0, 30)}...
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(exercise.timestamp)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAccuracyColor(exercise.accuracy)}`}>
                        {exercise.accuracy}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">原始翻译</p>
                        <p className="text-gray-800 text-sm">
                          {exercise.studentTranslation.slice(0, 40)}...
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 mb-1">改进后</p>
                        <p className="text-green-800 text-sm">
                          {exercise.improvedTranslation?.slice(0, 40) || exercise.studentTranslation.slice(0, 40)}...
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exercise.errorTypes.slice(0, 3).map((type, idx) => (
                        <span 
                          key={idx}
                          className={`px-2 py-1 rounded text-xs ${getErrorTypeColor(type)}`}
                        >
                          {type}
                        </span>
                      ))}
                      {exercise.errorTypes.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                          +{exercise.errorTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧 - 详细统计和成就 */}
          <div className="space-y-6">
            {/* 详细统计卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">详细统计</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">总单词数</span>
                    <span className="font-bold text-blue-600">{userStats.totalWords}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (userStats.totalWords / 2000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">语法错误改善</span>
                    <span className="font-bold text-green-600">+35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="极速模式: 已输出 0 字 / 允许 40000 字   还剩 40000 字   用时 0 秒   速度 0 字/秒   已输出 0%    暂停