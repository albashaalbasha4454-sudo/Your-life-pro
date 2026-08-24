/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ① مساحة القيادة والمركز الرئيسي (لوحة التحكم / الرئيسية - Home Command Center)
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Briefcase,
  Layers,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Target,
  Clock,
  ChevronLeft,
  FileText,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getHijriDate, getTodayString } from '../utils/dateUtils';
import { Priority, ProjectMatrixItem } from '../types';

export const HomeCommandCenter: React.FC = () => {
  const {
    state,
    t,
    addTask,
    toggleTask,
    deleteTask,
    setActiveTab,
    setIsDailyExportModalOpen,
    setIsCaseStudyModalOpen,
    setActiveCaseStudyForModal,
    setSelectedClientId,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'today' | 'projects' | 'open' | 'completed'>('today');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState<Priority>('medium');
  const [quickClientId, setQuickClientId] = useState<string>(state.clients[0]?.id || '');

  const todayStr = getTodayString();
  const todayTasks = state.tasks.filter((t) => t.dueDate === todayStr);
  const completedTodayTasks = todayTasks.filter((t) => t.completed).length;
  const totalTodayTasks = todayTasks.length;
  const progressPercent = totalTodayTasks > 0 ? Math.round((completedTodayTasks / totalTodayTasks) * 100) : 100;

  // Filter tasks
  const filteredTasks = state.tasks.filter((task) => {
    if (filterType === 'today') return task.dueDate === todayStr;
    if (filterType === 'projects') return Boolean(task.relatedProjectId || task.relatedClientId);
    if (filterType === 'open') return !task.completed;
    if (filterType === 'completed') return task.completed;
    return true; // 'all'
  });

  // Calculate week days (Saturday to Friday)
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
    const distanceToSaturday = (currentDay + 1) % 7;
    const saturday = new Date(today);
    saturday.setDate(today.getDate() - distanceToSaturday);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(saturday);
      d.setDate(saturday.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayNameAr = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'][i];
      const dayNameEn = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i];
      weekDays.push({ date: iso, dayNameAr, dayNameEn, dayNumber: d.getDate(), isToday: iso === todayStr });
    }
    return weekDays;
  };

  const weekDays = getWeekDates();

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    const matchedClient = state.clients.find((c) => c.id === quickClientId);

    addTask({
      title: quickTitle.trim(),
      completed: false,
      priority: quickPriority,
      categoryId: quickClientId ? 'work' : 'business_pages',
      dueDate: todayStr,
      tags: matchedClient ? [matchedClient.name.replace(/\s+/g, '_')] : ['يومي'],
      subtasks: [],
      relatedClientId: quickClientId || undefined,
    });

    setQuickTitle('');
  };

  const openCaseStudyForProject = (project: ProjectMatrixItem) => {
    const existing = state.caseStudies.find((cs) => cs.id === project.caseStudyId || cs.clientName.includes(project.clientName));
    if (existing) {
      setActiveCaseStudyForModal(existing);
    } else {
      setActiveCaseStudyForModal({
        id: '',
        title: `دراسة حالة: ${project.title} (${project.clientName})`,
        clientName: project.clientName,
        category: 'الاستشارات ونمو الأعمال',
        problem: project.problem,
        solution: `تنفيذ حلول هندسية منظمة وتحقيق مؤشر النجاح: ${project.successIndicator || project.successMetric || ''}`,
        impactMetrics: `تحقيق الميزانية ${project.budget}${project.currency} واكتساب مهارة: ${project.acquiredSkill || ''}`,
        lessonsLearned: 'التوثيق المستمر وتحديد الخطوة التالية بوضوح يضمن تسليم المشاريع قبل الموعد.',
        tags: ['مشروع', project.clientName.replace(/\s+/g, '_'), 'دراسة_حالة'],
        date: getTodayString(),
        published: true,
      });
    }
    setIsCaseStudyModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* =========================================================================
          1. Hero & Progress Stamp (المركز الرئيسي وختم الإنجاز)
          ========================================================================= */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/80 border border-slate-800/90 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 end-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>مركز القيادة المهني</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {formatDate(todayStr, state.settings.language)} | {getHijriDate(new Date(), state.settings.language)}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 font-serif-arabic tracking-tight">
              {t.today.greetingMorning}
            </h1>

            <p className="text-xs lg:text-sm text-slate-400 max-w-2xl leading-relaxed">
              «الإنتاجية الهادئة تبدأ من وضوح الأولويات، وتوثيق القرارات، وحماية وقت التركيز العميق».
            </p>
          </div>

          {/* Dynamic Circular Accomplishment Stamp (ختم الإنجاز الدائري) */}
          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl shadow-inner">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500 transition-all duration-500"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono font-bold text-xs text-amber-400">
                {progressPercent}%
              </span>
            </div>

            <div className="space-y-1 text-right">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                ختم إنجاز اليوم
              </div>
              <p className="text-[11px] text-slate-400">
                {completedTodayTasks} من {totalTodayTasks} مهام مكتملة
              </p>
              <button
                onClick={() => setIsDailyExportModalOpen(true)}
                className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1 mt-0.5"
              >
                <FileText className="w-3 h-3" />
                تصدير ملخص اليوم (.txt)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Dashboard Stat Deck (شريط المؤشرات الحية - 4 Cards)
          ========================================================================= */}
      <section className="dashboard-stat-deck">
        {/* Card 1: Active Projects */}
        <div
          onClick={() => setActiveTab('clients')}
          className="stat-card bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">المشاريع النشطة</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{state.projects.length}</span>
            <span className="text-[11px] text-blue-400 font-medium">مشاريع استراتيجية</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تتبع المراحل، المشكلات، والمواعيد</p>
        </div>

        {/* Card 2: Active Clients */}
        <div
          onClick={() => setActiveTab('clients')}
          className="stat-card bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">العملاء والشركاء</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{state.clients.length}</span>
            <span className="text-[11px] text-emerald-400 font-medium">سياقات عمل نشطة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">حقائب العملاء وجداول الدفعات</p>
        </div>

        {/* Card 3: Skills & Curriculum */}
        <div
          onClick={() => setActiveTab('framework')}
          className="stat-card bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">خارطة المهارات</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{state.skillsRoadmap.length}</span>
            <span className="text-[11px] text-purple-400 font-medium">مهارات متقدمة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تطوير مستمر ومصادر تعلم نوعية</p>
        </div>

        {/* Card 4: Approved Case Studies */}
        <div
          onClick={() => {
            setActiveCaseStudyForModal(null);
            setIsCaseStudyModalOpen(true);
          }}
          className="stat-card bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">دراسات الحالة المعتمدة</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{state.caseStudies.length}</span>
            <span className="text-[11px] text-amber-400 font-medium">قصص نجاح موثقة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">انقر لإضافة دراسة حالة جديدة</p>
        </div>
      </section>

      {/* =========================================================================
          3. Weekly Calendar Strip (التقويم الأسبوعي المتصل)
          ========================================================================= */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-slate-200">التقويم الأسبوعي المتصل (مواعيد المحتوى والمشاريع)</h2>
          </div>
          <span className="text-xs text-slate-400">السبت إلى الجمعة</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, idx) => {
            const daySchedule = state.schedule.filter((s) => s.date === day.date);
            const dayTasksCount = state.tasks.filter((t) => t.dueDate === day.date).length;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  day.isToday
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold">{day.dayNameAr}</div>
                <div className="text-base font-bold font-mono my-0.5 text-slate-200">{day.dayNumber}</div>

                <div className="flex items-center justify-center gap-1 mt-1">
                  {dayTasksCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" title={`${dayTasksCount} مهام`} />
                  )}
                  {daySchedule.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title={`${daySchedule.length} فترات زمنية`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. Task Composer, Filter Strip & Today Focus List
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Task Engine */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Task Composer */}
          <form
            onSubmit={handleQuickAdd}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="أضف مهمة جديدة، اربطها بعميل، وحدد أولويتها..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={quickClientId}
                onChange={(e) => setQuickClientId(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="">عام / يومي</option>
                {state.clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr || c.name}
                  </option>
                ))}
              </select>

              <select
                value={quickPriority}
                onChange={(e) => setQuickPriority(e.target.value as Priority)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="urgent">طارئة</option>
                <option value="high">عالية</option>
                <option value="medium">متوسطة</option>
                <option value="low">منخفضة</option>
              </select>

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition-all active:scale-95 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Filter Strip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterType('today')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'today'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                اليوم ({todayTasks.length})
              </button>
              <button
                onClick={() => setFilterType('projects')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'projects'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                مهام المشاريع
              </button>
              <button
                onClick={() => setFilterType('open')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'open'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                قيد التنفيذ
              </button>
              <button
                onClick={() => setFilterType('completed')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'completed'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                المكتملة
              </button>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-slate-700 text-slate-100 font-bold border border-slate-600'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                الكل ({state.tasks.length})
              </button>
            </div>
          </div>

          {/* Task List Items */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-10 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs">
                لا توجد مهام تطابق هذا التصنيف حالياً.
              </div>
            ) : (
              filteredTasks.map((task) => {
                const matchedClient = state.clients.find((c) => c.id === task.relatedClientId);

                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <p
                          className={`text-xs font-medium text-slate-200 truncate ${
                            task.completed ? 'line-through text-slate-500' : ''
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {matchedClient && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {matchedClient.nameAr || matchedClient.name}
                            </span>
                          )}
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                              task.priority === 'urgent'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : task.priority === 'high'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {task.priority === 'urgent'
                              ? 'طارئة'
                              : task.priority === 'high'
                              ? 'عالية'
                              : task.priority === 'medium'
                              ? 'متوسطة'
                              : 'منخفضة'}
                          </span>
                          {task.dueTime && (
                            <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              {task.dueTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors text-xs"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Client Switcher & Work Hub */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                سياقات العمل والعملاء النشطون
              </h3>
              <button
                onClick={() => setActiveTab('clients')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                إدارة الكل
              </button>
            </div>

            <div className="space-y-2">
              {state.clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setActiveTab('clients');
                  }}
                  className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {client.nameAr || client.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{client.industryAr || client.industry}</div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tip on Calm Productivity */}
          <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-4 text-xs text-slate-300 space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              قاعدة التوثيق الفوري:
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              سجل أي قرار تم الاتفاق عليه مع العميل فوراً في سجل القرارات. التوثيق هو درعك المهني الذي يحفظ وقتك وقيمتك.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. Project Command Strip & Matrix (شريط إدارة المشاريع والمصفوفة)
          ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              مصفوفة المشاريع وإدارة المخرجات (Project Matrix)
            </h2>
            <p className="text-xs text-slate-400">
              المرحلة، المشكلة، الخطوة التالية، مؤشر النجاح، والمهارة المكتسبة
            </p>
          </div>

          <button
            onClick={() => setActiveTab('clients')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all self-start sm:self-auto"
          >
            <span>إضافة وتعديل المشاريع</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                <th className="py-3 px-4">المشروع والعميل</th>
                <th className="py-3 px-4">المرحلة</th>
                <th className="py-3 px-4">المشكلة والتحدي</th>
                <th className="py-3 px-4">الخطوة التالية المباشرة</th>
                <th className="py-3 px-4">مؤشر النجاح</th>
                <th className="py-3 px-4">المهارة المكتسبة</th>
                <th className="py-3 px-4">دراسة الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {state.projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    <div>{proj.title}</div>
                    <span className="text-[10px] text-amber-400 font-normal">{proj.clientName}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        proj.stage === 'execution'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : proj.stage === 'planning'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {proj.stage === 'execution'
                        ? 'تنفيذ نشط'
                        : proj.stage === 'planning'
                        ? 'تخطيط واكتشاف'
                        : 'مكتمل'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate" title={proj.problem}>
                    {proj.problem}
                  </td>

                  <td className="py-3.5 px-4 text-amber-300 font-medium max-w-xs truncate" title={proj.nextStep}>
                    {proj.nextStep}
                  </td>

                  <td className="py-3.5 px-4 text-emerald-400 max-w-xs truncate" title={proj.successIndicator || proj.successMetric}>
                    {proj.successIndicator || proj.successMetric}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                    {proj.acquiredSkill}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => openCaseStudyForProject(proj)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-[11px] transition-all flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>باني دراسة الحالة</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
