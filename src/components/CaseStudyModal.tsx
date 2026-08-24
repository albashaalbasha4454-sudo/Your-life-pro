/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Case Study Builder & Showcase Modal
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Award,
  CheckCircle2,
  Copy,
  Download,
  Share2,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Check,
  Edit3,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaseStudy } from '../types';
import { getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';

export const CaseStudyModal: React.FC = () => {
  const {
    state,
    isCaseStudyModalOpen,
    setIsCaseStudyModalOpen,
    activeCaseStudyForModal,
    setActiveCaseStudyForModal,
    addCaseStudy,
    updateCaseStudy,
    triggerConfetti,
  } = useApp();

  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const [copied, setCopied] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [impactMetrics, setImpactMetrics] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (activeCaseStudyForModal) {
      setTitle(activeCaseStudyForModal.title);
      setClientName(activeCaseStudyForModal.clientName);
      setCategory(activeCaseStudyForModal.category);
      setProblem(activeCaseStudyForModal.problem);
      setSolution(activeCaseStudyForModal.solution);
      setImpactMetrics(activeCaseStudyForModal.impactMetrics);
      setLessonsLearned(activeCaseStudyForModal.lessonsLearned);
      setTagsInput(activeCaseStudyForModal.tags?.join(', ') || '');
      setPublished(activeCaseStudyForModal.published);
      setMode('preview');
    } else {
      // New case study template
      setTitle('كيف حققنا نمواً استثنائياً عبر إعادة هيكلة المحتوى وتوثيق القرارات');
      setClientName(state.clients[0]?.nameAr || 'اسم العميل');
      setCategory('استراتيجيات النمو وتطوير الأعمال');
      setProblem('تشتت الرسائل التسويقية وارتفاع تكلفة الاستحواذ مع ضعف التفاعل العضوي.');
      setSolution('تطبيق منهجية دفتر الصباح، صياغة خطافات قوية، واختبار باقات مجمعة عالية القيمة.');
      setImpactMetrics('مضاعفة المبيعات بنسبة +140% ورفع معدل حفظ المحتوى بـ 3 أضعاف مع عائد ROAS يتجاوز 3.8x.');
      setLessonsLearned('توثيق القرارات مع العميل واستهداف حل مشكلته الجذرية هو العامل الحاسم في بناء شراكات مستدامة.');
      setTagsInput('نمو, دراسة_حالة, عروض_مجمعة, كوبي_رايتينغ');
      setPublished(true);
      setMode('edit');
    }
  }, [activeCaseStudyForModal, state.clients, isCaseStudyModalOpen]);

  if (!isCaseStudyModalOpen) return null;

  const handleSave = () => {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const studyData: Omit<CaseStudy, 'id'> = {
      title,
      clientName,
      category,
      problem,
      solution,
      impactMetrics,
      lessonsLearned,
      tags,
      date: activeCaseStudyForModal?.date || getTodayString(),
      published,
    };

    if (activeCaseStudyForModal?.id) {
      updateCaseStudy({ ...studyData, id: activeCaseStudyForModal.id });
    } else {
      addCaseStudy(studyData);
    }

    setMode('preview');
  };

  const formattedExportText = `===============================================================
📄 دراسة حالة مهنية: ${title}
===============================================================
العميل: ${clientName} | المجال: ${category}
التاريخ: ${activeCaseStudyForModal?.date || getTodayString()}
الوسوم: ${tagsInput}

🔴 1. المشكلة والتحدي الأولي (The Problem):
${problem}

🟢 2. الحل الاستراتيجي ومنهجية التنفيذ (The Solution):
${solution}

📊 3. الأثر بالأرقام والنتائج المحققة (Impact & Metrics):
${impactMetrics}

💡 4. الدروس المستفادة والتوصيات (Lessons Learned):
${lessonsLearned}
===============================================================
صادرة وموثقة عبر منصة «يومي - Yawmi» لإدارة العمل المهني
===============================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedExportText);
    setCopied(true);
    sound.playCheck(state.settings.enableSounds);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedExportText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-study-${(title || 'project').toLowerCase().replace(/\s+/g, '-').substring(0, 30)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sound.playCompleteChord(state.settings.enableSounds);
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                باني وموثّق دراسات الحالة (Case Study Builder)
              </h2>
              <p className="text-xs text-slate-400">
                توثيق قصص النجاح بالأرقام والنتائج لإثبات القيمة وإغلاق الصفقات المستقبلية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  mode === 'preview' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                معاينة القصة
              </button>
              <button
                onClick={() => setMode('edit')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1 ${
                  mode === 'edit' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                تحرير المحتوى
              </button>
            </div>

            <button
              onClick={() => {
                setIsCaseStudyModalOpen(false);
                setActiveCaseStudyForModal(null);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
          {mode === 'preview' ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Cover Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                    {category || 'دراسة حالة'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                    العميل: {clientName}
                  </span>
                  {published && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      منشورة في السجل المهني
                    </span>
                  )}
                </div>

                <h1 className="text-xl md:text-2xl font-extrabold text-slate-100 font-serif-arabic leading-snug mb-3">
                  {title}
                </h1>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tagsInput.split(',').map((tag, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Four Pillar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Problem */}
                <div className="bg-slate-900/90 border border-red-500/20 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-3">
                    <span className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center text-xs">1</span>
                    المشكلة والتحدي الأولي (The Challenge)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="bg-slate-900/90 border border-blue-500/20 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs">2</span>
                    الحل الاستراتيجي ومنهجية التنفيذ (The Strategy)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {solution}
                  </p>
                </div>

                {/* 3. Impact & Metrics */}
                <div className="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-3">
                    <TrendingUp className="w-4 h-4" />
                    الأثر بالأرقام والنتائج المحققة (Impact Metrics)
                  </div>
                  <div className="text-xs text-emerald-300 font-medium leading-relaxed whitespace-pre-wrap bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-xl">
                    {impactMetrics}
                  </div>
                </div>

                {/* 4. Lessons Learned */}
                <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-3">
                    <Lightbulb className="w-4 h-4" />
                    الدروس المستفادة والتوصيات (Key Takeaways)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {lessonsLearned}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    عنوان دراسة الحالة (Headliner)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: كيف رفعنا مبيعات المتجر بنسبة 140%..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    اسم العميل / المؤسسة
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: مؤسسة سوق الكتاب"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    المجال / التصنيف
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="مثال: التجارة الإلكترونية وإدارة المحتوى"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الوسوم (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="نمو, إعلانات, استشارات"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-red-400 mb-1">
                  1. المشكلة والتحدي الأولي (Problem Statement)
                </label>
                <textarea
                  rows={3}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="صف بدقة التحدي أو العائق الذي كان يواجهه العميل قبل تدخلك..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 mb-1">
                  2. الحل الاستراتيجي ومنهجية التدخل (Solution & Methodology)
                </label>
                <textarea
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="ما هي الخطوات والأنظمة التي بنيتها لعلاج المشكلة؟..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1">
                  3. الأثر بالأرقام والنتائج المحققة (Impact Metrics)
                </label>
                <textarea
                  rows={2}
                  value={impactMetrics}
                  onChange={(e) => setImpactMetrics(e.target.value)}
                  placeholder="مثال: زيادة المبيعات 140%، ROAS 4.2x، تقليص دورة المبيعات بـ 60%..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-400 mb-1">
                  4. الدروس المستفادة والتوصيات (Lessons Learned)
                </label>
                <textarea
                  rows={2}
                  value={lessonsLearned}
                  onChange={(e) => setLessonsLearned(e.target.value)}
                  placeholder="ما هو المبدأ الجوهري أو الدرس القابل للتكرار في مشاريع قادمة؟..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  حفظ دراسة الحالة وتأكيد النشر
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <div className="text-xs text-slate-400">
            الحالة: <span className="text-emerald-400 font-semibold">جاهزة للأرشفة والمشاركة</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ التقرير'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل المستند (.md)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
