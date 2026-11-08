import { buildMockRoast } from "./mock";
import type { ErrorCode, RoastResponse, Spice } from "./types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const MAX_UPLOAD_MB = 100;

const MESSAGES: Record<ErrorCode, string> = {
  invalid_file:
    "That doesn't look like a Takeout watch-history.json. Make sure you picked JSON format, not HTML.",
  file_too_large: `That file is over ${MAX_UPLOAD_MB} MB. Even our AI has limits.`,
  empty_history: "Your history is empty. Either you're a saint or history was paused.",
  llm_failed: "The roast machine overheated. Give it a second and try again.",
  network: "Can't reach the roast server. Is it running?",
  unknown: "Something broke while roasting you. Try again.",
};

export class RoastError extends Error {
  constructor(public code: ErrorCode, message?: string) {
    super(message ?? MESSAGES[code]);
  }
}

/** Client-side sanity checks only — real validation happens on the server. */
export function checkFile(file: File): RoastError | null {
  if (!file.name.toLowerCase().endsWith(".json")) return new RoastError("invalid_file");
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return new RoastError("file_too_large");
  if (file.size === 0) return new RoastError("empty_history");
  return null;
}

function userTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export async function sampleRoast(spice: Spice): Promise<RoastResponse> {
  await new Promise((r) => setTimeout(r, 2600));
  return buildMockRoast(spice);
}

export async function requestRoast(file: File, spice: Spice): Promise<RoastResponse> {
  const local = checkFile(file);
  if (local) throw local;
  if (USE_MOCK) return sampleRoast(spice);

  const body = new FormData();
  body.append("file", file);
  body.append("spice", spice);
  body.append("timezone", userTimezone());

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/roast`, { method: "POST", body });
  } catch {
    throw new RoastError("network");
  }

  if (!res.ok) {
    let code: ErrorCode = "unknown";
    try {
      const data = await res.json();
      const c = data?.detail?.code;
      if (typeof c === "string" && c in MESSAGES) code = c as ErrorCode;
    } catch {
      // non-JSON error body
    }
    throw new RoastError(code);
  }

  return (await res.json()) as RoastResponse;
}
