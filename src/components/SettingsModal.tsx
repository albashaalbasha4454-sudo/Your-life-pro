/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  X,
  Download,
  Upload,
  RotateCcw,
  Volume2,
  Sparkles,
  Palette,
  Globe,
  Droplets,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  Database,
  DownloadCloud,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportBackupData, importBackupData } from '../utils/storage';

export const SettingsModal: React.FC = () => {
  const {
    state,
    t,
    isSettingsOpen,
    setIsSettingsOpen,
    updateSettings,
    resetToSampleData,
    setFullState,
    exportTasksCSV,
    exportJournalCSV,
    exportFullBackup,
    isOnline,
    isInstallable,
    promptInstallApp,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isSettingsOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importBackupData(content);
        if (result.success && result.data) {
          setFullState(result.data);
          alert(state.settings.language === 'ar' ? 'تم استيراد النسخة الاحتياطية بنجاح!' : 'Backup imported successfully!');
          setIsSettingsOpen(false);
        } else {
          alert(result.error || 'فشل استيراد النسخة الاحتياطية');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm(t.settings.resetConfirm)) {
      resetToSampleData();
      setIsSettingsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>{t.settings.title}</span>
          </h2>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>{t.settings.language}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings({ language: 'ar' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                  state.settings.language === 'ar'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                العربية (RTL)
              </button>
              <button
                onClick={() => updateSettings({ language: 'en' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                  state.settings.language === 'en'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                English (LTR)
              </button>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>{t.settings.theme}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'midnight', label: t.settings.themeMidnight, color: '#090d16' },
                { id: 'dark', label: t.settings.themeDark, color: '#1e293b' },
                { id: 'emerald', label: t.settings.themeEmerald, color: '#064e3b' },
                { id: 'sunset', label: t.settings.themeSunset, color: '#7c2d12' },
                { id: 'light', label: t.settings.themeLight, color: '#f8fafc' },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => updateSettings({ theme: th.id as any })}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                    state.settings.theme === th.id
                      ? 'border-blue-500 bg-slate-800 text-white ring-2 ring-blue-500/30'
                      : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-slate-600 shrink-0"
                    style={{ backgroundColor: th.color }}
                  />
                  <span className="truncate">{th.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Offline & App Installation Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-emerald-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-400" />
                )}
                <span className="text-xs font-bold text-slate-200">
                  {isOnline ? 'حالة الاتصال: متصل بالإنترنت' : 'حالة الاتصال: غير متصل (Offline Mode)'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                PWA Ready ⚡
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              هذا الموقع يعمل كـ Progressive Web App (PWA)، يمكنك فتحه واستخدامه وإضافة المهام والملاحظات دون الحاجة إلى إنترنت.
            </p>

            {isInstallable && (
              <button
                onClick={() => {
                  promptInstallApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg transition-all active:scale-95"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>تثبيت التطبيق على الشاشة الرئيسية (Install App)</span>
              </button>
            )}
          </div>

          {/* Sound & Confetti Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                {t.settings.sounds}
              </span>
              <input
                type="checkbox"
                checked={state.settings.enableSounds}
                onChange={(e) => updateSettings({ enableSounds: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {t.settings.confetti}
              </span>
              <input
                type="checkbox"
                checked={state.settings.enableConfetti}
                onChange={(e) => updateSettings({ enableConfetti: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Water Goal */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>{t.settings.waterGoal}</span>
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={state.settings.dailyWaterGoal}
              onChange={(e) => updateSettings({ dailyWaterGoal: Number(e.target.value) || 8 })}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          {/* Offline Backups & Export Hub */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>إدارة البيانات والنسخ الاحتياطي غير المتصل (Offline Backup)</span>
              </h3>
            </div>

            <p className="text-[11px] text-slate-400">
              يمكنك تصدير بياناتك بتنسيق CSV لفتحها في جداول Excel أو كملف JSON آمن للنسخ الاحتياطي الكامل.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={exportTasksCSV}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-start"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div>تصدير المهام (CSV)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Excel / Google Sheets</div>
                </div>
              </button>

              <button
                onClick={exportJournalCSV}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-start"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div>تصدير اليوميات (CSV)</div>
                  <div className="text-[10px] text-slate-400 font-normal">الملاحظات والتأملات اليومية</div>
                </div>
              </button>

              <button
                onClick={exportFullBackup}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 text-xs font-semibold text-indigo-200 transition-all text-start"
              >
                <FileCode className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <div>نسخة احتياطية شاملة (JSON)</div>
                  <div className="text-[10px] text-indigo-300/70 font-normal">كافة الصفحات والمهام والبيانات</div>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-start"
              >
                <Upload className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <div>{t.settings.importJson}</div>
                  <div className="text-[10px] text-slate-400 font-normal">استعادة البيانات من ملف JSON</div>
                </div>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 transition-all active:scale-95 mt-3"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.settings.resetData}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
