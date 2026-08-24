/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Droplets,
  Smile,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  ListTodo,
  Calendar,
  Hourglass,
  Tag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayString, formatDate, getHijriDate, formatMinutes } from '../utils/dateUtils';
import { Priority, Task } from '../types';

export const TodayHub: React.FC = () => {
  const {
    state,
    t,
    toggleTask,
    addTask,
    incrementWater,
    decrementWater,
    updateDailyReflection,
    setActiveTab,
    setEditingTask,
    setIsQuickTaskModalOpen,
  } = useApp();

  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState<Priority>('medium');
  const [quickCategory, setQuickCategory] = useState<string>('work');

  const todayStr = getTodayString();
  const todayTasks = state.tasks.filter((task) => task.dueDate === todayStr);
  const completedTodayTasks = todayTasks.filter((task) => task.completed);

  const todayHabits = state.habits;
  const completedHabitsCount = todayHabits.filter(
    (h) => (h.history[todayStr] || 0) >= h.targetCount
  ).length;

  const todaySchedule = state.schedule.filter((s) => s.date === todayStr);
  const reflection = state.dailyReflections[todayStr] || {
    mood: '',
    energyLevel: 3,
    waterGlasses: 0,
    highlights: '',
    improvements: '',
    gratitude: '',
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t.today.greetingMorning
      : hour < 17
      ? t.today.greetingAfternoon
      : t.today.greetingEvening;

  const quoteIndex = new Date().getDate() % t.today.motivationalQuotes.length;
  const quote = t.today.motivationalQuotes[quoteIndex];

  // Calculate completion percentage
  const totalItems = todayTasks.length + todayHabits.length;
  const completedItems = completedTodayTasks.length + completedHabitsCount;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addTask({
      title: quickTitle.trim(),
      completed: false,
      priority: quickPriority,
      categoryId: quickCategory,
      dueDate: todayStr,
      tags: [],
      subtasks: [],
    });
    setQuickTitle('');
  };

  // Eisenhower Matrix grouping
  const matrix = {
    urgentImportant: todayTasks.filter((t) => (t.priority === 'urgent' || t.priority === 'high') && !t.completed),
    notUrgentImportant: todayTasks.filter((t) => t.priority === 'medium' && !t.completed),
    urgentNotImportant: todayTasks.filter((t) => t.priority === 'low' && !t.completed),
    completed: completedTodayTasks,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>{formatDate(todayStr, state.settings.language)}</span>
              <span>•</span>
              <span className="text-slate-400">{getHijriDate(new Date(), state.settings.language)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {greeting}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 italic font-medium leading-relaxed">
              {quote}
            </p>
          </div>

          {/* Progress Circular Widget */}
          <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-bold text-white font-mono">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400">{t.today.todayProgress}</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {completedTodayTasks.length}/{todayTasks.length} {t.nav.tasks}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {completedHabitsCount}/{todayHabits.length} {t.nav.habits}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Input Bar */}
      <form onSubmit={handleQuickAdd} className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder={t.today.quickAddPlaceholder}
            className="flex-1 px-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center gap-2">
            <select
              value={quickPriority}
              onChange={(e) => setQuickPriority(e.target.value as Priority)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="low">{t.tasks.priorityLow}</option>
              <option value="medium">{t.tasks.priorityMedium}</option>
              <option value="high">{t.tasks.priorityHigh}</option>
              <option value="urgent">{t.tasks.priorityUrgent}</option>
            </select>
            <select
              value={quickCategory}
              onChange={(e) => setQuickCategory(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              {state.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {state.settings.language === 'ar' ? c.nameAr : c.nameEn}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!quickTitle.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t.common.save}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Business Pages Quick Studio Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-blue-300 flex items-center gap-2">
              <span>استوديو إدارة الصفحات والمحتوى</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-200 border border-blue-700/50 font-mono">
                sooq alketab • ads • tech
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              لديك {state.contentPosts.length} منشورات مجدولة و {state.adCampaigns.length} حملات إعلانية نشطة.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('pages')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>فتح استوديو الصفحات والمحتوى</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Left Tasks & Matrix, Right Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Prioritized Tasks & Eisenhower Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today Tasks List */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-slate-100 text-base">{t.today.tasksCount}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {todayTasks.length}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
              >
                <span>{t.tasks.viewList}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>

            {todayTasks.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                {t.tasks.noTasksFound}
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.map((task) => {
                  const category = state.categories.find((c) => c.id === task.categoryId);
                  return (
                    <div
                      key={task.id}
                      className={`group p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        task.completed
                          ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                          : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-0.5 text-slate-400 hover:text-blue-400 transition-colors"
                          aria-label={task.completed ? t.tasks.markIncomplete : t.tasks.markComplete}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => setEditingTask(task)}
                              className={`text-sm font-semibold cursor-pointer truncate ${
                                task.completed
                                  ? 'line-through text-slate-500'
                                  : 'text-slate-200 hover:text-white'
                              }`}
                            >
                              {task.title}
                            </span>
                            {task.priority === 'urgent' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                {t.tasks.priorityUrgent}
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {category && (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: `${category.color}20`,
                                  color: category.color,
                                }}
                              >
                                {state.settings.language === 'ar' ? category.nameAr : category.nameEn}
                              </span>
                            )}
                            {task.dueTime && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" />
                                {task.dueTime}
                              </span>
                            )}
                            {task.subtasks.length > 0 && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setActiveTab('focus');
                          }}
                          title="Start Focus Session"
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        >
                          <Hourglass className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Eisenhower Priority Matrix */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-slate-100 text-base">{t.today.eisenhower}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Urgent & Important */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400">{t.today.urgentImportant}</span>
                  <span className="text-xs font-mono text-rose-300/80">({matrix.urgentImportant.length})</span>
                </div>
                {matrix.urgentImportant.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">{t.today.noTasksInMatrix}</p>
                ) : (
                  <div className="space-y-1.5">
                    {matrix.urgentImportant.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-xs text-slate-200">
                        <button onClick={() => toggleTask(task.id)} className="text-rose-400">
                          <Circle className="w-3.5 h-3.5" />
                        </button>
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Not Urgent & Important */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">{t.today.notUrgentImportant}</span>
                  <span className="text-xs font-mono text-blue-300/80">({matrix.notUrgentImportant.length})</span>
                </div>
                {matrix.notUrgentImportant.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">{t.today.noTasksInMatrix}</p>
                ) : (
                  <div className="space-y-1.5">
                    {matrix.notUrgentImportant.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-xs text-slate-200">
                        <button onClick={() => toggleTask(task.id)} className="text-blue-400">
                          <Circle className="w-3.5 h-3.5" />
                        </button>
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Urgent & Not Important */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{t.today.urgentNotImportant}</span>
                  <span className="text-xs font-mono text-amber-300/80">({matrix.urgentNotImportant.length})</span>
                </div>
                {matrix.urgentNotImportant.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">{t.today.noTasksInMatrix}</p>
                ) : (
                  <div className="space-y-1.5">
                    {matrix.urgentNotImportant.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-xs text-slate-200">
                        <button onClick={() => toggleTask(task.id)} className="text-amber-400">
                          <Circle className="w-3.5 h-3.5" />
                        </button>
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Completed Today */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">{t.tasks.completedTasks}</span>
                  <span className="text-xs font-mono text-emerald-300/80">({matrix.completed.length})</span>
                </div>
                {matrix.completed.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">{t.today.noTasksInMatrix}</p>
                ) : (
                  <div className="space-y-1.5">
                    {matrix.completed.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-xs text-slate-400 line-through">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Water Tracker, Mood Rating & Schedule Glance */}
        <div className="space-y-6">
          {/* Water Intake Tracker */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-slate-100 text-sm">{t.today.waterTracker}</h3>
              </div>
              <span className="text-xs font-bold text-cyan-400 font-mono">
                {reflection.waterGlasses} / {state.settings.dailyWaterGoal} {t.today.glasses}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: state.settings.dailyWaterGoal }).map((_, idx) => {
                const filled = idx < reflection.waterGlasses;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (filled) decrementWater();
                      else incrementWater();
                    }}
                    className={`h-10 rounded-xl border flex items-center justify-center transition-all ${
                      filled
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800/40 border-slate-700 text-slate-600 hover:border-cyan-500/50'
                    }`}
                  >
                    <Droplets className={`w-4 h-4 ${filled ? 'fill-current' : ''}`} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => incrementWater()}
                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                {t.today.drinkGlass}
              </button>
            </div>
          </div>

          {/* Daily Mood & Energy Tracker */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-sm">{t.today.quickMood}</h3>
              <Smile className="w-4 h-4 text-amber-400" />
            </div>

            <div className="flex items-center justify-between gap-1.5">
              {[
                { id: 'motivated', label: '🔥', text: 'حماسي' },
                { id: 'happy', label: '😊', text: 'سعيد' },
                { id: 'calm', label: '🌿', text: 'هادئ' },
                { id: 'neutral', label: '😐', text: 'عادي' },
                { id: 'stressed', label: '⚡', text: 'مجهد' },
              ].map((moodItem) => (
                <button
                  key={moodItem.id}
                  onClick={() => updateDailyReflection(todayStr, { mood: moodItem.id as any })}
                  className={`flex-1 py-2 rounded-xl text-lg flex items-center justify-center border transition-all ${
                    reflection.mood === moodItem.id
                      ? 'bg-amber-500/20 border-amber-500 scale-105 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {moodItem.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{t.today.energyLevel}</span>
                <span className="font-mono text-amber-400 font-bold">{reflection.energyLevel} / 5</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => updateDailyReflection(todayStr, { energyLevel: lvl })}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      lvl <= reflection.energyLevel ? 'bg-amber-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Today Schedule Glance */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-slate-100 text-sm">{t.schedule.todaySchedule}</h3>
              </div>
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                {t.common.all}
              </button>
            </div>

            {todaySchedule.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                لا توجد فترات محجوزة اليوم، اضغط على الجدول لتخطيط وقتك.
              </p>
            ) : (
              <div className="space-y-2">
                {todaySchedule.slice(0, 4).map((block) => (
                  <div
                    key={block.id}
                    className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: block.color }}
                      />
                      <span className="font-medium text-slate-200 truncate">{block.title}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">
                      {block.startTime} - {block.endTime}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
