/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Case Study Builder Modal (باني دراسة الحالة المهنية)
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaseStudy } from '../types';

export const CaseStudyBuilderModal: React.FC = () => {
  const {
    isCaseStudyBuilderOpen,
    setIsCaseStudyBuilderOpen,
    targetCaseStudyProject,
    setTargetCaseStudyProject,
    addCaseStudy,
  } = useApp();

  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [impact, setImpact] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [metricsHighlight, setMetricsHighlight] = useState('');
  const [status, setStatus] = useState<'draft' | 'approved' | 'published'>('approved');

  useEffect(() => {
    if (targetCaseStudyProject) {
      setTitle(`دراسة حالة: ${targetCaseStudyProject.title}`);
      setClientName(targetCaseStudyProject.clientName);
      setProblem(targetCaseStudyProject.problem || '');
      setSolution(`تطبيق حل استراتيجي رصين لمعالجة: ${targetCaseStudyProject.problem} مع إتقان مهارة: ${targetCaseStudyProject.acquiredSkill || 'التموضع والتنفيذ'}`);
      setImpact(targetCaseStudyProject.successMetric || 'تحقيق نتائج رقمية ملموسة بنسبة نجاح عالية.');
      setLessonsLearned(`أهمية التخطيط الصباحي وتوثيق القرارات المشتركة لضمان تسليم ميزانية ${targetCaseStudyProject.budget} ${targetCaseStudyProject.currency} في الموعد.`);
      setMetricsHighlight(`الميزانية: ${targetCaseStudyProject.budget} ${targetCaseStudyProject.currency} | نجاح مؤكد`);
    }
  }, [targetCaseStudyProject]);

  if (!isCaseStudyBuilderOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCaseStudy({
      title: title.trim(),
      clientName: clientName.trim() || 'عميل مستقل',
      problem: problem.trim(),
      solution: solution.trim(),
      impact: impact.trim(),
      lessonsLearned: lessonsLearned.trim(),
      metricsHighlight: metricsHighlight.trim(),
      status,
      clientId: targetCaseStudyProject?.clientId,
    });

    setIsCaseStudyBuilderOpen(false);
    setTargetCaseStudyProject(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--paper-card)] border border-[var(--paper-border)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--paper-border)] flex items-center justify-between bg-[var(--paper-2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--olive)]/15 text-[var(--olive)] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic">
                باني دراسة الحالة المهنية (Case Study Builder)
              </h2>
              <p className="text-xs text-[var(--ink-muted)]">
                تحويل نتائج المشروع المنفذ إلى قصة نجاح مهنية موثقة تدعم تموضعك وسلطتك في السوق.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCaseStudyBuilderOpen(false);
              setTargetCaseStudyProject(null);
            }}
            className="p-2 rounded-xl text-[var(--ink-muted)] hover:bg-[var(--paper-border)]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 bg-[var(--paper)]">
          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              عنوان دراسة الحالة (High-Impact Title)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: مضاعفة مبيعات الكتب الرقمية بنسبة 140% عبر هندسة المحتوى"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--olive)] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                اسم العميل / المؤسسة
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="اسم العميل"
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                شريط الأرقام والمؤشرات (Highlight Metrics)
              </label>
              <input
                type="text"
                value={metricsHighlight}
                onChange={(e) => setMetricsHighlight(e.target.value)}
                placeholder="+140% نمو | 4.2x ROAS | 12k متابع جديد"
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              1. المشكلة والتحدي الأصلي (The Problem)
            </label>
            <textarea
              rows={2}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="ما هي الفجوة أو العقبة التي كان يواجهها العميل؟"
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              2. الحل والمنهجية المنفذة (The Strategic Solution)
            </label>
            <textarea
              rows={2}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="كيف قمت بهندسة الحل خطوة بخطوة وبدون تعقيد؟"
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              3. الأثر الملموس والنتائج (Impact & ROI)
            </label>
            <textarea
              rows={2}
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="ما هي الأرقام والتحولات الملموسة التي تحققت؟"
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--ink)] mb-1">
              4. الدروس المستفادة والخبرة المتراكمة (Key Takeaway)
            </label>
            <textarea
              rows={2}
              value={lessonsLearned}
              onChange={(e) => setLessonsLearned(e.target.value)}
              placeholder="ما المبدأ العملي الذي ترسخ لديك بعد إتمام هذا المشروع؟"
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[var(--ink)]">حالة الاعتماد:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              >
                <option value="draft">مسودة داخلية</option>
                <option value="approved">معتمدة وجاهزة</option>
                <option value="published">منشورة في المعرض المهني</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[var(--paper-border)] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCaseStudyBuilderOpen(false);
                setTargetCaseStudyProject(null);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-[var(--ink-muted)] hover:bg-[var(--paper-border)]/50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white font-bold text-xs shadow-md shadow-[var(--olive)]/20 transition-all active:scale-95"
            >
              <FileCheck className="w-4 h-4" />
              <span>حفظ واعتماد دراسة الحالة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
