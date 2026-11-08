import type { Spice } from "./types";

export interface SpiceProfile {
  id: Spice;
  name: string;
  level: string;
  emoji: string;
  pill: string;
  blurb: string;
  sample: string;
  accent: "muted" | "ember" | "flame";
}

export const SPICES: SpiceProfile[] = [
  {
    id: "mild",
    name: "Mild Banter",
    level: "Level 01",
    emoji: "🥒",
    pill: "Mild",
    blurb:
      "Gentle teasing and wholesome ribs. Points out that you watch too many recipe tutorials you never actually cook.",
    sample: "“Another 15-minute pasta tutorial? We both know you ordered takeout.”",
    accent: "muted",
  },
  {
    id: "medium",
    name: "Spicy Critique",
    level: "Standard def",
    emoji: "🌶️🌶️",
    pill: "Extra spicy",
    blurb:
      "Standard snark. Mercilessly calls out your 3-hour video essays on forgotten 2000s shows and productivity grifters.",
    sample: "“Watching 4 hours of ‘How to build discipline’ at 3:45 AM while covered in Dorito dust.”",
    accent: "ember",
  },
  {
    id: "savage",
    name: "Nuclear Incineration",
    level: "Unhinged tier",
    emoji: "🔥💀",
    pill: "Nuclear",
    blurb:
      "Zero algorithmic mercy. Interrogates your broken ambitions, abandoned hobbies, and that 2016 lofi hip-hop addiction.",
    sample: "“Your watch history is a clinical cry for help disguised as ‘coding ambiance’.”",
    accent: "flame",
  },
];

export function spiceProfile(id: Spice): SpiceProfile {
  return SPICES.find((s) => s.id === id) ?? SPICES[1];
}
