/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, Category, Note, DailyReflection, AppState } from '../types';

/**
 * Downloads a file to the user's browser with proper UTF-8 BOM encoding
 */
export const downloadFile = (content: string, fileName: string, contentType: string) => {
  // Add UTF-8 BOM (\uFEFF) for CSVs so Excel / Google Sheets display Arabic and special characters properly
  const bom = contentType.includes('csv') ? '\uFEFF' : '';
  const blob = new Blob([bom + content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Escape CSV field to prevent formula injection and handle commas/newlines
 */
const escapeCSV = (field: any): string => {
  if (field === null || field === undefined) return '""';
  let str = String(field);
  // Prevent CSV Formula Injection
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  // Replace internal quotes with double quotes
  str = str.replace(/"/g, '""');
  return `"${str}"`;
};

/**
 * Exports tasks as CSV
 */
export const exportTasksToCSV = (tasks: Task[], categories: Category[] = []) => {
  const categoryMap = new Map(categories.map((c) => [c.id, c.nameAr || c.nameEn]));

  const headers = [
    'المعرف (ID)',
    'عنوان المهمة (Title)',
    'الحالة (Completed)',
    'الأولوية (Priority)',
    'التصنيف (Category)',
    'تاريخ الاستحقاق (Due Date)',
    'وقت الاستحقاق (Due Time)',
    'الوقت المقدر بالدقائق (Estimated Min)',
    'الوقت الفعلي بالدقائق (Actual Min)',
    'الوسوم (Tags)',
    'المهام الفرعية (Subtasks)',
    'التكرار (Recurring)',
    'جلسات التركيز (Focus Sessions)',
    'تفاصيل وملاحظات (Description)',
    'تاريخ الإنشاء (Created At)',
    'تاريخ الإنجاز (Completed At)',
  ];

  const rows = tasks.map((task) => {
    const subtasksText = task.subtasks
      ? task.subtasks.map((s) => `${s.completed ? '[✓]' : '[ ]'} ${s.title}`).join(' | ')
      : '';

    return [
      escapeCSV(task.id),
      escapeCSV(task.title),
      escapeCSV(task.completed ? 'مكتملة (Completed)' : 'قيد التنفيذ (Pending)'),
      escapeCSV(task.priority),
      escapeCSV(categoryMap.get(task.categoryId) || task.categoryId),
      escapeCSV(task.dueDate),
      escapeCSV(task.dueTime || ''),
      escapeCSV(task.estimatedMinutes || 0),
      escapeCSV(task.actualMinutes || 0),
      escapeCSV(task.tags ? task.tags.join(', ') : ''),
      escapeCSV(subtasksText),
      escapeCSV(task.recurring || 'none'),
      escapeCSV(task.focusSessionsCount || 0),
      escapeCSV(task.description || ''),
      escapeCSV(task.createdAt),
      escapeCSV(task.completedAt || ''),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(csvContent, `yawmi_tasks_backup_${dateStr}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Exports tasks as formatted JSON
 */
export const exportTasksToJSON = (tasks: Task[]) => {
  const jsonContent = JSON.stringify(tasks, null, 2);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(jsonContent, `yawmi_tasks_backup_${dateStr}.json`, 'application/json;charset=utf-8;');
};

/**
 * Exports journal notes and daily reflections as CSV
 */
export const exportJournalToCSV = (notes: Note[], dailyReflections: Record<string, DailyReflection> = {}) => {
  const noteHeaders = [
    'النوع (Type)',
    'التاريخ (Date)',
    'العنوان (Title)',
    'المحتوى / التفاصيل (Content)',
    'المزاج (Mood)',
    'الوسوم (Tags)',
    'الامتنان (Gratitude)',
    'مثبتة (Pinned)',
    'تاريخ الإنشاء (Created At)',
  ];

  const noteRows = notes.map((note) => {
    return [
      escapeCSV('ملاحظة / يومية (Note)'),
      escapeCSV(note.date),
      escapeCSV(note.title),
      escapeCSV(note.content),
      escapeCSV(note.mood || ''),
      escapeCSV(note.tags ? note.tags.join(', ') : ''),
      escapeCSV(note.gratitude ? note.gratitude.join(' | ') : ''),
      escapeCSV(note.pinned ? 'نعم' : 'لا'),
      escapeCSV(note.createdAt),
    ].join(',');
  });

  // Reflection Rows
  const reflectionRows = Object.values(dailyReflections).map((ref) => {
    return [
      escapeCSV('تأمل يومي (Daily Reflection)'),
      escapeCSV(ref.date),
      escapeCSV(`تأمل يوم ${ref.date}`),
      escapeCSV(`الإنجازات: ${ref.highlights || ''} | فرص التحسين: ${ref.improvements || ''}`),
      escapeCSV(ref.mood || ''),
      escapeCSV(`طاقة: ${ref.energyLevel || 0}/5 | ماء: ${ref.waterGlasses || 0}`),
      escapeCSV(ref.gratitude || ''),
      escapeCSV('لا'),
      escapeCSV(ref.date),
    ].join(',');
  });

  const csvContent = [noteHeaders.join(','), ...noteRows, ...reflectionRows].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(csvContent, `yawmi_journal_backup_${dateStr}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Exports journal notes and reflections as formatted JSON
 */
export const exportJournalToJSON = (notes: Note[], dailyReflections: Record<string, DailyReflection> = {}) => {
  const payload = {
    notes,
    dailyReflections,
    exportedAt: new Date().toISOString(),
  };
  const jsonContent = JSON.stringify(payload, null, 2);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(jsonContent, `yawmi_journal_backup_${dateStr}.json`, 'application/json;charset=utf-8;');
};

/**
 * Full Complete App State JSON Backup
 */
export const exportFullBackupToJSON = (state: AppState) => {
  const jsonContent = JSON.stringify(state, null, 2);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(jsonContent, `yawmi_full_system_backup_${dateStr}.json`, 'application/json;charset=utf-8;');
};
