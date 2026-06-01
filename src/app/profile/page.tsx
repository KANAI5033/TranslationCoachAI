"use client";

import { useState, useEffect } from 'react';

interface UserStats {
  totalExercises: number;
  averageAccuracy: number;
  recentAccuracy: number;
  commonErrorTypes: { type: string; count: number }[];
}

export default function ProfilePage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalExercises: 24,
    averageAccuracy: 85,
    recentAccuracy: 92,
    commonErrorTypes: [
      { type: 'GrammarError', count: 18 },
      { type: 'VocabularyError', count: 12 },
      { type: 'Chinglish', count: 8 }
    ]
  });

  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('translationCoachLearningData');
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.exercises?.length > 0) {
            const exercises = data.exercises;
            const totalExercises = exercises.length;
            const totalAccuracy = exercises.reduce((sum: number, ex: any) => sum + (ex.accuracy || 0), 0);
            const averageAccuracy = Math.round(totalAccuracy / totalExercises);
            
            const recentExercises = exercises.slice(-5);
            const recentAccuracy = recentExercises.length > 0 
              ? Math.round(recentExercises.reduce((sum: number, ex: any) => sum + (ex.accuracy || 0), 0) / recentExercises.length)
              : 0;

            const errorCounts: Record<string, number> = {};
            exercises.forEach((ex: any) => {
              (ex.errorTypes || []).forEach((type: string) => {
                errorCounts[type] = (errorCounts[type] || 0) + 1;
              });
            });

            const commonErrorTypes = Object.entries(errorCounts)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .slice(0, 3)
              .map(([type, count]) => ({ type, count: count as number }));

            setUserStats({
              totalExercises,
              averageAccuracy,
              recentAccuracy,
              commonErrorTypes
            });
          }
        }
      } catch (error) {
        console.log('Using default stats data');
      }
    };

    loadData();
  }, []);

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'GrammarError': return 'bg-red-100 text-red-800 border-red-300';
      case 'VocabularyError': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Chinglish': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'StyleError': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    if (accuracy >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">学习画像</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要统计区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 用户信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
                  JS
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">John Smith</h2>
                  <p className="text-gray-600">英语翻译学习者</p>
                  <p className="text-sm text-gray-500">语言大学 · 学生ID: 20230012345</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <div className="p-3 bg-gray-50 rounded-lg border text-gray-800">john.smith@example.com</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">学习时长</label>
                  <div className="p-3 bg-gray-50 rounded-lg border text-gray-800">15小时</div>
                </div>
              </div>
            </div>

            {/* 学习统计 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">学习统计</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.totalExercises}</div>
                  <div className="text-gray-700">累计练习次数</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className={`text-3xl font-bold mb-2 ${getAccuracyColor(userStats.averageAccuracy)}`}>
                    {userStats.averageAccuracy}%
                  </div>
                  <div className="text-gray-700">平均正确率</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className={`text-3xl font-bold mb-2 ${getAccuracyColor(userStats.recentAccuracy)}`}>
                    {userStats.recentAccuracy}%
                  </div>
                  <div className="text-gray-700">最近正确率</div>
                </div>
              </div>
            </div>

            {/* 错误类型分析 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">常见错误类型</h2>
              <div className="space-y-4">
                {userStats.commonErrorTypes.map((error, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full ${getErrorTypeColor(error.type)}`}>
                        {error.type}
                      </span>
                      <span className="ml-3 text-gray-700">{error.type === 'GrammarError' ? '语法错误' : 
                        error.type === 'VocabularyError' ? '词汇错误' : 
                        error.type === 'Chinglish' ? '中式英语' : '风格问题'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900 mr-2">{error.count}次</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            error.type === 'GrammarError' ? 'bg-red-500' :
                            error.type === 'VocabularyError' ? 'bg-purple-500' :
                            error.type === 'Chinglish' ? 'bg-orange-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.min(error.count * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 学习目标 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">语法正确性</span>
                    <span className="text-sm font-bold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">词汇准确性</span>
                    <span className="text-sm font-bold text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">表达地道性</span>
                    <span className="text-sm font-bold text-purple-600">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 学习建议 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">学习建议</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">继续巩固语法知识</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">扩展专业词汇量</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">多练习商务英语翻译</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">阅读英文原版材料</span>
                </li>
              </ul>
            </div>

            {/* 最近活动 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">最近活动</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">完成语法练习</span>
                  <span className="ml-auto text-sm text-gray-500">今天</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">词汇测试92分</span>
                  <span className="ml-auto text-sm text-gray-500">昨天</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">翻译练习完成</span>
                  <span className="ml-auto text-sm text-gray-500">2天前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}