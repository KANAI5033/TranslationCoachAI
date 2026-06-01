"use client";

import { useState, useEffect } from 'react';

interface LearningRecord {
  id: string;
  accuracy: number;
  errorTypes: string[];
  timestamp: Date;
}

interface UserStats {
  totalExercises: number;
  averageAccuracy: number;
  recentAccuracy: number;
  commonErrorTypes: { type: string; count: number }[];
}

export default function ProfilePage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalExercises: 0,
    averageAccuracy: 0,
    recentAccuracy: 0,
    commonErrorTypes: []
  });

  useEffect(() => {
    // 从LocalStorage加载学习数据
    const loadLearningData = () => {
      try {
        const savedData = localStorage.getItem('translationCoachLearningData');
        if (savedData) {
          const data = JSON.parse(savedData);
          const exercises: LearningRecord[] = data.exercises || [];
          const totalExercises = exercises.length;
          
          if (totalExercises > 0) {
            const totalAccuracy = exercises.reduce((sum, ex) => sum + ex.accuracy, 0);
            const averageAccuracy = Math.round(totalAccuracy / totalExercises);
            
            const recentExercises = exercises.slice(-5);
            const recentAccuracy = recentExercises.length > 0 
              ? Math.round(recentExercises.reduce((sum, ex) => sum + ex.accuracy, 0) / recentExercises.length)
              : 0;
            
            const errorCounts: Record<string, number> = {};
            exercises.forEach(ex => {
              ex.errorTypes.forEach(type => {
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
            return;
          }
        }
      } catch (error) {
        console.error('Failed to load learning data:', error);
      }
      
      // 使用模拟数据
      setUserStats({
        totalExercises: 24,
        averageAccuracy: 85,
        recentAccuracy: 92,
        commonErrorTypes: [
          { type: 'GrammarError', count: 18 },
          { type: 'VocabularyError', count: 12 },
          { type: 'Chinglish', count: 8 }
        ]
      });
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
    return '极速模式: 已输出 0 字 / 允许 40000 字   还剩 40000 字   用时 0 秒   速度 0 字极速模式: 已输出 0 极速模式: 已输出 0 字 / 允许 40000 字   还剩 40000 字   用时 0 秒   速度 0 字/秒   已输出 0%    暂停