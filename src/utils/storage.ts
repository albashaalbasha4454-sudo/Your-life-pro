/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Robust, Sanitized LocalStorage Manager with Business Pages, Client Hub & Professional Framework
 */

import {
  AppState,
  Category,
  Task,
  Habit,
  ScheduleBlock,
  Note,
  UserSettings,
  BusinessPage,
  ContentPost,
  ContentStrategyPlan,
  AdCampaign,
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
import { getTodayString } from './dateUtils';

const STORAGE_KEY = 'yawmi_organizer_v3';

export const initialCategories: Category[] = [
  { id: 'work', nameEn: 'Work & Clients', nameAr: 'العمل والعملاء', color: '#526653', icon: 'Briefcase' },
  { id: 'business_pages', nameEn: 'Pages & Content', nameAr: 'إدارة الصفحات والمحتوى', color: '#b97952', icon: 'Layers' },
  { id: 'personal', nameEn: 'Personal & Rest', nameAr: 'شخصي ونوم وراحة', color: '#10b981', icon: 'User' },
  { id: 'health', nameEn: 'Health & Wellness', nameAr: 'الصحة والرياضة', color: '#ef4444', icon: 'HeartPulse' },
  { id: 'learning', nameEn: 'Skills & Growth', nameAr: 'المهارات والنمو المهني', color: '#6366f1', icon: 'GraduationCap' },
  { id: 'marketing', nameEn: 'Offers & Campaigns', nameAr: 'العروض والحملات', color: '#f59e0b', icon: 'Megaphone' },
];

export const initialClients: ClientProfile[] = [
  {
    id: 'client-1',
    name: 'sooq alketab',
    nameAr: 'مؤسسة سوق الكتاب',
    industry: 'E-commerce & Publishing',
    industryAr: 'التجارة الإلكترونية والنشر الأدبي',
    primaryGoal: 'بناء مجتمع قراء نشط ومضاعفة مبيعات الروايات والكتب الفكرية في العالم العربي.',
    targetAudience: 'القراء العرب، طلاب الجامعات، الباحثين، ومحبي الروايات من عمر 16-45 سنة.',
    channels: ['Instagram', 'Facebook', 'X', 'TikTok', 'Telegram'],
    challenges: 'ارتفاع تكلفة الاستحواذ على المشترين الجدد وتذبذب وتيرة التفاعل في غير مواسم المعارض.',
    criteria: 'عائد على الإنفاق ROAS لا يقل عن 3.5x، وتفاعل عضوي مستدام لا يقل عن 8% لكل منشور.',
    color: '#526653',
    avatarIcon: 'BookOpen',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'client-2',
    name: 'Madar Consulting',
    nameAr: 'منصة مدار للاستشارات',
    industry: 'Business Advisory',
    industryAr: 'الاستشارات الإدارية والتحول الرقمي',
    primaryGoal: 'إعادة التموضع كجهة قيادية في حلول الأتمتة واستقطاب 10 عقود مؤسسية سنوية.',
    targetAudience: 'الرؤساء التنفيذيون ومدراء العمليات في الشركات المتوسطة والصاعدة.',
    channels: ['LinkedIn', 'Newsletter', 'Webinar Series'],
    challenges: 'صعوبة تبسيط المفاهيم المعقدة وطول دورة إغلاق الصفقات (B2B Sales Cycle).',
    criteria: 'إنتاج دراسات حالة موثقة ذات عائد مالي مثبت وتقديم ملخصات أسبوعية فائقة الدقة.',
    color: '#b97952',
    avatarIcon: 'Briefcase',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'client-3',
    name: 'Aleph Academy',
    nameAr: 'أكاديمية ألف للتعليم الرقمي',
    industry: 'EdTech',
    industryAr: 'التقنيات التعليمية والتدريب عن بعد',
    primaryGoal: 'إطلاق مسار الدبلوم المهني الجديد وتحقيق 500 مشترك في الدفعة الأولى.',
    targetAudience: 'الخريجون الجدد والمحترفون الساعون لتغيير مسارهم المهني.',
    channels: ['YouTube', 'Meta Ads', 'Email Funnels'],
    challenges: 'معدل إكمال الدورات التدريبية واكتساب ثقة الباحثين عن عمل.',
    criteria: 'نسبة رضا الطلاب تتجاوز 92% ومعدل التحويل من الورش المجانية 14%.',
    color: '#06b6d4',
    avatarIcon: 'GraduationCap',
    status: 'pipeline',
    createdAt: new Date().toISOString(),
  },
];

export const initialClientKits: Record<string, ClientKit> = {
  'client-1': {
    clientId: 'client-1',
    totalOfferValue: 4800,
    currency: '$',
    paymentSchedule: [
      { id: 'pay-1', milestone: 'الدفعة الأولى: انطلاق التخطيط وضبط الهوية التحريرية', percentage: 40, amount: 1920, dueDate: getTodayString(), status: 'paid' },
      { id: 'pay-2', milestone: 'الدفعة الثانية: تسليم حزمة إعلانات الشهر الأول وبناء الفانل', percentage: 35, amount: 1680, dueDate: '2026-09-15', status: 'pending' },
      { id: 'pay-3', milestone: 'الدفعة النهائية: تقرير الأداء النهائي وتسليم دراسة الحالة', percentage: 25, amount: 1200, dueDate: '2026-10-01', status: 'pending' },
    ],
    deliverablesScope: [
      'إدارة وتخطيط وجدولة 24 منشوراً شهرياً مع قوالب كاروسيل احترافية',
      'صياغة وإطلاق 4 حملات إعلانية ممولة مع اختبارات A/B واستهداف متقدم',
      'جلسة مراجعة استراتيجية أسبوعية وتوثيق كافة القرارات في سجل مخصص',
      'صياغة دراسة حالة مهنية موثقة بالأرقام في نهاية الربع',
    ],
    termsAndConditions: 'يتم تسليم المواد التحريرية قبل 48 ساعة من موعد النشر. التعديلات مشمولة حتى جولتين لكل منشور.',
  },
  'client-2': {
    clientId: 'client-2',
    totalOfferValue: 6500,
    currency: '$',
    paymentSchedule: [
      { id: 'pay-4', milestone: 'الدفعة المقدمة: جلسة الاكتشاف وصياغة ورقة التموضع', percentage: 50, amount: 3250, dueDate: getTodayString(), status: 'paid' },
      { id: 'pay-5', milestone: 'الدفعة الختامية: تسليم الدليل التنفيذي وحقيبة العميل', percentage: 50, amount: 3250, dueDate: '2026-09-30', status: 'pending' },
    ],
    deliverablesScope: [
      'إعادة صياغة العرض القيمي ورسائل التموضع الاستشاري لـ LinkedIn',
      'تصميم وبناء 3 دراسات حالة عميقة للعملاء السابقين',
      'إعداد حقيبة العميل (Client Kit) ونماذج تسعير الخدمات المتقدمة',
    ],
    termsAndConditions: 'جميع حقوق الملكية الفكرية تنتقل للعميل بعد سداد الدفعة الختامية بالكامل.',
  },
};

export const initialClientAssets: ClientAsset[] = [
  {
    id: 'asset-1',
    clientId: 'client-1',
    title: 'عقد تقديم الخدمات الاستشارية وإدارة المحتوى 2026',
    type: 'contract',
    fileSize: '1.4 MB',
    date: getTodayString(),
    linkUrl: '#',
    tags: ['عقد_معتمد', 'اتفاقية', 'نطاق_العمل'],
  },
  {
    id: 'asset-2',
    clientId: 'client-1',
    title: 'دليل الهوية البصرية ونبرة الصوت التحريرية (Brand Guidelines)',
    type: 'design',
    fileSize: '8.2 MB',
    date: getTodayString(),
    linkUrl: '#',
    tags: ['هوية', 'ألوان', 'نبرة_الصوت'],
  },
  {
    id: 'asset-3',
    clientId: 'client-1',
    title: 'مصفوفة الكوبي رايتينغ وصيغ الإعلانات الرابحة (Copy Deck)',
    type: 'copy',
    fileSize: '420 KB',
    date: getTodayString(),
    linkUrl: '#',
    tags: ['إعلانات', 'كوبي_رايتينغ', 'A/B_Testing'],
  },
  {
    id: 'asset-4',
    clientId: 'client-2',
    title: 'مستند مخرجات ورشة الاكتشاف وتشخيص التحديات (Discovery Brief)',
    type: 'brief',
    fileSize: '950 KB',
    date: getTodayString(),
    linkUrl: '#',
    tags: ['تشخيص', 'اكتشاف', 'استراتيجية'],
  },
];

export const initialDecisions: DecisionRecord[] = [
  {
    id: 'dec-1',
    clientId: 'client-1',
    clientName: 'مؤسسة سوق الكتاب',
    title: 'اعتماد تنسيق الكاروسيل ذو الـ 6 شرائح كركيزة أولى على إنستغرام',
    context: 'أظهرت التجارب أن الكاروسيل يحقق معدل حفظ (Saves) أعلى بـ 3 أضعاف مقارنة بالمنشورات الفردية، مما يحفز خوارزميات الاستكشاف.',
    date: getTodayString(),
    impact: 'مضاعفة الوصول العضوي بنسبة 45% وتخفيض الاعتماد على الإعلانات الممولة.',
    status: 'approved',
  },
  {
    id: 'dec-2',
    clientId: 'client-1',
    clientName: 'مؤسسة سوق الكتاب',
    title: 'تخصيص ميزانية منفصلة لحملات إعادة الاستهداف (Retargeting) للمهتمين بالكتب الفكرية',
    context: 'جمهور الكتب الفكرية يحتاج نقاط اتصال متعددة قبل اتخاذ قرار الشراء.',
    date: getTodayString(),
    impact: 'رفع معدل التحويل (Conversion Rate) من 1.8% إلى 4.2%.',
    status: 'approved',
  },
  {
    id: 'dec-3',
    clientId: 'client-2',
    clientName: 'منصة مدار للاستشارات',
    title: 'إلغاء المنشورات العامة والتركيز حصرياً على دراسات الحالة التحليلية',
    context: 'صناع القرار في الشركات B2B لا يتفاعلون مع النصائح السطحية، بل يبحثون عن إثبات العائد على الاستثمار.',
    date: getTodayString(),
    impact: 'استقطاب 3 استفسارات مباشرة من رؤساء شركات خلال الأسبوع الأول.',
    status: 'implemented',
  },
];

export const initialRisks: RiskRecord[] = [
  {
    id: 'risk-1',
    clientId: 'client-1',
    clientName: 'مؤسسة سوق الكتاب',
    title: 'تأخر تسليم تصاميم البنرات من المصمم الخارجي قبل مواسم العروض',
    severity: 'medium',
    mitigationStrategy: 'بناء مخزون قوالب Figma جاهزة مسبقاً وتجهيز تصاميم بديلة قابلة للتعديل السريع.',
    status: 'mitigated',
  },
  {
    id: 'risk-2',
    clientId: 'client-1',
    clientName: 'مؤسسة سوق الكتاب',
    title: 'تذبذب تكلفة الإعلانات الممولة (CPM) أثناء مواسم المنافسة الشرسة',
    severity: 'high',
    mitigationStrategy: 'تنشيط القائمة البريدية وقناة تيليجرام للوصول المباشر بدون تكلفة إعلانية.',
    status: 'active',
  },
  {
    id: 'risk-3',
    clientId: 'client-2',
    clientName: 'منصة مدار للاستشارات',
    title: 'صعوبة الحصول على موافقة عملاء مدار لنشر أرقام دراسات الحالة علناً',
    severity: 'medium',
    mitigationStrategy: 'استخدام صيغة دراسة الحالة مجهولة الاسم (Anonymized Case Study) مع الحفاظ على دقة الأرقام والنسب.',
    status: 'resolved',
  },
];

export const initialProjects: ProjectMatrixItem[] = [
  {
    id: 'proj-1',
    clientId: 'client-1',
    clientName: 'سوق الكتاب',
    title: 'إطلاق حملة باقات التوفير الكبرى ومجتمع القراء 2026',
    stage: 'execution',
    problem: 'انخفاض معدل تكرار الشراء في الربع السابق وتشتت الرسائل الإعلانية.',
    nextStep: 'مراجعة أداء النسخة A/B للإعلان وإطلاق تحدي القراءة الأسبوعي.',
    successIndicator: 'تحقيق 350 طلباً ومعدل ROAS يتجاوز 3.5x وتفاعل 1200 قارئ.',
    acquiredSkill: 'هندسة العروض التي لا تقاوم وإدارة التدفقات التحريرية المتعددة.',
    budget: 2500,
    currency: '$',
    deadline: getTodayString(),
    caseStudyId: 'cs-1',
    progressPercent: 75,
  },
  {
    id: 'proj-2',
    clientId: 'client-2',
    clientName: 'منصة مدار',
    title: 'إعادة هندسة العرض القيمي وبناء منظومة دراسات الحالة B2B',
    stage: 'planning',
    problem: 'عدم وضوح القيمة المضافة للمستشارين وفقدان الصفقات الكبرى لصالح شركات أجنبية.',
    nextStep: 'إجراء مقابلة الاكتشاف الثانية مع الشريك الإداري لتوثيق المشروع الأخير.',
    successIndicator: 'اعتماد ورقة التموضع الرسمية وإغلاق عقدين استشاريين جديدين.',
    acquiredSkill: 'كتابة دراسات الحالة المؤسسية وإتقان تسعير الخدمات المبني على القيمة (Value-based Pricing).',
    budget: 4000,
    currency: '$',
    deadline: '2026-09-20',
    caseStudyId: 'cs-2',
    progressPercent: 40,
  },
  {
    id: 'proj-3',
    clientId: 'client-3',
    clientName: 'أكاديمية ألف',
    title: 'تصميم فانل الإطلاق للبرنامج التدريبي المتخصص',
    stage: 'discovery',
    problem: 'تسرب الطلاب المحتملين في صفحة الدفع وضعف الخطاف الإعلاني الأولي.',
    nextStep: 'تحليل رحلة العميل وصياغة 5 خطافات تسويقية بديلة لاختبارها.',
    successIndicator: 'رفع معدل التحويل لصفحة التسجيل بنسبة 30%.',
    acquiredSkill: 'تحليل سلوك المستخدمين وبناء صفحات الهبوط عالية الإقناع.',
    budget: 1800,
    currency: '$',
    deadline: '2026-10-05',
    progressPercent: 20,
  },
];

export const initialCaseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'كيف نجحنا في رفع مبيعات سوق الكتاب بنسبة 140% عبر محتوى الكاروسيل العضوي والعروض المجمعة',
    clientName: 'مؤسسة سوق الكتاب',
    category: 'التجارة الإلكترونية والتسويق بالمحتوى',
    problem: 'كانت منصة سوق الكتاب تعتمد بشكل مفرط على الإعلانات الممولة بتكلفة مرتفعة، مع ضعف التفاعل العضوي على إنستغرام وتذبذب المبيعات الشهرية.',
    solution: 'قمنا بإعادة هيكلة خطة المحتوى للتركيز على الكاروسيل الفكري الموجه، وصياغة خطافات تحث على الحفظ والمشاركة، وبناء باقات كتب مجمعة (Bundle Offers) مع حوافز شحن مجاني.',
    impactMetrics: 'زيادة المبيعات بنسبة 140% خلال 60 يوماً، ارتفاع معدل حفظ المنشورات بـ 320%، وتحقيق عائد إنفاق إعلاني 4.2x ROAS.',
    lessonsLearned: 'الجمهور المثقف يشتري القيمة والتحول الذهني الذي يمنحه الكتاب وليس مجرد الورق المطبوع. المحتوى الذي يستحق الحفظ هو أقوى محرك مبيعات مجاني.',
    tags: ['دراسة_حالة', 'سوق_الكتاب', 'نمو_المبيعات', 'كوبي_رايتينغ'],
    date: getTodayString(),
    published: true,
  },
  {
    id: 'cs-2',
    title: 'تحويل منصة مدار للاستشارات من التسعير بالساعة إلى التسعير القائم على القيمة وإغلاق صفقات مؤسسية',
    clientName: 'منصة مدار للاستشارات',
    category: 'الاستشارات المهنية وإعادة التموضع',
    problem: 'كان المستشارون يواجهون مقاومة سعرية شديدة عند تقديم عروضهم بالساعة، مما حد من هامش الربح وقدرة المنصة على التوسع.',
    solution: 'أعدنا صياغة حقيبة العميل (Client Kit) لتركز على الأثر المالي للأتمتة وتقليل الهدر، واستبدال التسعير بالساعة بباقات مخرجات محددة وواضحة.',
    impactMetrics: 'ارتفاع متوسط قيمة الصفقة بنسبة 210%، وتقليص دورة المبيعات من 45 يوماً إلى 14 يوماً فقط.',
    lessonsLearned: 'عندما توثق الأثر المالي لحلك وتتحمل جزءاً من مسؤولية المخرجات، يصبح السعر مسألة ثانوية لدى العميل.',
    tags: ['استشارات', 'تسعير_بالقيمة', 'B2B', 'إغلاق_صفقات'],
    date: getTodayString(),
    published: true,
  },
];

