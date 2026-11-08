"use client";

import { createSessionStore } from "./session-store";
import type { RoastResponse, Spice } from "./types";

const roastStore = createSessionStore<RoastResponse | null>("rmt:roast", null);
const spiceStore = createSessionStore<Spice>("rmt:spice", "medium");

/** `undefined` = not hydrated yet, `null` = no roast this session. */
export const useRoast = roastStore.useValue;
export const setRoast = roastStore.set;
export const clearRoast = () => roastStore.set(null);

export function useSpice(): Spice {
  return spiceStore.useValue() ?? "medium";
}
export const setSpice = spiceStore.set;
