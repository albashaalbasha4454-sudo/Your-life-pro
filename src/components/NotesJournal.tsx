/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Pin,
  Trash2,
  Heart,
  Sparkles,
  Smile,
  Search,
  Tag,
  Calendar,
  Download,
  FileSpreadsheet,
  FileCode,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTodayString, formatDate } from '../utils/dateUtils';
import { Note } from '../types';

export const NotesJournal: React.FC = () => {
  const {
    state,
    t,
    currentDate,
    saveNote,
    deleteNote,
    togglePinNote,
    updateDailyReflection,
    exportJournalCSV,
    exportJournalJSON,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isWritingNote, setIsWritingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const todayStr = getTodayString();
  const reflection = state.dailyReflections[todayStr] || {
    mood: '',
    energyLevel: 3,
    waterGlasses: 0,
    highlights: '',
    improvements: '',
    gratitude: '',
  };

  const filteredNotes = state.notes
    .filter((n) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) return;

    const tagsArray = noteTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    saveNote({
      id: editingNoteId || undefined,
      title: noteTitle.trim() || 'ملاحظة بدون عنوان',
      content: noteContent.trim(),
      date: currentDate,
      pinned: false,
      tags: tagsArray,
    });

    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setEditingNoteId(null);
    setIsWritingNote(false);
  };

  const startEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags.join(', '));
    setIsWritingNote(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.journal.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            دوّن أفكارك وتأملاتك اليومية، وازرع مشاعر الامتنان لتعزيز الصحة النفسية
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl transition-all shadow-sm"
              title="تصدير اليوميات والملاحظات"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>تصدير</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isExportMenuOpen && (
              <div className="absolute end-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-30 space-y-1 animate-fadeIn">
                <button
                  onClick={() => {
                    exportJournalCSV();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div>تصدير كملف CSV</div>
                    <div className="text-[10px] text-slate-400 font-normal">جاهز لـ Excel وجداول البيانات</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    exportJournalJSON();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div>تصدير كملف JSON</div>
                    <div className="text-[10px] text-slate-400 font-normal">نسخة احتياطية برمجية كاملة</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setEditingNoteId(null);
              setNoteTitle('');
              setNoteContent('');
              setNoteTags('');
              setIsWritingNote(!isWritingNote);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.journal.addNote}</span>
          </button>
        </div>
      </div>

      {/* Daily Reflection & Gratitude Section */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>{t.journal.gratitudePrompt}</span>
        </div>

        <textarea
          rows={2}
          value={reflection.gratitude}
          onChange={(e) => updateDailyReflection(todayStr, { gratitude: e.target.value })}
          placeholder="اكتب 3 نعم تشعر بالامتنان لها اليوم..."
          className="w-full p-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.journal.highlightsPrompt}
            </label>
            <input
              type="text"
              value={reflection.highlights}
              onChange={(e) => updateDailyReflection(todayStr, { highlights: e.target.value })}
              placeholder="إنجاز فخور به اليوم..."
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.journal.improvementsPrompt}
            </label>
            <input
              type="text"
              value={reflection.improvements}
              onChange={(e) => updateDailyReflection(todayStr, { improvements: e.target.value })}
              placeholder="نقطة للتحسين في الغد..."
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Note Editor Form */}
      {isWritingNote && (
        <form
          onSubmit={handleSaveNote}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl space-y-4 animate-fade-in"
        >
          <h3 className="text-sm font-bold text-white">
            {editingNoteId ? 'تعديل الملاحظة' : t.journal.addNote}
          </h3>

          <div>
            <input
              type="text"
              required
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={t.journal.noteTitle}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <textarea
              rows={4}
              required
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder={t.journal.noteContent}
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              value={noteTags}
              onChange={(e) => setNoteTags(e.target.value)}
              placeholder="الوسوم مفصولة بفواصل (مثال: أفكار, قراءة, عمل)"
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsWritingNote(false);
                setEditingNoteId(null);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              {t.tasks.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
            >
              {t.common.save}
            </button>
          </div>
        </form>
      )}

      {/* Search Notes */}
      <div className="relative">
        <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث في الملاحظات والوسوم..."
          className="w-full ps-9 pe-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            {t.journal.noNotes}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => startEdit(note)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                note.pinned
                  ? 'bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{note.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinNote(note.id);
                    }}
                    className={`p-1 rounded-lg transition-colors ${
                      note.pinned ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-300 whitespace-pre-wrap line-clamp-4 mt-2 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  <span>{formatDate(note.date, state.settings.language)}</span>
                </div>

                <div className="flex items-center gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      #{tag}
                    </span>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="p-1 hover:text-rose-400 text-slate-500"
                    title={t.journal.deleteNote}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
