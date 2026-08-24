/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ② المنظم اليومي الهادئ (اليوم - Daily Organizer)
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  Moon,
  PenTool,
  Clock,
  Download,
  Calendar,
  Heart,
  Quote,
  Zap,
  Droplets,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayString, formatDate, getHijriDate } from '../utils/dateUtils';
import { Priority, Task } from '../types';

export const DailyOrganizerView: React.FC = () => {
  const {
    state,
    t,
    toggleTask,
    addTask,
    updateScratchpad,
    updateSleepData,
    incrementWater,
    decrementWater,
    setIsTodayExportModalOpen,
  } = useApp();

  const [todayTaskInput, setTodayTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState<Priority>('high');
  const [savedScratchpadFeedback, setSavedScratchpadFeedback] = useState(false);

  const todayStr = getTodayString();
  const reflection = state.dailyReflections[todayStr] || {
    scratchpad: '',
    sleepHours: 7.5,
    sleepQuality: 'good',
    waterGlasses: 0,
    highlights: '',
    gratitude: '',
  };

  const todayTasks = state.tasks.filter((t) => t.dueDate === todayStr);
  const completedTodayTasks = todayTasks.filter((t) => t.completed);

  const handleAddTodayTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayTaskInput.trim()) return;
    addTask({
      title: todayTaskInput.trim(),
      completed: false,
      priority: taskPriority,
      categoryId: 'personal',
      dueDate: todayStr,
      tags: ['يومي'],
      subtasks: [],
    });
    setTodayTaskInput('');
  };

  const handleScratchpadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateScratchpad(e.target.value, todayStr);
    setSavedScratchpadFeedback(true);
    setTimeout(() => setSavedScratchpadFeedback(false), 1500);
  };

  // Daily wisdom cards
  const wisdomList = [
    {
      quote: '«الوضوح يسبق السرعة. نصف ساعة من التخطيط الصباحي الهادئ توفر أربع ساعات من التخبط.»',
      author: 'مبدأ الرصانة الهندسية',
    },
    {
      quote: '«ليس الإنجاز في كثرة ما تبدأ، بل في قلة ما تترك بدون إغلاق متقن.»',
      author: 'فلسفة دفتر الصباح',
    },
    {
      quote: '«النوم العميق هو الوقود الخفي للقرارات الاستشارية الحكيمة.»',
      author: 'التوازن الحيوي',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Date Strip & Time Flow Banner */}
      <div className="p-6 rounded-3xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--copper)]">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(todayStr, state.settings.language)}</span>
            <span>•</span>
            <span className="text-[var(--ink-muted)]">{getHijriDate(new Date(), state.settings.language)}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--ink)] font-serif-arabic">
            المنظم اليومي الهادئ (Daily Organizer)
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            مساحة مخصصة للعمل الصامت، تصفية الذهن، وتتبع النوم والتوازن المهني.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => incrementWater()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 text-xs font-bold hover:bg-cyan-500/20 transition-all active:scale-95"
          >
            <Droplets className="w-4 h-4" />
            <span>{reflection.waterGlasses || 0}/8 أكواب</span>
          </button>

          <button
            onClick={() => setIsTodayExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white text-xs font-bold shadow-md shadow-[var(--olive)]/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>تصدير ملخص اليوم (.txt)</span>
          </button>
        </div>
      </div>

      {/* Grid: Tasks + Morning Scratchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Today's Tasks */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--olive)]" />
                قائمة مهام اليوم الحصرية
              </h2>
              <span className="text-xs font-mono font-bold text-[var(--ink-muted)]">
                {completedTodayTasks.length}/{todayTasks.length} منجزة
              </span>
            </div>

            {/* Quick Task Add Form */}
            <form onSubmit={handleAddTodayTask} className="flex gap-2">
              <input
                type="text"
                value={todayTaskInput}
                onChange={(e) => setTodayTaskInput(e.target.value)}
                placeholder="أضف مهمة لليوم..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
              />
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as Priority)}
                className="px-2.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              >
                <option value="urgent">عاجل</option>
                <option value="high">عالية</option>
                <option value="medium">متوسطة</option>
                <option value="low">منخفضة</option>
              </select>
              <button
                type="submit"
                disabled={!todayTaskInput.trim()}
                className="px-3.5 py-2 bg-[var(--olive)] hover:bg-[var(--olive-dark)] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Task Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto no-scrollbar pt-2">
              {todayTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-[var(--ink-muted)]">
                  لا توجد مهام مضافة لليوم بعد. ابدأ بإضافة أولوياتك الصباحية!
                </div>
              ) : (
                todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-[var(--paper-2)]/60 border-[var(--paper-border)] opacity-70'
                        : 'bg-[var(--paper-2)] border-[var(--paper-border)] hover:border-[var(--olive)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-[var(--ink-muted)] hover:text-[var(--olive)] transition-colors shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[var(--olive)]" />
                        ) : (
                          <Circle className="w-5 h-5 text-[var(--ink-faint)]" />
                        )}
                      </button>
                      <span
                        className={`text-xs font-medium text-[var(--ink)] truncate ${
                          task.completed ? 'line-through text-[var(--ink-muted)]' : ''
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase shrink-0 ${
                        task.priority === 'urgent'
                          ? 'bg-rose-500/10 text-rose-600'
                          : task.priority === 'high'
                          ? 'bg-[var(--copper)]/10 text-[var(--copper)]'
                          : 'bg-[var(--paper-card)] text-[var(--ink-muted)]'
                      }`}
                    >
                      {task.priority === 'urgent'
                        ? 'عاجل'
                        : task.priority === 'high'
                        ? 'عالية'
                        : 'عادية'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rest & Sleep Tracker Slider */}
          <div className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                جودة النوم والراحة اليومية (Rest Tracker)
              </h2>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                {reflection.sleepHours || 7.5} ساعة
              </span>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-[var(--ink-muted)] block">
                حدد ساعات النوم للّيلة الماضية (4 - 12 ساعة):
              </label>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={reflection.sleepHours || 7.5}
                onChange={(e) =>
                  updateSleepData(parseFloat(e.target.value), reflection.sleepQuality || 'good', todayStr)
                }
                className="w-full accent-indigo-600 cursor-pointer"
              />

              <div className="flex items-center justify-between gap-2 pt-2">
                <span className="text-xs font-bold text-[var(--ink)]">مستوى الجودة:</span>
                <div className="flex items-center gap-1.5">
                  {(
                    [
                      { id: 'deep', label: 'عميق جداً 🌟' },
                      { id: 'good', label: 'جيد ومريح 😌' },
                      { id: 'average', label: 'متوسط 😐' },
                      { id: 'poor', label: 'متقطع 🥱' },
                    ] as const
                  ).map((q) => (
                    <button
                      key={q.id}
                      onClick={() => updateSleepData(reflection.sleepHours || 7.5, q.id, todayStr)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        reflection.sleepQuality === q.id
                          ? 'bg-indigo-600 text-white font-bold shadow-sm'
                          : 'bg-[var(--paper-2)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Morning Scratchpad + Daily Wisdom */}
        <div className="space-y-4">
          {/* Morning Scratchpad (مفكرة الصباح والتفريغ الذهني) */}
          <div className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                <PenTool className="w-5 h-5 text-[var(--copper)]" />
                مفكرة الصباح والتفريغ الذهني (Morning Scratchpad)
              </h2>
              {savedScratchpadFeedback && (
                <span className="text-[10px] text-[var(--olive)] font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> تم الحفظ تلقائياً
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--ink-muted)]">
              اكتب أفكارك غير المنظمة، مذكراتك اللحظية، وما يشغل تفكيرك لتفريغ الذاكرة المؤقتة.
            </p>
            <textarea
              rows={9}
              value={reflection.scratchpad || ''}
              onChange={handleScratchpadChange}
              placeholder="اكتب هنا بحرية... ملاحظات الصباح، الاتصالات المطلوبة، أو خواطر التخطيط..."
              className="w-full p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--ink-faint)] leading-relaxed focus:outline-none focus:border-[var(--copper)] transition-colors resize-y"
            />
          </div>

          {/* Daily Wisdom Cards (شذرات وتلميحات ملهمة) */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-[var(--ink-muted)] flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-[var(--olive)]" />
              شذرات وتلميحات ملهمة (Daily Wisdom):
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {wisdomList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] shadow-sm space-y-1"
                >
                  <p className="italic leading-relaxed">{item.quote}</p>
                  <div className="text-[10px] text-[var(--olive)] font-bold text-end">
                    — {item.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
