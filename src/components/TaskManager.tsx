/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Edit,
  Tag,
  Kanban,
  List,
  CheckSquare,
  AlertCircle,
  Flame,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  FileSpreadsheet,
  FileCode,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Task, Priority } from '../types';
import { formatDate, getTodayString } from '../utils/dateUtils';

export const TaskManager: React.FC = () => {
  const {
    state,
    t,
    toggleTask,
    toggleSubtask,
    deleteTask,
    setIsQuickTaskModalOpen,
    setEditingTask,
    exportTasksCSV,
    exportTasksJSON,
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = (task.description || '').toLowerCase().includes(q);
        const matchesTag = task.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // Category
      if (selectedCategory !== 'all' && task.categoryId !== selectedCategory) {
        return false;
      }

      // Priority
      if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
        return false;
      }

      // Status
      if (selectedStatus === 'active' && task.completed) return false;
      if (selectedStatus === 'completed' && !task.completed) return false;

      return true;
    });
  }, [state.tasks, searchQuery, selectedCategory, selectedPriority, selectedStatus]);

  const priorityColors: Record<Priority, string> = {
    urgent: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    high: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    medium: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    low: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
  };

  const priorityLabels: Record<Priority, string> = {
    urgent: t.tasks.priorityUrgent,
    high: t.tasks.priorityHigh,
    medium: t.tasks.priorityMedium,
    low: t.tasks.priorityLow,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.tasks.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.tasks.totalTasks}: {state.tasks.length} | {t.tasks.completedTasks}:{' '}
            {state.tasks.filter((t) => t.completed).length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl transition-all shadow-sm"
              title="تصدير المهام للنسخ الاحتياطي"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>تصدير</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isExportMenuOpen && (
              <div className="absolute end-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-30 space-y-1 animate-fadeIn">
                <button
                  onClick={() => {
                    exportTasksCSV();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div>تصدير كملف CSV</div>
                    <div className="text-[10px] text-slate-400 font-normal">جاهز لـ Excel وجداول البيانات</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    exportTasksJSON();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div>تصدير كملف JSON</div>
                    <div className="text-[10px] text-slate-400 font-normal">نسخة احتياطية برمجية كاملة</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* List vs Board Toggle */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={t.tasks.viewList}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'board'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={t.tasks.viewBoard}
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsQuickTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.tasks.addTask}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.tasks.searchPlaceholder}
              className="w-full ps-9 pe-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tasks.filterAll}
              </button>
              <button
                onClick={() => setSelectedStatus('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === 'active' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tasks.filterActive}
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === 'completed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tasks.filterCompleted}
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">{t.tasks.category}: {t.tasks.filterAll}</option>
              {state.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {state.settings.language === 'ar' ? c.nameAr : c.nameEn}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">{t.tasks.priority}: {t.tasks.filterAll}</option>
              <option value="urgent">{t.tasks.priorityUrgent}</option>
              <option value="high">{t.tasks.priorityHigh}</option>
              <option value="medium">{t.tasks.priorityMedium}</option>
              <option value="low">{t.tasks.priorityLow}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View: List or Board */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
              {t.tasks.noTasksFound}
            </div>
          ) : (
            filteredTasks.map((task) => {
              const category = state.categories.find((c) => c.id === task.categoryId);
              const isExpanded = expandedTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    task.completed
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-65'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-0.5 text-slate-400 hover:text-blue-400 transition-colors shrink-0"
                        aria-label={task.completed ? t.tasks.markIncomplete : t.tasks.markComplete}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            onClick={() => setEditingTask(task)}
                            className={`text-sm font-semibold cursor-pointer truncate ${
                              task.completed ? 'line-through text-slate-500' : 'text-slate-100 hover:text-white'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${priorityColors[task.priority]}`}
                          >
                            {priorityLabels[task.priority]}
                          </span>
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
                        </div>

                        {task.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {/* Meta Tags, Date & Subtasks Info */}
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
                          {task.dueDate && (
                            <span className="flex items-center gap-1 font-mono">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              {formatDate(task.dueDate, state.settings.language)}
                              {task.dueTime && ` • ${task.dueTime}`}
                            </span>
                          )}

                          {task.subtasks.length > 0 && (
                            <button
                              onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                              className="flex items-center gap-1 font-mono hover:text-slate-200 text-blue-400"
                            >
                              <CheckSquare className="w-3.5 h-3.5" />
                              <span>
                                {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}{' '}
                                {t.tasks.subtasks}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          {task.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Subtasks Accordion */}
                        {isExpanded && task.subtasks.length > 0 && (
                          <div className="mt-3 ps-4 border-s-2 border-slate-700/60 space-y-1.5 pt-2">
                            {task.subtasks.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center gap-2 text-xs text-slate-300"
                              >
                                <button
                                  onClick={() => toggleSubtask(task.id, sub.id)}
                                  className="text-slate-400 hover:text-emerald-400"
                                >
                                  {sub.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-4 h-4" />
                                  )}
                                </button>
                                <span className={sub.completed ? 'line-through text-slate-500' : ''}>
                                  {sub.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
                        title={t.tasks.editTask}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                        title={t.tasks.deleteTask}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'todo',
              title: state.settings.language === 'ar' ? 'مهام للبدء (To Do)' : 'To Do',
              color: 'border-blue-500/40',
              tasks: filteredTasks.filter((t) => !t.completed && (t.subtasks.length === 0 || t.subtasks.every((s) => !s.completed))),
            },
            {
              id: 'in_progress',
              title: state.settings.language === 'ar' ? 'قيد التنفيذ (In Progress)' : 'In Progress',
              color: 'border-amber-500/40',
              tasks: filteredTasks.filter((t) => !t.completed && t.subtasks.some((s) => s.completed)),
            },
            {
              id: 'completed',
              title: state.settings.language === 'ar' ? 'مكتملة (Completed)' : 'Completed',
              color: 'border-emerald-500/40',
              tasks: filteredTasks.filter((t) => t.completed),
            },
          ].map((column) => (
            <div
              key={column.id}
              className={`p-4 rounded-2xl bg-slate-900/60 border ${column.color} flex flex-col space-y-3 min-h-[400px]`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-200">{column.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {column.tasks.length}
                </span>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 space-y-2 cursor-pointer transition-all"
                    onClick={() => setEditingTask(task)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                        }`}
                      >
                        {task.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        className="text-slate-400 hover:text-emerald-400"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                      <span className={`px-1.5 py-0.5 rounded border ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>
                      {task.dueDate && <span>{task.dueDate}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
