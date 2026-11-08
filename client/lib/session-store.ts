"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny sessionStorage-backed store. Keeps the roast alive across the four tabs
 * and a page refresh, without a server or a database.
 *
 * `useValue()` returns `undefined` during prerender / before hydration so pages
 * can avoid flashing the empty state.
 */
export function createSessionStore<T>(key: string, fallback: T) {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function read(): T {
    if (cache === undefined) {
      try {
        const raw = window.sessionStorage.getItem(key);
        cache = raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        cache = fallback;
      }
    }
    return cache;
  }

  function set(value: T) {
    cache = value;
    try {
      if (value === null || value === undefined) window.sessionStorage.removeItem(key);
      else window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Private mode / quota — the in-memory value still works for this visit.
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function useValue(): T | undefined {
    return useSyncExternalStore(subscribe, read, () => undefined);
  }

  return { useValue, set, get: read };
}
