/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Daily Summary .txt Export Engine Modal
 */

import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Sliders,
  CheckCircle2,
  Calendar,
  Sparkles,
  Moon,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getHijriDate, getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';

export const DailyExportModal: React.FC = () => {
  const {
    state,
    t,
    isDailyExportModalOpen,
    setIsDailyExportModalOpen,
    currentDate,
    triggerConfetti,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [includeTasks, setIncludeTasks] = useState(true);
  const [includeScratchpad, setIncludeScratchpad] = useState(true);
  const [includeRestMetrics, setIncludeRestMetrics] = useState(true);
  const [includeDecisions, setIncludeDecisions] = useState(true);
  const [includeTomorrowPriorities, setIncludeTomorrowPriorities] = useState(true);

  if (!isDailyExportModalOpen) return null;

  const todayStr = currentDate || getTodayString();
  const todayReflection = state.dailyReflections[todayStr] || {
    waterGlasses: 0,
    mood: 'calm',
    sleepHours: 7.5,
    sleepQuality: 5,
    morningScratchpad: '',
    restNotes: '',
    highlights: '',
    improvements: '',
    gratitude: '',
  };

  const todayTasks = state.tasks.filter((t) => t.dueDate === todayStr);
  const completedTasks = todayTasks.filter((t) => t.completed);
  const openTasks = todayTasks.filter((t) => !t.completed);
  const decisions = state.decisions.filter((d) => d.date === todayStr);

  const formattedDate = formatDate(todayStr, state.settings.language);
  const hijriDate = getHijriDate(new Date(todayStr), state.settings.language);

  // Generate clean, human-readable text document
  let exportContent = `=================================================================\n`;
  exportContent += `             «يومي - Yawmi» | ملخص اليوم ومساحة العمل المهنية       \n`;
  exportContent += `=================================================================\n\n`;
  exportContent += `📅 التاريخ: ${formattedDate} (${hijriDate})\n`;
  exportContent += `⏱️ وقت التصدير: ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}\n\n`;

  if (includeRestMetrics) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `🛌 1. مؤشرات النوم والراحة اليومية:\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `• ساعات النوم والراحة: ${todayReflection.sleepHours || 7} ساعات\n`;
    exportContent += `• تقييم جودة النوم: ${'⭐'.repeat(todayReflection.sleepQuality || 5)} (${todayReflection.sleepQuality || 5}/5)\n`;
    if (todayReflection.restNotes) {
      exportContent += `• ملاحظات التوازن: ${todayReflection.restNotes}\n`;
    }
    exportContent += `• شرب الماء: ${todayReflection.waterGlasses}/${state.settings.dailyWaterGoal} أكواب\n\n`;
  }

  if (includeScratchpad && todayReflection.morningScratchpad) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `🧠 2. مفكرة الصباح والتفريغ الذهني:\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `${todayReflection.morningScratchpad}\n\n`;
  }

  if (includeTasks) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `✅ 3. سجل المهام المنجزة اليوم (${completedTasks.length}/${todayTasks.length}):\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    if (completedTasks.length === 0) {
      exportContent += `• لا توجد مهام مكتملة مسجلة لهذا اليوم بعد.\n`;
    } else {
      completedTasks.forEach((task, idx) => {
        exportContent += `${idx + 1}. [✔] ${task.title}\n`;
        if (task.description) {
          exportContent += `   - تفاصيل: ${task.description}\n`;
        }
      });
    }
    exportContent += `\n`;
  }

  if (includeDecisions && (decisions.length > 0 || state.decisions.length > 0)) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `⚖️ 4. القرارات الاستراتيجية المعتمدة:\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    const targetDecisions = decisions.length > 0 ? decisions : state.decisions.slice(0, 3);
    targetDecisions.forEach((dec, idx) => {
      exportContent += `${idx + 1}. [قرار] ${dec.title}\n`;
      exportContent += `   - السياق: ${dec.context}\n`;
      exportContent += `   - الأثر: ${dec.impact}\n`;
    });
    exportContent += `\n`;
  }

  if (includeTomorrowPriorities && openTasks.length > 0) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `📌 5. الأولويات والمتابعات القادمة:\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    openTasks.forEach((task, idx) => {
      exportContent += `${idx + 1}. [ ] ${task.title} (الأولوية: ${task.priority})\n`;
    });
    exportContent += `\n`;
  }

  if (todayReflection.gratitude || todayReflection.highlights) {
    exportContent += `-----------------------------------------------------------------\n`;
    exportContent += `✨ 6. التأمل والامتنان:\n`;
    exportContent += `-----------------------------------------------------------------\n`;
    if (todayReflection.gratitude) {
      exportContent += `• الامتنان: ${todayReflection.gratitude}\n`;
    }
    if (todayReflection.highlights) {
      exportContent += `• أهم إنجاز: ${todayReflection.highlights}\n`;
    }
    exportContent += `\n`;
  }

  exportContent += `=================================================================\n`;
  exportContent += `تم التوليد والتنظيم عبر تطبيق يومي (Yawmi Professional Workspace)\n`;
  exportContent += `=================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    sound.playCheck(state.settings.enableSounds);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yawmi-summary-${todayStr}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sound.playCompleteChord(state.settings.enableSounds);
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                محرك تصدير ملخص اليوم (.txt Export Engine)
              </h2>
              <p className="text-xs text-slate-400">
                تصدير ملخص هادئ ومرتب بضغطة زر لمشاركته أو حفظه في أرشيفك الشخصي
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDailyExportModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Toggles */}
        <div className="px-6 py-3 bg-slate-800/40 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-semibold me-2">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            تضمين الأقسام:
          </span>
          <button
            onClick={() => setIncludeTasks(!includeTasks)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              includeTasks
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 font-medium'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            المهام المكتملة
          </button>
          <button
            onClick={() => setIncludeScratchpad(!includeScratchpad)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              includeScratchpad
                ? 'bg-amber-600/20 border-amber-500/40 text-amber-300 font-medium'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            مفكرة الصباح
          </button>
          <button
            onClick={() => setIncludeRestMetrics(!includeRestMetrics)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              includeRestMetrics
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 font-medium'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            مؤشرات النوم والراحة
          </button>
          <button
            onClick={() => setIncludeDecisions(!includeDecisions)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              includeDecisions
                ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 font-medium'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            القرارات الاستراتيجية
          </button>
          <button
            onClick={() => setIncludeTomorrowPriorities(!includeTomorrowPriorities)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              includeTomorrowPriorities
                ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300 font-medium'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            أولويات الغد
          </button>
        </div>

        {/* Live Text Preview Box */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950/70">
          <div className="relative">
            <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 border border-slate-800 rounded-xl p-5 whitespace-pre-wrap leading-relaxed select-all">
              {exportContent}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <div className="text-xs text-slate-400">
            الملف: <span className="font-mono text-slate-200">yawmi-summary-{todayStr}.txt</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ للحافظة!' : 'نسخ النص كامل'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل المستند (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