export const initialProfessionalProfile: ProfessionalProfile = {
  primaryTitle: 'مستشار استراتيجيات النمو وهندسة المخرجات المهنية',
  bioSummary: 'أساعد الشركات الصاعدة والمؤسسات المستقلة في تحويل الفوضى التشغيلية إلى أنظمة عمل هادئة ومربحة، مع بناء أصول معرفية ودراسات حالة مثبتة الأثر.',
  valueProposition: 'أبني أنظمة تشغيلية ومحتوى استراتيجي يحول العملاء المحتملين إلى شركاء دائمين، مع مضاعفة القيمة السعرية للخدمات دون إرهاق ذهني.',
  competitiveEdge: 'المزج النادر بين العمق التحليلي الهندسي وسرعة التنفيذ، مع التوثيق الكامل لكافة القرارات والمخاطر بنسبة دقة 100%.',
  superpowers: [
    'الوضوح الحاسم في تفكيك المشكلات المعقدة وصياغة الخطوة التالية فوراً',
    'كتابة نصوص تسويقية واستشارية تمس جوهر احتياج العميل بدون حشو',
    'تصميم أنظمة عمل هادئة ومستدامة تحت فلسفة دفتر الصباح',
    'بناء دراسات حالة موثقة بالأرقام تغلق الصفقات الكبرى باقتدار',
  ],
  skillGaps: [
    'أتمتة الفانلات المتقدمة باستخدام حلول الـ No-Code الموسعة',
    'التحليل المالي المتقدم للتدفقات النقدية متعددة العملات',
    'إتقان تقنيات التفاوض المتقدم للصفقات الحكومية والمؤسسية الكبرى',
  ],
};

