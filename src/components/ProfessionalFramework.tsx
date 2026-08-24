/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ④ الهوية المهنية ونظام النمو (الهيكل المهني - Professional Framework & Growth)
 */

import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Calendar,
  BookOpen,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Check,
  Star,
  Zap,
  ArrowRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProfessionalProfile, WeeklyReviewSession, SkillRoadmapItem, CaseStudy } from '../types';
import { getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';

export const ProfessionalFramework: React.FC = () => {
  const {
    state,
    t,
    updateProfessionalProfile,
    addWeeklyReview,
    addSkillRoadmapItem,
    updateSkillRoadmapItem,
    deleteSkillRoadmapItem,
    setIsCaseStudyModalOpen,
    setActiveCaseStudyForModal,
    triggerConfetti,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'positioning' | 'review' | 'skills' | 'cases'>('positioning');

  // Positioning Profile State
  const profile = state.professionalProfile;
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [title, setTitle] = useState(profile.title);
  const [positioningStatement, setPositioningStatement] = useState(profile.positioningStatement);
  const [idealClientDescription, setIdealClientDescription] = useState(profile.idealClientDescription);
  const [coreValuePillars, setCoreValuePillars] = useState(profile.coreValuePillars.join('\n'));
  const [coreSkillsInput, setCoreSkillsInput] = useState(profile.coreSkills.join(', '));

  // Weekly Review Form State
  const [weekWins, setWeekWins] = useState('');
  const [weekChallenges, setWeekChallenges] = useState('');
  const [weekLessons, setWeekLessons] = useState('');
  const [weekNextFocus, setWeekNextFocus] = useState('');
  const [weekRating, setWeekRating] = useState(5);

  // Skill Roadmap Form State
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [skillTargetMastery, setSkillTargetMastery] = useState(85);
  const [skillResources, setSkillResources] = useState('');
  const [skillActionSteps, setSkillActionSteps] = useState('');

  const handleSaveProfile = () => {
    updateProfessionalProfile({
      title,
      positioningStatement,
      idealClientDescription,
      coreValuePillars: coreValuePillars.split('\n').filter(Boolean),
      coreSkills: coreSkillsInput.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setIsEditingProfile(false);
    triggerConfetti();
  };

  const handleSaveWeeklyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weekWins.trim()) return;

    const start = new Date();
    start.setDate(start.getDate() - 6);
    const dateRange = `${start.toISOString().split('T')[0]} إلى ${getTodayString()}`;

    addWeeklyReview({
      dateRange,
      wins: weekWins,
      challenges: weekChallenges,
      lessons: weekLessons,
      nextWeekFocus: weekNextFocus,
      rating: weekRating,
    });

    setWeekWins('');
    setWeekChallenges('');
    setWeekLessons('');
    setWeekNextFocus('');
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    addSkillRoadmapItem({
      skillName,
      category: skillCategory || 'مهارات استراتيجية',
      currentLevel: 'intermediate',
      targetMastery: skillTargetMastery,
      learningResources: skillResources.split(',').map((r) => r.trim()).filter(Boolean),
      actionSteps: skillActionSteps.split('\n').filter(Boolean),
    });

    setIsAddSkillOpen(false);
    setSkillName('');
    setSkillResources('');
    setSkillActionSteps('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>الهيكل المهني ونظام النمو (Professional Framework)</span>
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 font-serif-arabic">
            هويتك المهنية وخارطة التميز
          </h1>
          <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-2xl">
            إطار متكامل لضبط موقعك الاستراتيجي في السوق، مراجعة إنجازاتك الأسبوعية، وتوثيق قصص نجاحك.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveCaseStudyForModal(null);
            setIsCaseStudyModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 self-start md:self-auto"
        >
          <Award className="w-4 h-4" />
          <span>باني دراسة الحالة الجديد</span>
        </button>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('positioning')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'positioning'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>الموقع المهني والرسالة (Positioning)</span>
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'review'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>المراجعة الأسبوعية المنضبطة (Weekly Review)</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'skills'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>خارطة المهارات وخطة التعلم ({state.skillsRoadmap.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'cases'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>دراسات الحالة المعتمدة ({state.caseStudies.length})</span>
        </button>
      </div>

      {/* Tab 1: Positioning */}
      {activeTab === 'positioning' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  بيان التموضع الاستراتيجي وعرض القيمة
                </h2>
                <p className="text-xs text-slate-400">
                  كيف تعرف عن نفسك، من هو عميلك المثالي، وما هي الميزة التنافسية التي تقدمها؟
                </p>
              </div>

              <button
                onClick={() => {
                  if (isEditingProfile) {
                    handleSaveProfile();
                  } else {
                    setIsEditingProfile(true);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isEditingProfile
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {isEditingProfile ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                <span>{isEditingProfile ? 'حفظ التعديلات' : 'تعديل البيانات'}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">المسمى المهني / الدور:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">بيان التموضع وعرض القيمة (Positioning Statement):</label>
                  <textarea
                    rows={3}
                    value={positioningStatement}
                    onChange={(e) => setPositioningStatement(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">العميل المثالي (Ideal Client Profile):</label>
                  <textarea
                    rows={2}
                    value={idealClientDescription}
                    onChange={(e) => setIdealClientDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">ركائز القيمة الأساسية (سطر لكل ركيزة):</label>
                  <textarea
                    rows={3}
                    value={coreValuePillars}
                    onChange={(e) => setCoreValuePillars(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">المهارات الجوهرية (مفصولة بفواصل):</label>
                  <input
                    type="text"
                    value={coreSkillsInput}
                    onChange={(e) => setCoreSkillsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      الدور والمسمى المهني
                    </div>
                    <div className="text-lg font-bold text-slate-100 font-serif-arabic">{profile.title}</div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                      عرض القيمة والتموضع (Positioning Statement)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {profile.positioningStatement}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                      العميل المثالي (Ideal Client Profile)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {profile.idealClientDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="text-[11px] text-purple-400 font-bold uppercase tracking-wider">
                      ركائز القيمة الجوهرية (Value Pillars)
                    </div>
                    <div className="space-y-2">
                      {profile.coreValuePillars.map((pillar, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      حزمة المهارات المعتمدة (Core Skillstack)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.coreSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Weekly Review */}
      {activeTab === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Review Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form
              onSubmit={handleSaveWeeklyReview}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h2 className="text-sm font-bold text-slate-100">جلسة المراجعة الأسبوعية المنضبطة</h2>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setWeekRating(star)}
                      className={`text-sm ${weekRating >= star ? 'text-amber-400' : 'text-slate-600'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-emerald-400 font-semibold mb-1">
                    1. ما تم إنجازه وغلقه بنجاح هذا الأسبوع (Wins & Closures):
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={weekWins}
                    onChange={(e) => setWeekWins(e.target.value)}
                    placeholder="أهم المهام والمشاريع والمخرجات المكتملة..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-1">
                    2. التحديات وعوامل التشتت (Challenges & Friction):
                  </label>
                  <textarea
                    rows={2}
                    value={weekChallenges}
                    onChange={(e) => setWeekChallenges(e.target.value)}
                    placeholder="ما الذي عطل التقدم أو سبب ضغطاً؟..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 font-semibold mb-1">
                    3. الدروس المستفادة والتحسينات المنهجية (Lessons):
                  </label>
                  <textarea
                    rows={2}
                    value={weekLessons}
                    onChange={(e) => setWeekLessons(e.target.value)}
                    placeholder="ما الدرس القابل للتطبيق في الأسبوع القادم؟..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-blue-400 font-semibold mb-1">
                    4. التركيز الاستراتيجي للأسبوع القادم (Next Week Focus):
                  </label>
                  <textarea
                    rows={2}
                    value={weekNextFocus}
                    onChange={(e) => setWeekNextFocus(e.target.value)}
                    placeholder="ما هي الـ 3 نتائج الكبرى المطلوب تحقيقها؟..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    حفظ وأرشفة المراجعة الأسبوعية
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Historical Reviews Archive (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300">أرشيف المراجعات الأسبوعية السابقة</h3>

            <div className="space-y-3">
              {state.weeklyReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">{rev.dateRange}</span>
                    <span className="text-amber-400 font-bold">{'★'.repeat(rev.rating)}</span>
                  </div>

                  <div>
                    <div className="text-emerald-400 font-semibold text-[11px]">أهم الإنجازات:</div>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">{rev.wins}</p>
                  </div>

                  <div>
                    <div className="text-blue-400 font-semibold text-[11px]">التركيز القادم:</div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{rev.nextWeekFocus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Skill Roadmap */}
      {activeTab === 'skills' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-200">خارطة المهارات وخطة التعلم والتمكن</h2>
              <p className="text-xs text-slate-400">تطوير مستمر للأدوات الإستراتيجية والهندسية لتوسيع قيمتك السوقية</p>
            </div>

            <button
              onClick={() => setIsAddSkillOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مهارة لخارطة التعلم</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.skillsRoadmap.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-bold">
                    {item.category}
                  </span>
                  <button
                    onClick={() => deleteSkillRoadmapItem(item.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-100">{item.skillName}</h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>معدل الإتقان المستهدف:</span>
                    <span className="font-mono text-amber-400 font-bold">{item.targetMastery}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-800">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${item.targetMastery}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block text-[10px]">المصادر المعتمدة:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.learningResources.map((res, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold block text-[10px]">الخطوات التطبيقية:</span>
                    <div className="space-y-1 mt-1">
                      {item.actionSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Skill Modal */}
          {isAddSkillOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-100">
                <h3 className="text-sm font-bold text-slate-200">إضافة مهارة جديدة لخارطة النمو</h3>

                <form onSubmit={handleCreateSkill} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">اسم المهارة:</label>
                    <input
                      type="text"
                      required
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      placeholder="مثال: هندسة التموضع وإغلاق الصفقات"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">التصنيف:</label>
                    <input
                      type="text"
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      placeholder="استراتيجية، كتابة إعلانية، هندسة برمجية..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">نسبة الإتقان المستهدفة (%):</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={skillTargetMastery}
                      onChange={(e) => setSkillTargetMastery(parseInt(e.target.value) || 80)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">مصادر التعلم (مفصولة بفواصل):</label>
                    <input
                      type="text"
                      value={skillResources}
                      onChange={(e) => setSkillResources(e.target.value)}
                      placeholder="كتب، دراسات، تجارب واقعية..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">الخطوات التطبيقية (سطر لكل خطوة):</label>
                    <textarea
                      rows={2}
                      value={skillActionSteps}
                      onChange={(e) => setSkillActionSteps(e.target.value)}
                      placeholder="خطوة 1...\nخطوة 2..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddSkillOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                    >
                      إضافة المهارة
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Approved Case Studies Showcase */}
      {activeTab === 'cases' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-200">معرض دراسات الحالة المعتمدة وقصص النجاح</h2>
              <p className="text-xs text-slate-400">وثائق الإثبات بالأرقام والنتائج لإثبات القيمة وإغلاق المشاريع الجديدة</p>
            </div>

            <button
              onClick={() => {
                setActiveCaseStudyForModal(null);
                setIsCaseStudyModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء دراسة حالة جديدة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.caseStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => {
                  setActiveCaseStudyForModal(study);
                  setIsCaseStudyModalOpen(true);
                }}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    {study.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{study.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors font-serif-arabic">
                    {study.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">العميل: {study.clientName}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-emerald-400 font-semibold block text-[11px] mb-0.5">
                      الأثر بالأرقام والنتائج:
                    </span>
                    <p className="text-slate-300 font-mono text-[11px]">{study.impactMetrics}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <div className="flex gap-1">
                    {study.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                    <span>فتح واستعراض</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
