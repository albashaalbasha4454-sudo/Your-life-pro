/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScheduleBlock } from '../types';
import {
  getTodayString,
  formatDate,
  timeToMinutes,
  isTimeConflict,
  minutesToTime,
} from '../utils/dateUtils';

export const ScheduleView: React.FC = () => {
  const {
    state,
    t,
    currentDate,
    setCurrentDate,
    addScheduleBlock,
    deleteScheduleBlock,
    toggleScheduleCompleted,
  } = useApp();

  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:00');
  const [newCategory, setNewCategory] = useState('work');
  const [newNotes, setNewNotes] = useState('');

  const dayBlocks = useMemo(() => {
    return state.schedule
      .filter((block) => block.date === currentDate)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  }, [state.schedule, currentDate]);

  // Check for conflicts
  const conflicts = useMemo(() => {
    const conflictIds = new Set<string>();
    for (let i = 0; i < dayBlocks.length; i++) {
      for (let j = i + 1; j < dayBlocks.length; j++) {
        if (isTimeConflict(dayBlocks[i], dayBlocks[j])) {
          conflictIds.add(dayBlocks[i].id);
          conflictIds.add(dayBlocks[j].id);
        }
      }
    }
    return conflictIds;
  }, [dayBlocks]);

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const cat = state.categories.find((c) => c.id === newCategory);
    addScheduleBlock({
      title: newTitle.trim(),
      startTime: newStartTime,
      endTime: newEndTime,
      date: currentDate,
      categoryId: newCategory,
      color: cat?.color || '#3b82f6',
      completed: false,
      notes: newNotes.trim() || undefined,
    });
    setNewTitle('');
    setNewNotes('');
    setIsAddingBlock(false);
  };

  const applyPreset = (title: string, durationMinutes: number, categoryId: string) => {
    const now = new Date();
    const startMin = now.getHours() * 60 + Math.ceil(now.getMinutes() / 15) * 15;
    const endMin = startMin + durationMinutes;
    const cat = state.categories.find((c) => c.id === categoryId);

    addScheduleBlock({
      title,
      startTime: minutesToTime(startMin),
      endTime: minutesToTime(endMin),
      date: currentDate,
      categoryId,
      color: cat?.color || '#3b82f6',
      completed: false,
    });
  };

  const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 to 23:00

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Date Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.schedule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {formatDate(currentDate, state.settings.language)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Date Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() - 1);
                setCurrentDate(d.toISOString().split('T')[0]);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => setCurrentDate(getTodayString())}
              className="px-3 py-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              {t.common.today}
            </button>
            <button
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() + 1);
                setCurrentDate(d.toISOString().split('T')[0]);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <button
            onClick={() => setIsAddingBlock(!isAddingBlock)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.schedule.addBlock}</span>
          </button>
        </div>
      </div>

      {/* Conflicts Alert Banner if any */}
      {conflicts.size > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
          <span>{t.schedule.conflictAlert}</span>
        </div>
      )}

      {/* Quick Presets */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.schedule.quickPresets}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset(t.schedule.presetDeepWork, 90, 'work')}
            className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 text-xs font-medium transition-all"
          >
            {t.schedule.presetDeepWork}
          </button>
          <button
            onClick={() => applyPreset(t.schedule.presetMeeting, 30, 'work')}
            className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-medium transition-all"
          >
            {t.schedule.presetMeeting}
          </button>
          <button
            onClick={() => applyPreset(t.schedule.presetWorkout, 45, 'health')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium transition-all"
          >
            {t.schedule.presetWorkout}
          </button>
          <button
            onClick={() => applyPreset(t.schedule.presetReview, 20, 'personal')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-medium transition-all"
          >
            {t.schedule.presetReview}
          </button>
        </div>
      </div>

      {/* Add Block Form */}
      {isAddingBlock && (
        <form
          onSubmit={handleAddBlock}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl space-y-4 animate-fade-in"
        >
          <h3 className="text-sm font-bold text-white">{t.schedule.addBlock}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.schedule.blockTitle}
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="مثال: جلسة برمجة وتركيز عميق"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.schedule.startTime}
              </label>
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.schedule.endTime}
              </label>
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.schedule.category}
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
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingBlock(false)}
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

      {/* Visual Timeline Layout */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        {dayBlocks.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            لا توجد فترات مضافة لهذا اليوم. استخدم زر "إضافة فترة زمنية" أو الفترات المقترحة أعلاه.
          </div>
        ) : (
          <div className="relative border-s-2 border-slate-800 ps-6 space-y-4">
            {dayBlocks.map((block) => {
              const isConflict = conflicts.has(block.id);
              return (
                <div
                  key={block.id}
                  className={`relative p-4 rounded-2xl border transition-all ${
                    isConflict
                      ? 'bg-amber-950/20 border-amber-500/50'
                      : block.completed
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/70'
                  }`}
                >
                  {/* Timeline Dot */}
                  <span
                    className="absolute -start-[31px] top-5 w-3.5 h-3.5 rounded-full border-2 border-slate-900"
                    style={{ backgroundColor: block.color }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleScheduleCompleted(block.id)}
                        className="mt-0.5 text-slate-400 hover:text-emerald-400"
                      >
                        {block.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm font-bold truncate ${
                              block.completed ? 'line-through text-slate-500' : 'text-slate-100'
                            }`}
                          >
                            {block.title}
                          </h4>
                          {isConflict && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              تداخل زمني
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>
                            {block.startTime} — {block.endTime}
                          </span>
                        </div>

                        {block.notes && (
                          <p className="text-xs text-slate-400 mt-2">{block.notes}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteScheduleBlock(block.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                      title={t.schedule.deleteBlock}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
