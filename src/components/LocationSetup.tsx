"use client";

import { useState, useRef, useEffect } from "react";
import { Location } from "@/lib/types";
import { requestGeolocation, saveLocation } from "@/lib/location";
import { City, searchCities } from "@/lib/cities";
import Spinner from "./Spinner";

interface Props {
  onReady: (loc: Location) => void;
}

export default function LocationSetup({ onReady }: Props) {
  const [mode, setMode] = useState<"choice" | "manual">("choice");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const results = searchCities(query);
    setSuggestions(results);
    setHighlighted(-1);
    setShowSuggestions(results.length > 0 && query.length >= 2);
  }, [query]);

  function selectCity(city: City) {
    const loc: Location = { lat: city.lat, lon: city.lon, city: `${city.name}, ${city.country}` };
    saveLocation(loc);
    onReady(loc);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      selectCity(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  async function handleGeolocate() {
    setLoading(true);
    setError("");
    try {
      const coords = await requestGeolocation();
      const loc: Location = { lat: coords.lat, lon: coords.lon };
      saveLocation(loc);
      onReady(loc);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not get your location. Try entering your city instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-5 py-10 sm:py-12">
      <div className="w-full max-w-[min(22rem,calc(100vw-2rem))] sm:max-w-[24rem] lg:max-w-[26rem] animate-fade-in">
        <div className="bg-white/90 backdrop-blur-md rounded-[1.25rem] shadow-card border border-gold/10 p-6 sm:p-8 md:p-10 text-center transition-shadow duration-250 hover:shadow-cardHover animate-reveal">
          <div className="mb-6 sm:mb-8">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-teal/8 flex items-center justify-center ring-1 ring-teal/10 animate-breathe">
              <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </div>
            <h1 className="font-display text-display-lg font-semibold text-bark tracking-tight mb-2">
              Ramadan Timings
            </h1>
            <p className="text-gold-dark/75 text-[0.8125rem] font-semibold leading-relaxed max-w-[16rem] mx-auto">
              Suhoor and Iftar for your location
              (Pakistan Only)
            </p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50/80 border border-red-100 rounded-xl text-red-700 text-[0.8125rem] leading-snug animate-fade-in-fast">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-10">
              <Spinner />
              <p className="mt-4 text-bark/45 text-[0.8125rem]">Detecting location...</p>
            </div>
          ) : mode === "choice" ? (
            <div className="space-y-3">
              <button
                onClick={handleGeolocate}
                className="w-full py-3.5 px-5 bg-teal text-white rounded-xl font-medium text-[0.9375rem] transition-all duration-250 hover:bg-teal-dark active:scale-[0.99] flex items-center justify-center gap-2.5 shadow-soft"
              >
                <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Use My Location
              </button>
              <button
                onClick={() => setMode("manual")}
                className="w-full py-3.5 px-5 bg-sand/60 text-bark rounded-xl font-medium text-[0.9375rem] transition-all duration-250 hover:bg-sand border border-bark/5"
              >
                Enter city
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in-fast">
              <div className="relative text-left">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a city..."
                  className="w-full py-3.5 px-4 bg-cream/80 border border-bark/8 rounded-xl text-bark text-[0.9375rem] placeholder:text-bark/35 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal/30 transition-all duration-250"
                  autoFocus
                  autoComplete="off"
                />
                {showSuggestions && (
                  <ul className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-card border border-bark/5 overflow-hidden max-h-56 overflow-y-auto animate-slide-down">
                    {suggestions.map((city, i) => (
                      <li
                        key={`${city.name}-${city.country}`}
                        onMouseDown={() => selectCity(city)}
                        className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors duration-250 ${
                          i === highlighted ? "bg-teal/8 text-teal" : "hover:bg-sand/40"
                        }`}
                      >
                        <span className="font-medium text-[0.9375rem]">{city.name}</span>
                        <span className="text-bark/40 text-[0.75rem]">{city.country}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-bark/35 text-[0.6875rem] tracking-wide uppercase">2+ letters for suggestions</p>
              <button
                onClick={() => { setMode("choice"); setError(""); setQuery(""); }}
                className="w-full py-2 text-bark/40 text-[0.8125rem] hover:text-bark transition-colors duration-250"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
