/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unified Morning Notebook Sidebar Navigation
 */

import React from 'react';
import {
  Home,
  CalendarDays,
  Users,
  Award,
  Layers,
  CheckSquare,
  Clock,
  Flame,
  Hourglass,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Compass,
} from 'lucide-react';
import { useApp, NavTabType } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, state, setIsQAInspectorOpen } = useApp();

  const primaryWorkspaces: Array<{ id: NavTabType; label: string; icon: any; badge?: number | null; copper?: boolean }> = [
    { id: 'home', label: 'الرئيسية والقيادة', icon: Home },
    { id: 'today', label: 'المنظم اليومي', icon: CalendarDays, copper: true },
    { id: 'clients', label: 'ملف العميل والحقيبة', icon: Users, badge: state.clients.length },
    { id: 'framework', label: 'الهوية المهنية والنمو', icon: Compass, badge: state.caseStudies.length },
  ];

  const toolsModules: Array<{ id: NavTabType; label: string; icon: any; badge?: number | null }> = [
    { id: 'pages', label: 'استوديو المحتوى والصفحات', icon: Layers, badge: state.contentPosts.length },
    { id: 'tasks', label: t.nav.tasks, icon: CheckSquare, badge: state.tasks.filter((t) => !t.completed).length },
    { id: 'schedule', label: t.nav.schedule, icon: Clock, badge: state.schedule.length },
    { id: 'habits', label: t.nav.habits, icon: Flame, badge: state.habits.length },
    { id: 'focus', label: t.nav.focus, icon: Hourglass },
    { id: 'journal', label: t.nav.journal, icon: BookOpen, badge: state.notes.length },
    { id: 'analytics', label: t.nav.analytics, icon: BarChart3 },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--paper-card)] border-e border-[var(--paper-border)] p-4 shrink-0 shadow-sm">
        {/* Workspaces Section */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] px-3 mb-2">
            مساحات العمل الأربعة
          </div>
          {primaryWorkspaces.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--olive)] text-white shadow-md shadow-[var(--olive)]/20'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.copper ? 'text-[var(--copper)]' : 'text-[var(--olive)]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge !== null && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-[var(--olive-dark)] text-white'
                        : 'bg-[var(--paper-2)] text-[var(--ink-muted)] border border-[var(--paper-border)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tools & Modules Section */}
        <div className="space-y-1 mt-6 pt-4 border-t border-[var(--paper-border)]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] px-3 mb-2">
            الأدوات والمنظم
          </div>
          {toolsModules.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--olive)] text-white font-bold shadow-md shadow-[var(--olive)]/20'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--ink-muted)]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge !== null && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-[var(--olive-dark)] text-white'
                        : 'bg-[var(--paper-2)] text-[var(--ink-muted)] border border-[var(--paper-border)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* QA Inspector Card at Bottom of Desktop Sidebar */}
        <div className="mt-auto pt-4 border-t border-[var(--paper-border)]">
          <div
            onClick={() => setIsQAInspectorOpen(true)}
            className="p-3 rounded-xl bg-gradient-to-br from-[var(--paper-2)] to-[var(--paper-card)] border border-[var(--olive)]/30 hover:border-[var(--olive)] cursor-pointer transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[var(--olive)]/15 text-[var(--olive)]">
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[var(--ink)] truncate">
                  {t.nav.qaInspection}
                </div>
                <div className="text-[10px] text-[var(--olive)] font-medium truncate flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  0% Errors Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--paper-card)]/95 backdrop-blur-xl border-t border-[var(--paper-border)] px-2 py-1 flex items-center justify-between overflow-x-auto no-scrollbar shadow-2xl safe-area-bottom">
        {[...primaryWorkspaces, ...toolsModules.slice(0, 4)].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-[10px] font-semibold transition-all relative shrink-0 active:scale-95 ${
                isActive ? 'text-[var(--olive)] font-bold bg-[var(--olive)]/10' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4 mb-0.5" />
                {item.badge !== undefined && item.badge !== null && item.badge > 0 && (
                  <span className="absolute -top-1 -end-2 w-3.5 h-3.5 bg-[var(--copper)] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="truncate text-[10px] leading-tight mt-0.5">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-0.5 w-4 h-0.5 bg-[var(--olive)] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
