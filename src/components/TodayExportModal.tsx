/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Today Summary Text Exporter (.txt Engine with Live Preview & Section Filters)
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Sparkles,
  CheckSquare,
  Moon,
  PenTool,
  Scale,
  Briefcase,
  Heart,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TodayExportModal: React.FC = () => {
  const { isTodayExportModalOpen, setIsTodayExportModalOpen, exportTodaySummaryText, downloadTodaySummaryText } = useApp();

  const [includeTasks, setIncludeTasks] = useState(true);
  const [includeScratchpad, setIncludeScratchpad] = useState(true);
  const [includeSleep, setIncludeSleep] = useState(true);
  const [includeDecisions, setIncludeDecisions] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeGratitude, setIncludeGratitude] = useState(true);
  const [copied, setCopied] = useState(false);

  const previewText = useMemo(() => {
    return exportTodaySummaryText({
      tasks: includeTasks,
      scratchpad: includeScratchpad,
      sleep: includeSleep,
      decisions: includeDecisions,
      projects: includeProjects,
      gratitude: includeGratitude,
    });
  }, [exportTodaySummaryText, includeTasks, includeScratchpad, includeSleep, includeDecisions, includeProjects, includeGratitude]);

  if (!isTodayExportModalOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = () => {
    downloadTodaySummaryText(previewText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--paper-card)] border border-[var(--paper-border)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--paper-border)] flex items-center justify-between bg-[var(--paper-2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--copper)]/15 text-[var(--copper)] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic">
                محرك تصدير ملخص اليوم (.txt)
              </h2>
              <p className="text-xs text-[var(--ink-muted)]">
                تصدير ومشاركة إنجازك اليومي، الملاحظات، وقرارات العمل كنص منسق ونقي.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTodayExportModalOpen(false)}
            className="p-2 rounded-xl text-[var(--ink-muted)] hover:bg-[var(--paper-border)]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filters */}
        <div className="p-4 border-b border-[var(--paper-border)] bg-[var(--paper)]">
          <div className="text-xs font-bold text-[var(--ink-muted)] mb-2.5">
            تخصيص الأقسام المضمنة في التقرير:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeTasks}
                onChange={(e) => setIncludeTasks(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <CheckSquare className="w-3.5 h-3.5 text-[var(--olive)]" />
              <span>إنجاز المهام</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeScratchpad}
                onChange={(e) => setIncludeScratchpad(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <PenTool className="w-3.5 h-3.5 text-[var(--copper)]" />
              <span>مفكرة الصباح</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeSleep}
                onChange={(e) => setIncludeSleep(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>جودة وساعات النوم</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeDecisions}
                onChange={(e) => setIncludeDecisions(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <Scale className="w-3.5 h-3.5 text-[var(--olive-dark)]" />
              <span>سجل القرارات</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeProjects}
                onChange={(e) => setIncludeProjects(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <Briefcase className="w-3.5 h-3.5 text-[var(--copper)]" />
              <span>مصفوفة المشاريع</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs font-medium text-[var(--ink)] cursor-pointer hover:border-[var(--olive)] transition-colors">
              <input
                type="checkbox"
                checked={includeGratitude}
                onChange={(e) => setIncludeGratitude(e.target.checked)}
                className="accent-[var(--olive)] rounded"
              />
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>الامتنان والإنجاز</span>
            </label>
          </div>
        </div>

        {/* Live Monospaced Text Preview */}
        <div className="p-4 flex-1 overflow-y-auto bg-[var(--paper-2)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--ink-muted)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--copper)]" />
              المعاينة الحية للملف النصي:
            </span>
            <span className="text-[11px] text-[var(--ink-faint)]">
              {previewText.split('\n').length} سطراً | {previewText.length} حرفاً
            </span>
          </div>
          <pre className="p-4 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-[var(--ink)] font-mono text-xs leading-relaxed whitespace-pre-wrap select-all shadow-inner overflow-x-auto">
            {previewText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[var(--paper-border)] bg-[var(--paper)] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--paper-border)] bg-[var(--paper-card)] text-[var(--ink)] hover:bg-[var(--paper-2)] font-semibold text-xs transition-all active:scale-95 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[var(--copper)]" />}
            <span>{copied ? 'تم النسخ للحافظة! 📋' : 'نسخ النص'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTodayExportModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-[var(--ink-muted)] hover:bg-[var(--paper-border)]/50 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white font-bold text-xs shadow-md shadow-[var(--olive)]/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل ملف النص (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
