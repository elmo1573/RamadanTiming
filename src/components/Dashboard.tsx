"use client";

import { useMemo, useState } from "react";
import { Location } from "@/lib/types";
import { getTodayAndNext } from "@/lib/prayer";
import { clearLocation } from "@/lib/location";
import TimingCard from "./TimingCard";
import RamadanPoster from "./RamadanPoster";

interface Props {
  location: Location;
  onReset: () => void;
}

export default function Dashboard({ location, onReset }: Props) {
  const [showPoster, setShowPoster] = useState(false);

  const timings = useMemo(
    () => getTodayAndNext(location.lat, location.lon, 3),
    [location.lat, location.lon]
  );

  const today = timings[0];
  const upcoming = timings.slice(1);

  function handleReset() {
    clearLocation();
    onReset();
  }

  if (showPoster) {
    return <RamadanPoster location={location} onBack={() => setShowPoster(false)} />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-5 py-8 sm:py-10 md:py-14">
      <div className="w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[36rem] mx-auto animate-fade-in">
        <header className="flex items-center justify-between gap-3 mb-8 sm:mb-10 animate-fade-in">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-display-lg font-semibold text-bark tracking-tight">
              Ramadan Timings
            </h1>
            {location.city && (
              <p className="text-bark/85 text-[0.8125rem] mt-1">{location.city}</p>
            )}
          </div>
          <button
            onClick={handleReset}
            className="text-[0.75rem] text-bark/80 hover:text-bark border border-bark/8 rounded-lg px-3 py-2 sm:px-3.5 shrink-0 hover:border-bark/20 hover:shadow-soft transition-all duration-250"
          >
           <strong>Change location</strong>
          </button>
        </header>

        <section className="mb-8">
          <TimingCard timing={today} highlight />
        </section>

        {upcoming.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[0.6875rem] font-medium text-bark/60 uppercase tracking-widest mb-4 px-0.5 animate-slide-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: "120ms" }}>
              Next 3 days
            </h2>
            <div className="space-y-2.5">
              {upcoming.map((day, i) => (
                <TimingCard key={i} timing={day} delayMs={180 + i * 80} />
              ))}
            </div>
          </section>
        )}

        <button
          onClick={() => setShowPoster(true)}
          className="w-full py-4 bg-teal text-white rounded-xl font-medium text-[0.9375rem] transition-all duration-250 hover:bg-teal-dark active:scale-[0.99] flex items-center justify-center gap-2.5 shadow-card animate-reveal opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "420ms" }}
        >
          <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          View full 30 days
        </button>

        <p className="text-center text-bark/20 text-[0.6875rem] mt-10 tracking-wide">
          Islah-e-Nafs · Hanafi 
        </p>
      </div>
    </div>
  );
}
