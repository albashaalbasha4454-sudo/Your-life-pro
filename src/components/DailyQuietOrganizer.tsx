/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ② المنظم اليومي الهادئ (اليوم - Daily Organizer)
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Moon,
  Sun,
  FileText,
  Copy,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Droplets,
  HeartPulse,
  Plus,
  Trash2,
  Lightbulb,
  BookOpen,
  Calendar,
  Download,
  Flame,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getHijriDate, getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';
import { Priority } from '../types';

export const DailyQuietOrganizer: React.FC = () => {
  const {
    state,
    t,
    currentDate,
    setCurrentDate,
    addTask,
    toggleTask,
    deleteTask,
    updateDailyReflection,
    incrementWater,
    decrementWater,
    setIsDailyExportModalOpen,
    triggerConfetti,
  } = useApp();

  const todayStr = currentDate || getTodayString();
  const todayReflection = state.dailyReflections[todayStr] || {
    date: todayStr,
    mood: 'calm',
    energyLevel: 4,
    waterGlasses: 5,
    sleepHours: 7.5,
    sleepQuality: 5,
    morningScratchpad: '',
    restNotes: '',
    highlights: '',
    improvements: '',
    gratitude: '',
  };

  const [scratchpadText, setScratchpadText] = useState(todayReflection.morningScratchpad || '');
  const [copiedScratchpad, setCopiedScratchpad] = useState(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState<Priority>('medium');

  const todayTasks = state.tasks.filter((t) => t.dueDate === todayStr);
  const completedTasks = todayTasks.filter((t) => t.completed);

  const wisdomQuotes = [
    {
      quote: '«الوضوح يسبق السرعة؛ المهمة المصاغة بدقة تنجز في نصف الوقت وبأقل جهد ذهني.»',
      author: 'مبدأ دفتر الصباح',
    },
    {
      quote: '«ليس الإنجاز بكثرة المهام المفتوحة، بل بقدرتك على غلق ثلاث أولويات حاسمة كل يوم.»',
      author: 'حكمة الإنتاجية الهادئة',
    },
    {
      quote: '«احمِ ساعات صباحك الأولى من المقاطعات والرسائل؛ إنها الأصول الأغلى في يومك المهني.»',
      author: 'التركيز العميق',
    },
    {
      quote: '«جودة قراراتك تبدأ من جودة نومك وراحتك؛ النوم ليس إهداراً للوقت بل شاحن البصيرة.»',
      author: 'توازن الطاقة',
    },
  ];

  const handleScratchpadChange = (text: string) => {
    setScratchpadText(text);
    updateDailyReflection(todayStr, { morningScratchpad: text });
  };

  const handleCopyScratchpad = () => {
    navigator.clipboard.writeText(scratchpadText);
    setCopiedScratchpad(true);
    sound.playCheck(state.settings.enableSounds);
    setTimeout(() => setCopiedScratchpad(false), 2000);
  };

  const handleSleepChange = (hours: number) => {
    updateDailyReflection(todayStr, { sleepHours: hours });
    sound.playClick(state.settings.enableSounds);
  };

  const handleQualityChange = (rating: number) => {
    updateDailyReflection(todayStr, { sleepQuality: rating });
    sound.playClick(state.settings.enableSounds);
  };

  const handleQuickTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;

    addTask({
      title: quickTaskTitle.trim(),
      completed: false,
      priority: quickPriority,
      categoryId: 'personal',
      dueDate: todayStr,
      tags: ['اليوم', 'هادئ'],
      subtasks: [],
    });

    setQuickTaskTitle('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>المنظم اليومي الهادئ</span>
            </span>
            <span className="text-xs text-slate-400">
              {formatDate(todayStr, state.settings.language)} | {getHijriDate(new Date(), state.settings.language)}
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 font-serif-arabic">
            تفريغ الصباح وتدفق اليوم
          </h1>
          <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-xl">
            مساحة خالية من التشتت لتدوين الأفكار الصباحية، مراقبة راحة الجسد، وتنظيم أولوياتك دون ضغط.
          </p>
        </div>

        <button
          onClick={() => setIsDailyExportModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>تصدير ملخص اليوم (.txt)</span>
        </button>
      </section>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Morning Scratchpad & Rest Tracker (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Morning Scratchpad (مفكرة الصباح والتفريغ الذهني) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-200">
                    مفكرة الصباح والتفريغ الذهني (Morning Scratchpad)
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    اكتب كل ما يدور في ذهنك بحرية؛ الأفكار، المشاعر، أو الخطوات المعلقة
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyScratchpad}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs flex items-center gap-1"
                  title="نسخ محتوى المفكرة"
                >
                  {copiedScratchpad ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedScratchpad ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={8}
              value={scratchpadText}
              onChange={(e) => handleScratchpadChange(e.target.value)}
              placeholder="اكتب أفكار الصباح هنا بحرية... ما الذي يشغل بالك اليوم؟ ما هي أهم نتيجة تريد الوصول إليها؟..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 leading-relaxed font-sans"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
              <span>يتم الحفظ تلقائياً في التخزين المحلي الآمن</span>
              <span>{scratchpadText.length} حرف</span>
            </div>
          </div>

          {/* 2. Sleep & Rest Tracker (شريط جودة النوم والراحة اليومية) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-200">
                  شريط جودة النوم والراحة اليومية (Rest & Sleep Tracker)
                </h2>
                <p className="text-[11px] text-slate-400">
                  مراقبة شاحن طاقتك وصفاء ذهنك لاتخاذ القرارات المهنية الحاسمة
                </p>
              </div>
            </div>

            {/* Sleep Slider */}
            <div className="space-y-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">ساعات النوم والراحة:</span>
                <span className="font-mono text-amber-400 font-bold text-sm">
                  {todayReflection.sleepHours || 7.5} ساعات
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={todayReflection.sleepHours || 7.5}
                onChange={(e) => handleSleepChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>4 س</span>
                <span>6 س</span>
                <span>8 س (المثالي)</span>
                <span>10 س</span>
                <span>12 س</span>
              </div>
            </div>

            {/* Sleep Quality Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-300">تقييم جودة النوم والراحة:</div>
                <div className="text-[11px] text-slate-500">عمق الاسترخاء والاستيقاظ بنشاط</div>
              </div>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleQualityChange(star)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                      (todayReflection.sleepQuality || 5) >= star
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold scale-105'
                        : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Rest Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ملاحظات التوازن والراحة:
              </label>
              <input
                type="text"
                value={todayReflection.restNotes || ''}
                onChange={(e) => updateDailyReflection(todayStr, { restNotes: e.target.value })}
                placeholder="مثال: نمت باكراً واستيقظت بصفاء ذهني ممتاز..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Exclusive Today Tasks & Wisdom (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today Tasks Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-slate-200">مهام اليوم الحصرية</h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {completedTasks.length} / {todayTasks.length}
              </span>
            </div>

            {/* Quick Task input */}
            <form onSubmit={handleQuickTaskSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                placeholder="أضف مهمة لليوم..."
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Task list */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {todayTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  لا توجد مهام مسجلة لهذا اليوم. استمتع بيوم هادئ أو أضف أولويتك الأولى!
                </div>
              ) : (
                todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-slate-950/40 border-slate-800/40 opacity-60'
                        : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button onClick={() => toggleTask(task.id)}>
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                      <span
                        className={`text-xs font-medium text-slate-200 truncate ${
                          task.completed ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Daily Wisdom & Calm Principles */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Lightbulb className="w-4 h-4" />
              شذرات وتلميحات ملهمة (Daily Wisdom)
            </div>

            <div className="space-y-3">
              {wisdomQuotes.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-2xl text-xs space-y-1"
                >
                  <p className="text-slate-300 leading-relaxed font-serif-arabic">{w.quote}</p>
                  <div className="text-[10px] text-amber-400 font-semibold">{w.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
