/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ① مساحة القيادة والمركز الرئيسي (لوحة التحكم / الرئيسية - Home Command Center)
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Briefcase,
  Users,
  Award,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  Check,
  TrendingUp,
  FileCheck,
  DollarSign,
  Clock,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayString, formatDate, getHijriDate } from '../utils/dateUtils';
import { Priority, Task, ProjectMatrixItem } from '../types';

export const HomeDashboard: React.FC = () => {
  const {
    state,
    t,
    toggleTask,
    addTask,
    setActiveTab,
    setSelectedClientId,
    convertProjectToCaseStudy,
    setIsQuickTaskModalOpen,
    setIsTodayExportModalOpen,
  } = useApp();

  const [taskFilter, setTaskFilter] = useState<'all' | 'today' | 'projects' | 'completed' | 'open'>('all');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState<Priority>('high');
  const [quickClient, setQuickClient] = useState<string>(state.clients[0]?.id || '');

  const todayStr = getTodayString();
  const todayTasks = state.tasks.filter((task) => task.dueDate === todayStr);
  const completedTodayTasks = todayTasks.filter((task) => task.completed);
  const completionPercentage = todayTasks.length > 0
    ? Math.round((completedTodayTasks.length / todayTasks.length) * 100)
    : 100;

  // Filtered tasks logic
  const filteredTasks = state.tasks.filter((task) => {
    if (taskFilter === 'today') return task.dueDate === todayStr;
    if (taskFilter === 'projects') return !!task.relatedProjectId || !!task.relatedClientId;
    if (taskFilter === 'completed') return task.completed;
    if (taskFilter === 'open') return !task.completed;
    return true;
  });

  // Top 3-5 focus tasks
  const focusTasks = state.tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      const pWeights = { urgent: 4, high: 3, medium: 2, low: 1 };
      return (pWeights[b.priority] || 1) - (pWeights[a.priority] || 1);
    })
    .slice(0, 5);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    const client = state.clients.find((c) => c.id === quickClient);
    addTask({
      title: quickTitle.trim(),
      completed: false,
      priority: quickPriority,
      categoryId: quickClient ? 'work' : 'personal',
      dueDate: todayStr,
      tags: client ? [client.nameAr || client.name] : [],
      subtasks: [],
      relatedClientId: quickClient || undefined,
    });
    setQuickTitle('');
  };

  // Weekly Days Saturday to Friday
  const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const todayDayIdx = new Date().getDay(); // 0 is Sunday, 6 is Saturday
  // Map JS getDay (0:Sun, 1:Mon ... 6:Sat) to Saturday-first index (0:Sat, 1:Sun, 2:Mon... 6:Fri)
  const mappedTodayIdx = (todayDayIdx + 1) % 7;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Hero & Progress Stamp */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--olive-dark)] via-[var(--olive)] to-[var(--paper-2)] border border-[var(--paper-border)] p-6 sm:p-8 shadow-xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--copper-light)]">
              <Sparkles className="w-4 h-4" />
              <span>{formatDate(todayStr, state.settings.language)}</span>
              <span>•</span>
              <span className="opacity-90">{getHijriDate(new Date(), state.settings.language)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-arabic">
              مركز القيادة والعمليات اليومية
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 opacity-90 leading-relaxed font-normal">
              منظومة تشغيل هادئة ورصينة لإدارة مسارات العملاء، متابعة المخرجات القادمة، وحصيلة النمو المهني بنسبة أخطاء 0%.
            </p>
          </div>

          {/* Progress Circular Stamp */}
          <div className="flex items-center gap-4 bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[var(--copper-light)] transition-all duration-700 ease-out"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-bold text-white font-mono">
                {completionPercentage}%
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-white/80">ختم إنجاز اليوم</div>
              <div className="text-sm font-bold text-white mt-0.5 font-mono">
                {completedTodayTasks.length}/{todayTasks.length} {t.nav.tasks}
              </div>
              <button
                onClick={() => setIsTodayExportModalOpen(true)}
                className="mt-1 text-[11px] text-[var(--copper-light)] hover:underline font-semibold flex items-center gap-1"
              >
                تصدير ملخص اليوم (.txt)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dashboard Stat Deck (سد الفراغ البصري وتحقيق الكثافة الهندسية) */}
      <div className="dashboard-stat-deck">
        <div
          onClick={() => setActiveTab('clients')}
          className="stat-card p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm hover:border-[var(--olive)] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] mb-1">
            <span className="font-semibold">المشاريع النشطة</span>
            <div className="p-2 rounded-xl bg-[var(--olive)]/10 text-[var(--olive)]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] font-mono">
            {state.projects.filter((p) => p.stage !== 'completed').length}
          </div>
          <div className="text-[11px] text-[var(--olive)] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>مصفوفة تسليمات منضبطة</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('clients')}
          className="stat-card p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm hover:border-[var(--copper)] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] mb-1">
            <span className="font-semibold">العملاء والشركاء</span>
            <div className="p-2 rounded-xl bg-[var(--copper)]/10 text-[var(--copper)]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] font-mono">
            {state.clients.length}
          </div>
          <div className="text-[11px] text-[var(--copper)] font-medium mt-1 flex items-center gap-1">
            <span>سياقات متعددة معزولة</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('professional')}
          className="stat-card p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm hover:border-[var(--olive-dark)] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] mb-1">
            <span className="font-semibold">دراسات الحالة المعتمدة</span>
            <div className="p-2 rounded-xl bg-[var(--olive-dark)]/10 text-[var(--olive-dark)]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] font-mono">
            {state.caseStudies.length}
          </div>
          <div className="text-[11px] text-[var(--olive-dark)] font-medium mt-1">
            <span>حصيلة التموضع المهني</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('schedule')}
          className="stat-card p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm hover:border-[var(--olive-light)] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] mb-1">
            <span className="font-semibold">كتل التخطيط الأسبوعي</span>
            <div className="p-2 rounded-xl bg-[var(--olive-light)]/10 text-[var(--olive-light)]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] font-mono">
            {state.schedule.length}
          </div>
          <div className="text-[11px] text-[var(--ink-muted)] font-medium mt-1">
            <span>ساعات عمل عميقة منظمة</span>
          </div>
        </div>
      </div>

      {/* 3. Task Composer & Filter Strip */}
      <div className="p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-3">
        <form onSubmit={handleQuickAdd} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="أضف مهمة سريعة واربطها بسياق العمل مباشرة..."
            className="flex-1 px-4 py-2.5 bg-[var(--paper-2)] border border-[var(--paper-border)] rounded-xl text-sm text-[var(--ink)] placeholder-[var(--ink-faint)] focus:outline-none focus:border-[var(--olive)] transition-colors"
          />
          <div className="flex items-center gap-2">
            <select
              value={quickClient}
              onChange={(e) => setQuickClient(e.target.value)}
              className="px-3 py-2 bg-[var(--paper-2)] border border-[var(--paper-border)] rounded-xl text-xs text-[var(--ink)] focus:outline-none"
            >
              <option value="">(بدون ربط بعميل)</option>
              {state.clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
            <select
              value={quickPriority}
              onChange={(e) => setQuickPriority(e.target.value as Priority)}
              className="px-3 py-2 bg-[var(--paper-2)] border border-[var(--paper-border)] rounded-xl text-xs text-[var(--ink)] focus:outline-none"
            >
              <option value="urgent">طارئة</option>
              <option value="high">عالية</option>
              <option value="medium">متوسطة</option>
              <option value="low">منخفضة</option>
            </select>
            <button
              type="submit"
              disabled={!quickTitle.trim()}
              className="px-4 py-2.5 bg-[var(--olive)] hover:bg-[var(--olive-dark)] disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة</span>
            </button>
          </div>
        </form>

        {/* Filter Strip */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[var(--paper-border)]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'الكل' },
                { id: 'today', label: 'اليوم' },
                { id: 'projects', label: 'المشاريع والعملاء' },
                { id: 'open', label: 'المفتوحة' },
                { id: 'completed', label: 'المكتملة' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setTaskFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  taskFilter === f.id
                    ? 'bg-[var(--olive)] text-white font-bold shadow-sm'
                    : 'bg-[var(--paper-2)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-[var(--ink-faint)] font-mono">
            {filteredTasks.length} مهام معروضة
          </span>
        </div>
      </div>

      {/* 4. Priorities & Focus List (Today First) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--copper)]" />
              أولويات اليوم وكتل التركيز (Today First)
            </h2>
            <button
              onClick={() => setActiveTab('today')}
              className="text-xs text-[var(--copper)] hover:underline font-semibold flex items-center gap-1"
            >
              <span>فتح المنظم اليومي</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {focusTasks.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-center text-xs text-[var(--ink-muted)]">
                جميع أولوياتك الأساسية منجزة بنجاح! أحسنت ✨
              </div>
            ) : (
              focusTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] hover:border-[var(--olive)] transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-[var(--ink-muted)] hover:text-[var(--olive)] transition-colors shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--olive)]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--ink-faint)] group-hover:text-[var(--olive)]" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--ink)] truncate">
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[var(--ink-muted)] mt-0.5">
                        {task.dueTime && <span>{task.dueTime}</span>}
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.2 rounded bg-[var(--paper-2)] text-[var(--ink-muted)] border border-[var(--paper-border)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-md font-bold uppercase shrink-0 ${
                      task.priority === 'urgent'
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        : task.priority === 'high'
                        ? 'bg-[var(--copper)]/10 text-[var(--copper)] border border-[var(--copper)]/20'
                        : 'bg-[var(--paper-2)] text-[var(--ink-muted)]'
                    }`}
                  >
                    {task.priority === 'urgent'
                      ? 'عاجل جداً'
                      : task.priority === 'high'
                      ? 'أولوية عالية'
                      : 'متوسط'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. Weekly Connected Calendar Strip */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--olive)]" />
              التقويم الأسبوعي المتصل
            </h2>
            <span className="text-xs text-[var(--ink-faint)]">السبت إلى الجمعة</span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-3">
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysOfWeek.map((day, idx) => {
                const isToday = idx === mappedTodayIdx;
                return (
                  <div
                    key={day}
                    className={`p-2 rounded-xl text-center transition-all ${
                      isToday
                        ? 'bg-[var(--copper)] text-white font-bold shadow-md'
                        : 'bg-[var(--paper-2)] text-[var(--ink-muted)]'
                    }`}
                  >
                    <div className="text-[10px] font-medium">{day}</div>
                    <div className="text-xs font-mono font-bold mt-1">
                      {isToday ? 'اليوم' : `+${(idx - mappedTodayIdx + 7) % 7}`}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[var(--paper-border)] space-y-2 text-xs">
              <div className="font-semibold text-[var(--ink)]">تسليمات ومواعيد هذا الأسبوع:</div>
              {state.projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  className="p-2 rounded-lg bg-[var(--paper-2)] border-s-4 border-s-[var(--olive)] text-[11px] text-[var(--ink)] flex items-center justify-between"
                >
                  <span className="font-medium truncate">{proj.title}</span>
                  <span className="text-[10px] text-[var(--ink-muted)] font-mono shrink-0">
                    {proj.deadline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Project Command Strip & Matrix */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--olive)]" />
              شريط إدارة المشاريع والمصفوفة التنفيذية
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              المرحلة، المشكلة، الخطوة التالية، مؤشر النجاح، المهارة المكتسبة، والميزانية لكل مشروع.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('clients')}
            className="text-xs text-[var(--olive)] hover:underline font-semibold"
          >
            إدارة كافة المشاريع
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--paper-border)] bg-[var(--paper-card)] shadow-sm">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--paper-border)] bg-[var(--paper-2)] text-[var(--ink-muted)] text-[11px] font-bold">
                <th className="p-3 text-start">المشروع والعميل</th>
                <th className="p-3 text-start">المرحلة</th>
                <th className="p-3 text-start">المشكلة والتحدي</th>
                <th className="p-3 text-start">الخطوة القادمة</th>
                <th className="p-3 text-start">مؤشر النجاح</th>
                <th className="p-3 text-start">الميزانية</th>
                <th className="p-3 text-center">دراسة الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--paper-border)]">
              {state.projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[var(--paper)] transition-colors">
                  <td className="p-3 font-semibold text-[var(--ink)]">
                    <div>{proj.title}</div>
                    <div className="text-[10px] text-[var(--olive)] font-medium">{proj.clientName}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.stage === 'in_progress'
                          ? 'bg-[var(--copper)]/15 text-[var(--copper)]'
                          : proj.stage === 'review'
                          ? 'bg-amber-500/15 text-amber-700'
                          : proj.stage === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-700'
                          : 'bg-[var(--paper-2)] text-[var(--ink-muted)]'
                      }`}
                    >
                      {proj.stage === 'in_progress'
                        ? 'قيد التنفيذ'
                        : proj.stage === 'review'
                        ? 'المراجعة'
                        : proj.stage === 'completed'
                        ? 'مكتمل'
                        : 'اكتشاف'}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--ink-muted)] max-w-xs truncate" title={proj.problem}>
                    {proj.problem}
                  </td>
                  <td className="p-3 text-[var(--ink)] font-medium max-w-xs truncate" title={proj.nextStep}>
                    {proj.nextStep}
                  </td>
                  <td className="p-3 text-[var(--olive)] font-medium max-w-xs truncate" title={proj.successMetric}>
                    {proj.successMetric}
                  </td>
                  <td className="p-3 font-mono font-bold text-[var(--ink)]">
                    {proj.budget} {proj.currency}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => convertProjectToCaseStudy(proj.id)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--olive)]/10 hover:bg-[var(--olive)] hover:text-white text-[var(--olive)] font-semibold text-[11px] transition-all border border-[var(--olive)]/20"
                    >
                      باني دراسة الحالة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Work Hub & Mini Content Kanban Board */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--copper)]" />
              مساحة العمل وسير المحتوى (Content Board)
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              توزيع المحتوى بين الفكرة، المسودة، المراجعة، والمجدول للنشر.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('pages')}
            className="text-xs text-[var(--copper)] hover:underline font-semibold"
          >
            فتح استوديو المحتوى الكامل
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            [
              { status: 'idea', label: 'فكرة 💡', color: 'border-t-amber-500' },
              { status: 'draft', label: 'مسودة ✍️', color: 'border-t-blue-500' },
              { status: 'ready', label: 'مراجعة 🔍', color: 'border-t-purple-500' },
              { status: 'scheduled', label: 'مجدول / منشور 🚀', color: 'border-t-emerald-500' },
            ] as const
          ).map((col) => {
            const posts = state.contentPosts.filter((p) => p.status === col.status);
            return (
              <div
                key={col.status}
                className={`p-3 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] border-t-4 ${col.color} shadow-sm space-y-2`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] pb-1 border-b border-[var(--paper-border)]">
                  <span>{col.label}</span>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)]">{posts.length}</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                  {posts.length === 0 ? (
                    <div className="text-[11px] text-[var(--ink-faint)] py-4 text-center">
                      لا توجد منشورات
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setActiveTab('pages')}
                        className="p-2.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] hover:border-[var(--olive)] cursor-pointer transition-all space-y-1 text-xs"
                      >
                        <div className="font-semibold text-[var(--ink)] truncate">{post.title}</div>
                        <div className="text-[10px] text-[var(--ink-muted)] flex items-center justify-between">
                          <span>{post.platform}</span>
                          <span className="font-mono">{post.scheduledDate}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
