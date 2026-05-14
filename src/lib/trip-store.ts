import { useEffect, useState } from "react";
import { buildTrip, type Trip } from "./borderless-data";

const KEY = "borderless.trip.v1";

export function saveTrip(from: string, to: string, reason: string) {
  const trip = buildTrip(from, to, reason);
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify({ from, to, reason }));
    localStorage.removeItem("borderless.checked.v1");
  }
  return trip;
}

export function loadTrip(): Trip | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const { from, to, reason } = JSON.parse(raw);
    return buildTrip(from, to, reason);
  } catch {
    return null;
  }
}

export function useTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  useEffect(() => setTrip(loadTrip()), []);
  return [trip, setTrip] as const;
}

const CHECK_KEY = "borderless.checked.v1";

export function useChecked() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(CHECK_KEY);
    if (raw) {
      try { setChecked(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);
  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (typeof window !== "undefined") {
        localStorage.setItem(CHECK_KEY, JSON.stringify(next));
      }
      return next;
    });
  }
  return { checked, toggle };
}