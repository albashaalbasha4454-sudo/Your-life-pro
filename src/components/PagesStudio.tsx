/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Megaphone,
  Cpu,
  Search,
  Calendar,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  BarChart3,
  Copy,
  Check,
  Share2,
  ArrowRight,
  TrendingUp,
  Target,
  FileText,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Bookmark,
  CheckSquare,
  Square,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  Tag,
  HelpCircle,
  FolderPlus,
  Compass,
  FileCheck2,
  Zap,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  BusinessPage,
  ContentPost,
  PlatformType,
  PostFormatType,
  PostStatusType,
  AdCampaign,
  CustomPageSection,
  PageAuditReport,
} from '../types';
import { getTodayString } from '../utils/dateUtils';

interface CopyFramework {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  category: 'framework' | 'offer' | 'review' | 'reels';
  structure: string[];
  template: string;
  example: string;
}

const COPY_FRAMEWORKS: CopyFramework[] = [
  {
    id: 'aida',
    name: 'AIDA Framework',
    nameAr: 'نموذج AIDA التسويقي الكلاسيكي',
    tagline: 'انتباه (Attention) ➔ اهتمام (Interest) ➔ رغبة (Desire) ➔ إجراء (Action)',
    category: 'framework',
    structure: [
      'خطاف جذاب يجذب الانتباه فوراً (Attention)',
      'توضيح الفائدة وإثارة الفضول (Interest)',
      'عرض القيمة الفريدة والحل (Desire)',
      'طلب إجراء صريح وواضح (Action / CTA)',
    ],
    template: `🔥 [خطاف افتتاحي قوي يجذب انتباه القارئ في أول 3 ثوانٍ]

✨ هل تساءلت يوماً كيف يمكن لـ [المشكلة أو الرغبة] أن تغير نتائجك بالكامل؟
إليك ما اكتشفناه:
1. [النقطة الأولى والميزة الأساسية]
2. [النقطة الثانية وكيف تسهل حياتك]
3. [النتيجة المبهرة التي ستحصل عليها]

💡 لا تدع الفرصة تفوتك اليوم!
🎯 [اكتب هنا الإجراء المطلوب: اطلب الآن / اضغط على الرابط في البايو / شاركنا في التعليقات]`,
    example:
      '«هل مللت من شراء كتب ولا تجد وقتاً لقرائتها؟ إليك استراتيجية 20 دقيقة يومياً التي تجعلك تنهي كتاباً أسبوعياً! جربها الآن واكتب لنا في التعليقات»',
  },
  {
    id: 'pas',
    name: 'PAS Framework',
    nameAr: 'نموذج PAS لحل المشكلات',
    tagline: 'المشكلة (Problem) ➔ تفاقمها (Agitation) ➔ الحل الجذري (Solution)',
    category: 'framework',
    structure: [
      'تحديد المشكلة المؤلمة التي يعاني منها القارئ (Problem)',
      'تسليط الضوء على آثار إهمالها (Agitation)',
      'تقديم الحل الذكي عبر منتجك أو صفحتك (Solution)',
    ],
    template: `❌ [تحديد المشكلة الشائعة بوضوح: هل تعاني من ...؟]

إذا كنت تؤجل هذه الخطوة، فالمشكلة أنك تخسر [الوقت / المال / الفرص الثمينة] يوماً بعد يوم.
لكن الخبر الجيد: الحل أصبح بين يديك الآن! ✨

✅ مع [اسم الحل أو الخدمة أو الكتاب]:
- [الميزة الأولى]
- [الميزة الثانية]
- [النتيجة المضمونة]

💬 [دعوة لاتخاذ إجراء: راسلنا الآن للحصول على نسختك / اطلب كود الخصم]`,
    example:
      '«هل تجد صعوبة في اختيار الكتب المناسبة لمستواك؟ تشتت العناوين يضيع ساعاتك الثمينة. في سوق الكتاب قمنا بتصنيف أفضل 100 عنوان حسب مجالك لتبدأ فوراً!»',
  },
  {
    id: 'flash_sale',
    name: 'Special Offer / Flash Sale',
    nameAr: 'نموذج العروض الترويجية والخصومات',
    tagline: 'قيمة العرض ➔ التوفير الحصري ➔ كود الخصم ➔ موعد الانتهاء',
    category: 'offer',
    structure: [
      'إعلان صريح عن الخصم أو الباقة الحصرية',
      'ذكر المزايا والهدايا الإضافية المشمولة',
      'تأكيد عنصر الندرة وموعد انتهاء العرض',
      'كود الخصم ورابط الشراء المباشر',
    ],
    template: `🚀 عرض استثنائي لفترة محدودة من [اسم الصفحة]! 🔥

احصل الآن على [اسم المنتج / الباقة / العرض] بخصم خاص يصل إلى [نسبة الخصم %]!

🎁 ما الذي ستحصل عليه في هذا العرض؟
✅ [الميزة الأولى أو الكتاب الأول]
✅ [الميزة الثانية أو الشحن المجاني]
✅ [هدية إضافية حصرية]

⏳ العرض سارٍ حتى [تاريخ أو يوم انتهاء العرض] أو حتى نفاد الكمية!
🎟️ استخدم كود الخصم: [CODE] عند إتمام الطلب.
👇 اطلب باقتك الآن من الرابط المباشر في البايو أو أرسل لنا رسالة خاصة!`,
    example:
      '«عرض باقة رواد الأعمال: 4 كتب الأكثر مبيعاً بخصم 40% مع شحن مجاني لكافة المدن! استخدم كود READ2026 قبل نهاية الأسبوع 📦»',
  },
  {
    id: 'book_spotlight',
    name: 'Book Review & Quote Hook',
    nameAr: 'نموذج مراجعة كتاب واقتباس ملهم',
    tagline: 'اقتباس آسر ➔ الدرس المستفاد ➔ الفائدة العملية ➔ ترشيح للقارئ',
    category: 'review',
    structure: [
      'اقتباس عميق أو فكرة صادمة من الكتاب',
      'شرح مبسط كيف غير هذا المفهوم منظورك',
      '3 دروس عملية يمكن تطبيقها اليوم',
      'سؤال تفاعلي للمتابعين في التعليقات',
    ],
    template: `«[اقتباس قوي وملهم من الكتاب]» 📖✨

هذا الاقتباس من كتاب [اسم الكتاب] للكاتب [اسم المؤلف] غير تماماً نظرتي تجاه [المجال أو العادة].

إليك أهم 3 أفكار ستغير حياتك من هذا الكتاب:
1️⃣ [الفكرة الأولى وتطبيقها السريع]
2️⃣ [الفكرة الثانية والخطأ الشائع الذي تحذرك منه]
3️⃣ [الخلاصة الذهبية]

📌 هل قرأت هذا الكتاب من قبل؟ وما هو كتابك المفضل في هذا المجال؟ شاركنا في التعليقات! 👇`,
    example:
      '«"أنت لا ترتقي إلى مستوى أهدافك، بل تهبط إلى مستوى أنظمتك" - العادات الذرية. إليك كيف تبني نظاماً يومياً للقراءة دون أن تشعر بالتعب!»',
  },
  {
    id: 'tech_feature',
    name: 'Feature Release & How-to',
    nameAr: 'نموذج إطلاق ميزة تقنية وشرح الاستخدام',
    tagline: 'إعلان الميزة ➔ المشكلة التي تحلها ➔ طريقة التفعيل ➔ دعوة للتجربة',
    category: 'framework',
    structure: [
      'إعلان الميزة الجديدة بنبرة حماسية ومبتكرة',
      'شرح مبسط لكيفية تسهيلها لتجربة المستخدم',
      'خطوات التفعيل في 3 خطوات بسيطة',
      'دعوة لتجربة التحديث وكتابة الملاحظات',
    ],
    template: `⚡ تحديث جديد ومهم في [اسم التطبيق أو المنصة]! 🚀

يسعدنا الإعلان عن إطلاق [اسم الميزة الجديدة]، المصممة خصيصاً لمساعدتك على [الفائدة الرئيسية].

كيف تستفيد من الميزة الجديدة؟
1️⃣ [الخطوة الأولى: افتح التطبيق أو الصفحة]
2️⃣ [الخطوة الثانية: اضغط على خيار ...]
3️⃣ [الخطوة الثالثة: استمتع بالسرعة والتخصيص]

📱 التحديث متوفر الآن على جميع الأجهزة. جربه اليوم واكتب لنا رأيك ومقترحاتك! 💻✨`,
    example:
      '«تحديث جديد في تطبيق سوق الكتاب: ميزة المزامنة السحابية الفورية لعلامات القراءة والملاحظات عبر كافة أجهزتك! جربها الآن وأخبرنا برأيك 📲»',
  },
];

