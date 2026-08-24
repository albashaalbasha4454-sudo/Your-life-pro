/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(dateStr: string, locale: 'ar' | 'en' = 'ar'): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function getShortDate(dateStr: string, locale: 'ar' | 'en' = 'ar'): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function getHijriDate(date: Date = new Date(), locale: 'ar' | 'en' = 'ar'): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
}

export function getDaysOfWeek(centerDateStr: string = getTodayString()): string[] {
  const parts = centerDateStr.split('-');
  const base = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const currentDay = base.getDay(); // 0 is Sun, 6 is Sat
  
  // Starting from Saturday (6) or Sunday (0)
  const startDiff = (currentDay + 1) % 7; // Assuming Saturday as day 0 of week
  const startDate = new Date(base);
  startDate.setDate(base.getDate() - startDiff);

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    days.push(`${year}-${month}-${day}`);
  }
  return days;
}

export function formatMinutes(totalMinutes: number, locale: 'ar' | 'en' = 'ar'): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    if (locale === 'ar') {
      return `${hours} س ${minutes > 0 ? `${minutes} د` : ''}`;
    }
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  }
  return locale === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
}

export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function isTimeConflict(
  block1: { startTime: string; endTime: string },
  block2: { startTime: string; endTime: string }
): boolean {
  const start1 = timeToMinutes(block1.startTime);
  const end1 = timeToMinutes(block1.endTime);
  const start2 = timeToMinutes(block2.startTime);
  const end2 = timeToMinutes(block2.endTime);

  return Math.max(start1, start2) < Math.min(end1, end2);
}
