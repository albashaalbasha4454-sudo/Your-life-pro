/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  CloudRain,
  Radio,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/audio';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export const FocusTimer: React.FC = () => {
  const { state, t, triggerConfetti } = useApp();

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(state.settings.defaultFocusDuration * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'whitenoise'>('none');
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial duration when mode changes
  useEffect(() => {
    let dur = state.settings.defaultFocusDuration;
    if (mode === 'shortBreak') dur = state.settings.shortBreakDuration;
    if (mode === 'longBreak') dur = state.settings.longBreakDuration;
    setTimeLeft(dur * 60);
    setIsRunning(false);
  }, [mode, state.settings]);

  // Main countdown tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            sound.playTimerBell(state.settings.enableSounds);
            triggerConfetti();

            if (mode === 'focus') {
              setCompletedSessions((c) => c + 1);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, state.settings.enableSounds, triggerConfetti]);

  // Ambient sound lifecycle
  useEffect(() => {
    if (ambientSound === 'none') {
      sound.stopAmbient();
    } else {
      sound.startAmbient(ambientSound, 0.25);
    }
    return () => {
      sound.stopAmbient();
    };
  }, [ambientSound]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
    sound.playClick(state.settings.enableSounds);
  };

  const handleReset = () => {
    setIsRunning(false);
    let dur = state.settings.defaultFocusDuration;
    if (mode === 'shortBreak') dur = state.settings.shortBreakDuration;
    if (mode === 'longBreak') dur = state.settings.longBreakDuration;
    setTimeLeft(dur * 60);
    sound.playClick(state.settings.enableSounds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const activeTasks = state.tasks.filter((t) => !t.completed);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">{t.focus.title}</h1>
        <p className="text-xs text-slate-400">
          استخدم تقنية بومودورو للوصول لأعلى مستويات التركيز والإنتاجية الذهنية
        </p>
      </div>

      {/* Main Timer Container */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-8">
        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80">
          <button
            onClick={() => setMode('focus')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'focus'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.focus.modeFocus} (25د)
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'shortBreak'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.focus.modeShortBreak} (5د)
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'longBreak'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.focus.modeLongBreak} (15د)
          </button>
        </div>

        {/* Large Digital Clock */}
        <div className="py-6">
          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight text-white drop-shadow-lg">
            {timeFormatted}
          </div>
          <div className="text-xs text-blue-400 font-medium mt-2">
            {isRunning ? 'جلسة التركيز جارية...' : 'المؤقت متوقف'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleRunning}
            className={`px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-xl transition-all active:scale-95 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>{t.focus.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{t.focus.start}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={t.focus.reset}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Task Binding Selector */}
        <div className="pt-4 border-t border-slate-800 text-start space-y-2">
          <label className="block text-xs font-medium text-slate-400">
            {t.focus.selectTask}
          </label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          >
            <option value="">{t.focus.noTaskSelected}</option>
            {activeTasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        {/* Ambient Sound Selector */}
        <div className="pt-2 text-start space-y-2">
          <label className="block text-xs font-medium text-slate-400">
            {t.focus.ambientSound}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setAmbientSound('none')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                ambientSound === 'none'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>{t.focus.soundNone}</span>
            </button>
            <button
              onClick={() => setAmbientSound('rain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                ambientSound === 'rain'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{t.focus.soundRain}</span>
            </button>
            <button
              onClick={() => setAmbientSound('whitenoise')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                ambientSound === 'whitenoise'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{t.focus.soundWhiteNoise}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completed Stats Today */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">{t.focus.sessionsCompleted}</div>
            <div className="text-xl font-bold text-white mt-0.5">{completedSessions}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">{t.focus.totalMinutes}</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {completedSessions * state.settings.defaultFocusDuration} د
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
