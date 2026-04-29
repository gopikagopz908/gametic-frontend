"use client";

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendType = 'neutral' 
}) => {
  const getTrendIcon = () => {
    if (trendType === 'positive') return <TrendingUp size={14} className="text-green-600" />;
    if (trendType === 'negative') return <TrendingDown size={14} className="text-red-600" />;
    return null;
  };

  const getTrendColor = () => {
    if (trendType === 'positive') return 'text-green-600';
    if (trendType === 'negative') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