export const initialWeeklyReviews: WeeklyReviewSession[] = [
  {
    id: 'rev-1',
    weekNumber: 34,
    year: 2026,
    date: getTodayString(),
    wins: 'إكمال خطة محتوى سوق الكتاب بالكامل، اعتماد 3 قرارات استراتيجية حاسمة، وبناء لوحة المؤشرات الحية وتصفير الأخطاء التقنية.',
    blockers: 'بعض التشتت في فترات المساء بسبب المراسلات المتقطعة، وتأخر رد العميل الثالث على مسودة الاتفاقية.',
    crucialDecisionNextWeek: 'حصر التواصل مع العملاء في نافذة زمنية واحدة يومياً (من 2 إلى 4 عصراً) لحماية ساعات التركيز العميق الصباحية.',
    satisfactionRating: 5,
  },
];

export const initialSkillsRoadmap: SkillRoadmapItem[] = [
  {
    id: 'skill-1',
    title: 'هندسة وتوثيق دراسات الحالة المؤسسية (Case Study Architecture)',
    category: 'Business & Growth',
    level: 5,
    status: 'mastered',
    resources: ['Framework by Alex Cattoni', 'Harvard Business Review Case Method'],
    targetDate: '2026-08-01',
  },
  {
    id: 'skill-2',
    title: 'التسعير المبني على القيمة وإعداد حقائب العروض (Value Pricing)',
    category: 'Consulting',
    level: 4,
    status: 'practicing',
    resources: ['Hourly Billing Is Nuts - Jonathan Stark', 'Value-Based Fees - Alan Weiss'],
    targetDate: '2026-09-30',
  },
  {
    id: 'skill-3',
    title: 'تطوير التطبيقات الخالية من الأخطاء والأنظمة الهادئة (Zero-Error Systems)',
    category: 'Technology & Quality',
    level: 5,
    status: 'mastered',
    resources: ['Clean Code Principles', 'Automated QA Diagnostics'],
    targetDate: '2026-08-15',
  },
  {
    id: 'skill-4',
    title: 'تصميم فانلات الاستحواذ الإعلانية متعددة القنوات (Full-Funnel Ads)',
    category: 'Marketing',
    level: 4,
    status: 'learning',
    resources: ['Meta Blueprint Advanced', 'Omnichannel Strategy Workshop'],
    targetDate: '2026-11-15',
  },
];

