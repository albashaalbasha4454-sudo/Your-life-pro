/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Master Application Shell for Yawmi Organizer & Professional Workspace
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeCommandCenter } from './components/HomeCommandCenter';
import { DailyQuietOrganizer } from './components/DailyQuietOrganizer';
import { ClientHubDiscovery } from './components/ClientHubDiscovery';
import { ProfessionalFramework } from './components/ProfessionalFramework';
import { PagesStudio } from './components/PagesStudio';
import { TaskManager } from './components/TaskManager';
import { ScheduleView } from './components/ScheduleView';
import { HabitsTracker } from './components/HabitsTracker';
import { FocusTimer } from './components/FocusTimer';
import { NotesJournal } from './components/NotesJournal';
import { AnalyticsView } from './components/AnalyticsView';
import { TaskModal } from './components/TaskModal';
import { SettingsModal } from './components/SettingsModal';
import { QAReportModal } from './components/QAReportModal';
import { DailyExportModal } from './components/DailyExportModal';
import { CaseStudyModal } from './components/CaseStudyModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex flex-col font-sans selection:bg-[var(--copper)]/20 selection:text-[var(--copper-dark)]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 min-w-0 overflow-x-hidden">
          {activeTab === 'home' && <HomeCommandCenter />}
          {activeTab === 'today' && <DailyQuietOrganizer />}
          {activeTab === 'clients' && <ClientHubDiscovery />}
          {activeTab === 'framework' && <ProfessionalFramework />}
          {activeTab === 'pages' && <PagesStudio />}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'schedule' && <ScheduleView />}
          {activeTab === 'habits' && <HabitsTracker />}
          {activeTab === 'focus' && <FocusTimer />}
          {activeTab === 'journal' && <NotesJournal />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </main>
      </div>

      {/* Global Modals & Dialogs */}
      <TaskModal />
      <SettingsModal />
      <QAReportModal />
      <DailyExportModal />
      <CaseStudyModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
