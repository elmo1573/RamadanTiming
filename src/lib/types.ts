export interface Location {
  lat: number;
  lon: number;
  city?: string;
}

export interface DayTiming {
  date: Date;
  roza: number;
  dayName: string;
  readable: string;
  hijri: string;
  fajr: string;
  maghrib: string;
}