export const initialBusinessPages: BusinessPage[] = [
  {
    id: 'sooq-alketab',
    name: 'sooq alketab',
    nameAr: 'سوق الكتاب',
    category: 'ecommerce_books',
    tagline: 'The Ultimate Literary & Reading Community',
    taglineAr: 'المنصة الأولى لبيع وشراء الكتب ومجتمع القراء والكتّاب',
    description: 'Hub for book lovers, reviews, literary discussions, and author spotlights.',
    descriptionAr: 'المنصة والمجتمع الرئيسي لعشاق القراءة، مراجعات الكتب، اقتباسات ملهمة، وتوصيات حسب المزاج.',
    color: '#526653',
    icon: 'BookOpen',
    targetAudience: 'القراء العرب، طلاب الجامعات، الباحثين، محبي الروايات، والمثقفين من عمر 16-45 سنة',
    toneOfVoice: 'ملهمة، فكرية، تفاعلية، تثقيفية ودافئة',
    contentPillars: ['مراجعات الكتب والروايات', 'تحديات القراءة واقتباسات', 'ترشيحات أسبوعية حسب المزاج', 'تسليط الضوء على الكتّاب', 'نصائح وأسرار القراءة السريعة'],
    platforms: ['facebook', 'instagram', 'x', 'tiktok', 'telegram'],
    defaultHashtags: ['#سوق_الكتاب', '#أصدقاء_القراءة', '#ماذا_تقرأ', '#تحدي_القراءة', '#روايات', '#كتب_عربية'],
    agreementsAndDecisions: 'تم الاتفاق على تركيز المنشورات اليومية على بناء مجتمع قرائي تفاعلي، إطلاق تحدي قراءة شهري، والتنسيق المباشر مع دور النشر لتوفير خصومات حصرية للمتابعين.',
    mainGoalAndVision: 'بناء أكبر مجتمع عربي لعشاق القراءة وتسهيل وصول الكتب لكل قارئ بأسعار مناسبة وتجربة تصفح فريدة.',
    studiesAndResearch: 'دراسة سلوك القراء أظهرت أن 72% يفضلون التوصيات المخصصة بحسب المزاج والوقت المتاح، وأن المنشورات التي تحتوي اقتباسات عميقة تحقق أعلى معدل حفظ ومشاركة.',
    topPrioritiesAndEssentials: '1. جودة المحتوى الأدبي\n2. سرعة الاستجابة لاستفسارات القراء\n3. إطلاق مراجعات أسبوعية منتظمة كل يوم جمعة.',
    customSections: [],
  },
  {
    id: 'sooq-alketab-ads',
    name: 'sooq alketab ads',
    nameAr: 'إعلانات سوق الكتاب',
    category: 'advertising',
    tagline: 'High-Converting Book Advertising & Promotions',
    taglineAr: 'الذراع التسويقي والإعلاني للعروض والباقات والحملات الممولة',
    description: 'Sponsored promotions, publisher partnerships, and seasonal discount campaigns.',
    descriptionAr: 'إدارة الحملات الإعلانية الممولة، عروض الخصومات الحصرية، باقات التوفير للناشرين والمكتبات، وإعلانات زيادة المبيعات.',
    color: '#b97952',
    icon: 'Megaphone',
    targetAudience: 'المشترون النشطون عبر الإنترنت، دور النشر، أصحاب المكتبات، والباحثون عن أقوى الصفقات والخصومات',
    toneOfVoice: 'حماسية، مقنعة، تركز على القيمة والعائد، وسريعة التفاعل (High-Conversion Hook)',
    contentPillars: ['عروض الخصم والباقات المخفضة', 'حملات التوصيل المجاني', 'إعلانات الإصدارات الحصرية والناشرين', 'مسابقات وهدايا المتابعين', 'إعلانات مواسم المعارض والجمعة البيضاء'],
    platforms: ['facebook', 'instagram', 'x', 'tiktok'],
    defaultHashtags: ['#عروض_سوق_الكتاب', '#خصومات_كتب', '#إعلانات_سوق_الكتاب', '#شحن_مجاني', '#عروض_حصرية', '#تسوق_الآن'],
    agreementsAndDecisions: 'تم الاتفاق على اختبار حملتين ممولتين أسبوعياً (A/B Testing) للوصول إلى أقل تكلفة لكل طلب، مع تقديم كوبونات ترويجية مؤقتة.',
    mainGoalAndVision: 'تحقيق أعلى عائد على الإنفاق الإعلاني (ROAS يتجاوز 3.5x) وزيادة معدل التحويل لطلبات الشراء.',
    studiesAndResearch: 'أبحاث الحملات السابقة بينت أن العروض التي تتضمن شحناً مجانياً أو باقات 3+1 ترفع حجم سلة الشراء بنسبة 43%.',
    topPrioritiesAndEssentials: '1. كتابة خطافات إعلانية قوية ومباشرة\n2. تتبع دقيق لميزانيات الحملات\n3. تجديد التصاميم والنصوص الإعلانية أسبوعياً.',
    customSections: [],
  },
  {
    id: 'sooq-alketab-tech',
    name: 'sooq alketab technology',
    nameAr: 'تقنية سوق الكتاب',
    category: 'technology',
    tagline: 'Innovative Digital Reading & E-Commerce Tech Solutions',
    taglineAr: 'الحلول الرقمية المبتكرة وتطبيقات القراءة والذكاء الاصطناعي',
    description: 'Tech platform features, e-readers, AI book recommendations, and developer updates.',
    descriptionAr: 'استعراض التحديثات البرمجية لمنصة وتطبيقات سوق الكتاب، خوارزميات الترشيح الذكي بالذكاء الاصطناعي، وتجربة المستخدم السلسة.',
    color: '#06b6d4',
    icon: 'Cpu',
    targetAudience: 'المطورون، رواد الأعمال التقنيون، مستخدمو التطبيقات الرقمية، وعشاق التكنولوجيا والقراءة الإلكترونية',
    toneOfVoice: 'تقنية، عصرية، مبتكرة، دقيقة وجذابة',
    contentPillars: ['تحديثات منصة سوق الكتاب وتطبيقاتها', 'الذكاء الاصطناعي في ترشيح الكتب', 'ميزات القراءة الرقمية وحماية العين', 'أنظمة الدفع الإلكتروني والأمان', 'رؤى تقنية في التجارة الإلكترونية والنشر الرقمي'],
    platforms: ['linkedin', 'x', 'facebook', 'youtube'],
    defaultHashtags: ['#تقنية_سوق_الكتاب', '#تطبيقات_القراءة', '#ذكاء_اصطناعي', '#تجارة_الكترونية', '#ابتكار_تقني', '#سوفتوير'],
    agreementsAndDecisions: 'تم الاتفاق على مشاركة تحديثات أسبوعية حول تحسينات سرعة التطبيق وميزات المزامنة السحابية.',
    mainGoalAndVision: 'توفير بنية تحتية رقمية وتجربة مستخدم لا مثيل لها في العالم العربي لترشيح وقراءة الكتب.',
    studiesAndResearch: 'استطلاعات المستخدمين أظهرت أن ميزة البحث السريع وخيارات الدفع المحلي ترفع نسبة الرضا إلى 96%.',
    topPrioritiesAndEssentials: '1. استقرار وأمان التطبيق\n2. سرعة تحميل الكتالوج\n3. إتاحة تجربة قراءة ليلية مريحة.',
    customSections: [],
  },
];

