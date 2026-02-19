"use client";

import { useMemo, useState, useRef } from "react";
import { Location } from "@/lib/types";
import { getRamadanTimings } from "@/lib/prayer";
import { RAMADAN_YEAR, TOTAL_DAYS, getRamadanDates, formatDateCompact } from "@/lib/ramadan";
import Spinner from "./Spinner";

interface Props {
  location: Location;
  onBack: () => void;
}

export default function RamadanPoster({ location, onBack }: Props) {
  const [exporting, setExporting] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    const dates = getRamadanDates();
    return getRamadanTimings(location.lat, location.lon, dates);
  }, [location.lat, location.lon]);

  async function handleExport() {
    if (!posterRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: "#FDF6EC",
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "ramadan-timings-2026.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      alert("Could not export the image. Please try taking a screenshot instead.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen px-5 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <button
            onClick={onBack}
            className="text-bark/85 hover:text-bark flex items-center gap-1.5 text-[0.8125rem] transition-colors duration-250"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="py-2.5 px-5 bg-teal text-white rounded-xl text-[0.8125rem] font-medium hover:bg-teal-dark transition-all duration-250 disabled:opacity-50 flex items-center gap-2 shadow-soft"
          >
            {exporting ? (
              <>
                <Spinner size="sm" />
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download as image
              </>
            )}
          </button>
        </div>

        <div ref={posterRef} className="bg-cream rounded-[1.25rem] shadow-card overflow-hidden relative border border-gold/10 animate-reveal">
          <div className="poster-pattern" />
          <div className="relative z-10 p-5 md:p-6">
            <div className="text-center mb-5 opacity-0 animate-fade-in [animation-fill-mode:forwards]" style={{ animationDelay: "0.25s" }}>
              <h1 className="font-display text-xl md:text-2xl font-semibold text-bark tracking-tight mb-0.5">
                RAMADAN CALENDAR
              </h1>
              <p className="text-bark/75 text-[0.875rem]">{RAMADAN_YEAR} A.H / 2026 A.D</p>
              {location.city && <p className="text-bark/85 text-[0.75rem] mt-1">{location.city} </p>}
            </div>

            <div className="relative overflow-x-auto -mx-1">
              <div
                className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/islah-logo.png"
                  alt=""
                  className="max-w-[400px] w-[90%] h-auto opacity-[0.1] object-contain"
                />
              </div>
              <table className="w-full text-[0.6875rem] md:text-[0.75rem] relative z-10">
                <thead>
                  <tr>
                    <th className="py-1.5 px-2 text-center font-semibold rounded-tl-lg bg-gold/35 text-bark w-12">RAMADAN</th>
                    <th className="py-1.5 px-2 text-left font-semibold rounded-t bg-gold/35 text-bark">DATE</th>
                    <th className="py-1.5 px-2 text-left font-semibold rounded-t bg-gold/35 text-bark">DAY</th>
                    <th className="py-1.5 px-2 text-center font-semibold rounded-t bg-gold/35 text-bark">SEHRI</th>
                    <th className="py-1.5 px-2 text-center font-semibold rounded-tr-lg bg-gold/35 text-bark">IFTAR</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const isFriday = row.dayName === "Friday";
                    const isAltRow = row.roza % 2 === 0;
                    return (
                      <tr
                        key={row.roza}
                        className={`border-b border-bark/5 ${
                          isFriday
                            ? "bg-gold/15 font-medium"
                            : isAltRow
                            ? "bg-teal/10"
                            : "bg-transparent"
                        }`}
                      >
                        <td className="py-1 px-2 text-center text-bark/75 font-semibold">
                          {String(row.roza).padStart(2, "0")} <span className="font-bold">ROZA</span>
                        </td>
                        <td className="py-1 px-2 text-blue/70">{formatDateCompact(row.date)}</td>
                        <td className={`py-1 px-2 ${isFriday ? "text-teal font-semibold" : "text-gold-dark/90 font-semibold"}`}>
                          {row.dayName.toUpperCase()}
                        </td>
                        <td className="py-1 px-2 text-center text-teal font-semibold">{row.fajr}</td>
                        <td className="py-1 px-2 text-center text-gold-dark font-semibold">{row.maghrib}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-4 space-y-3">
              <div className="rounded py-1.5 px-3 bg-gold/20 border border-gold/30 opacity-0 animate-fade-in-fast [animation-fill-mode:forwards]" style={{ animationDelay: "0.2s" }}>
                <p className="text-[0.65rem] font-semibold text-bark/80 tracking-wide uppercase">Dua for Suhur</p>
                <p className="text-bark text-[0.75rem] mt-0.5 leading-relaxed font-[inherit]" dir="rtl">وَبِصَوْمٍ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ</p>
              </div>
              <div className="rounded py-1.5 px-3 bg-gold/20 border border-gold/30 opacity-0 animate-fade-in-fast [animation-fill-mode:forwards]" style={{ animationDelay: "0.35s" }}>
                <p className="text-[0.65rem] font-semibold text-bark/80 tracking-wide uppercase">Dua for Iftar</p>
                <p className="text-bark text-[0.75rem] mt-0.5 leading-relaxed font-[inherit]" dir="rtl">اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ أَمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-bark/8 text-center opacity-0 animate-fade-in-fast [animation-fill-mode:forwards]" style={{ animationDelay: "0.45s" }}>
              <div className="flex items-center justify-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/islah-log.png"
                  alt="Islah-e-Nafs"
                  className="h-24"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="text-left">
                  <p className="font-display text-bark font-semibold text-sm tracking-tight">Islah-e-Nafs</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5 text-[0.7rem] text-bark/55">
                    <a href="https://instagram.com/islahenafs" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors duration-250">Instagram: @islahenafs</a>
                    <a href="https://youtube.com/@islah-e-Nafs" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors duration-250">YouTube: @islah-e-Nafs</a>
                    <a href="https://islahenafs.org" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors duration-250">Website: islahenafs.org</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
