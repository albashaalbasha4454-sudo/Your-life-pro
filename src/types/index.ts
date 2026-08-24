/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Master Domain Models & Type Definitions for Yawmi Organizer & Professional Workspace
 */

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type NavTabType =
  | 'home'
  | 'today'
  | 'clients'
  | 'framework'
  | 'professional'
  | 'pages'
  | 'tasks'
  | 'schedule'
  | 'habits'
  | 'focus'
  | 'journal'
  | 'analytics';

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  color: string;
  icon: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  categoryId: string;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  estimatedMinutes?: number;
  actualMinutes?: number;
  tags: string[];
  subtasks: Subtask[];
  createdAt: string;
  completedAt?: string;
  relatedPageId?: string;
  relatedPostId?: string;
  relatedClientId?: string;
  relatedProjectId?: string;
  recurring?: boolean | 'daily' | 'weekly' | 'monthly' | 'none' | string;
  focusSessionsCount?: number;
}

export interface Habit {
  id: string;
  titleEn: string;
  titleAr: string;
  frequency: 'daily' | 'weekdays' | 'weekends' | 'weekly';
  category: string;
  targetCount: number;
  unitEn?: string;
  unitAr?: string;
  color: string;
  icon: string;
  history: Record<string, number>; // date -> count
  streak: number;
  bestStreak: number;
  createdAt: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

export interface ScheduleBlock {
  id: string;
  title: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  date: string; // YYYY-MM-DD
  categoryId: string;
  color?: string;
  completed?: boolean;
  taskId?: string;
  relatedClientId?: string;
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  pinned: boolean;
  tags: string[];
  mood?: 'happy' | 'neutral' | 'sad' | 'motivated' | 'stressed' | 'calm' | '';
  gratitude?: string[] | string;
  createdAt: string;
  updatedAt: string;
  relatedPageId?: string;
  relatedClientId?: string;
}

export interface DailyReflection {
  date: string; // YYYY-MM-DD
  mood: 'happy' | 'neutral' | 'sad' | 'motivated' | 'stressed' | 'calm' | string;
  energyLevel: number; // 1-5
  waterGlasses: number; // 0-12+
  highlights: string;
  improvements: string;
  gratitude: string;
  morningScratchpad?: string; // مفكرة الصباح والتفريغ الذهني
  restNotes?: string; // ملاحظات الراحة والتوازن
  sleepHours?: number; // 4-12 hrs
  sleepQuality?: number | 'deep' | 'good' | 'average' | 'poor';
}

export interface UserSettings {
  language: 'ar' | 'en';
  theme: 'paper' | 'midnight' | 'dark' | 'light' | 'emerald' | 'sunset' | 'system';
  enableSounds: boolean;
  enableConfetti: boolean;
  defaultFocusDuration: number; // minutes, default 25
  shortBreakDuration: number; // minutes, default 5
  longBreakDuration: number; // minutes, default 15
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  dailyWaterGoal: number; // glasses, default 8
  startDayOfWeek: 0 | 6; // 0 for Sunday, 6 for Saturday
  timeFormat24h: boolean;
}

/* =========================================================================
   1. Client Hub, Projects & Financial Offer Types
   ========================================================================= */

export interface ClientProfile {
  id: string;
  name: string;
  nameAr: string;
  industry: string;
  industryAr?: string;
  primaryGoal?: string; // الهدف الأسمى
  ultimateGoal?: string;
  targetAudience: string; // الجمهور المستهدف
  channels: string[]; // القنوات المستخدمة
  challenges: string; // التحديات
  criteria?: string; // المعايير والاشتراطات
  qualityStandards?: string;
  color: string;
  avatarIcon?: string;
  status?: 'active' | 'archived' | 'lead';
  createdAt: string;
  activeProjectsCount?: number;
}

export interface PaymentMilestone {
  id: string;
  milestone?: string;
  title?: string;
  percentage?: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface ClientKit {
  id?: string;
  clientId: string;
  offerTitle?: string;
  totalOfferValue?: number;
  totalBudget?: number;
  pricingModel?: 'retainer' | 'milestone' | 'fixed_value' | 'hourly';
  currency: string;
  deliverablesScope: string[];
  paymentSchedule?: PaymentMilestone[];
  paymentMilestones?: PaymentMilestone[];
  termsAndConditions?: string;
  termsAndNotes?: string;
}

export interface ClientAsset {
  id: string;
  clientId: string;
  title: string;
  type: 'contract' | 'design' | 'copy' | 'research' | 'reference' | 'brief';
  fileSize: string;
  date: string;
  tags: string[];
  url?: string;
}

export type ClientDocument = ClientAsset;

export interface DecisionRecord {
  id: string;
  clientId?: string;
  clientName?: string;
  projectId?: string;
  title: string;
  context: string;
  impact: string;
  date: string;
  status: 'approved' | 'in_review' | 'implemented';
}

export interface RiskRecord {
  id: string;
  clientId?: string;
  clientName?: string;
  projectId?: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigationStrategy: string;
  status: 'active' | 'identified' | 'mitigating' | 'resolved';
}

export interface ProjectMatrixItem {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  stage: 'discovery' | 'planning' | 'execution' | 'in_progress' | 'review' | 'completed';
  problem: string; // المشكلة والتحدي
  nextStep: string; // الخطوة التالية
  successIndicator?: string; // مؤشر النجاح
  successMetric?: string;
  acquiredSkill?: string; // المهارة المكتسبة
  budget: number;
  currency: string;
  deadline: string;
  caseStudyId?: string;
  color?: string;
}

/* =========================================================================
   2. Professional Framework, Identity & Case Studies Types
   ========================================================================= */

export interface ProfessionalProfile {
  title?: string;
  primaryTitle?: string;
  positioningStatement: string; // بيان التموضع
  valueProposition?: string; // العرض القيمي
  idealClientDescription?: string;
  coreValuePillars?: string[];
  competitiveStrengths?: string[]; // نقاط القوة التنافسية
  coreSkills?: string[];
  keySkills?: string[]; // المهارات الأساسية
  developmentGaps?: string[]; // الفجوات التطويرية
  currentVision?: string; // الرؤية الحالية
  targetMonthlyTarget?: number; // الدخل الشهري المستهدف
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  clientId?: string;
  category?: string;
  problem: string; // المشكلة
  solution: string; // الحل
  impact?: string; // الأثر والنتائج
  impactMetrics?: string;
  lessonsLearned: string; // الدروس المستفادة
  tags?: string[];
  metricsHighlight?: string; // شريط الأرقام
  published?: boolean;
  status?: 'draft' | 'approved' | 'published';
  date: string;
}

export interface WeeklyReviewSession {
  id: string;
  dateRange?: string;
  weekNumber?: number;
  year?: number;
  wins?: string;
  achievements?: string[]; // الإنجازات
  challenges?: string;
  blockers?: string[]; // المعوقات
  lessons?: string;
  nextWeekFocus?: string;
  nextBigDecision?: string; // القرار المحوري القادم
  rating?: number;
  energyRating?: number; // 1-5
  reviewDate?: string;
  notes?: string;
}

export interface SkillRoadmapItem {
  id: string;
  skillName: string;
  category: string;
  currentLevel?: 'beginner' | 'intermediate' | 'advanced' | 'master';
  targetMastery?: number; // 0-100%
  proficiency?: number;
  targetDate?: string;
  learningResources: string[];
  actionSteps?: string[];
  status?: 'planned' | 'in_progress' | 'mastered' | 'practicing' | 'learning';
}

/* =========================================================================
   3. Business Pages & Content Strategy Types
   ========================================================================= */

export type PageCategoryType = 'ecommerce_books' | 'advertising' | 'technology' | 'custom';
export type ContentPlatform = 'facebook' | 'instagram' | 'x' | 'tiktok' | 'linkedin' | 'telegram' | 'youtube';
export type PlatformType = ContentPlatform;
export type ContentFormat = 'post' | 'carousel' | 'reel' | 'ad_copy' | 'story' | 'article' | 'video_script';
export type PostFormatType = ContentFormat;
export type ContentStatus = 'idea' | 'draft' | 'ready' | 'scheduled' | 'published';
export type PostStatusType = ContentStatus;

export interface CustomPageSection {
  id: string;
  title: string;
  content: string;
}

export interface BusinessPage {
  id: string;
  name: string;
  nameAr: string;
  category: PageCategoryType;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  color: string;
  icon: string;
  targetAudience?: string;
  toneOfVoice?: string;
  contentPillars?: string[];
  platforms: ContentPlatform[];
  defaultHashtags: string[];
  agreementsAndDecisions: string;
  mainGoalAndVision: string;
  studiesAndResearch: string;
  topPrioritiesAndEssentials: string;
  customSections?: CustomPageSection[];
}

export interface ContentPost {
  id: string;
  pageId: string;
  title: string;
  caption: string;
  format: ContentFormat;
  platform: ContentPlatform;
  status: ContentStatus;
  scheduledDate?: string;
  scheduledTime?: string;
  imageUrl?: string;
  imageNotes?: string;
  hashtags: string[];
  cta?: string;
  targetAudience?: string;
  createdAt: string;
  convertedToTaskId?: string;
}

export interface ContentStrategyPlan {
  id: string;
  pageId: string;
  title: string;
  goal: 'awareness' | 'engagement' | 'sales_conversion' | 'lead_generation' | 'community_growth';
  period: 'weekly' | 'monthly' | 'campaign';
  startDate: string;
  endDate: string;
  kpiTargets: string[];
  notes: string;
  createdAt: string;
  postIds: string[];
}

export interface AdCampaign {
  id: string;
  pageId: string;
  campaignName: string;
  objective: 'conversions' | 'traffic' | 'engagement' | 'reach' | 'lead_generation';
  budget: number;
  currency: string;
  targetAudienceDetails: string;
  adCopies: {
    variant: string;
    headline: string;
    primaryText: string;
    callToAction: string;
    angle: string;
  }[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  expectedROI?: string;
}

export interface PageAuditReport {
  pageId: string;
  pageName: string;
  auditDate: string;
  overallScore: number; // 0-100
  engagementScore: number;
  contentQualityScore: number;
  summary: string;
  strengths: string[];
  weaknessesOrOpportunities: string[];
  actionableRecommendations: string[];
  suggestedPostIdeas: {
    hook: string;
    concept: string;
    targetFormat: string;
    callToAction: string;
  }[];
  campaignTips: string[];
}

/* =========================================================================
   4. QA Diagnostics & Test Engine Types
   ========================================================================= */

export interface QATestResult {
  id: string;
  name: string;
  category: 'storage' | 'memory' | 'security' | 'accessibility' | 'ui_ux' | 'logic';
  status: 'passed' | 'failed' | 'warning';
  details: string;
  durationMs: number;
}

/* =========================================================================
   Global App State Shape
   ========================================================================= */

export interface AppState {
  tasks: Task[];
  categories: Category[];
  habits: Habit[];
  schedule: ScheduleBlock[];
  notes: Note[];
  dailyReflections: Record<string, DailyReflection>;
  settings: UserSettings;

  // Client Hub & Projects
  clients: ClientProfile[];
  clientKits: Record<string, ClientKit> | ClientKit[];
  clientAssets: ClientAsset[];
  decisions: DecisionRecord[];
  risks: RiskRecord[];
  projects: ProjectMatrixItem[];

  // Professional Framework
  caseStudies: CaseStudy[];
  professionalProfile: ProfessionalProfile;
  weeklyReviews: WeeklyReviewSession[];
  skillsRoadmap: SkillRoadmapItem[];

  // Pages & Content
  businessPages: BusinessPage[];
  contentPosts: ContentPost[];
  contentPlans: ContentStrategyPlan[];
  adCampaigns: AdCampaign[];
  selectedPageId: string;
  selectedClientId: string;
}