export const initialContentPosts: ContentPost[] = [
  {
    id: 'post-1',
    pageId: 'sooq-alketab',
    title: '«5 كتب غيرت طريقة تفكير رواد الأعمال»',
    caption: `«العقل الذي يتسع لفكرة جديدة لا يعود أبداً إلى حجمه الأصلي» 💡📚

إليك 5 كتب ينصح بها كبار القادة ورواد الأعمال في 2026:
1. العادات الذرية (Atomic Habits) - جيمس كلير
2. التفكير السريع والبطيء - دانيال كانمان
3. من الجيد إلى العظيم - جيم كولينز
4. العمل العميق (Deep Work) - كال نيوبورت
5. سيكولوجية المال - مورغان هاوسل

🔖 احفظ هذا المنشور لتستعين به في جولتك القادمة، واكتب لنا في التعليقات: أي كتاب منها قرأته أو تنوي قراءته قريباً؟ ✨`,
    format: 'carousel',
    platform: 'instagram',
    status: 'scheduled',
    scheduledDate: getTodayString(),
    scheduledTime: '18:00',
    imageUrl: '',
    imageNotes: 'تصميم كاروسيل أنيق مع كروت ملونة للعناوين الخمسة',
    hashtags: ['#سوق_الكتاب', '#أصدقاء_القراءة', '#كتب_ريادة_الأعمال', '#ماذا_تقرأ', '#تطوير_الذات'],
    cta: 'شاركنا كتابك المفضل في التعليقات واحفظ المنشور!',
    targetAudience: 'المهتمون بالإنتاجية وتطوير الأعمال',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'post-2',
    pageId: 'sooq-alketab-ads',
    title: '🔥 إعلان حملة باقة التوفير الكبرى: 4 كتب بسعر 2!',
    caption: `💥 عرض الصدمة من إعلانات سوق الكتاب!
اشترِ أي كتابين واحصل على كتابين إضافيين مجاناً بالكامل مع شحن فوري حتى باب منزلك! 🚚📦

✅ أكثر من 5,000 عنوان مشمول بالعرض.
✅ جودة طباعة استثنائية وتغليف هدايا مجاني.
✅ الدفع عند الاستلام متاح.

⏳ العرض سارٍ لمدة 48 ساعة فقط أو حتى نفاد الكمية!
🛒 اضغط على الرابط بالأسفل واطلب باقتك المفضلة الآن باستخدام كود: BOOK2026`,
    format: 'ad_copy',
    platform: 'facebook',
    status: 'ready',
    scheduledDate: getTodayString(),
    scheduledTime: '15:30',
    imageUrl: '',
    imageNotes: 'بنر ترويجي برتقالي مع شارة الخصم 50%',
    hashtags: ['#عروض_سوق_الكتاب', '#خصومات_كبرى', '#شحن_مجاني', '#عروض_حصرية'],
    cta: 'اطلب باقتك الآن واستفد من الخصم الفوري قبل انتهاء الوقت!',
    targetAudience: 'المتسوقون ومحبو الصفقات الكبرى',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'post-3',
    pageId: 'sooq-alketab-tech',
    title: '⚡ تحديث محرك ترشيح الكتب والمزامنة في تقنية سوق الكتاب',
    caption: `🚀 نقلة نوعية في تجربة القراءة الرقمية!
يسعدنا الإعلان عن إطلاق ميزة المزامنة الفورية لنظام ترشيح وتصفح الكتب على منصة سوق الكتاب.

كيف تعمل الميزة الجديدة؟
1️⃣ يحلل اهتماماتك القرائية بدقة ويفهم أسلوبك المفضل في السرد.
2️⃣ يقترح عليك كتباً نادرة تشبه تماماً الكتب التي نالت إعجابك سابقاً.
3️⃣ تجربة تصفح تفاعلية وفائقة السرعة عبر تطبيقاتنا للهواتف والويب.

جرب الميزة الجديدة الآن وشاركنا رأيك في دقة التصفح! 📲💻`,
    format: 'post',
    platform: 'linkedin',
    status: 'scheduled',
    scheduledDate: getTodayString(),
    scheduledTime: '12:00',
    imageUrl: '',
    imageNotes: 'واجهة تطبيق عصرية بلون داكن ونيون أزرق',
    hashtags: ['#تقنية_سوق_الكتاب', '#تطبيقات_القراءة', '#تطوير_البرمجيات', '#ابتكار'],
    cta: 'جرب الميزة واكتب لنا ملاحظاتك التقنية!',
    targetAudience: 'عشاق التقنية والمطورون ومجتمع الأعمال',
    createdAt: new Date().toISOString(),
  },
];

