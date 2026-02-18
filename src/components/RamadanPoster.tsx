"use client";

import { useMemo, useState, useRef } from "react";
import { Location } from "@/lib/types";
import { getRamadanTimings } from "@/lib/prayer";
import { RAMADAN_START, RAMADAN_YEAR, TOTAL_DAYS, getRamadanDates, formatDateReadable } from "@/lib/ramadan";
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

  const startStr = formatDateReadable(RAMADAN_START);
  const endDate = new Date(RAMADAN_START);
  endDate.setDate(endDate.getDate() + TOTAL_DAYS - 1);
  const endStr = formatDateReadable(endDate);

  return (
    <div className="min-h-screen px-5 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <button
            onClick={onBack}
            className="text-bark/45 hover:text-bark flex items-center gap-1.5 text-[0.8125rem] transition-colors duration-250"
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
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-10 opacity-0 animate-fade-in [animation-fill-mode:forwards]" style={{ animationDelay: "0.25s" }}>
              <span className="inline-block px-4 py-1.5 bg-teal/8 rounded-full mb-4 border border-teal/10 animate-breathe">
                <span className="text-teal text-[0.75rem] font-medium tracking-widest uppercase">Ramadan Mubarak</span>
              </span>
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-bark tracking-tight mb-2">
                Ramadan {RAMADAN_YEAR} AH
              </h1>
              {location.city && <p className="text-black/45 text-[0.9375rem]">{location.city}</p>}
              <p className="text-bark/30 text-[0.75rem] mt-2 tracking-wide">
                </p>
            </div>

            <div className="relative overflow-x-auto -mx-2">
              <div
                className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/islah-logo.png"
                  alt=""
                  className="max-w-[280px] w-[70%] h-auto opacity-[0.11] object-contain"
                />
              </div>
              <table className="w-full text-[0.875rem] relative z-10">
                <thead>
                  <tr className="bg-teal text-white">
                    <th className="py-3 px-3 text-center font-semibold rounded-tl-xl w-14">Roza</th>
                    <th className="py-3 px-3 text-left font-semibold">Date</th>
                    <th className="py-3 px-3 text-left font-semibold">Day</th>
                    <th className="py-3 px-3 text-center font-semibold">Sehri</th>
                    <th className="py-3 px-3 text-center font-semibold rounded-tr-xl">Iftar</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const isFriday = row.dayName === "Friday";
                    return (
                      <tr
                        key={row.roza}
                        className={`border-b border-bark/5 transition-colors ${
                          isFriday
                            ? "bg-gold/10 font-medium"
                            : row.roza % 2 === 0
                            ? "bg-white/50"
                            : "bg-transparent"
                        }`}
                      >
                        <td className="py-3 px-3 text-center text-bark/70 font-semibold">{row.roza}</td>
                        <td className="py-3 px-3 text-bark/65 text-[0.8125rem]">{row.readable}</td>
                        <td className={`py-3 px-3 ${isFriday ? "text-teal font-semibold" : "text-bark/65"}`}>
                          {row.dayName.slice(0, 3)}
                        </td>
                        <td className="py-3 px-3 text-center text-teal font-semibold">{row.fajr}</td>
                        <td className="py-3 px-3 text-center text-gold-dark font-semibold">{row.maghrib}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-12 pt-8 border-t border-bark/8 text-center">
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/islah-logo.png"
                  alt="Islah-e-Nafs"
                  className="h-14 mx-auto"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <p className="font-display text-bark font-semibold text-lg tracking-tight">Islah-e-Nafs</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
                <a
                  href="https://instagram.com/islahenafs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bark/55 text-[0.8125rem] tracking-wide transition-all duration-250 hover:text-teal hover:scale-105 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="font-medium text-gold-dark/80">Instagram</span> @islahenafs
                </a>
                <a
                  href="https://youtube.com/@islah-e-Nafs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bark/55 text-[0.8125rem] tracking-wide transition-all duration-250 hover:text-teal hover:scale-105 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="font-medium text-gold-dark/80">YouTube</span> @islah-e-Nafs
                </a>
                <a
                  href="https://islahenafs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bark/55 text-[0.8125rem] tracking-wide transition-all duration-250 hover:text-teal hover:scale-105 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                  style={{ animationDelay: "0.7s" }}
                >
                  <span className="font-medium text-gold-dark/80">Website</span> islahenafs.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
