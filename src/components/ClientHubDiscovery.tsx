/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ③ ملف العميل ومساحة الاكتشاف (سياق العميل - Client Hub & Discovery)
 */

import React, { useState } from 'react';
import {
  Briefcase,
  Layers,
  Award,
  DollarSign,
  FileText,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  Send,
  X,
  Target,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClientProfile, ClientKit, PaymentMilestone, ClientAsset, DecisionRecord, RiskRecord } from '../types';
import { getTodayString } from '../utils/dateUtils';
import { sound } from '../utils/sound';

export const ClientHubDiscovery: React.FC = () => {
  const {
    state,
    t,
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
    deleteDecision,
    addRisk,
    deleteRisk,
    setIsCaseStudyModalOpen,
    setActiveCaseStudyForModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'kit' | 'assets' | 'ledger'>('profile');

  // New Client Modal state
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientGoal, setNewClientGoal] = useState('');
  const [newClientAudience, setNewClientAudience] = useState('');
  const [newClientChannels, setNewClientChannels] = useState('Instagram, LinkedIn');
  const [newClientChallenges, setNewClientChallenges] = useState('');
  const [newClientCriteria, setNewClientCriteria] = useState('');

  // New Asset Modal state
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [assetTitle, setAssetTitle] = useState('');
  const [assetType, setAssetType] = useState<ClientAsset['type']>('contract');
  const [assetSize, setAssetSize] = useState('1.2 MB');
  const [assetTags, setAssetTags] = useState('عقد, معتمد');

  // New Decision Modal state
  const [isAddDecisionModalOpen, setIsAddDecisionModalOpen] = useState(false);
  const [decisionTitle, setDecisionTitle] = useState('');
  const [decisionContext, setDecisionContext] = useState('');
  const [decisionImpact, setDecisionImpact] = useState('');

  // New Risk Modal state
  const [isAddRiskModalOpen, setIsAddRiskModalOpen] = useState(false);
  const [riskTitle, setRiskTitle] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<RiskRecord['severity']>('medium');
  const [riskMitigation, setRiskMitigation] = useState('');

  // Client Kit data for current selected client
  const clientKit: ClientKit = state.clientKits[selectedClientId] || {
    clientId: selectedClientId,
    totalOfferValue: 3500,
    currency: '$',
    paymentSchedule: [
      { id: 'pay-1', milestone: 'الدفعة الأولى: انطلاق التخطيط', percentage: 50, amount: 1750, dueDate: getTodayString(), status: 'paid' },
      { id: 'pay-2', milestone: 'الدفعة النهائية: تسليم المخرجات', percentage: 50, amount: 1750, dueDate: getTodayString(), status: 'pending' },
    ],
    deliverablesScope: [
      'إدارة وتخطيط وجدولة المنشورات مع قوالب احترافية',
      'صياغة وإطلاق الحملات الإعلانية ومتابعة النتائج',
    ],
    termsAndConditions: 'التسليمات تتم وفق الجدول الزمني المتفق عليه.',
  };

  const clientAssets = state.clientAssets.filter((a) => a.clientId === selectedClientId);
  const clientDecisions = state.decisions.filter((d) => !d.clientId || d.clientId === selectedClientId);
  const clientRisks = state.risks.filter((r) => !r.clientId || r.clientId === selectedClientId);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newId = 'client_' + Date.now();
    const newClient: ClientProfile = {
      id: newId,
      name: newClientName,
      nameAr: newClientName,
      industry: newClientIndustry || 'General',
      industryAr: newClientIndustry || 'عام',
      primaryGoal: newClientGoal,
      targetAudience: newClientAudience,
      channels: newClientChannels.split(',').map((c) => c.trim()),
      challenges: newClientChallenges,
      criteria: newClientCriteria,
      color: '#526653',
      avatarIcon: 'Briefcase',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    addClient(newClient);
    setIsAddClientModalOpen(false);
    setNewClientName('');
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetTitle.trim()) return;

    addClientAsset({
      clientId: selectedClientId,
      title: assetTitle,
      type: assetType,
      fileSize: assetSize,
      date: getTodayString(),
      tags: assetTags.split(',').map((t) => t.trim()),
    });

    setIsAddAssetModalOpen(false);
    setAssetTitle('');
  };

  const handleCreateDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionTitle.trim()) return;

    addDecision({
      clientId: selectedClientId,
      clientName: selectedClient.nameAr || selectedClient.name,
      title: decisionTitle,
      context: decisionContext,
      date: getTodayString(),
      impact: decisionImpact,
      status: 'approved',
    });

    setIsAddDecisionModalOpen(false);
    setDecisionTitle('');
    setDecisionContext('');
    setDecisionImpact('');
  };

  const handleCreateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle.trim()) return;

    addRisk({
      clientId: selectedClientId,
      clientName: selectedClient.nameAr || selectedClient.name,
      title: riskTitle,
      severity: riskSeverity,
      mitigationStrategy: riskMitigation,
      status: 'active',
    });

    setIsAddRiskModalOpen(false);
    setRiskTitle('');
    setRiskMitigation('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header & Client Switcher */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>ملف العميل وسياق العمل (Client Hub)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-100 font-serif-arabic">
              {selectedClient.nameAr || selectedClient.name}
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 border border-slate-700">
              {selectedClient.industryAr || selectedClient.industry}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Client Select Dropdown */}
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameAr || c.name} ({c.industryAr || c.industry})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAddClientModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عميل جديد</span>
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>بطاقة تعريف العميل ونطاق العمل</span>
        </button>

        <button
          onClick={() => setActiveTab('kit')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'kit'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>حقيبة العميل والعرض المالي (Client Kit)</span>
        </button>

        <button
          onClick={() => setActiveTab('assets')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'assets'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>مستندات وملفات العميل ({clientAssets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'ledger'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>سجل القرارات المعتمدة والمخاطر</span>
        </button>
      </div>

      {/* Tab 1: Profile & Scope */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Card 1: Core Goal & Audience */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              الهدف الأسمى والجمهور المستهدف
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">الهدف الأسمى (Core Goal):</span>
                <p className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-slate-200 leading-relaxed">
                  {selectedClient.primaryGoal || 'لم يتم تحديد الهدف بعد.'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">الجمهور المستهدف (Target Audience):</span>
                <p className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-slate-200 leading-relaxed">
                  {selectedClient.targetAudience || 'لم يتم تحديد الجمهور بعد.'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">القنوات المستخدمة (Channels):</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClient.channels.map((ch, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 text-[11px]">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Challenges & Criteria */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              التحديات والمعايير الصارمة (Criteria)
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">التحديات والعوائق (Challenges):</span>
                <p className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-slate-200 leading-relaxed">
                  {selectedClient.challenges || 'لا توجد تحديات مسجلة.'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">معايير النجاح والجودة (Success Criteria):</span>
                <p className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-slate-200 leading-relaxed">
                  {selectedClient.criteria || 'لا توجد معايير محددة.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Client Kit & Offer */}
      {activeTab === 'kit' && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Financial Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold">إجمالي العرض المالي للعميل</div>
              <div className="text-3xl font-extrabold font-mono text-amber-400 mt-1">
                {clientKit.totalOfferValue.toLocaleString()} {clientKit.currency}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                عرض معتمد وجدول دفعات نشط
              </span>
            </div>
          </div>

          {/* Payment Schedule & Milestones Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              جدول الدفعات والمحطات المرحلية (Payment Milestones)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                    <th className="py-3 px-4">المحطة والمخرج</th>
                    <th className="py-3 px-4">النسبة</th>
                    <th className="py-3 px-4">المبلغ</th>
                    <th className="py-3 px-4">موعد الاستحقاق</th>
                    <th className="py-3 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {clientKit.paymentSchedule.map((milestone) => (
                    <tr key={milestone.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-200">{milestone.milestone}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{milestone.percentage}%</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                        {milestone.amount.toLocaleString()} {clientKit.currency}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{milestone.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                            milestone.status === 'paid'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {milestone.status === 'paid' ? 'تم السداد ✅' : 'مستحقة / معلقة ⏳'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deliverables Scope */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              نطاق التسليمات المعتمدة (Agreed Scope)
            </h2>

            <div className="space-y-2 text-xs">
              {clientKit.deliverablesScope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300">
                  <span className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Asset Manager */}
      {activeTab === 'assets' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-200">مستودع مستندات وملفات العميل</h2>
              <p className="text-xs text-slate-400">عقود، أدلة الهوية، نصوص إعلانية، ومخرجات معتمدة</p>
            </div>

            <button
              onClick={() => setIsAddAssetModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مستند جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-sm space-y-3 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      asset.type === 'contract'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : asset.type === 'design'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {asset.type === 'contract'
                      ? 'عقد رسمي'
                      : asset.type === 'design'
                      ? 'هوية وتصميم'
                      : 'نصوص وكوبي'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{asset.fileSize}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors leading-relaxed">
                  {asset.title}
                </h3>

                <div className="flex flex-wrap gap-1">
                  {asset.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{asset.date}</span>
                  <button
                    onClick={() => deleteClientAsset(asset.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Decisions & Risks Ledger */}
      {activeTab === 'ledger' && (
        <div className="space-y-6 animate-fade-in">
          {/* Section 1: Strategic Decisions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  سجل القرارات الاستراتيجية المعتمدة (Decisions Ledger)
                </h2>
                <p className="text-xs text-slate-400">توثيق ما تم بالاتفاق وسياق القرارات لحماية حقوق الطرفين</p>
              </div>

              <button
                onClick={() => setIsAddDecisionModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>تسجيل قرار جديد</span>
              </button>
            </div>

            <div className="space-y-3">
              {clientDecisions.map((dec) => (
                <div key={dec.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {dec.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">{dec.date}</span>
                      <button onClick={() => deleteDecision(dec.id)} className="text-slate-600 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed"><span className="text-slate-300 font-semibold">السياق:</span> {dec.context}</p>
                  <p className="text-emerald-400 leading-relaxed"><span className="font-semibold">الأثر المترتب:</span> {dec.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Risks & Mitigation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  مصفوفة رصد المخاطر واستراتيجيات التخفيف (Risk Register)
                </h2>
                <p className="text-xs text-slate-400">رصد المخاطر المحتملة مبكراً وبناء حلول استباقية</p>
              </div>

              <button
                onClick={() => setIsAddRiskModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>رصد خطر جديد</span>
              </button>
            </div>

            <div className="space-y-3">
              {clientRisks.map((risk) => (
                <div key={risk.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-200 flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          risk.severity === 'high'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : risk.severity === 'medium'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {risk.severity === 'high' ? 'عالي الخطورة' : risk.severity === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                      <span>{risk.title}</span>
                    </div>

                    <button onClick={() => deleteRisk(risk.id)} className="text-slate-600 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-slate-300 leading-relaxed bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-semibold">استراتيجية التخفيف (Mitigation):</span> {risk.mitigationStrategy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200">إضافة عميل أو سياق عمل جديد</h3>
              <button onClick={() => setIsAddClientModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">اسم العميل / المؤسسة:</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="مثال: شركة مدار للاستشارات"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">المجال والصناعة:</label>
                <input
                  type="text"
                  value={newClientIndustry}
                  onChange={(e) => setNewClientIndustry(e.target.value)}
                  placeholder="مثال: التجارة الإلكترونية، الاستشارات، التقنية"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الهدف الأسمى (Core Goal):</label>
                <input
                  type="text"
                  value={newClientGoal}
                  onChange={(e) => setNewClientGoal(e.target.value)}
                  placeholder="ما الذي يسعى العميل لتحقيقه بدقة؟"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الجمهور المستهدف:</label>
                <input
                  type="text"
                  value={newClientAudience}
                  onChange={(e) => setNewClientAudience(e.target.value)}
                  placeholder="من هم عملاؤه المستهدفون؟"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  حفظ العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {isAddAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200">إضافة مستند أو أصل للعميل</h3>
              <button onClick={() => setIsAddAssetModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">اسم المستند:</label>
                <input
                  type="text"
                  required
                  value={assetTitle}
                  onChange={(e) => setAssetTitle(e.target.value)}
                  placeholder="مثال: عقد الخدمات المعتمد 2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">نوع المستند:</label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none"
                >
                  <option value="contract">عقد رسمي (Contract)</option>
                  <option value="design">تصميم وهوية (Design & Brand)</option>
                  <option value="copy">نصوص وإعلانات (Copy Deck)</option>
                  <option value="brief">مستند تشخيص (Brief)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الوسوم:</label>
                <input
                  type="text"
                  value={assetTags}
                  onChange={(e) => setAssetTags(e.target.value)}
                  placeholder="عقد, معتمد"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAssetModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  إضافة المستند
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Decision Modal */}
      {isAddDecisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200">تسجيل قرار استراتيجي في السجل</h3>
              <button onClick={() => setIsAddDecisionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDecision} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">عنوان القرار:</label>
                <input
                  type="text"
                  required
                  value={decisionTitle}
                  onChange={(e) => setDecisionTitle(e.target.value)}
                  placeholder="مثال: اعتماد نشر دراسات الحالة التحليلية فقط"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">السياق وسبب القرار:</label>
                <textarea
                  rows={2}
                  value={decisionContext}
                  onChange={(e) => setDecisionContext(e.target.value)}
                  placeholder="لماذا تم اتخاذ هذا القرار؟..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الأثر والنتائج المترتبة:</label>
                <input
                  type="text"
                  value={decisionImpact}
                  onChange={(e) => setDecisionImpact(e.target.value)}
                  placeholder="مثال: رفع معدل التحويل واستقطاب 3 استفسارات مباشرة"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDecisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  حفظ القرار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Risk Modal */}
      {isAddRiskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200">رصد خطر في مصفوفة المخاطر</h3>
              <button onClick={() => setIsAddRiskModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRisk} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">وصف الخطر المحتمل:</label>
                <input
                  type="text"
                  required
                  value={riskTitle}
                  onChange={(e) => setRiskTitle(e.target.value)}
                  placeholder="مثال: تذبذب تكلفة الإعلانات الممولة أثناء المواسم"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">مستوى الخطورة:</label>
                <select
                  value={riskSeverity}
                  onChange={(e) => setRiskSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none"
                >
                  <option value="low">منخفض (Low)</option>
                  <option value="medium">متوسط (Medium)</option>
                  <option value="high">عالي الخطورة (High)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">استراتيجية التخفيف والحل الاستباقي:</label>
                <textarea
                  rows={2}
                  value={riskMitigation}
                  onChange={(e) => setRiskMitigation(e.target.value)}
                  placeholder="كيف سنتعامل مع الخطر لتفادي آثاره؟..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddRiskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  تسجيل الخطر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