export const initialContentPlans: ContentStrategyPlan[] = [
  {
    id: 'plan-1',
    pageId: 'sooq-alketab',
    title: 'خطة أسبوع تعزيز التفاعل ومجتمع القراء (Week 1)',
    goal: 'community_growth',
    period: 'weekly',
    startDate: getTodayString(),
    endDate: getTodayString(),
    kpiTargets: ['زيادة التعليقات بنسبة 35%', 'معدل حفظ المنشورات +50%', '1000 مشاركة للأفكار الملهمة'],
    notes: 'التركيز على الكاروسيل والاقتباسات القصيرة عالية التأثير والأسئلة المفتوحة للجمهور.',
    createdAt: new Date().toISOString(),
    postIds: ['post-1'],
  },
];

export const initialAdCampaigns: AdCampaign[] = [
  {
    id: 'camp-1',
    pageId: 'sooq-alketab-ads',
    campaignName: 'حملة العودة للقراءة وباقات الأكثر مبيعاً 2026',
    objective: 'conversions',
    budget: 250,
    currency: '$',
    targetAudienceDetails: 'العمر: 18-40 سنة، الاهتمامات: قراءة، تطوير الذات، روايات، التعليم الذاتي، التجارة الإلكترونية',
    adCopies: [
      {
        variant: 'A',
        headline: '📚 لا تدع عطلتك تمر دون قراءة هذه الروائع! خصم 40% الآن',
        primaryText: 'احصل على باقة الكتب الأكثر مبيعاً مع تغليف فاخر وشحن سريع لجميع المدن. العرض لفترة محدودة!',
        callToAction: 'تسوق الآن',
        angle: 'الرغبة في الإنجاز وتطوير الذات',
      },
      {
        variant: 'B',
        headline: '🔥 عرض خاص: 4 كتب بسعر كتابين فقط مع شحن مجاني!',
        primaryText: 'أكبر تخفيض في الموسم من سوق الكتاب. اطلب مجموعتك الآن واستمتع بقراءة متواصلة.',
        callToAction: 'اطلب الآن',
        angle: 'التوفير الاقتصادي والصفقة السريعة (FOMO)',
      },
    ],
    status: 'active',
    startDate: getTodayString(),
    endDate: getTodayString(),
    expectedROI: '3.8x ROAS',
  },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'نشر ومتابعة تفاعل منشور «كتب رواد الأعمال» على صفحة سوق الكتاب',
    description: 'الرد على التعليقات في الساعة الأولى وتثبيت أفضل تعليق للمتابعين',
    completed: false,
    priority: 'high',
    categoryId: 'business_pages',
    dueDate: getTodayString(),
    dueTime: '18:00',
    estimatedMinutes: 25,
    tags: ['سوق_الكتاب', 'محتوى', 'تفاعل'],
    subtasks: [
      { id: 'sub-1', title: 'مراجعة التصميم والصورة المرافقة', completed: true },
      { id: 'sub-2', title: 'جدولة المنشور على إنستغرام وفيسبوك', completed: true },
      { id: 'sub-3', title: 'الرد على أول 10 تعليقات', completed: false },
    ],
    createdAt: new Date().toISOString(),
    recurring: 'none',
    relatedPageId: 'sooq-alketab',
    relatedPostId: 'post-1',
    relatedClientId: 'client-1',
    relatedProjectId: 'proj-1',
  },
  {
    id: 'task-2',
    title: 'مراجعة نتائج حملة إعلانات سوق الكتاب واختبار نسخ A/B',
    description: 'فحص معدل النقر CTR وتكلفة الاقتناء CAC لنسخة الإعلان A و B',
    completed: false,
    priority: 'urgent',
    categoryId: 'marketing',
    dueDate: getTodayString(),
    dueTime: '15:00',
    estimatedMinutes: 40,
    tags: ['إعلانات', 'حملات_مولة', 'تحليل'],
    subtasks: [
      { id: 'sub-4', title: 'فحص ميزانية اليوم ومعدل التحويل', completed: false },
      { id: 'sub-5', title: 'إيقاف النسخة الأقل أداءً وتوسيع الميزانية للرابحة', completed: false },
    ],
    createdAt: new Date().toISOString(),
    relatedPageId: 'sooq-alketab-ads',
    relatedClientId: 'client-1',
    relatedProjectId: 'proj-1',
  },
  {
    id: 'task-3',
    title: 'توثيق قرار تسعير الباقات الاستشارية لمنصة مدار في سجل القرارات',
    description: 'تسجيل الأثر المالي المتوقع وإرفاق مسودة حقيبة العميل',
    completed: false,
    priority: 'high',
    categoryId: 'work',
    dueDate: getTodayString(),
    dueTime: '11:00',
    estimatedMinutes: 30,
    tags: ['استشارات', 'قرارات', 'مدار'],
    subtasks: [],
    createdAt: new Date().toISOString(),
    relatedClientId: 'client-2',
    relatedProjectId: 'proj-2',
  },
  {
    id: 'task-4',
    title: 'جلسة التفريغ الذهني الصباحية وكتابة شذرات التبسيط والوضوح',
    description: 'تسجيل ساعات النوم وتفريغ المهام غير العاجلة في مفكرة الصباح',
    completed: true,
    priority: 'medium',
    categoryId: 'personal',
    dueDate: getTodayString(),
    dueTime: '08:00',
    estimatedMinutes: 15,
    tags: ['روتين_صباحي', 'تفريغ_ذهني'],
    subtasks: [],
    createdAt: new Date().toISOString(),
  },
];

