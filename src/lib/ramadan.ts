export const RAMADAN_START = new Date(2026, 1, 19);
export const RAMADAN_YEAR = 1447;
export const TOTAL_DAYS = 30;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getRozaNumber(date: Date): number {
  const d = startOfDay(date);
  const start = startOfDay(RAMADAN_START);
  const diff = Math.floor((d.getTime() - start.getTime()) / 86400000);
  if (diff < 0 || diff >= TOTAL_DAYS) return 0;
  return diff + 1;
}

export function isRamadan(date: Date): boolean {
  return getRozaNumber(date) > 0;
}

export function getHijriDisplay(date: Date): string {
  const roza = getRozaNumber(date);
  if (roza > 0) {
    return `${roza} Ramadan ${RAMADAN_YEAR} AH`;
  }
  const start = startOfDay(RAMADAN_START);
  const d = startOfDay(date);
  const diff = Math.floor((d.getTime() - start.getTime()) / 86400000);
  if (diff < 0) {
    const shabanDay = 30 + diff;
    return `${shabanDay > 0 ? shabanDay : 1} Sha'ban ${RAMADAN_YEAR} AH`;
  }
  const shawwalDay = diff - TOTAL_DAYS + 1;
  return `${shawwalDay} Shawwal ${RAMADAN_YEAR} AH`;
}

export function getRamadanDates(): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const d = new Date(RAMADAN_START);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export function formatDateReadable(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}
