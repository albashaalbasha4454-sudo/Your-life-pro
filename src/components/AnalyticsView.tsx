/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Flame,
  Award,
  Calendar,
  Sparkles,
  Printer,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayString, getDaysOfWeek, getShortDate } from '../utils/dateUtils';

export const AnalyticsView: React.FC = () => {
  const { state, t } = useApp();

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((t) => t.completed).length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const weekDays = getDaysOfWeek(getTodayString());

  // Category breakdown calculation
  const categoryStats = state.categories.map((cat) => {
    const count = state.tasks.filter((t) => t.categoryId === cat.id).length;
    const completedCount = state.tasks.filter((t) => t.categoryId === cat.id && t.completed).length;
    return {
      ...cat,
      count,
      completedCount,
      percentage: totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0,
    };
  });

  // Habit consistency calculation
  const totalHabitEntries = state.habits.reduce((acc, h) => {
    return acc + Object.keys(h.history).length;
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.analytics.title}</h1>
          <p className="text-xs text-slate-400 mt-1">{t.analytics.summaryStatement}</p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>{t.settings.exportPdf}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.analytics.completionRate}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{taskCompletionRate}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-700"
              style={{ width: `${taskCompletionRate}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.tasks.totalTasks}</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{totalTasks}</div>
          <p className="text-[11px] text-blue-400 font-medium">
            {completedTasks} مكتملة • {totalTasks - completedTasks} جارية
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.analytics.habitConsistency}</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {state.habits.reduce((acc, h) => acc + h.streak, 0)} يوم
          </div>
          <p className="text-[11px] text-amber-400 font-medium">
            عبر {state.habits.length} عادات مستمرة
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>الملاحظات واليوميات</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{state.notes.length}</div>
          <p className="text-[11px] text-purple-400 font-medium">تدوينات وتأملات مسجلة</p>
        </div>
      </div>

      {/* Category Distribution and Productivity Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              {t.analytics.categoryBreakdown}
            </h3>
          </div>

          <div className="space-y-3">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-semibold text-slate-200">
                      {state.settings.language === 'ar' ? cat.nameAr : cat.nameEn}
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono">
                    {cat.completedCount}/{cat.count} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Productivity Trend */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              {t.analytics.weeklyTrends}
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-6 items-end h-48">
            {weekDays.map((dStr) => {
              const dayTasks = state.tasks.filter((t) => t.dueDate === dStr);
              const doneCount = dayTasks.filter((t) => t.completed).length;
              const heightPercent = dayTasks.length > 0 ? Math.min(100, Math.max(15, (doneCount / dayTasks.length) * 100)) : 10;
              const isToday = dStr === getTodayString();

              return (
                <div key={dStr} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] text-slate-400 font-mono">{doneCount}</span>
                  <div className="w-full bg-slate-800/80 rounded-t-xl h-full max-h-32 flex items-end p-1">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday ? 'bg-blue-500' : 'bg-emerald-500/80'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-mono ${isToday ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
                    {getShortDate(dStr, state.settings.language)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