export const initialHabits: Habit[] = [
  {
    id: 'habit-1',
    titleEn: 'Morning Scratchpad & Brain Dump',
    titleAr: 'مفكرة الصباح والتفريغ الذهني وتدوين الأولويات',
    frequency: 'daily',
    category: 'personal',
    targetCount: 1,
    color: '#b97952',
    icon: 'Sparkles',
    history: { [getTodayString()]: 1 },
    streak: 6,
    bestStreak: 21,
    createdAt: new Date().toISOString(),
    timeOfDay: 'morning',
  },
  {
    id: 'habit-2',
    titleEn: 'Sleep & Rest Tracking (7+ Hours)',
    titleAr: 'تتبع جودة ونوم 7+ ساعات لراحة الذهن',
    frequency: 'daily',
    category: 'health',
    targetCount: 1,
    unitEn: 'night',
    unitAr: 'ليلة',
    color: '#526653',
    icon: 'Moon',
    history: { [getTodayString()]: 1 },
    streak: 8,
    bestStreak: 19,
    createdAt: new Date().toISOString(),
    timeOfDay: 'morning',
  },
  {
    id: 'habit-3',
    titleEn: 'Deep Work Focus Block (90 min)',
    titleAr: 'جلسة عمل عميق بدون مقاطعات (90 د)',
    frequency: 'weekdays',
    category: 'work',
    targetCount: 1,
    color: '#6366f1',
    icon: 'Target',
    history: { [getTodayString()]: 1 },
    streak: 5,
    bestStreak: 15,
    createdAt: new Date().toISOString(),
    timeOfDay: 'morning',
  },
  {
    id: 'habit-4',
    titleEn: 'Drink 8 Glasses of Water',
    titleAr: 'شرب 8 أكواب ماء',
    frequency: 'daily',
    category: 'health',
    targetCount: 8,
    unitEn: 'glasses',
    unitAr: 'أكواب',
    color: '#06b6d4',
    icon: 'Droplet',
    history: { [getTodayString()]: 6 },
    streak: 7,
    bestStreak: 18,
    createdAt: new Date().toISOString(),
    timeOfDay: 'anytime',
  },
];

export const initialSchedule: ScheduleBlock[] = [
  {
    id: 'sch-1',
    title: 'تفريغ الصباح وتخطيط الأولويات ومصفوفة المشاريع',
    startTime: '08:00',
    endTime: '09:00',
    date: getTodayString(),
    categoryId: 'personal',
    color: '#b97952',
    completed: true,
    notes: 'تسجيل ساعات النوم وتحديد أهم 3 أولويات لليوم',
  },
  {
    id: 'sch-2',
    title: 'العمل العميق: مراجعة حملات سوق الكتاب واختبار نسخ الإعلانات',
    startTime: '09:30',
    endTime: '11:30',
    date: getTodayString(),
    categoryId: 'work',
    color: '#526653',
    completed: false,
    taskId: 'task-2',
    notes: 'جلسة تركيز خالية من التشتت',
  },
  {
    id: 'sch-3',
    title: 'جلسة استشارية وتوثيق حقيبة العميل لمنصة مدار',
    startTime: '14:00',
    endTime: '15:30',
    date: getTodayString(),
    categoryId: 'work',
    color: '#b97952',
    completed: false,
    taskId: 'task-3',
  },
  {
    id: 'sch-4',
    title: 'نشر ومتابعة تفاعل إنستغرام لصفحة سوق الكتاب',
    startTime: '18:00',
    endTime: '18:45',
    date: getTodayString(),
    categoryId: 'business_pages',
    color: '#526653',
    completed: false,
    taskId: 'task-1',
  },
];

