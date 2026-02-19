"use client";

import { DayTiming } from "@/lib/types";

interface Props {
  timing: DayTiming;
  highlight?: boolean;
  delayMs?: number;
}

export default function TimingCard({ timing, highlight, delayMs }: Props) {
  if (highlight) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-[1.25rem] shadow-card border border-gold/10 p-5 sm:p-6 md:p-8 lg:p-10 animate-reveal transition-shadow duration-250 hover:shadow-cardHover animate-glow">
        <div className="text-center mb-6 sm:mb-8">
          <p className="font-display text-display-sm text-gold-dark font-medium tracking-wide">{timing.hijri}</p>
          <p className="text-bark/45 text-[0.8125rem] mt-1.5">{timing.readable}</p>
          {timing.roza > 0 && (
            <span className="inline-block mt-3 px-3.5 py-1 bg-teal/8 text-teal text-[0.75rem] font-medium rounded-full border border-teal/15 animate-fade-in">
              Roza {timing.roza}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-teal/[0.06] rounded-xl p-4 sm:p-5 md:p-6 text-center border border-teal/10 shadow-inner animate-breathe min-w-0">
            <p className="text-bark/85 text-[0.6rem] sm:text-[0.6875rem] uppercase tracking-widest mb-1 sm:mb-2">Suhoor ends</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-teal tracking-tight break-words">{timing.fajr}</p>
            <p className="text-bark/55 text-[0.75rem] mt-1">Fajr</p>
          </div>
          <div className="bg-gold/[0.06] rounded-xl p-4 sm:p-5 md:p-6 text-center border border-gold/10 shadow-inner animate-breathe min-w-0" style={{ animationDelay: "1s" }}>
            <p className="text-bark/85 text-[0.6rem] sm:text-[0.6875rem] uppercase tracking-widest mb-1 sm:mb-2">Iftar begins</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gold-dark tracking-tight break-words">{timing.maghrib}</p>
            <p className="text-bark/55 text-[0.75rem] mt-1">Maghrib</p>
          </div>
        </div>
      </div>
    );
  }

  const delayStyle = delayMs != null ? { animationDelay: `${delayMs}ms` } : undefined;
  return (
    <div
      className="bg-white/70 backdrop-blur-sm rounded-xl border border-bark/5 p-3 sm:p-4 md:p-5 flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center justify-between gap-2 min-[400px]:gap-0 transition-all duration-250 hover:bg-white/85 hover:shadow-soft hover:-translate-y-0.5 animate-slide-up opacity-0 [animation-fill-mode:forwards]"
      style={delayStyle}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-bark font-medium text-[0.875rem] sm:text-[0.9375rem] truncate">{timing.dayName}</p>
          {timing.roza > 0 && (
            <span className="text-[0.625rem] px-2 py-0.5 bg-teal/8 text-teal rounded-full font-medium border border-teal/10">
              Roza {timing.roza}
            </span>
          )}
        </div>
        <p className="text-bark/40 text-[0.7rem] sm:text-[0.75rem] mt-0.5">{timing.readable}</p>
      </div>
      <div className="flex gap-4 sm:gap-6 md:gap-8 text-right shrink-0 self-end min-[400px]:self-auto">
        <div>
          <p className="text-bark/95 text-[0.625rem] uppercase tracking-wider">Suhoor</p>
          <p className="text-teal font-semibold text-[0.9375rem]">{timing.fajr}</p>
        </div>
        <div>
          <p className="text-bark/95 text-[0.625rem] uppercase tracking-wider">Iftar</p>
          <p className="text-gold-dark font-semibold text-[0.9375rem]">{timing.maghrib}</p>
        </div>
      </div>
    </div>
  );
}
