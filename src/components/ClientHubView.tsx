/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ③ ملف العميل ومساحة الاكتشاف (سياق العميل - Client Hub & Kits & Risks)
 */

import React, { useState } from 'react';
import {
  Users,
  Plus,
  FileText,
  DollarSign,
  Upload,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit2,
  Download,
  FolderOpen,
  Briefcase,
  Target,
  Shield,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClientProfile, PaymentMilestone, ClientDocument, DecisionRecord, RiskRecord } from '../types';

export const ClientHubView: React.FC = () => {
  const {
    state,
    selectedClientId,
    setSelectedClientId,
    selectedClient,
    addClient,
    updateClient,
    deleteClient,
    saveClientKit,
    addClientDocument,
    deleteClientDocument,
    addDecision,
    deleteDecision,
    addRisk,
    deleteRisk,
  } = useApp();

  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClientNameAr, setNewClientNameAr] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientGoal, setNewClientGoal] = useState('');

  // Active Kit for the selected client
  const activeKit = state.clientKits.find((k) => k.clientId === selectedClientId) || {
    id: `kit-${selectedClientId}`,
    clientId: selectedClientId,
    offerTitle: 'باقة التطوير الاستراتيجي والإنتاج',
    pricingModel: 'milestone' as const,
    totalBudget: 4500,
    currency: 'USD',
    paymentMilestones: [
      { id: 'ms-1', title: 'دفعة الانطلاق (30%)', amount: 1350, dueDate: '2026-09-01', status: 'paid' as const },
      { id: 'ms-2', title: 'دفعة التسليم النهائي (70%)', amount: 3150, dueDate: '2026-10-01', status: 'pending' as const },
    ],
    deliverablesScope: [
      'تشخيص احتياجات الجمهور وقنوات التوزيع',
      'صياغة وروزنامة المحتوى والتسويق الرقمي',
      'تقارير تحليل الأداء الأسبوعية وإغلاق دراسة الحالة',
    ],
    termsAndNotes: 'التسليمات تتم وفق أعلى معايير الجودة بنسبة أخطاء 0%.',
  };

  const clientDocs = state.clientDocuments.filter((d) => d.clientId === selectedClientId);
  const clientDecisions = state.decisions.filter((d) => d.clientId === selectedClientId || !d.clientId);
  const clientRisks = state.risks.filter((r) => r.clientId === selectedClientId || !r.clientId);

  // Modal / Form state for new decision & risk & doc
  const [decisionTitle, setDecisionTitle] = useState('');
  const [decisionContext, setDecisionContext] = useState('');
  const [decisionImpact, setDecisionImpact] = useState('');
  const [isAddDecisionOpen, setIsAddDecisionOpen] = useState(false);

  const [riskTitle, setRiskTitle] = useState('');
  const [riskMitigation, setRiskMitigation] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);

  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<'contract' | 'design' | 'copy' | 'research' | 'reference' | 'brief'>('contract');
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientNameAr.trim()) return;
    addClient({
      name: newClientNameAr.trim(),
      nameAr: newClientNameAr.trim(),
      industry: newClientIndustry.trim() || 'خدمات مهنية',
      ultimateGoal: newClientGoal.trim() || 'تحقيق نتائج رقمية واضحة وبناء مجتمع وفيّ',
      targetAudience: 'الجمهور المستهدف للمشروع',
      channels: ['LinkedIn', 'Instagram', 'X'],
      challenges: 'تحديات التوزيع والمنافسة',
      qualityStandards: 'تسليم متقن بنسبة أخطاء 0%',
      color: '#526653',
    });
    setNewClientNameAr('');
    setNewClientIndustry('');
    setNewClientGoal('');
    setIsAddClientModalOpen(false);
  };

  const handleCreateDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionTitle.trim()) return;
    addDecision({
      clientId: selectedClientId,
      title: decisionTitle.trim(),
      context: decisionContext.trim(),
      impact: decisionImpact.trim() || 'اعتماد رسمي مباشر',
      status: 'approved',
    });
    setDecisionTitle('');
    setDecisionContext('');
    setDecisionImpact('');
    setIsAddDecisionOpen(false);
  };

  const handleCreateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle.trim()) return;
    addRisk({
      clientId: selectedClientId,
      title: riskTitle.trim(),
      severity: riskSeverity,
      mitigationStrategy: riskMitigation.trim(),
      status: 'identified',
    });
    setRiskTitle('');
    setRiskMitigation('');
    setIsAddRiskOpen(false);
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;
    addClientDocument({
      clientId: selectedClientId,
      name: docName.trim(),
      category: docCategory,
      size: '2.4 MB',
      notes: 'مرفق موثق في حقيبة العميل',
    });
    setDocName('');
    setIsAddDocOpen(false);
  };

  const toggleMilestone = (msId: string) => {
    const updatedMs = activeKit.paymentMilestones.map((ms) =>
      ms.id === msId
        ? { ...ms, status: ms.status === 'paid' ? ('pending' as const) : ('paid' as const) }
        : ms
    );
    saveClientKit({ ...activeKit, paymentMilestones: updatedMs });
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header & Client Selector */}
      <div className="p-6 rounded-3xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--olive)]">
            <Users className="w-4 h-4" />
            <span>سياق العميل ومساحة الاكتشاف</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--ink)] font-serif-arabic">
            ملف العميل وحقيبة العرض (Client Hub)
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            توثيق النطاق، العرض المالي، جدول الدفعات، مستندات العقود، وسجل القرارات والمخاطر.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Client Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--ink-muted)]">العميل الحالي:</span>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs font-bold text-[var(--ink)] focus:outline-none focus:border-[var(--olive)]"
            >
              {state.clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAddClientModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--olive)] hover:bg-[var(--olive-dark)] text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عميل جديد</span>
          </button>
        </div>
      </div>

      {selectedClient ? (
        <div className="space-y-6">
          {/* 1. Client Profile & Discovery Card */}
          <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--paper-border)] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--olive)]/15 text-[var(--olive)] flex items-center justify-center font-bold text-lg">
                  {selectedClient.nameAr.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[var(--ink)] font-serif-arabic">
                    {selectedClient.nameAr}
                  </h2>
                  <p className="text-xs text-[var(--ink-muted)]">{selectedClient.industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {selectedClient.channels.map((ch) => (
                  <span
                    key={ch}
                    className="px-2 py-0.5 rounded-md bg-[var(--paper-2)] text-[10px] text-[var(--ink-muted)] border border-[var(--paper-border)] font-medium"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-1">
                <div className="font-bold text-[var(--olive)] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  الهدف الأسمى (Ultimate Goal):
                </div>
                <p className="text-[var(--ink)] leading-relaxed">{selectedClient.ultimateGoal}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-1">
                <div className="font-bold text-[var(--copper)] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  معايير الجودة والاشتراطات:
                </div>
                <p className="text-[var(--ink)] leading-relaxed">{selectedClient.qualityStandards}</p>
              </div>
            </div>
          </div>

          {/* 2. Client Kit & Financial Offer (العرض المالي وجدول الدفعات) */}
          <div className="p-6 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--paper-border)] pb-3">
              <div>
                <h2 className="text-base font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[var(--copper)]" />
                  حقيبة العميل والعرض المالي (Client Kit & Offer)
                </h2>
                <p className="text-xs text-[var(--ink-muted)]">{activeKit.offerTitle}</p>
              </div>
              <div className="text-end">
                <div className="text-xs text-[var(--ink-muted)]">إجمالي الميزانية</div>
                <div className="text-xl font-bold font-mono text-[var(--ink)]">
                  {activeKit.totalBudget} {activeKit.currency}
                </div>
              </div>
            </div>

            {/* Deliverables Scope */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[var(--ink)]">نطاق التسليمات المتفق عليها:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeKit.deliverablesScope.map((scope, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--olive)] shrink-0 mt-0.5" />
                    <span>{scope}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Milestones */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[var(--ink)]">جدول الدفعات والمراحل المالية:</div>
              <div className="space-y-2">
                {activeKit.paymentMilestones.map((ms) => (
                  <div
                    key={ms.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMilestone(ms.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                          ms.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                        }`}
                      >
                        {ms.status === 'paid' ? 'تم السداد ✓' : 'قيد الانتظار ⏳'}
                      </button>
                      <span className="font-semibold text-[var(--ink)]">{ms.title}</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-[var(--ink-muted)] text-[11px]">{ms.dueDate}</span>
                      <span className="font-bold text-sm text-[var(--ink)]">
                        {ms.amount} {activeKit.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Documents & Decisions & Risks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documents & Assets */}
            <div className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[var(--olive)]" />
                  مستندات وملفات العميل (Asset Manager)
                </h2>
                <button
                  onClick={() => setIsAddDocOpen(true)}
                  className="p-1.5 rounded-lg bg-[var(--paper-2)] hover:bg-[var(--paper-border)] text-[var(--ink)] text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة ملف</span>
                </button>
              </div>

              {isAddDocOpen && (
                <form onSubmit={handleCreateDoc} className="p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-2">
                  <input
                    type="text"
                    required
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="اسم الملف والمستند (مثال: العقد المعتمد.pdf)"
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                  <div className="flex justify-between items-center gap-2">
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                    >
                      <option value="contract">عقد / وثيقة</option>
                      <option value="design">تصاميم وهوية</option>
                      <option value="copy">نصوص ومحتوى</option>
                      <option value="brief">ملخص / دراسة</option>
                    </select>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setIsAddDocOpen(false)}
                        className="px-3 py-1 rounded-lg text-xs text-[var(--ink-muted)]"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 rounded-lg bg-[var(--olive)] text-white text-xs font-bold"
                      >
                        حفظ
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                {clientDocs.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[var(--ink-muted)]">
                    لا توجد ملفات مرفوعة لهذا العميل.
                  </div>
                ) : (
                  clientDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-[var(--olive)] shrink-0" />
                        <span className="font-semibold text-[var(--ink)] truncate">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--ink-muted)] shrink-0">
                        <span>{doc.size}</span>
                        <button
                          onClick={() => deleteClientDocument(doc.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Decisions & Risks Ledger */}
            <div className="p-5 rounded-2xl bg-[var(--paper-card)] border border-[var(--paper-border)] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[var(--ink)] font-serif-arabic flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[var(--copper)]" />
                  سجل القرارات المعتمدة والمخاطر (Ledger)
                </h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsAddDecisionOpen(true)}
                    className="p-1.5 rounded-lg bg-[var(--paper-2)] hover:bg-[var(--paper-border)] text-[var(--ink)] text-xs font-semibold"
                  >
                    + قرار
                  </button>
                  <button
                    onClick={() => setIsAddRiskOpen(true)}
                    className="p-1.5 rounded-lg bg-[var(--paper-2)] hover:bg-[var(--paper-border)] text-amber-700 text-xs font-semibold"
                  >
                    + مخاطرة
                  </button>
                </div>
              </div>

              {isAddDecisionOpen && (
                <form onSubmit={handleCreateDecision} className="p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-2">
                  <input
                    type="text"
                    required
                    value={decisionTitle}
                    onChange={(e) => setDecisionTitle(e.target.value)}
                    placeholder="عنوان القرار المعتمد..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={decisionImpact}
                    onChange={(e) => setDecisionImpact(e.target.value)}
                    placeholder="الأثر والنتيجة..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setIsAddDecisionOpen(false)}
                      className="px-3 py-1 rounded-lg text-xs text-[var(--ink-muted)]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-[var(--olive)] text-white text-xs font-bold"
                    >
                      حفظ القرار
                    </button>
                  </div>
                </form>
              )}

              {isAddRiskOpen && (
                <form onSubmit={handleCreateRisk} className="p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] space-y-2">
                  <input
                    type="text"
                    required
                    value={riskTitle}
                    onChange={(e) => setRiskTitle(e.target.value)}
                    placeholder="عنوان المخاطرة المحتملة..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={riskMitigation}
                    onChange={(e) => setRiskMitigation(e.target.value)}
                    placeholder="استراتيجية التخفيف والمعالجة (Mitigation)..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--paper-card)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setIsAddRiskOpen(false)}
                      className="px-3 py-1 rounded-lg text-xs text-[var(--ink-muted)]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-amber-600 text-white text-xs font-bold"
                    >
                      حفظ المخاطرة
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                {clientDecisions.map((d) => (
                  <div
                    key={d.id}
                    className="p-2.5 rounded-xl bg-[var(--paper-2)] border-s-4 border-s-[var(--olive)] text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-semibold text-[var(--ink)]">
                      <span>⚖️ {d.title}</span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">{d.date}</span>
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)]">{d.impact}</div>
                  </div>
                ))}

                {clientRisks.map((r) => (
                  <div
                    key={r.id}
                    className="p-2.5 rounded-xl bg-[var(--paper-2)] border-s-4 border-s-amber-500 text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-semibold text-[var(--ink)]">
                      <span>⚠️ {r.title}</span>
                      <span className="text-[10px] font-bold uppercase text-amber-700">{r.severity}</span>
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)]">خطة المعالجة: {r.mitigationStrategy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-xs text-[var(--ink-muted)]">
          لم يتم تحديد أي عميل. انقر على «إضافة عميل جديد» للبدء.
        </div>
      )}

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--paper-card)] border border-[var(--paper-border)] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[var(--ink)] font-serif-arabic">
              إضافة عميل جديد إلى منظومة يومي
            </h3>
            <form onSubmit={handleCreateClient} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">اسم العميل / المؤسسة:</label>
                <input
                  type="text"
                  required
                  value={newClientNameAr}
                  onChange={(e) => setNewClientNameAr(e.target.value)}
                  placeholder="مثال: شركة الرواد للتطوير"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">المجال والصناعة:</label>
                <input
                  type="text"
                  value={newClientIndustry}
                  onChange={(e) => setNewClientIndustry(e.target.value)}
                  placeholder="مثال: التجارة الإلكترونية والنشر"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">الهدف الأسمى (Ultimate Goal):</label>
                <input
                  type="text"
                  value={newClientGoal}
                  onChange={(e) => setNewClientGoal(e.target.value)}
                  placeholder="مثال: مضاعفة المبيعات بنسبة 100%"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--paper-2)] border border-[var(--paper-border)] text-xs text-[var(--ink)] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[var(--ink-muted)]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--olive)] text-white text-xs font-bold"
                >
                  حفظ العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