export const PagesStudio: React.FC = () => {
  const {
    state,
    selectedPageId,
    setSelectedPageId,
    selectedPage,
    addPost,
    updatePost,
    deletePost,
    convertPostToTask,
    addBusinessPage,
    updateBusinessPage,
    deleteBusinessPage,
    addCustomPageSection,
    updateCustomPageSection,
    deleteCustomPageSection,
    addAdCampaign,
    updateAdCampaign,
    deleteAdCampaign,
    runPageAudit,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'strategy' | 'posts' | 'maker' | 'frameworks' | 'campaigns' | 'audit'>('strategy');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [isEditPageModalOpen, setIsEditPageModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAuditRunning, setIsAuditRunning] = useState(false);
  const [auditReport, setAuditReport] = useState<PageAuditReport | null>(null);

  // New Page Form State
  const [newPageName, setNewPageName] = useState('');
  const [newPageNameAr, setNewPageNameAr] = useState('');
  const [newPageCategory, setNewPageCategory] = useState('custom');
  const [newPageTaglineAr, setNewPageTaglineAr] = useState('');
  const [newPageDescriptionAr, setNewPageDescriptionAr] = useState('');
  const [newPageColor, setNewPageColor] = useState('#8b5cf6');
  const [newPageAudience, setNewPageAudience] = useState('');
  const [newPageTone, setNewPageTone] = useState('');
  const [newPagePillars, setNewPagePillars] = useState('');
  const [newPageHashtags, setNewPageHashtags] = useState('');

  // New Custom Section Form State
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  // Post Maker Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postFormat, setPostFormat] = useState<PostFormatType>('post');
  const [postPlatform, setPostPlatform] = useState<PlatformType>('instagram');
  const [postScheduledDate, setPostScheduledDate] = useState(getTodayString());
  const [postScheduledTime, setPostScheduledTime] = useState('18:00');
  const [postHashtags, setPostHashtags] = useState('');
  const [postCta, setPostCta] = useState('');
  const [postImageNotes, setPostImageNotes] = useState('');
  const [postEditingId, setPostEditingId] = useState<string | null>(null);

  // Campaign Form State
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [campName, setCampName] = useState('');
  const [campBudget, setCampBudget] = useState(100);
  const [campCurrency, setCampCurrency] = useState('USD');
  const [campObjective, setCampObjective] = useState<'conversions' | 'traffic' | 'engagement' | 'lead_generation'>('conversions');
  const [campAudience, setCampAudience] = useState('');
  const [campHeadlineA, setCampHeadlineA] = useState('');
  const [campPrimaryTextA, setCampPrimaryTextA] = useState('');
  const [campCtaA, setCampCtaA] = useState('تسوق الآن');
  const [campHeadlineB, setCampHeadlineB] = useState('');
  const [campPrimaryTextB, setCampPrimaryTextB] = useState('');
  const [campCtaB, setCampCtaB] = useState('احصل على العرض');

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run AI Audit
  const handleTriggerAudit = async () => {
    setIsAuditRunning(true);
    try {
      const report = await runPageAudit(selectedPage.id, state.settings.language);
      setAuditReport(report);
      setActiveTab('audit');
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditRunning(false);
    }
  };

  // Use suggested post from AI Audit
  const handleApplyPostIdea = (idea: { hook: string; concept: string; targetFormat: string; callToAction: string }) => {
    setPostTitle(idea.hook);
    setPostCaption(`${idea.hook}\n\n${idea.concept}\n\n${idea.callToAction}`);
    setPostCta(idea.callToAction);
    setPostHashtags(selectedPage.defaultHashtags?.join(' ') || '');
    setActiveTab('maker');
  };

  // Apply Copy Framework to Post Maker
  const applyFramework = (framework: CopyFramework) => {
    setPostTitle(framework.nameAr);
    setPostCaption(framework.template);
    setPostHashtags(selectedPage.defaultHashtags?.join(' ') || '');
    setActiveTab('maker');
  };

  // Handle Save Post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postCaption.trim()) return;

    const tagsArray = postHashtags
      .split(/[\s,]+/)
      .filter((t) => t.trim().length > 0)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    if (postEditingId) {
      const existing = state.contentPosts.find((p) => p.id === postEditingId);
      if (existing) {
        updatePost({
          ...existing,
          title: postTitle || postCaption.substring(0, 30),
          caption: postCaption,
          format: postFormat,
          platform: postPlatform,
          scheduledDate: postScheduledDate,
          scheduledTime: postScheduledTime,
          hashtags: tagsArray,
          cta: postCta,
          imageNotes: postImageNotes,
        });
      }
      setPostEditingId(null);
    } else {
      addPost({
        pageId: selectedPage.id,
        title: postTitle || postCaption.substring(0, 30),
        caption: postCaption,
        format: postFormat,
        platform: postPlatform,
        status: 'draft',
        scheduledDate: postScheduledDate,
        scheduledTime: postScheduledTime,
        hashtags: tagsArray,
        cta: postCta,
        imageNotes: postImageNotes,
      });
    }

    // Reset maker
    setPostTitle('');
    setPostCaption('');
    setPostImageNotes('');
    setPostCta('');
    setPostHashtags('');
    setActiveTab('posts');
  };

  // Handle Create Page
  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageName.trim() && !newPageNameAr.trim()) return;

    const pageId = 'page_' + (newPageName || 'custom').toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString(36);
    const pillars = newPagePillars
      .split(/[\n,]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const hashtags = newPageHashtags
      .split(/[\s,]+/)
      .map((h) => h.trim())
      .filter(Boolean)
      .map((h) => (h.startsWith('#') ? h : `#${h}`));

    const createdPage: BusinessPage = {
      id: pageId,
      name: newPageName || newPageNameAr,
      nameAr: newPageNameAr || newPageName,
      category: newPageCategory,
      tagline: newPageTaglineAr,
      taglineAr: newPageTaglineAr,
      description: newPageDescriptionAr,
      descriptionAr: newPageDescriptionAr,
      color: newPageColor,
      icon: 'BookOpen',
      targetAudience: newPageAudience,
      toneOfVoice: newPageTone,
      contentPillars: pillars.length > 0 ? pillars : ['محتوى تفاعلي', 'قيمة تعليمية', 'عروض وترويج'],
      platforms: ['facebook', 'instagram', 'x', 'tiktok'],
      defaultHashtags: hashtags.length > 0 ? hashtags : [`#${newPageNameAr.replace(/\s+/g, '_')}`],
      agreementsAndDecisions: '',
      mainGoalAndVision: '',
      studiesAndResearch: '',
      topPrioritiesAndEssentials: '',
      customSections: [],
    };

    addBusinessPage(createdPage);
    setIsAddPageModalOpen(false);
    // Reset form
    setNewPageName('');
    setNewPageNameAr('');
    setNewPageTaglineAr('');
    setNewPageDescriptionAr('');
    setNewPageAudience('');
    setNewPageTone('');
    setNewPagePillars('');
    setNewPageHashtags('');
  };

  // Handle Add Custom Section
  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    addCustomPageSection(selectedPage.id, {
      title: newSectionTitle.trim(),
      content: newSectionContent.trim(),
    });
    setNewSectionTitle('');
    setNewSectionContent('');
    setIsAddSectionModalOpen(false);
  };

  // Handle Delete Page
  const handleDeleteCurrentPage = () => {
    if (state.businessPages.length <= 1) {
      alert('يجب الإبقاء على صفحة واحدة على الأقل لإدارتها.');
      return;
    }
    if (window.confirm(`هل أنت متأكد من حذف صفحة «${selectedPage.nameAr || selectedPage.name}» نهائياً؟`)) {
      deleteBusinessPage(selectedPage.id);
    }
  };

  // Filtered Posts
  const pagePosts = state.contentPosts.filter((p) => p.pageId === selectedPage.id);
  const filteredPosts = pagePosts.filter((post) => {
    if (filterPlatform !== 'all' && post.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && post.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchCaption = post.caption.toLowerCase().includes(q);
      const matchTag = post.hashtags.some((h) => h.toLowerCase().includes(q));
      if (!matchTitle && !matchCaption && !matchTag) return false;
    }
    return true;
  });

  // Page Campaigns
  const pageCampaigns = state.adCampaigns.filter((c) => c.pageId === selectedPage.id);

  // Character & Reading metrics for Post Maker
  const charCount = postCaption.length;
  const wordCount = postCaption.trim() ? postCaption.trim().split(/\s+/).length : 0;
  const estimatedReadSec = Math.ceil(wordCount / 3.5);

  const getPlatformCharLimit = (plat: PlatformType) => {
    switch (plat) {
      case 'x':
        return 280;
      case 'instagram':
        return 2200;
      case 'tiktok':
        return 2200;
      case 'facebook':
        return 63206;
      case 'linkedin':
        return 3000;
      default:
        return 5000;
    }
  };
  const platformLimit = getPlatformCharLimit(postPlatform);
  const isOverLimit = charCount > platformLimit;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner & Dynamic Page Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold"
                style={{ backgroundColor: selectedPage.color || '#3b82f6' }}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">{selectedPage.nameAr || selectedPage.name}</h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedPage.name}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-0.5">{selectedPage.taglineAr || selectedPage.tagline || selectedPage.descriptionAr}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions & AI Audit Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerAudit}
              disabled={isAuditRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isAuditRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جارٍ الفحص الذكي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>تدقيق الذكاء الاصطناعي واقتراح التحسينات</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAddPageModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition-all border border-indigo-400/30 shadow"
            >
              <FolderPlus className="w-4 h-4" />
              <span>إضافة صفحة جديدة</span>
            </button>

            {state.businessPages.length > 1 && (
              <button
                onClick={handleDeleteCurrentPage}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all border border-red-500/20"
                title="حذف هذه الصفحة"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Pages Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0 ml-2">الصفحات:</span>
          {state.businessPages.map((page) => {
            const isSelected = page.id === selectedPage.id;
            return (
              <button
                key={page.id}
                onClick={() => setSelectedPageId(page.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-md scale-102 font-black'
                    : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: page.color || '#3b82f6' }} />
                <span>{page.nameAr || page.name}</span>
                {isSelected && <Check className="w-3 h-3 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('strategy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'strategy'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>المربعات الاستراتيجية والتوافق</span>
        </button>

        <button
          onClick={() => setActiveTab('maker')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'maker'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>محرر وصانع المنشورات</span>
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'posts'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>جدول المنشورات ({pagePosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-black'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>تقرير فحص الذكاء الاصطناعي</span>
        </button>

        <button
          onClick={() => setActiveTab('frameworks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'frameworks'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>نماذج وقوالب الصياغة (Copywriting)</span>
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'campaigns'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>الحملات الممولة ({pageCampaigns.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: STRATEGY & CUSTOM BLOCKS (مربعات فارغة للتعبئة والتخصيص)
          ========================================================================= */}
      {activeTab === 'strategy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500" />
                <span>المربعات التوثيقية والاستراتيجية لصفحة ({selectedPage.nameAr || selectedPage.name})</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                املأ المربعات أدناه بما تريده بحرية، أو أضف مربعات مخصصة جديدة لكتابة أي أفكار أو اتفاقات إضافية.
              </p>
            </div>

            <button
              onClick={() => setIsAddSectionModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مربع / قسم جديد</span>
            </button>
          </div>

          {/* Grid of Core Strategic Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block 1: ماذا تم بالاتفاق؟ */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">ماذا تم بالاتفاق؟</h3>
                    <p className="text-xs text-slate-400">القرارات المتفق عليها وخطط العمل المشتركة</p>
                  </div>
                </div>
              </div>
              <textarea
                value={selectedPage.agreementsAndDecisions || ''}
                onChange={(e) =>
                  updateBusinessPage({
                    ...selectedPage,
                    agreementsAndDecisions: e.target.value,
                  })
                }
                placeholder="اكتب هنا ما تم الاتفاق عليه بخصوص إدارة الصفحة، المهام، شروط النشر، وأسلوب التفاعل..."
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              />
            </div>

            {/* Block 2: ما هو الهدف؟ */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">ما هو الهدف والرؤية؟</h3>
                    <p className="text-xs text-slate-400">النتائج المستهدفة ومؤشرات النجاح الرئيسية (KPIs)</p>
                  </div>
                </div>
              </div>
              <textarea
                value={selectedPage.mainGoalAndVision || ''}
                onChange={(e) =>
                  updateBusinessPage({
                    ...selectedPage,
                    mainGoalAndVision: e.target.value,
                  })
                }
                placeholder="اكتب هنا الهدف الرئيسي للصفحة، المستهدفات الرقمية، رؤية النمو، وبناء الجمهور..."
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
              />
            </div>

            {/* Block 3: ما هي الدراسات التي درسناها؟ */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                    📊
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">ما هي الدراسات والأبحاث التي درسناها؟</h3>
                    <p className="text-xs text-slate-400">تحليلات السوق، سلوك الجمهور المستهدف، والمنافسين</p>
                  </div>
                </div>
              </div>
              <textarea
                value={selectedPage.studiesAndResearch || ''}
                onChange={(e) =>
                  updateBusinessPage({
                    ...selectedPage,
                    studiesAndResearch: e.target.value,
                  })
                }
                placeholder="اكتب هنا ملخص دراسات السوق، سلوك المتابعين، أفضل أوقات النشر، والملاحظات المستخلصة من التجارب..."
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed"
              />
            </div>

            {/* Block 4: ما هي أهم الأشياء والأولويات؟ */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    ⭐
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">ما هي أهم الأشياء والأولويات؟</h3>
                    <p className="text-xs text-slate-400">الركائز الأساسية والمبادئ التي لا يجب التنازل عنها</p>
                  </div>
                </div>
              </div>
              <textarea
                value={selectedPage.topPrioritiesAndEssentials || ''}
                onChange={(e) =>
                  updateBusinessPage({
                    ...selectedPage,
                    topPrioritiesAndEssentials: e.target.value,
                  })
                }
                placeholder="اكتب هنا الأولويات العاجلة، المعايير الذهبية لجودة المحتوى، وخطوات التنفيذ الأساسية..."
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* User-Added Custom Blocks */}
          {selectedPage.customSections && selectedPage.customSections.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>المربعات المخصصة الإضافية ({selectedPage.customSections.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedPage.customSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) =>
                            updateCustomPageSection(selectedPage.id, sec.id, {
                              title: e.target.value,
                            })
                          }
                          placeholder="عنوان المربع..."
                          className="font-bold text-slate-900 dark:text-white text-sm bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1"
                        />
                      </div>
                      <button
                        onClick={() => deleteCustomPageSection(selectedPage.id, sec.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        title="حذف هذا المربع"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      value={sec.content}
                      onChange={(e) =>
                        updateCustomPageSection(selectedPage.id, sec.id, {
                          content: e.target.value,
                        })
                      }
                      placeholder="اكتب هنا أي تفاصيل، روابط، ملاحظات، أو أفكار مخصصة..."
                      rows={5}
                      className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Details & Audience Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>بيانات الجمهور ونبرة الصوت المعتمدة للصفحة</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1.5">
                <span className="text-slate-400 font-medium">الجمهور المستهدف:</span>
                <p className="text-slate-200 leading-relaxed font-semibold">
                  {selectedPage.targetAudience || 'لم يتم تحديده بعد'}
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-1.5">
                <span className="text-slate-400 font-medium">نبرة الصوت والأسلوب:</span>
                <p className="text-slate-200 leading-relaxed font-semibold">
                  {selectedPage.toneOfVoice || 'احترافية وملهمة'}
                </p>
              </div>
            </div>

            {selectedPage.defaultHashtags && selectedPage.defaultHashtags.length > 0 && (
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 ml-2">الهاشتاجات المعتمدة:</span>
                {selectedPage.defaultHashtags.map((ht, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono"
                  >
                    {ht}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: AI PAGE AUDIT REPORT (فحص الذكاء الاصطناعي واقتراح التحسينات)
          ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    تدقيق الذكاء الاصطناعي لصفحة «{selectedPage.nameAr || selectedPage.name}»
                  </h2>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  تحليل عميق لجودة المحتوى، معدل التفاعل، والفرص الذهبية لتطوير الأداء.
                </p>
              </div>

              <button
                onClick={handleTriggerAudit}
                disabled={isAuditRunning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isAuditRunning ? 'animate-spin' : ''}`} />
                <span>إعادة التدقيق والتحديث</span>
              </button>
            </div>

            {/* Score Gauges */}
            {auditReport && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-xs font-bold text-slate-400">التقييم الشامل للمحتوى</span>
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    {auditReport.overallScore}/100
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditReport.overallScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-xs font-bold text-slate-400">مؤشر جودة وتنوع المحتوى</span>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {auditReport.contentQualityScore}/100
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditReport.contentQualityScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-xs font-bold text-slate-400">توقع التفاعل والوصول</span>
                  <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {auditReport.engagementScore}/100
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditReport.engagementScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Audit Details */}
          {auditReport ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-500" />
                  <span>الملخص الاستراتيجي للنمو</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {auditReport.summary}
                </p>
              </div>

              {/* Strengths & Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl space-y-3">
                  <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>نقاط القوة الحالية</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {auditReport.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl space-y-3">
                  <h3 className="font-bold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>فرص التحسين ومضاعفة الوصول</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {auditReport.weaknessesOrOpportunities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">⚡</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>خطوات وتوصيات عملية قابلة للتنفيذ الفوري</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {auditReport.actionableRecommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested High-Converting Post Ideas with 1-Click Apply */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>3 أفكار منشورات مقترحة ذات تحويل وتفاعل عالٍ</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      اضغط على «استخدام الفكرة» لفتحها في صانع المنشورات وضبطها وجدولتها فوراً.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {auditReport.suggestedPostIdeas.map((idea, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                          {idea.targetFormat}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">
                          {idea.hook}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                          {idea.concept}
                        </p>
                        <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-700">
                          <span className="font-semibold text-slate-500">CTA:</span> {idea.callToAction}
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyPostIdea(idea)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>استخدام الفكرة في المحرر</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto opacity-70 animate-bounce" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                ابدأ التدقيق الذكي الآن
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                اضغط على زر الفحص بالذكاء الاصطناعي لتحليل منشورات وهوية صفحة «{selectedPage.nameAr || selectedPage.name}» والحصول على توصيات وأفكار حصرية.
              </p>
              <button
                onClick={handleTriggerAudit}
                disabled={isAuditRunning}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                تشغيل التدقيق الذكي الآن
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: POST MAKER (محرر وصانع المنشورات)
          ========================================================================= */}
      {activeTab === 'maker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Post Editor Form */}
          <div className="lg:col-span-2 space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-500" />
                <span>{postEditingId ? 'تعديل المنشور' : 'كتابة وصناعة منشور جديد'}</span>
              </h2>

              <div className="flex items-center gap-2">
                <select
                  value={postPlatform}
                  onChange={(e) => setPostPlatform(e.target.value as PlatformType)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="instagram">إنستجرام (Instagram)</option>
                  <option value="facebook">فيسبوك (Facebook)</option>
                  <option value="x">منصة إكس (X / Twitter)</option>
                  <option value="linkedin">لينكد إن (LinkedIn)</option>
                  <option value="tiktok">تيك توك (TikTok)</option>
                  <option value="telegram">تليجرام (Telegram)</option>
                </select>

                <select
                  value={postFormat}
                  onChange={(e) => setPostFormat(e.target.value as PostFormatType)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="post">منشور عادي (Post)</option>
                  <option value="carousel">كاروسيل سلايدات (Carousel)</option>
                  <option value="reels_script">سيناريو ريلز (Reels Script)</option>
                  <option value="ad_copy">نص إعلاني (Ad Copy)</option>
                  <option value="story">ستوري (Story)</option>
                  <option value="article">مقال طويل (Article)</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان أو خطاف المنشور الداخلي:
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="مثال: «5 كتب تغير طريقة تفكيرك» أو خطاف جذاب..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    نص المنشور الكامل (Caption):
                  </label>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-slate-400">
                      الكلمات: <strong className="text-slate-700 dark:text-slate-300">{wordCount}</strong>
                    </span>
                    <span className="text-slate-400">
                      وقت القراءة: <strong className="text-slate-700 dark:text-slate-300">{estimatedReadSec}ث</strong>
                    </span>
                    <span className={`font-mono font-bold ${isOverLimit ? 'text-red-500' : 'text-slate-400'}`}>
                      {charCount}/{platformLimit}
                    </span>
                  </div>
                </div>
                <textarea
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="اكتب هنا نص المنشور كاملاً مع الخطاف والمحتوى والدعوة للإجراء..."
                  rows={9}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans leading-relaxed"
                />
              </div>

              {/* Hashtags & CTA Helpers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      الهاشتاجات:
                    </label>
                    {selectedPage.defaultHashtags && (
                      <button
                        type="button"
                        onClick={() =>
                          setPostHashtags((prev) =>
                            prev ? `${prev} ${selectedPage.defaultHashtags.join(' ')}` : selectedPage.defaultHashtags.join(' ')
                          )
                        }
                        className="text-[10px] text-indigo-500 hover:underline font-bold"
                      >
                        + إدراج هاشتاجات الصفحة
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={postHashtags}
                    onChange={(e) => setPostHashtags(e.target.value)}
                    placeholder="#سوق_الكتاب #قراءة #تطوير"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الدعوة لاتخاذ إجراء (Call to Action - CTA):
                  </label>
                  <input
                    type="text"
                    value={postCta}
                    onChange={(e) => setPostCta(e.target.value)}
                    placeholder="مثال: احفظ المنشور وشاركه مع أصدقائك..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Image & Creative Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ملاحظات التصميم أو الصورة المرافقة:
                </label>
                <input
                  type="text"
                  value={postImageNotes}
                  onChange={(e) => setPostImageNotes(e.target.value)}
                  placeholder="مثال: تصميم كاروسيل أزرق من 5 كروت مع غلاف الكتاب..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Date & Time Scheduling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تاريخ النشر:
                  </label>
                  <input
                    type="date"
                    value={postScheduledDate}
                    onChange={(e) => setPostScheduledDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    وقت النشر:
                  </label>
                  <input
                    type="time"
                    value={postScheduledTime}
                    onChange={(e) => setPostScheduledTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                {postEditingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setPostEditingId(null);
                      setPostTitle('');
                      setPostCaption('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
                  >
                    إلغاء التعديل
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{postEditingId ? 'حفظ التعديلات' : 'حفظ في جدول المنشورات'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Mobile Feed Preview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>معاينة المنشور الحية على {postPlatform}</span>
            </h3>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs"
                    style={{ backgroundColor: selectedPage.color || '#3b82f6' }}
                  >
                    {selectedPage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {selectedPage.nameAr || selectedPage.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 capitalize">
                      @{selectedPage.name.replace(/\s+/g, '')} • الآن
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400">•••</span>
              </div>

              {/* Mock Media Box */}
              <div className="w-full aspect-video rounded-2xl bg-gradient-to-tr from-slate-800 to-indigo-950 border border-slate-700 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-bold text-indigo-300">{postTitle || 'عنوان المنشور والتصميم'}</span>
                <span className="text-[10px] text-slate-400 mt-1">{postImageNotes || 'الملاحظات البصرية للتصميم'}</span>
              </div>

              {/* Caption Text */}
              <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto pr-1">
                {postCaption || 'اكتب نص المنشور في المحرر لمعاينته فوراً هنا...'}
              </div>

              {postHashtags && (
                <div className="text-[11px] text-indigo-500 dark:text-indigo-400 font-mono">
                  {postHashtags}
                </div>
              )}

              {postCta && (
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{postCta}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SCHEDULED POSTS LIST (قائمة وجدول المنشورات)
          ========================================================================= */}
      {activeTab === 'posts' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في نصوص وعناوين المنشورات..."
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">كافة المنصات</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="x">X (Twitter)</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">كافة الحالات</option>
                <option value="draft">مسودة</option>
                <option value="scheduled">مجدول</option>
                <option value="published">تم النشر</option>
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">لا توجد منشورات مطابقة</h3>
              <p className="text-xs text-slate-400">ابدأ بإنشاء منشور جديد في صانع المنشورات أو استخدم أحد النماذج التسويقية.</p>
              <button
                onClick={() => setActiveTab('maker')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                صناعة منشور الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                          {post.platform}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {post.format}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.scheduledDate}</span>
                        {post.scheduledTime && <span>({post.scheduledTime})</span>}
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {post.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                      {post.caption}
                    </p>

                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[10px] text-indigo-500 font-mono">
                        {post.hashtags.slice(0, 4).map((h, i) => (
                          <span key={i}>{h}</span>
                        ))}
                        {post.hashtags.length > 4 && <span>+{post.hashtags.length - 4}</span>}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => convertPostToTask(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all"
                      title="تحويل إلى مهمة مجدولة في منظم يومي"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{post.convertedToTaskId ? 'مضاف في يومي ✓' : 'تحويل لمهمة في يومي'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(post.caption, post.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        title="نسخ النص"
                      >
                        {copiedId === post.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setPostEditingId(post.id);
                          setPostTitle(post.title);
                          setPostCaption(post.caption);
                          setPostFormat(post.format);
                          setPostPlatform(post.platform);
                          setPostScheduledDate(post.scheduledDate);
                          setPostScheduledTime(post.scheduledTime || '18:00');
                          setPostHashtags(post.hashtags.join(' '));
                          setPostCta(post.cta || '');
                          setPostImageNotes(post.imageNotes || '');
                          setActiveTab('maker');
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors"
                        title="تعديل المنشور"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 5: COPYWRITING FRAMEWORKS (نماذج وقوالب الصياغة)
          ========================================================================= */}
      {activeTab === 'frameworks' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 text-xs text-indigo-700 dark:text-indigo-300">
            💡 <strong>نماذج الصياغة الإعلانية المعتمدة:</strong> نماذج مجربة علمياً لزيادة التحويلات والتفاعل. اضغط على «استخدام النموذج» ليتم تحميله فوراً في صانع المنشورات.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COPY_FRAMEWORKS.map((fw) => (
              <div
                key={fw.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{fw.nameAr}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {fw.name}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{fw.tagline}</p>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                    {fw.template}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleCopy(fw.template, fw.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    {copiedId === fw.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ القالب</span>
                  </button>

                  <button
                    onClick={() => applyFramework(fw)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>استخدام النموذج في المحرر</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: AD CAMPAIGNS & BUDGETS (الحملات الإعلانية الممولة)
          ========================================================================= */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                الحملات الإعلانية الممولة لصفحة ({selectedPage.nameAr || selectedPage.name})
              </h2>
              <p className="text-xs text-slate-400">تخطيط الميزانية، نسخ الإعلانات A/B Testing، واستهداف الجماهير.</p>
            </div>

            <button
              onClick={() => setIsAddCampaignOpen(!isAddCampaignOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء حملة جديدة</span>
            </button>
          </div>

          {isAddCampaignOpen && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">تخطيط حملة إعلانية ممولة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">اسم الحملة:</label>
                  <input
                    type="text"
                    value={campName}
                    onChange={(e) => setCampName(e.target.value)}
                    placeholder="مثال: حملة باقة الكتب الأكثر مبيعاً..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">الميزانية:</label>
                  <input
                    type="number"
                    value={campBudget}
                    onChange={(e) => setCampBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">الهدف الإعلاني:</label>
                  <select
                    value={campObjective}
                    onChange={(e) => setCampObjective(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                  >
                    <option value="conversions">تحويلات ومبيعات (Conversions)</option>
                    <option value="traffic">زيارات للموقع (Traffic)</option>
                    <option value="engagement">تفاعل وتنزيل (Engagement)</option>
                    <option value="lead_generation">جمع بيانات العملاء (Leads)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-500">النسخة الإعلانية الأولى (Variant A)</h4>
                  <input
                    type="text"
                    value={campHeadlineA}
                    onChange={(e) => setCampHeadlineA(e.target.value)}
                    placeholder="العنوان الرئيسي للإعلان A..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                  />
                  <textarea
                    value={campPrimaryTextA}
                    onChange={(e) => setCampPrimaryTextA(e.target.value)}
                    placeholder="النص الإعلاني الأساسي للنسخة A..."
                    rows={3}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs resize-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-xs text-amber-500">النسخة الإعلانية الثانية (Variant B)</h4>
                  <input
                    type="text"
                    value={campHeadlineB}
                    onChange={(e) => setCampHeadlineB(e.target.value)}
                    placeholder="العنوان الرئيسي للإعلان B..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                  />
                  <textarea
                    value={campPrimaryTextB}
                    onChange={(e) => setCampPrimaryTextB(e.target.value)}
                    placeholder="النص الإعلاني الأساسي للنسخة B..."
                    rows={3}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAddCampaignOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    if (!campName.trim()) return;
                    addAdCampaign({
                      pageId: selectedPage.id,
                      campaignName: campName,
                      budget: campBudget,
                      currency: campCurrency,
                      objective: campObjective,
                      targetAudienceDetails: campAudience || selectedPage.targetAudience || '',
                      status: 'planning',
                      startDate: getTodayString(),
                      endDate: getTodayString(),
                      adCopies: [
                        {
                          variant: 'A',
                          headline: campHeadlineA || campName,
                          primaryText: campPrimaryTextA || '',
                          callToAction: campCtaA,
                          angle: 'عرض مباشر وخصم',
                        },
                        {
                          variant: 'B',
                          headline: campHeadlineB || campName,
                          primaryText: campPrimaryTextB || '',
                          callToAction: campCtaB,
                          angle: 'قيمة وفائدة',
                        },
                      ],
                    });
                    setIsAddCampaignOpen(false);
                    setCampName('');
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  حفظ الحملة
                </button>
              </div>
            </div>
          )}

          {pageCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{camp.campaignName}</h3>
                  <span className="text-xs text-slate-400">
                    الميزانية: {camp.budget} {camp.currency} • الهدف: {camp.objective}
                  </span>
                </div>
                <button
                  onClick={() => deleteAdCampaign(camp.id)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {camp.adCopies.map((copy, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1"
                  >
                    <span className="font-bold text-indigo-500">نسخة {copy.variant}:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{copy.headline}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">{copy.primaryText}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW BUSINESS PAGE (إضافة صفحة جديدة بحرية)
          ========================================================================= */}
      {isAddPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-500" />
                <span>إضافة صفحة جديدة لإدارتها</span>
              </h3>
              <button
                onClick={() => setIsAddPageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">اسم الصفحة (بالعربية):</label>
                <input
                  type="text"
                  value={newPageNameAr}
                  onChange={(e) => setNewPageNameAr(e.target.value)}
                  placeholder="مثال: متجر الروايات أو مجتمع المبرمجين..."
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">اسم الصفحة (بالإنجليزية):</label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="مثال: Novels Store or Tech Hub..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">الشعار أو النبذة التعريفية:</label>
                <input
                  type="text"
                  value={newPageTaglineAr}
                  onChange={(e) => setNewPageTaglineAr(e.target.value)}
                  placeholder="مثال: المجتمع الأول للقراء والروايات النادرة..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">الجمهور المستهدف:</label>
                <input
                  type="text"
                  value={newPageAudience}
                  onChange={(e) => setNewPageAudience(e.target.value)}
                  placeholder="مثال: محبو الروايات وطلاب الأدب من عمر 18-35..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">نبرة الصوت المعتمدة:</label>
                <input
                  type="text"
                  value={newPageTone}
                  onChange={(e) => setNewPageTone(e.target.value)}
                  placeholder="مثال: أدبية، دافئة، تفاعلية، ملهمة..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">اللون المميز:</label>
                  <input
                    type="color"
                    value={newPageColor}
                    onChange={(e) => setNewPageColor(e.target.value)}
                    className="w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">التصنيف:</label>
                  <select
                    value={newPageCategory}
                    onChange={(e) => setNewPageCategory(e.target.value)}
                    className="w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 text-xs"
                  >
                    <option value="custom">مخصص (Custom)</option>
                    <option value="ecommerce_books">كتب وتجارة إلكترونية</option>
                    <option value="advertising">إعلانات وتسويق</option>
                    <option value="technology">تقنية وبرمجيات</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddPageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  إضافة الصفحة الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD CUSTOM SECTION (إضافة مربع فارغ مخصص)
          ========================================================================= */}
      {isAddSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-500" />
                <span>إضافة مربع استراتيجي فارغ جديد</span>
              </h3>
              <button
                onClick={() => setIsAddSectionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSection} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">عنوان المربع / القسم:</label>
                <input
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="مثال: شروط الرعاة، أفكار الفيديو، دراسة الأسعار..."
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">المحتوى الأولي (اختياري):</label>
                <textarea
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                  placeholder="اكتب هنا ما تريده أو اتركه فارغاً لتملأه لاحقاً..."
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  إضافة المربع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
