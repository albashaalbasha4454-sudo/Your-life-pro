/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Flame,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Trophy,
  Sparkles,
  Sun,
  Moon,
  Droplets,
  Calendar,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Habit } from '../types';
import { getTodayString, getDaysOfWeek, getShortDate } from '../utils/dateUtils';

export const HabitsTracker: React.FC = () => {
  const {
    state,
    t,
    addHabit,
    deleteHabit,
    recordHabitProgress,
    incrementWater,
    decrementWater,
  } = useApp();

  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState('personal');
  const [newFrequency, setNewFrequency] = useState<'daily' | 'weekdays' | 'weekends'>('daily');
  const [newTimeOfDay, setNewTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'anytime'>('anytime');
  const [newTargetCount, setNewTargetCount] = useState(1);

  const todayStr = getTodayString();
  const weekDays = getDaysOfWeek(todayStr);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleAr.trim() && !newTitleEn.trim()) return;
    const cat = state.categories.find((c) => c.id === newCategory);

    addHabit({
      titleAr: newTitleAr.trim() || newTitleEn.trim(),
      titleEn: newTitleEn.trim() || newTitleAr.trim(),
      category: newCategory,
      frequency: newFrequency,
      timeOfDay: newTimeOfDay,
      targetCount: Number(newTargetCount) || 1,
      color: cat?.color || '#3b82f6',
      icon: 'Target',
    });

    setNewTitleAr('');
    setNewTitleEn('');
    setIsAddingHabit(false);
  };

  const totalStreaks = state.habits.reduce((acc, h) => acc + h.streak, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.habits.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            إجمالي السلاسل النشطة: {totalStreaks} يوم متتالي من الالتزام
          </p>
        </div>

        <button
          onClick={() => setIsAddingHabit(!isAddingHabit)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.habits.addHabit}</span>
        </button>
      </div>

      {/* Add Habit Form */}
      {isAddingHabit && (
        <form
          onSubmit={handleAddHabit}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl space-y-4 animate-fade-in"
        >
          <h3 className="text-sm font-bold text-white">{t.habits.addHabit}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                اسم العادة (بالعربية)
              </label>
              <input
                type="text"
                required
                value={newTitleAr}
                onChange={(e) => setNewTitleAr(e.target.value)}
                placeholder="مثال: قراءة 15 دقيقة"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Habit Title (English)
              </label>
              <input
                type="text"
                value={newTitleEn}
                onChange={(e) => setNewTitleEn(e.target.value)}
                placeholder="e.g. 15 min Reading"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.tasks.category}
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              >
                {state.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {state.settings.language === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.habits.timeOfDay}
              </label>
              <select
                value={newTimeOfDay}
                onChange={(e) => setNewTimeOfDay(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="morning">{t.habits.morning}</option>
                <option value="afternoon">{t.habits.afternoon}</option>
                <option value="evening">{t.habits.evening}</option>
                <option value="anytime">{t.habits.anytime}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingHabit(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              {t.tasks.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
            >
              {t.common.save}
            </button>
          </div>
        </form>
      )}

      {/* Habits List & 7-Day History Grid */}
      <div className="space-y-4">
        {state.habits.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            لا توجد عادات مضافة حالياً. ابدأ بإضافة عادة جديدة لتتبع التزامك اليومي!
          </div>
        ) : (
          state.habits.map((habit) => {
            const todayCount = habit.history[todayStr] || 0;
            const isCompletedToday = todayCount >= habit.targetCount;
            const title = state.settings.language === 'ar' ? habit.titleAr : habit.titleEn;

            return (
              <div
                key={habit.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                      style={{ backgroundColor: habit.color }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{title}</h3>
                        {habit.streak > 0 && (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                            <span>
                              {habit.streak} {t.habits.days}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.habits.bestStreak}: {habit.bestStreak} {t.habits.days}
                      </p>
                    </div>
                  </div>

                  {/* Complete Today Button / Increment */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        recordHabitProgress(
                          habit.id,
                          todayStr,
                          isCompletedToday ? -habit.targetCount : habit.targetCount
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                        isCompletedToday
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isCompletedToday ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.habits.completedToday}</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>إنجاز اليوم</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title={t.habits.deleteHabit}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 7-Day History Mini Matrix */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 mb-2 font-medium">
                    {t.habits.historyTitle}:
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((dStr) => {
                      const count = habit.history[dStr] || 0;
                      const done = count >= habit.targetCount;
                      const isToday = dStr === todayStr;

                      return (
                        <div
                          key={dStr}
                          onClick={() => recordHabitProgress(habit.id, dStr, done ? -1 : 1)}
                          className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                            done
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-800/40 border-slate-700/60 text-slate-500 hover:border-slate-600'
                          } ${isToday ? 'ring-2 ring-blue-500/50' : ''}`}
                        >
                          <div className="text-[10px] font-mono">{getShortDate(dStr, state.settings.language)}</div>
                          <div className="mt-1 flex justify-center">
                            {done ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
