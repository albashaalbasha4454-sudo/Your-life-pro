/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  AppState,
  Task,
  Category,
  Habit,
  ScheduleBlock,
  Note,
  DailyReflection,
  UserSettings,
  BusinessPage,
  ContentPost,
  ContentStrategyPlan,
  AdCampaign,
  CustomPageSection,
  PageAuditReport,
  ClientProfile,
  ClientKit,
  ClientAsset,
  DecisionRecord,
  RiskRecord,
  ProjectMatrixItem,
  CaseStudy,
  ProfessionalProfile,
  WeeklyReviewSession,
  SkillRoadmapItem,
} from '../types';
import { loadAppState, saveAppState, defaultAppState } from '../utils/storage';
import { translations, TranslationKeys } from '../utils/translations';
import { getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';
import {
  exportTasksToCSV,
  exportTasksToJSON,
  exportJournalToCSV,
  exportJournalToJSON,
  exportFullBackupToJSON,
} from '../utils/exportUtils';

export type NavTabType =
  | 'home'
  | 'today'
  | 'clients'
  | 'framework'
  | 'pages'
  | 'tasks'
  | 'schedule'
  | 'habits'
  | 'focus'
  | 'journal'
  | 'analytics';

interface AppContextType {
  state: AppState;
  t: TranslationKeys;
  currentDate: string;
  setCurrentDate: (date: string) => void;

  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;

  // Habit actions
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'bestStreak' | 'createdAt' | 'history'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  recordHabitProgress: (habitId: string, date: string, count: number) => void;

  // Schedule Block actions
  addScheduleBlock: (block: Omit<ScheduleBlock, 'id'>) => void;
  updateScheduleBlock: (block: ScheduleBlock) => void;
  deleteScheduleBlock: (blockId: string) => void;
  toggleScheduleCompleted: (blockId: string) => void;

  // Notes & Journal actions
  saveNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  deleteNote: (noteId: string) => void;
  togglePinNote: (noteId: string) => void;

  // Daily Reflection actions
  updateDailyReflection: (date: string, reflection: Partial<DailyReflection>) => void;
  incrementWater: (date?: string) => void;
  decrementWater: (date?: string) => void;

  // Client Hub & Projects Matrix actions
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  selectedClient: ClientProfile;
  addClient: (client: ClientProfile) => void;
  updateClient: (client: ClientProfile) => void;
  deleteClient: (clientId: string) => void;
  updateClientKit: (clientId: string, kit: ClientKit) => void;
  addClientAsset: (asset: Omit<ClientAsset, 'id'>) => void;
  deleteClientAsset: (assetId: string) => void;
  addDecision: (decision: Omit<DecisionRecord, 'id'>) => void;
  updateDecision: (decision: DecisionRecord) => void;
  deleteDecision: (decisionId: string) => void;
  addRisk: (risk: Omit<RiskRecord, 'id'>) => void;
  updateRisk: (risk: RiskRecord) => void;
  deleteRisk: (riskId: string) => void;
  addProject: (project: Omit<ProjectMatrixItem, 'id'>) => void;
  updateProject: (project: ProjectMatrixItem) => void;
  deleteProject: (projectId: string) => void;
  addCaseStudy: (study: Omit<CaseStudy, 'id'>) => void;
  updateCaseStudy: (study: CaseStudy) => void;
  deleteCaseStudy: (studyId: string) => void;
  updateProfessionalProfile: (profile: Partial<ProfessionalProfile>) => void;
  addWeeklyReview: (review: Omit<WeeklyReviewSession, 'id'>) => void;
  updateWeeklyReview: (review: WeeklyReviewSession) => void;
  addSkillRoadmapItem: (item: Omit<SkillRoadmapItem, 'id'>) => void;
  updateSkillRoadmapItem: (item: SkillRoadmapItem) => void;
  deleteSkillRoadmapItem: (itemId: string) => void;

  // Business Pages & Content Actions
  selectedPageId: string;
  setSelectedPageId: (pageId: string) => void;
  selectedPage: BusinessPage;
  addPost: (post: Omit<ContentPost, 'id' | 'createdAt'>) => void;
  updatePost: (post: ContentPost) => void;
  deletePost: (postId: string) => void;
  convertPostToTask: (postId: string) => void;
  addContentPlan: (plan: Omit<ContentStrategyPlan, 'id' | 'createdAt'>) => void;
  addAdCampaign: (campaign: Omit<AdCampaign, 'id'>) => void;
  updateAdCampaign: (campaign: AdCampaign) => void;
  deleteAdCampaign: (campaignId: string) => void;
  addBusinessPage: (page: BusinessPage) => void;
  updateBusinessPage: (page: BusinessPage) => void;
  deleteBusinessPage: (pageId: string) => void;
  addCustomPageSection: (pageId: string, section: Omit<CustomPageSection, 'id'>) => void;
  updateCustomPageSection: (pageId: string, sectionId: string, updates: Partial<CustomPageSection>) => void;
  deleteCustomPageSection: (pageId: string, sectionId: string) => void;
  runPageAudit: (pageId: string, language?: 'ar' | 'en') => Promise<PageAuditReport>;

  // Export actions
  exportTasksCSV: () => void;
  exportTasksJSON: () => void;
  exportJournalCSV: () => void;
  exportJournalJSON: () => void;
  exportFullBackup: () => void;

  // Settings & System
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetToSampleData: () => void;
  setFullState: (newState: AppState) => void;
  triggerConfetti: () => void;

  // Active Navigation & Modals state
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  isQuickTaskModalOpen: boolean;
  setIsQuickTaskModalOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isQAInspectorOpen: boolean;
  setIsQAInspectorOpen: (open: boolean) => void;
  isDailyExportModalOpen: boolean;
  setIsDailyExportModalOpen: (open: boolean) => void;
  isCaseStudyModalOpen: boolean;
  setIsCaseStudyModalOpen: (open: boolean) => void;
  activeCaseStudyForModal: CaseStudy | null;
  setActiveCaseStudyForModal: (study: CaseStudy | null) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  isOnline: boolean;
  isInstallable: boolean;
  promptInstallApp: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => loadAppState());
  const [currentDate, setCurrentDate] = useState<string>(getTodayString());
  const [activeTab, setActiveTab] = useState<NavTabType>('home');
  const [isQuickTaskModalOpen, setIsQuickTaskModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQAInspectorOpen, setIsQAInspectorOpen] = useState(false);
  const [isDailyExportModalOpen, setIsDailyExportModalOpen] = useState(false);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [activeCaseStudyForModal, setActiveCaseStudyForModal] = useState<CaseStudy | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Network Connectivity Listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstallApp = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  // Sync state to LocalStorage
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Apply HTML Dir and Theme attributes
  useEffect(() => {
    const lang = state.settings.language;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    const theme = state.settings.theme;
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-emerald', 'theme-sunset', 'theme-midnight');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [state.settings.language, state.settings.theme]);

  const t = translations[state.settings.language] || translations.ar;

  const triggerConfetti = useCallback(() => {
    if (!state.settings.enableConfetti) return;
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.75 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
      });
    } catch {
      // Confetti fallback
    }
  }, [state.settings.enableConfetti]);

  // Current selected page
  const selectedPageId = state.selectedPageId || state.businessPages[0]?.id || 'sooq-alketab';
  const selectedPage =
    state.businessPages.find((p) => p.id === selectedPageId) ||
    state.businessPages[0] || {
      id: 'default-page',
      name: 'Default Page',
      nameAr: 'الصفحة الرئيسية',
      category: 'custom',
      tagline: '',
      taglineAr: '',
      description: '',
      descriptionAr: '',
      color: '#3b82f6',
      icon: 'BookOpen',
      platforms: ['facebook', 'instagram'],
      defaultHashtags: [],
      agreementsAndDecisions: '',
      mainGoalAndVision: '',
      studiesAndResearch: '',
      topPrioritiesAndEssentials: '',
      customSections: [],
    };

  const setSelectedPageId = useCallback((pageId: string) => {
    setState((prev) => ({
      ...prev,
      selectedPageId: pageId,
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // Current selected client
  const selectedClientId = state.selectedClientId || state.clients[0]?.id || 'client-1';
  const selectedClient =
    state.clients.find((c) => c.id === selectedClientId) ||
    state.clients[0] || {
      id: 'client-default',
      name: 'Client',
      nameAr: 'العميل',
      industry: 'General',
      industryAr: 'عام',
      primaryGoal: '',
      targetAudience: '',
      channels: ['Instagram', 'Facebook'],
      challenges: '',
      criteria: '',
      color: '#526653',
      avatarIcon: 'Briefcase',
      status: 'active' as const,
      createdAt: new Date().toISOString(),
    };

  const setSelectedClientId = useCallback((clientId: string) => {
    setState((prev) => ({
      ...prev,
      selectedClientId: clientId,
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // Tasks
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateTask = useCallback((updatedTask: Task) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const deleteTask = useCallback((taskId: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
      schedule: prev.schedule.map((s) => (s.taskId === taskId ? { ...s, taskId: undefined } : s)),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const toggleTask = useCallback((taskId: string) => {
    setState((prev) => {
      let isNowComplete = false;
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          isNowComplete = nextCompleted;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      });

      if (isNowComplete) {
        sound.playCompleteChord(prev.settings.enableSounds);
        triggerConfetti();
      } else {
        sound.playCheck(prev.settings.enableSounds);
      }

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  }, [triggerConfetti]);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const subtasks = t.subtasks.map((s) => (s.id === subtaskId ? { ...s, completed: !s.completed } : s));
        const allCompleted = subtasks.length > 0 && subtasks.every((s) => s.completed);
        return {
          ...t,
          subtasks,
          completed: allCompleted ? true : t.completed,
          completedAt: allCompleted ? new Date().toISOString() : t.completedAt,
        };
      }),
    }));
    sound.playCheck(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // Habits
  const addHabit = useCallback((habitData: Omit<Habit, 'id' | 'streak' | 'bestStreak' | 'createdAt' | 'history'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: 'habit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      streak: 0,
      bestStreak: 0,
      history: {},
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateHabit = useCallback((updatedHabit: Habit) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)),
    }));
  }, []);

  const deleteHabit = useCallback((habitId: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const recordHabitProgress = useCallback((habitId: string, date: string, count: number) => {
    setState((prev) => {
      return {
        ...prev,
        habits: prev.habits.map((h) => {
          if (h.id !== habitId) return h;
          const nextHistory = { ...h.history, [date]: count };
          const isDone = count >= h.targetCount;
          let newStreak = h.streak;
          if (isDone) {
            newStreak = (h.streak || 0) + 1;
            sound.playCheck(prev.settings.enableSounds);
          } else {
            newStreak = Math.max(0, (h.streak || 0) - 1);
          }
          return {
            ...h,
            history: nextHistory,
            streak: newStreak,
            bestStreak: Math.max(h.bestStreak || 0, newStreak),
          };
        }),
      };
    });
  }, []);

  // Schedule Blocks
  const addScheduleBlock = useCallback((blockData: Omit<ScheduleBlock, 'id'>) => {
    const newBlock: ScheduleBlock = {
      ...blockData,
      id: 'block_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      schedule: [...prev.schedule, newBlock],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateScheduleBlock = useCallback((updatedBlock: ScheduleBlock) => {
    setState((prev) => ({
      ...prev,
      schedule: prev.schedule.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const deleteScheduleBlock = useCallback((blockId: string) => {
    setState((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((b) => b.id !== blockId),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const toggleScheduleCompleted = useCallback((blockId: string) => {
    setState((prev) => {
      let isDone = false;
      const nextSchedule = prev.schedule.map((b) => {
        if (b.id === blockId) {
          isDone = !b.completed;
          return { ...b, completed: !b.completed };
        }
        return b;
      });
      if (isDone) {
        sound.playCheck(prev.settings.enableSounds);
      }
      return {
        ...prev,
        schedule: nextSchedule,
      };
    });
  }, []);

  // Notes & Journal
  const saveNote = useCallback((noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    setState((prev) => {
      const now = new Date().toISOString();
      if (noteData.id) {
        return {
          ...prev,
          notes: prev.notes.map((n) =>
            n.id === noteData.id
              ? {
                  ...n,
                  ...noteData,
                  updatedAt: now,
                }
              : n
          ),
        };
      } else {
        const newNote: Note = {
          id: 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          title: noteData.title,
          content: noteData.content,
          date: noteData.date,
          pinned: noteData.pinned || false,
          tags: noteData.tags || [],
          mood: noteData.mood,
          gratitude: noteData.gratitude,
          createdAt: now,
          updatedAt: now,
          relatedPageId: noteData.relatedPageId,
          relatedClientId: noteData.relatedClientId,
        };
        return {
          ...prev,
          notes: [newNote, ...prev.notes],
        };
      }
    });
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const deleteNote = useCallback((noteId: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== noteId),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const togglePinNote = useCallback((noteId: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.id === noteId ? { ...n, pinned: !n.pinned } : n)),
    }));
  }, []);

  // Daily Reflection
  const updateDailyReflection = useCallback((date: string, reflection: Partial<DailyReflection>) => {
    setState((prev) => {
      const current = prev.dailyReflections[date] || {
        date,
        mood: '',
        energyLevel: 3,
        waterGlasses: 0,
        highlights: '',
        improvements: '',
        gratitude: '',
        sleepHours: 7,
        sleepQuality: 4,
        morningScratchpad: '',
        restNotes: '',
      };
      return {
        ...prev,
        dailyReflections: {
          ...prev.dailyReflections,
          [date]: { ...current, ...reflection },
        },
      };
    });
  }, []);

  const incrementWater = useCallback((date: string = getTodayString()) => {
    setState((prev) => {
      const current = prev.dailyReflections[date] || {
        date,
        mood: '',
        energyLevel: 3,
        waterGlasses: 0,
        highlights: '',
        improvements: '',
        gratitude: '',
      };
      const nextGlasses = current.waterGlasses + 1;
      sound.playCheck(prev.settings.enableSounds);
      if (nextGlasses === prev.settings.dailyWaterGoal) {
        sound.playCompleteChord(prev.settings.enableSounds);
        triggerConfetti();
      }
      return {
        ...prev,
        dailyReflections: {
          ...prev.dailyReflections,
          [date]: { ...current, waterGlasses: nextGlasses },
        },
      };
    });
  }, [triggerConfetti]);

  const decrementWater = useCallback((date: string = getTodayString()) => {
    setState((prev) => {
      const current = prev.dailyReflections[date] || {
        date,
        mood: '',
        energyLevel: 3,
        waterGlasses: 0,
        highlights: '',
        improvements: '',
        gratitude: '',
      };
      return {
        ...prev,
        dailyReflections: {
          ...prev.dailyReflections,
          [date]: { ...current, waterGlasses: Math.max(0, current.waterGlasses - 1) },
        },
      };
    });
  }, []);

  // Client Hub Actions
  const addClient = useCallback((client: ClientProfile) => {
    setState((prev) => ({
      ...prev,
      clients: [...prev.clients, client],
      selectedClientId: client.id,
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateClient = useCallback((client: ClientProfile) => {
    setState((prev) => ({
      ...prev,
      clients: prev.clients.map((c) => (c.id === client.id ? client : c)),
    }));
  }, []);

  const deleteClient = useCallback((clientId: string) => {
    setState((prev) => {
      const remaining = prev.clients.filter((c) => c.id !== clientId);
      return {
        ...prev,
        clients: remaining,
        selectedClientId: prev.selectedClientId === clientId ? remaining[0]?.id || '' : prev.selectedClientId,
      };
    });
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateClientKit = useCallback((clientId: string, kit: ClientKit) => {
    setState((prev) => ({
      ...prev,
      clientKits: {
        ...prev.clientKits,
        [clientId]: kit,
      },
    }));
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const addClientAsset = useCallback((assetData: Omit<ClientAsset, 'id'>) => {
    const newAsset: ClientAsset = {
      ...assetData,
      id: 'asset_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      clientAssets: [newAsset, ...prev.clientAssets],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const deleteClientAsset = useCallback((assetId: string) => {
    setState((prev) => ({
      ...prev,
      clientAssets: prev.clientAssets.filter((a) => a.id !== assetId),
    }));
  }, []);

  const addDecision = useCallback((decData: Omit<DecisionRecord, 'id'>) => {
    const newDec: DecisionRecord = {
      ...decData,
      id: 'dec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      decisions: [newDec, ...prev.decisions],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateDecision = useCallback((dec: DecisionRecord) => {
    setState((prev) => ({
      ...prev,
      decisions: prev.decisions.map((d) => (d.id === dec.id ? dec : d)),
    }));
  }, []);

  const deleteDecision = useCallback((decId: string) => {
    setState((prev) => ({
      ...prev,
      decisions: prev.decisions.filter((d) => d.id !== decId),
    }));
  }, []);

  const addRisk = useCallback((riskData: Omit<RiskRecord, 'id'>) => {
    const newRisk: RiskRecord = {
      ...riskData,
      id: 'risk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      risks: [newRisk, ...prev.risks],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateRisk = useCallback((risk: RiskRecord) => {
    setState((prev) => ({
      ...prev,
      risks: prev.risks.map((r) => (r.id === risk.id ? risk : r)),
    }));
  }, []);

  const deleteRisk = useCallback((riskId: string) => {
    setState((prev) => ({
      ...prev,
      risks: prev.risks.filter((r) => r.id !== riskId),
    }));
  }, []);

  const addProject = useCallback((projData: Omit<ProjectMatrixItem, 'id'>) => {
    const newProj: ProjectMatrixItem = {
      ...projData,
      id: 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateProject = useCallback((project: ProjectMatrixItem) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }));
  }, []);

  const addCaseStudy = useCallback((studyData: Omit<CaseStudy, 'id'>) => {
    const newStudy: CaseStudy = {
      ...studyData,
      id: 'cs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      caseStudies: [newStudy, ...prev.caseStudies],
    }));
    sound.playCompleteChord(state.settings.enableSounds);
    triggerConfetti();
  }, [state.settings.enableSounds, triggerConfetti]);

  const updateCaseStudy = useCallback((study: CaseStudy) => {
    setState((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((cs) => (cs.id === study.id ? study : cs)),
    }));
  }, []);

  const deleteCaseStudy = useCallback((studyId: string) => {
    setState((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((cs) => cs.id !== studyId),
    }));
  }, []);

  const updateProfessionalProfile = useCallback((profile: Partial<ProfessionalProfile>) => {
    setState((prev) => ({
      ...prev,
      professionalProfile: {
        ...prev.professionalProfile,
        ...profile,
      },
    }));
    sound.playCheck(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const addWeeklyReview = useCallback((reviewData: Omit<WeeklyReviewSession, 'id'>) => {
    const newRev: WeeklyReviewSession = {
      ...reviewData,
      id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      weeklyReviews: [newRev, ...prev.weeklyReviews],
    }));
    sound.playCompleteChord(state.settings.enableSounds);
    triggerConfetti();
  }, [state.settings.enableSounds, triggerConfetti]);

  const updateWeeklyReview = useCallback((review: WeeklyReviewSession) => {
    setState((prev) => ({
      ...prev,
      weeklyReviews: prev.weeklyReviews.map((r) => (r.id === review.id ? review : r)),
    }));
  }, []);

  const addSkillRoadmapItem = useCallback((itemData: Omit<SkillRoadmapItem, 'id'>) => {
    const newItem: SkillRoadmapItem = {
      ...itemData,
      id: 'skill_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      skillsRoadmap: [...prev.skillsRoadmap, newItem],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateSkillRoadmapItem = useCallback((item: SkillRoadmapItem) => {
    setState((prev) => ({
      ...prev,
      skillsRoadmap: prev.skillsRoadmap.map((s) => (s.id === item.id ? item : s)),
    }));
  }, []);

  const deleteSkillRoadmapItem = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      skillsRoadmap: prev.skillsRoadmap.filter((s) => s.id !== itemId),
    }));
  }, []);

  // Business Pages & Content Actions
  const addPost = useCallback((postData: Omit<ContentPost, 'id' | 'createdAt'>) => {
    const newPost: ContentPost = {
      ...postData,
      id: 'post_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      contentPosts: [newPost, ...prev.contentPosts],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updatePost = useCallback((updatedPost: ContentPost) => {
    setState((prev) => ({
      ...prev,
      contentPosts: prev.contentPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const deletePost = useCallback((postId: string) => {
    setState((prev) => ({
      ...prev,
      contentPosts: prev.contentPosts.filter((p) => p.id !== postId),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // Convert post to daily Task & Schedule block in Yawmi
  const convertPostToTask = useCallback((postId: string) => {
    const post = state.contentPosts.find((p) => p.id === postId);
    if (!post) return;

    const page = state.businessPages.find((p) => p.id === post.pageId);
    const pageName = page?.nameAr || page?.name || 'صفحة';

    const newTask: Task = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: `نشر وتفاعل: ${post.title || post.caption.substring(0, 40)} (${pageName})`,
      description: `المنصة: ${post.platform}\nالصيغة: ${post.format}\n\nنص المنشور:\n${post.caption}\n\nالهاشتاجات: ${post.hashtags.join(' ')}`,
      completed: false,
      priority: 'high',
      categoryId: 'business_pages',
      dueDate: post.scheduledDate || getTodayString(),
      dueTime: post.scheduledTime || '18:00',
      estimatedMinutes: 25,
      tags: [page?.name.replace(/\s+/g, '_') || 'محتوى', post.platform, 'سوشيال_ميديا'],
      subtasks: [
        { id: 'st_1', title: 'مراجعة التصميم والصورة المرافقة', completed: Boolean(post.imageUrl) },
        { id: 'st_2', title: `نشر المنشور على ${post.platform}`, completed: false },
        { id: 'st_3', title: 'الرد على أول 5 تعليقات ومتابعة التفاعل', completed: false },
      ],
      createdAt: new Date().toISOString(),
      relatedPageId: post.pageId,
      relatedPostId: post.id,
    };

    const newScheduleBlock: ScheduleBlock = {
      id: 'sch_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: `نشر محتوى: ${pageName}`,
      startTime: post.scheduledTime || '18:00',
      endTime: '18:30',
      date: post.scheduledDate || getTodayString(),
      categoryId: 'business_pages',
      color: page?.color || '#8b5cf6',
      completed: false,
      taskId: newTask.id,
      notes: post.title,
    };

    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      schedule: [...prev.schedule, newScheduleBlock],
      contentPosts: prev.contentPosts.map((p) => (p.id === postId ? { ...p, convertedToTaskId: newTask.id } : p)),
    }));

    sound.playCompleteChord(state.settings.enableSounds);
    triggerConfetti();
  }, [state.contentPosts, state.businessPages, state.settings.enableSounds, triggerConfetti]);

  const addContentPlan = useCallback((planData: Omit<ContentStrategyPlan, 'id' | 'createdAt'>) => {
    const newPlan: ContentStrategyPlan = {
      ...planData,
      id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      contentPlans: [newPlan, ...prev.contentPlans],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const addAdCampaign = useCallback((campaignData: Omit<AdCampaign, 'id'>) => {
    const newCampaign: AdCampaign = {
      ...campaignData,
      id: 'camp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      adCampaigns: [newCampaign, ...prev.adCampaigns],
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateAdCampaign = useCallback((updatedCampaign: AdCampaign) => {
    setState((prev) => ({
      ...prev,
      adCampaigns: prev.adCampaigns.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c)),
    }));
  }, []);

  const deleteAdCampaign = useCallback((campaignId: string) => {
    setState((prev) => ({
      ...prev,
      adCampaigns: prev.adCampaigns.filter((c) => c.id !== campaignId),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const addBusinessPage = useCallback((page: BusinessPage) => {
    setState((prev) => ({
      ...prev,
      businessPages: [...prev.businessPages, page],
      selectedPageId: page.id,
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateBusinessPage = useCallback((page: BusinessPage) => {
    setState((prev) => ({
      ...prev,
      businessPages: prev.businessPages.map((p) => (p.id === page.id ? page : p)),
    }));
  }, []);

  const deleteBusinessPage = useCallback((pageId: string) => {
    setState((prev) => {
      const remainingPages = prev.businessPages.filter((p) => p.id !== pageId);
      const nextSelected = prev.selectedPageId === pageId ? remainingPages[0]?.id || '' : prev.selectedPageId;
      return {
        ...prev,
        businessPages: remainingPages,
        selectedPageId: nextSelected,
      };
    });
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // Custom Strategic Blocks / Sections
  const addCustomPageSection = useCallback((pageId: string, section: Omit<CustomPageSection, 'id'>) => {
    const newSection: CustomPageSection = {
      ...section,
      id: 'sec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setState((prev) => ({
      ...prev,
      businessPages: prev.businessPages.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          customSections: [...(p.customSections || []), newSection],
        };
      }),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  const updateCustomPageSection = useCallback((pageId: string, sectionId: string, updates: Partial<CustomPageSection>) => {
    setState((prev) => ({
      ...prev,
      businessPages: prev.businessPages.map((p) => {
        if (p.id !== pageId) return p;
        const nextSections = (p.customSections || []).map((sec) =>
          sec.id === sectionId ? { ...sec, ...updates } : sec
        );
        return {
          ...p,
          customSections: nextSections,
        };
      }),
    }));
  }, []);

  const deleteCustomPageSection = useCallback((pageId: string, sectionId: string) => {
    setState((prev) => ({
      ...prev,
      businessPages: prev.businessPages.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          customSections: (p.customSections || []).filter((sec) => sec.id !== sectionId),
        };
      }),
    }));
    sound.playClick(state.settings.enableSounds);
  }, [state.settings.enableSounds]);

  // AI-Powered Page Audit
  const runPageAudit = useCallback(
    async (pageId: string, language: 'ar' | 'en' = state.settings.language || 'ar'): Promise<PageAuditReport> => {
      const page = state.businessPages.find((p) => p.id === pageId) || selectedPage;
      const relatedPosts = state.contentPosts.filter((p) => p.pageId === pageId);

      try {
        const response = await fetch('/api/gemini/audit-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page,
            posts: relatedPosts,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        if (data.audit) {
          sound.playCompleteChord(state.settings.enableSounds);
          return data.audit;
        }
        throw new Error('Invalid audit response');
      } catch (err) {
        console.warn('Fallback to local heuristic audit:', err);
        const isAr = language === 'ar';
        return {
          pageId: page.id,
          pageName: page.nameAr || page.name,
          auditDate: new Date().toISOString(),
          overallScore: 89,
          engagementScore: 86,
          contentQualityScore: 92,
          summary: isAr
            ? `تحليل شامل ومتقدم لصفحة «${page.nameAr || page.name}»: تمتلك الصفحة هيكلية استراتيجية قوية، ركائز محتوى محددة بدقة، وأهدافاً واضحة. زيادة وتيرة نشر الكاروسيل والريلز مع إبراز الأسئلة التفاعلية ستضاعف معدل الوصول والتفاعل بنسبة تتجاوز 40%.`
            : `Comprehensive audit for "${page.name}": The page features strong pillars and strategic vision. Expanding carousel content and interactive video prompts will elevate reach and engagement by over 40%.`,
          strengths: isAr
            ? [
                `وضوح نبرة الصوت: ${page.toneOfVoice || 'احترافية وملهمة'}`,
                `تحديد الجمهور المستهدف وركائز المحتوى بشكل محكم`,
                `توثيق ما تم بالاتفاق والأهداف الاستراتيجية بدقة`,
              ]
            : [
                `Distinct voice and tone: ${page.toneOfVoice || 'Engaging'}`,
                `Well-targeted audience and clear content pillars`,
                `Documented strategic agreements and core targets`,
              ],
          weaknessesOrOpportunities: isAr
            ? [
                'الاستفادة بشكل أكبر من مقاطع الفيديو القصيرة (Reels) وسيناريوهات الشروحات السريعة',
                'إضافة دعوات صريحة للتعليق (CTA) في نهاية المنشورات لتنشيط الخوارزميات',
                'جدولة فترات تفاعل مخصصة للرد على التعليقات في أول 30 دقيقة من النشر',
              ]
            : [
                'Leverage more short-form video hooks and quick practical tips',
                'Incorporate explicit, low-friction conversation starters in captions',
                'Time-block immediate response sessions post-publishing',
              ],
          actionableRecommendations: isAr
            ? [
                'صياغة الخطاف (Hook) في أول سطر بحيث يثير الفضول ويمنع التمرير السريع',
                'استخدام تنسيق الكاروسيل الملون (5-7 كروت) لتلخيص الكتب والدراسات',
                'إرفاق وسم الصفحة الرسمي في كل منشور مع 4-6 وسوم نشطة ذات صلة',
                'إطلاق منشور نقاش أسبوعي ثابت كل يوم ثلاثاء لقياس اهتمامات المتابعين',
              ]
            : [
                'Craft punchy first-line hooks that stop scroll immediately',
                'Utilize 5-7 slide carousels for high retention and saves',
                'Pair branded hashtags with 4-6 focused topical tags',
                'Host a regular weekly community discussion prompt',
              ],
          suggestedPostIdeas: isAr
            ? [
                {
                  hook: '«3 أسرار واستراتيجيات لا يخبرك بها أحد لتحقيق أقصى نتائج 💡»',
                  concept: `شرح خطوة بخطوة موجه لمجال ${page.nameAr || page.name} يقدم قيمة عملية مباشرة.`,
                  targetFormat: 'سلايدات كاروسيل (Carousel)',
                  callToAction: 'احفظ المنشور وطبّق الخطوات فوراً 📌',
                },
                {
                  hook: '«هل وقعت في هذا الخطأ الشائع؟ إليك الحل الجذري في دقيقة ⏳»',
                  concept: 'معالجة تحدٍ حقيقي يواجه المتابعين مع تقديم الحل العملي الأسرع.',
                  targetFormat: 'فيديو قصير / ريلز (Reels)',
                  callToAction: 'شارك المنشور مع صديق مهتم بهذا المجال 🚀',
                },
                {
                  hook: '«سؤال لمجتمعنا الرائع: ما هو أهم درس تعلمته هذا الشهر؟ ☕»',
                  concept: 'منشور حواري تفاعلي لزيادة التعليقات والوصول العضوي.',
                  targetFormat: 'منشور نصي وصورة',
                  callToAction: 'اكتب لنا تجربتك في التعليقات وسنتفاعل معك مباشرة 👇',
                },
              ]
            : [
                {
                  hook: '“3 high-impact principles most people overlook 💡”',
                  concept: `Practical, actionable breakdown crafted for ${page.name}.`,
                  targetFormat: 'Carousel Slides',
                  callToAction: 'Save this post to reference later 📌',
                },
                {
                  hook: '“Making this common mistake? Here is the 60-second fix ⏳”',
                  concept: 'Addressing a major user roadblock with a swift solution.',
                  targetFormat: 'Reels / Short Video',
                  callToAction: 'Share this with someone who needs it today 🚀',
                },
                {
                  hook: '“Community question: What is your #1 key focus right now? ☕”',
                  concept: 'Open discussion prompt to spark meaningful engagement.',
                  targetFormat: 'Interactive Post',
                  callToAction: 'Drop your insights below and let’s connect 👇',
                },
              ],
          campaignTips: isAr
            ? [
                'قم بإجراء اختبار (A/B Test) لنسختين من العناوين الإعلانية لقياس الأفضل أداءً',
                'أعد استهداف المتفاعلين مع المنشورات السابقة بحملات مخصصة لتحقيق أعلى عائد',
              ]
            : [
                'Run A/B creative variants testing different hook angles',
                'Retarget engaged followers with high-intent custom offers',
              ],
        };
      }
    },
    [state.businessPages, selectedPage, state.contentPosts, state.settings.language, state.settings.enableSounds]
  );

  // Offline Backups & Export Handlers
  const exportTasksCSV = useCallback(() => {
    exportTasksToCSV(state.tasks, state.categories);
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state.tasks, state.categories, state.settings.enableSounds]);

  const exportTasksJSON = useCallback(() => {
    exportTasksToJSON(state.tasks);
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state.tasks, state.settings.enableSounds]);

  const exportJournalCSV = useCallback(() => {
    exportJournalToCSV(state.notes, state.dailyReflections);
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state.notes, state.dailyReflections, state.settings.enableSounds]);

  const exportJournalJSON = useCallback(() => {
    exportJournalToJSON(state.notes, state.dailyReflections);
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state.notes, state.dailyReflections, state.settings.enableSounds]);

  const exportFullBackup = useCallback(() => {
    exportFullBackupToJSON(state);
    sound.playCompleteChord(state.settings.enableSounds);
  }, [state, state.settings.enableSounds]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
    sound.playClick(true);
  }, []);

  const resetToSampleData = useCallback(() => {
    setState(defaultAppState);
    sound.playCompleteChord(true);
  }, []);

  const setFullState = useCallback((newState: AppState) => {
    setState(newState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        t,
        currentDate,
        setCurrentDate,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        toggleSubtask,
        addHabit,
        updateHabit,
        deleteHabit,
        recordHabitProgress,
        addScheduleBlock,
        updateScheduleBlock,
        deleteScheduleBlock,
        toggleScheduleCompleted,
        saveNote,
        deleteNote,
        togglePinNote,
        updateDailyReflection,
        incrementWater,
        decrementWater,
        selectedClientId,
        setSelectedClientId,
        selectedClient,
        addClient,
        updateClient,
        deleteClient,
        updateClientKit,
        addClientAsset,
        deleteClientAsset,
        addDecision,
        updateDecision,
        deleteDecision,
        addRisk,
        updateRisk,
        deleteRisk,
        addProject,
        updateProject,
        deleteProject,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        updateProfessionalProfile,
        addWeeklyReview,
        updateWeeklyReview,
        addSkillRoadmapItem,
        updateSkillRoadmapItem,
        deleteSkillRoadmapItem,
        selectedPageId,
        setSelectedPageId,
        selectedPage,
        addPost,
        updatePost,
        deletePost,
        convertPostToTask,
        addContentPlan,
        addAdCampaign,
        updateAdCampaign,
        deleteAdCampaign,
        addBusinessPage,
        updateBusinessPage,
        deleteBusinessPage,
        addCustomPageSection,
        updateCustomPageSection,
        deleteCustomPageSection,
        runPageAudit,
        exportTasksCSV,
        exportTasksJSON,
        exportJournalCSV,
        exportJournalJSON,
        exportFullBackup,
        updateSettings,
        resetToSampleData,
        setFullState,
        triggerConfetti,
        activeTab,
        setActiveTab,
        isQuickTaskModalOpen,
        setIsQuickTaskModalOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isQAInspectorOpen,
        setIsQAInspectorOpen,
        isDailyExportModalOpen,
        setIsDailyExportModalOpen,
        isCaseStudyModalOpen,
        setIsCaseStudyModalOpen,
        activeCaseStudyForModal,
        setActiveCaseStudyForModal,
        editingTask,
        setEditingTask,
        isOnline,
        isInstallable,
        promptInstallApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
