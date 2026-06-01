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
    // 从LocalStorage加载数据
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('translationCoachLearningData');
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.exercises && data.exercises.length > 0) {
            const exercises = data.exercises;
            const totalExercises = exercises.length;
            const totalAccuracy = exercises.reduce((sum, ex) => sum + (ex.accuracy || 0), 0);
            const averageAccuracy = Math.round(totalAccuracy / totalExercises);
            
            const recentExercises = exercises.slice(-5);
            const recentAccuracy = recentExercises.length > 0 
              ? Math.round(recentExercises.reduce((sum, ex) => sum + (ex.accuracy || 0), 0) / recentExercises.length)
              : 0;

            const errorCounts: Record<string, number> = {};
            exercises.forEach(ex => {
              (ex.errorTypes || []).forEach(type => {
                errorCounts[type] = (errorCounts[type] || 0) + 1;
              });
            });

            const commonErrorTypes = Object.entries(errorCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([type, count]) => ({ type, count }));

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
                  <div className="p-3 bg-gray-50 rounded-lg border">john.smith@example.com</div>
                </div>
                <div>
                  <label className="block极速模式: 已输出 0 字 / 允许 40000 字   还剩 40000 极速模式: 已输出 0 字 / 允许 40000 字   还剩 40000 字   用时 0 秒   速度 0 字/秒   已输出 0%    暂停