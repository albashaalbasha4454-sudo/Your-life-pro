/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ④ الهوية المهنية ونظام النمو (احترافيتي - Professional Framework & Case Studies)
 */

import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Plus,
  Trash2,
  FileCheck,
  Target,
  Shield,
  Layers,
  Edit2,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaseStudy, SkillRoadmapItem, WeeklyReviewSession } from '../types';

export const ProfessionalFrameworkView: React.FC = () => {
  const {
    state,
    t,
    updateProfessionalProfile,
    addWeeklyReview,
    deleteWeeklyReview,
    addSkillItem,
    updateSkillItem,
    deleteSkillItem,
    deleteCaseStudy,
    setIsCaseStudyBuilderOpen,
  } = useApp();

  const profile = state.professionalProfile;

  // Add Weekly Review Form State
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [revAchievements, setRevAchievements] = useState('');
  const [revBlockers, setRevBlockers] = useState('');
  const [revDecision, setRevDecision] = useState('');
  const [revEnergy, setRevEnergy] = useState(5);

  // Add Skill Form State
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState<'core' | 'technical' | 'strategic' | 'consulting'>('strategic');
  const [skillProficiency, setSkillProficiency] = useState(80);

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAchievements.trim()) return;
    addWeeklyReview({
      weekNumber: Math.ceil(new Date().getDate() / 7),
      year: new Date().getFullYear(),
      achievements: revAchievements.split('\n').filter((s) => s.trim()),
      blockers: revBlockers.split('\n').filter((s) => s.trim()),
      nextBigDecision: revDecision.trim(),
      energyRating: revEnergy,
      notes: 'جلسة مراجعة أسبوعية منضبطة',
    });
    setRevAchievements('');
    setRevBlockers('');
    setRevDecision('');
    setIsAddReviewOpen(false);
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    addSkillItem({
      skillName: skillName.trim(),
      category: skillCategory,
      proficiency: skillProficiency,
      targetDate: '2026-10-01',
      learningResources: ['مراجع تخصصية موثوقة'],
      status: skillProficiency >= 90 ? 'mastered' : 'in_progress',
    });
    setSkillName('');
    setIsAddSkillOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--olive-dark)]">
            <Award className="w-4 h-4" />
            <span>نظام التموضع وبناء السلطة المعرفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--ink)] font-serif-arabic">
            الهوية المهنية ونظام النمو (احترافيتي)
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            بيان التموضع، مصفوفة المهارات، مراجعات الأداء الأسبوعية، ومعرض دراسات الحالة المعتمدة.
          </p>
        </div>

        <button
          onClick={() => setIsCaseStudyBuilderOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white text-xs font-bold shadow-md shadow-[var(--olive)]/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء دراسة حالة جديدة</span>
        </button>
      </div>

      {/* 1. Positioning & Value Statement */}
      <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--paper-border)] pb-3">
          <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--copper)]" />
            بيان التموضع والقيمة التنافسية (Positioning Statement)
          </h2>
          <span className="text-xs font-mono text-[var(--olive)] font-bold">
            الهدف الشهري: {profile.targetMonthlyTarget}$
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-2">
            <div className="font-bold text-[var(--olive)]">العرض القيمي الأساسي:</div>
            <p className="text-[var(--ink)] leading-relaxed">{profile.positioningStatement}</p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-2">
            <div className="font-bold text-[var(--copper)]">نقاط القوة التنافسية:</div>
            <ul className="space-y-1 text-[var(--ink)]">
              {profile.competitiveStrengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[var(--copper)]">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Skills Roadmap & Curriculum */}
      <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--paper-border)] pb-3">
          <div>
            <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--olive)]" />
              خارطة صقل المهارات الاستشارية (Skill Curriculum)
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              المتابعة المستمرة للمهارات التقنية، الاستراتيجية، وإدارة عقود الاستشارات.
            </p>
          </div>
          <button
            onClick={() => setIsAddSkillOpen(true)}
            className="p-2 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] text-xs font-bold text-[var(--ink)] flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مهارة</span>
          </button>
        </div>

        {isAddSkillOpen && (
          <form onSubmit={handleCreateSkill} className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-3">
            <input
              type="text"
              required
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="اسم المهارة التخصصية..."
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
            />
            <div className="flex items-center justify-between gap-2">
              <select
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              >
                <option value="strategic">استراتيجية وتموضع</option>
                <option value="consulting">تسعير واستشارات</option>
                <option value="technical">تقنية ونظم برمجية</option>
                <option value="core">محتوى وحملات</option>
              </select>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--ink-muted)]">نسبة الإتقان: {skillProficiency}%</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={skillProficiency}
                  onChange={(e) => setSkillProficiency(parseInt(e.target.value))}
                  className="w-24 accent-[var(--olive)]"
                />
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[var(--ink-muted)]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[var(--olive)] text-white text-xs font-bold"
                >
                  حفظ
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {state.skillsRoadmap.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--ink)]">{skill.skillName}</span>
                <span className="font-mono font-bold text-[var(--olive)]">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--paper-border)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--olive)] to-[var(--copper)] rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Case Studies Showcase (معرض دراسات الحالة المعتمدة) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--olive-dark)]" />
              معرض دراسات الحالة وقصص النجاح (Case Studies)
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              توثيق الأثر والنتائج الرقمية لكل مشروع لتعزيز الثقة واكتساب العملاء الجدد.
            </p>
          </div>
          <button
            onClick={() => setIsCaseStudyBuilderOpen(true)}
            className="text-xs text-[var(--olive)] hover:underline font-semibold"
          >
            + دراسة حالة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {state.caseStudies.map((study) => (
            <div
              key={study.id}
              className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[var(--paper-border)] pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-[var(--ink)] leading-snug">{study.title}</h3>
                  <div className="text-[11px] text-[var(--olive)] font-medium mt-0.5">
                    {study.clientName}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 text-[10px] font-bold shrink-0">
                  {study.status === 'published' ? 'منشور 🌟' : 'معتمد ✓'}
                </span>
              </div>

              {study.metricsHighlight && (
                <div className="p-2.5 rounded-xl bg-[var(--paper-2)] text-xs font-mono font-bold text-[var(--copper)] text-center border border-[var(--paper-border)]">
                  {study.metricsHighlight}
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-[var(--ink)]">المشكلة: </span>
                  <span className="text-[var(--ink-muted)]">{study.problem}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--olive)]">الحل: </span>
                  <span className="text-[var(--ink-muted)]">{study.solution}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--copper)]">الأثر: </span>
                  <span className="text-[var(--ink-muted)]">{study.impact}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--paper-border)] flex items-center justify-between text-[11px] text-[var(--ink-faint)]">
                <span>تاريخ التوثيق: {study.date}</span>
                <button
                  onClick={() => deleteCaseStudy(study.id)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Weekly Review Sessions */}
      <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--paper-border)] pb-3">
          <div>
            <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--olive)]" />
              جلسات المراجعة الأسبوعية (Weekly Review Sessions)
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              توثيق الإنجازات، المعوقات، والقرار القادم لضمان صفاء التوجيه.
            </p>
          </div>
          <button
            onClick={() => setIsAddReviewOpen(true)}
            className="p-2 rounded-xl bg-[var(--paper-2)] hover:bg-[var(--paper-border)] text-xs font-bold text-[var(--ink)] flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل جلسة أسبوع</span>
          </button>
        </div>

        {isAddReviewOpen && (
          <form onSubmit={handleCreateReview} className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-3">
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">أبرز الإنجازات المحققة (سطر لكل إنجاز):</label>
              <textarea
                rows={2}
                required
                value={revAchievements}
                onChange={(e) => setRevAchievements(e.target.value)}
                placeholder="إغلاق نطاق دار المعرفة..."
                className="w-full p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">المعوقات والعقبات (Blockers):</label>
              <textarea
                rows={2}
                value={revBlockers}
                onChange={(e) => setRevBlockers(e.target.value)}
                placeholder="تأخر ردود الفعل..."
                className="w-full p-2 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">القرار القادم المحوري (Next Big Decision):</label>
              <input
                type="text"
                value={revDecision}
                onChange={(e) => setRevDecision(e.target.value)}
                placeholder="حصر الاجتماعات في يوم واحد فقط..."
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddReviewOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-[var(--ink-muted)]"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[var(--olive)] text-white text-xs font-bold"
              >
                حفظ الجلسة
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {state.weeklyReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-bold text-[var(--ink)]">
                <span>مراجعة الأسبوع #{rev.weekNumber} ({rev.year})</span>
                <span className="text-[10px] font-mono text-[var(--ink-muted)]">{rev.reviewDate}</span>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-[var(--olive)]">الإنجازات:</div>
                <ul className="list-disc list-inside text-[var(--ink-muted)] space-y-0.5">
                  {rev.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
              {rev.nextBigDecision && (
                <div className="pt-1 text-[var(--copper)] font-medium">
                  ⚖️ القرار المحوري: {rev.nextBigDecision}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