export const initialNotes: Note[] = [
  {
    id: 'note-1',
    title: 'فلسفة دفتر الصباح: قواعد الإنتاجية الهادئة والمستدامة',
    content: `المبادئ التشغيلية الأساسية:
1. الوضوح قبل السرعة: المهمة المحددة بدقة تنجز في نصف الوقت.
2. التركيز على سياق واحد: عدم خلط مهام العملاء في آن واحد.
3. التوثيق هو الأصل: كل قرار محوري يوثق في سجل القرارات فوراً لحماية وقتك واحترافيتك.
4. التوازن بين العمل والراحة: جودة النوم وساعات الراحة هي وقود القرارات الذكية.`,
    date: getTodayString(),
    pinned: true,
    tags: ['فلسفة', 'إنتاجية_هادئة', 'دفتر_الصباح'],
    mood: 'calm',
    gratitude: ['الصفاء الذهني في الصباح', 'حرية إدارة العمل المستقل', 'وضوح الأهداف والقرارات'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialSettings: UserSettings = {
  language: 'ar',
  theme: 'midnight',
  enableSounds: true,
  enableConfetti: true,
  defaultFocusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartFocus: false,
  dailyWaterGoal: 8,
  startDayOfWeek: 6, // Saturday
  timeFormat24h: true,
};

export const defaultAppState: AppState = {
  tasks: initialTasks,
  categories: initialCategories,
  habits: initialHabits,
  schedule: initialSchedule,
  notes: initialNotes,
  dailyReflections: {
    [getTodayString()]: {
      date: getTodayString(),
      mood: 'motivated',
      energyLevel: 5,
      waterGlasses: 6,
      highlights: 'تنظيم مركز القيادة ومصفوفة المشاريع وإنجاز أولويات اليوم بوضوح تام',
      improvements: 'المحافظة على نافذة الرد على الرسائل المحددة وتجنب التشتت المسائي',
      gratitude: 'الحمد لله على نعمة العافية والإلهام والعمل المنظم',
      sleepHours: 7.5,
      sleepQuality: 5,
      morningScratchpad: 'اليوم نركز على تسليم حملة سوق الكتاب وتوثيق دراسة الحالة الاستشارية. لا داعي للقلق، الخطوات واضحة وجدول الدفعات منتظم.',
      restNotes: 'نوم عميق ومستقر، استيقاظ بطاقة مرتفعة وصفاء ذهني ممتاز.',
    },
  },
  settings: initialSettings,
  businessPages: initialBusinessPages,
  contentPosts: initialContentPosts,
  contentPlans: initialContentPlans,
  adCampaigns: initialAdCampaigns,
  selectedPageId: 'sooq-alketab',
  // New Client Hub & Professional Data
  clients: initialClients,
  clientKits: initialClientKits,
  clientAssets: initialClientAssets,
  decisions: initialDecisions,
  risks: initialRisks,
  projects: initialProjects,
  caseStudies: initialCaseStudies,
  professionalProfile: initialProfessionalProfile,
  weeklyReviews: initialWeeklyReviews,
  skillsRoadmap: initialSkillsRoadmap,
  selectedClientId: 'client-1',
};

/**
 * XSS & HTML injection sanitizer for user input strings
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function loadAppState(): AppState {
  if (typeof window === 'undefined') return defaultAppState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppState(defaultAppState);
      return defaultAppState;
    }
    const parsed = JSON.parse(raw);

    return {
      tasks: Array.isArray(parsed.tasks) && parsed.tasks.length > 0 ? parsed.tasks : defaultAppState.tasks,
      categories: Array.isArray(parsed.categories) ? parsed.categories : defaultAppState.categories,
      habits: Array.isArray(parsed.habits) ? parsed.habits : defaultAppState.habits,
      schedule: Array.isArray(parsed.schedule) ? parsed.schedule : defaultAppState.schedule,
      notes: Array.isArray(parsed.notes) ? parsed.notes : defaultAppState.notes,
      dailyReflections: parsed.dailyReflections && typeof parsed.dailyReflections === 'object' ? parsed.dailyReflections : defaultAppState.dailyReflections,
      settings: { ...defaultAppState.settings, ...(parsed.settings || {}) },
      businessPages: Array.isArray(parsed.businessPages) && parsed.businessPages.length > 0 ? parsed.businessPages : defaultAppState.businessPages,
      contentPosts: Array.isArray(parsed.contentPosts) && parsed.contentPosts.length > 0 ? parsed.contentPosts : defaultAppState.contentPosts,
      contentPlans: Array.isArray(parsed.contentPlans) ? parsed.contentPlans : defaultAppState.contentPlans,
      adCampaigns: Array.isArray(parsed.adCampaigns) ? parsed.adCampaigns : defaultAppState.adCampaigns,
      selectedPageId: parsed.selectedPageId || 'sooq-alketab',
      clients: Array.isArray(parsed.clients) && parsed.clients.length > 0 ? parsed.clients : defaultAppState.clients,
      clientKits: parsed.clientKits && typeof parsed.clientKits === 'object' ? parsed.clientKits : defaultAppState.clientKits,
      clientAssets: Array.isArray(parsed.clientAssets) ? parsed.clientAssets : defaultAppState.clientAssets,
      decisions: Array.isArray(parsed.decisions) && parsed.decisions.length > 0 ? parsed.decisions : defaultAppState.decisions,
      risks: Array.isArray(parsed.risks) && parsed.risks.length > 0 ? parsed.risks : defaultAppState.risks,
      projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : defaultAppState.projects,
      caseStudies: Array.isArray(parsed.caseStudies) && parsed.caseStudies.length > 0 ? parsed.caseStudies : defaultAppState.caseStudies,
      professionalProfile: parsed.professionalProfile || defaultAppState.professionalProfile,
      weeklyReviews: Array.isArray(parsed.weeklyReviews) ? parsed.weeklyReviews : defaultAppState.weeklyReviews,
      skillsRoadmap: Array.isArray(parsed.skillsRoadmap) ? parsed.skillsRoadmap : defaultAppState.skillsRoadmap,
      selectedClientId: parsed.selectedClientId || 'client-1',
    };
  } catch (err) {
    console.error('Failed to load state from localStorage, using defaults:', err);
    return defaultAppState;
  }
}

export function saveAppState(state: AppState): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    return false;
  }
}

export function exportBackupData(state: AppState): void {
  const jsonStr = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yawmi-workspace-backup-${getTodayString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackupData(jsonString: string): { success: boolean; data?: AppState; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'ملف البيانات غير صالح أو تالف' };
    }
    const validated: AppState = {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      categories: Array.isArray(parsed.categories) ? parsed.categories : initialCategories,
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      schedule: Array.isArray(parsed.schedule) ? parsed.schedule : [],
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      dailyReflections: parsed.dailyReflections && typeof parsed.dailyReflections === 'object' ? parsed.dailyReflections : {},
      settings: { ...initialSettings, ...(parsed.settings || {}) },
      businessPages: Array.isArray(parsed.businessPages) ? parsed.businessPages : initialBusinessPages,
      contentPosts: Array.isArray(parsed.contentPosts) ? parsed.contentPosts : initialContentPosts,
      contentPlans: Array.isArray(parsed.contentPlans) ? parsed.contentPlans : initialContentPlans,
      adCampaigns: Array.isArray(parsed.adCampaigns) ? parsed.adCampaigns : initialAdCampaigns,
      selectedPageId: parsed.selectedPageId || 'sooq-alketab',
      clients: Array.isArray(parsed.clients) ? parsed.clients : initialClients,
      clientKits: parsed.clientKits && typeof parsed.clientKits === 'object' ? parsed.clientKits : initialClientKits,
      clientAssets: Array.isArray(parsed.clientAssets) ? parsed.clientAssets : initialClientAssets,
      decisions: Array.isArray(parsed.decisions) ? parsed.decisions : initialDecisions,
      risks: Array.isArray(parsed.risks) ? parsed.risks : initialRisks,
      projects: Array.isArray(parsed.projects) ? parsed.projects : initialProjects,
      caseStudies: Array.isArray(parsed.caseStudies) ? parsed.caseStudies : initialCaseStudies,
      professionalProfile: parsed.professionalProfile || initialProfessionalProfile,
      weeklyReviews: Array.isArray(parsed.weeklyReviews) ? parsed.weeklyReviews : initialWeeklyReviews,
      skillsRoadmap: Array.isArray(parsed.skillsRoadmap) ? parsed.skillsRoadmap : initialSkillsRoadmap,
      selectedClientId: parsed.selectedClientId || 'client-1',
    };
    saveAppState(validated);
    return { success: true, data: validated };
  } catch (e) {
    return { success: false, error: (e as Error).message || 'خطأ في قراءة ملف النسخة الاحتياطية' };
  }
}
