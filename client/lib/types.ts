// Mirrors the FastAPI response contract (server/app/schemas.py is the source of truth).
// The server computes every number and the LLM writes every joke; the client only renders.

export type Spice = "mild" | "medium" | "savage";

export interface DateRange {
  start: string; // ISO date
  end: string; // ISO date
}

export interface Meta {
  report_id: string;
  spice: Spice;
  generated_at: string; // ISO datetime
  total_videos: number;
  date_range: DateRange;
  days_covered: number;
  estimated_hours: number; // estimated from timestamp gaps (Takeout has no durations)
}

export interface Diagnosis {
  title: string; // "3 AM Doomsday Prepper"
  title_accent: string; // "Lofi Looper" (rendered after a red "&")
  tag: string; // "Terminal case of chronic procrastination"
  summary: string; // supports **red** and ==amber== highlight markers
  tier: string; // "S+"
  resistance: string; // "0.00% (complete surrender)"
  hero_video_id: string | null;
}

export type Tone = "light" | "red" | "amber";

export interface Metric {
  kicker: string; // "Metric #01 // Lifespan flushed"
  label: string; // "Watch time wasted"
  value: string; // "61.7"
  unit?: string; // "Days"
  caption: string;
  badge?: string; // "Biohazard"
  tone: Tone;
}

export interface Gauge {
  label: string;
  value: string;
  percent: number; // 0-100
}

export interface Fact {
  label: string;
  value: string;
}

export interface RabbitHole {
  category: string; // "Late night regrets"
  name: string; // "Primitive mud castles"
  count_label: string; // "88 videos watched"
  video_id: string | null; // thumbnail source
  duration_label: string; // "29:40:11 logged"
  gauges: Gauge[];
  facts: Fact[];
  assessment: string;
  footnote: string; // "Diagnosed habit: chronic insomnia coping"
}

export interface Hop {
  time: string; // "11:15 PM"
  phase: string; // "Innocent intent"
  title: string; // the real video title watched at that point
  caption: string;
  dopamine: number; // 0-100
  mind: string; // "Rational mind: active"
}

export interface Descent {
  session_label: string; // "Session: 03:19 AM Wednesday"
  hops: Hop[];
}

export interface PoisonBar {
  label: string;
  percent: number;
  note: string; // "Critical"
}

export interface Poison {
  score: number; // 0-10
  blurb: string;
  bars: PoisonBar[];
  recovery: string;
}

export interface ReceiptItem {
  qty: number;
  title: string;
  detail: string;
  tag: string;
}

export interface Receipt {
  items: ReceiptItem[];
  stamp: string; // "Irredeemable"
  cringe_percent: number;
}

export interface ChannelCount {
  name: string;
  count: number;
}

export interface Stats {
  top_channels: ChannelCount[];
  peak_hour: number; // 0-23, user's local time
  late_night_share: number; // 0-1, share watched 00:00–05:00 local
  most_rewatched: { title: string; count: number }[];
  music_plays: number;
  longest_binge: { date: string; videos: number; minutes: number };
}

export interface RoastResponse {
  meta: Meta;
  diagnosis: Diagnosis;
  metrics: Metric[];
  rabbit_holes: RabbitHole[];
  descent: Descent | null;
  poison: Poison;
  receipt: Receipt;
  stats: Stats;
  closer: string;
}

export type ErrorCode =
  | "invalid_file"
  | "file_too_large"
  | "empty_history"
  | "llm_failed"
  | "network"
  | "unknown";
