"use client";

import { useState, useEffect } from "react";
import { Location } from "@/lib/types";
import { getSavedLocation } from "@/lib/location";
import LocationSetup from "@/components/LocationSetup";
import Dashboard from "@/components/Dashboard";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = getSavedLocation();
    if (saved) setLocation(saved);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!location) {
    return <LocationSetup onReady={setLocation} />;
  }

  return <Dashboard location={location} onReset={() => setLocation(null)} />;
}
