import { Location } from "./types";

const STORAGE_KEY = "ramadan-app-location";

export function getSavedLocation(): Location | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function saveLocation(loc: Location): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
}

export function clearLocation(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function requestGeolocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied. Please allow location access or enter your city manually."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information unavailable. Please try entering your city manually."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out. Please try again or enter your city manually."));
            break;
          default:
            reject(new Error("An unknown error occurred while getting your location."));
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  });
}
