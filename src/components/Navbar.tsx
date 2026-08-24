/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unified Morning Notebook Navbar
 */

import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Moon,
  Sun,
  Globe,
  Settings,
  Plus,
  ShieldCheck,
  Flame,
  Droplets,
  WifiOff,
  DownloadCloud,
  FileText,
  Palette,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getHijriDate, getTodayString } from '../utils/dateUtils';

export const Navbar: React.FC = () => {
  const {
    state,
    t,
    currentDate,
    updateSettings,
    setIsSettingsOpen,
    setIsQuickTaskModalOpen,
    setIsQAInspectorOpen,
    setIsDailyExportModalOpen,
    incrementWater,
    setActiveTab,
    isOnline,
    isInstallable,
    promptInstallApp,
  } = useApp();

  const todayReflection = state.dailyReflections[getTodayString()] || { waterGlasses: 0 };
  const completedTodayTasks = state.tasks.filter((t) => t.dueDate === getTodayString() && t.completed).length;
  const totalTodayTasks = state.tasks.filter((t) => t.dueDate === getTodayString()).length;

  const toggleLanguage = () => {
    const nextLang = state.settings.language === 'ar' ? 'en' : 'ar';
    updateSettings({ language: nextLang });
  };

  const toggleTheme = () => {
    const themes: Array<'paper' | 'midnight' | 'dark' | 'light' | 'emerald' | 'sunset'> = [
      'paper',
      'midnight',
      'dark',
      'light',
      'emerald',
      'sunset',
    ];
    const currentIdx = themes.indexOf(state.settings.theme as any);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    updateSettings({ theme: nextTheme });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--paper-card)]/95 backdrop-blur-md border-b border-[var(--paper-border)] px-4 lg:px-6 py-3 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--olive-dark)] to-[var(--olive)] flex items-center justify-center text-white shadow-md shadow-[var(--olive)]/20 font-bold text-lg font-serif-arabic">
              ي
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[var(--ink)] font-serif-arabic">
                  {t.appName}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--copper)]/15 text-[var(--copper)] border border-[var(--copper)]/30 font-bold font-mono">
                  v3.0 Master
                </span>
              </div>
              <p className="text-[11px] text-[var(--ink-muted)] hidden sm:block">
                منظم اليوم ومساحة العمل المهنية الهادئة
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)]">
            <Calendar className="w-3.5 h-3.5 text-[var(--copper)]" />
            <span className="font-medium">{formatDate(currentDate, state.settings.language)}</span>
            <span className="text-[var(--paper-border)]">|</span>
            <span className="text-[var(--ink-muted)]">{getHijriDate(new Date(), state.settings.language)}</span>
          </div>
        </div>

        {/* Action Widgets & Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Text Summary Quick Action */}
          <button
            onClick={() => setIsDailyExportModalOpen(true)}
            title="تصدير ملخص اليوم (.txt)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] border border-[var(--paper-border)] text-[var(--ink)] text-xs font-semibold transition-all active:scale-95 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--copper)]" />
            <span>ملخص اليوم (.txt)</span>
          </button>

          {/* Water Quick Widget */}
          <button
            onClick={() => incrementWater()}
            title={t.today.drinkGlass}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold transition-all active:scale-95"
          >
            <Droplets className="w-4 h-4" />
            <span>
              {todayReflection.waterGlasses}/{state.settings.dailyWaterGoal}
            </span>
          </button>

          {/* Today Tasks Progress */}
          {totalTodayTasks > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--olive)]/10 border border-[var(--olive)]/30 text-[var(--olive)] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedTodayTasks}/{totalTodayTasks}
              </span>
            </div>
          )}

          {/* Online / Offline Status Badge */}
          {!isOnline && (
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold animate-pulse"
              title="يعمل التطبيق بدون اتصال بالإنترنت بكامل وظائفه"
            >
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">أوفلاين (محفوظ)</span>
            </div>
          )}

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={promptInstallApp}
              title="تثبيت المنظم كتطبيق على جهازك"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--copper)] hover:bg-[var(--copper-dark)] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <DownloadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">تثبيت التطبيق</span>
            </button>
          )}

          {/* Quick Task Add Button */}
          <button
            onClick={() => setIsQuickTaskModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white text-xs font-bold shadow-md shadow-[var(--olive)]/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t.tasks.addTask}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={`تغيير المظهر (الحالي: ${state.settings.theme})`}
            className="p-2 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] border border-[var(--paper-border)] text-[var(--ink)] transition-colors"
          >
            <Palette className="w-4 h-4 text-[var(--copper)]" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="تبديل اللغة (العربية / English)"
            className="px-2.5 py-1.5 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] border border-[var(--paper-border)] text-[var(--ink)] text-xs font-bold transition-colors font-mono"
          >
            {state.settings.language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* QA Zero-Error Inspector Trigger Button */}
          <button
            onClick={() => setIsQAInspectorOpen(true)}
            title="مفتش الجودة الشامل وفحص الأخطاء (0% Bugs Report)"
            className="p-2 rounded-xl bg-[var(--olive)]/15 hover:bg-[var(--olive)]/25 border border-[var(--olive)]/30 text-[var(--olive)] transition-all active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title={t.nav.settings}
            className="p-2 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] border border-[var(--paper-border)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
