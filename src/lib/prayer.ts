import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  CalculationParameters,
} from "adhan";
import { DayTiming } from "./types";
import { getRozaNumber, getHijriDisplay, formatDateReadable, getDayName } from "./ramadan";

function getParams(): CalculationParameters {
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi;
  return params;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getPrayerTimes(lat: number, lon: number, date: Date): { fajr: string; maghrib: string } {
  const coords = new Coordinates(lat, lon);
  const params = getParams();
  const prayers = new PrayerTimes(coords, date, params);

  return {
    fajr: formatTime(prayers.fajr),
    maghrib: formatTime(prayers.maghrib),
  };
}

export function getDayTiming(lat: number, lon: number, date: Date): DayTiming {
  const times = getPrayerTimes(lat, lon, date);
  return {
    date,
    roza: getRozaNumber(date),
    dayName: getDayName(date),
    readable: formatDateReadable(date),
    hijri: getHijriDisplay(date),
    fajr: times.fajr,
    maghrib: times.maghrib,
  };
}

export function getTodayAndNext(lat: number, lon: number, count: number): DayTiming[] {
  const result: DayTiming[] = [];
  for (let i = 0; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push(getDayTiming(lat, lon, d));
  }
  return result;
}

export function getRamadanTimings(lat: number, lon: number, dates: Date[]): DayTiming[] {
  return dates.map((date) => getDayTiming(lat, lon, date));
}
