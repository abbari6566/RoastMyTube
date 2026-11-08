import type { RoastResponse, Spice } from "./types";

// Sample roast used for frontend development (NEXT_PUBLIC_USE_MOCK=true) and the
// "Try a sample roast" button. Shape must match RoastResponse exactly.

const SUMMARY: Record<Spice, string> = {
  mild:
    "You logged **1,482 hours** this year. About ==42%== went to Python tutorials you'll definitely finish someday, ==35%== to men building swimming pools out of mud, and ==18%== to video essays about 2000s cartoons. Honestly? Kind of charming.",
  medium:
    "You logged **1,482 hours** this year staring into the glowing abyss. ==42%== was spent pretending you're finally going to master Python, ==35%== entranced by shirtless primitives digging underground swimming pools with sticks, and ==18%== nodding solemnly to 4-hour video essays analyzing canceled 2000s Nickelodeon sitcoms you never actually watched.",
  savage:
    "You logged **1,482 hours** this year — that's a part-time job where the only thing you produced was a dent in your couch. ==42%== Python tutorials (zero commits), ==35%== mud-pool primitivism (zero pools), and ==18%== four-hour cartoon autopsies. The algorithm doesn't recommend videos to you anymore. It just leaves the door open.",
};

const CLOSER: Record<Spice, string> = {
  mild: "You're fine. Mostly. Maybe go outside and look at a real tree instead of a 4K one.",
  medium:
    "Your recommendation feed isn't a reflection of your interests. It's a cry for help with autoplay enabled.",
  savage:
    "If your watch history were a person, it would be asked to leave the library. Close the tab. Touch grass. Then come back and watch a video about grass.",
};

export function buildMockRoast(spice: Spice): RoastResponse {
  return {
    meta: {
      report_id: "YT-84920-F",
      spice,
      generated_at: new Date().toISOString(),
      total_videos: 18342,
      date_range: { start: "2025-11-07", end: "2026-11-06" },
      days_covered: 365,
      estimated_hours: 1482,
    },
    diagnosis: {
      title: "3 AM Doomsday Prepper",
      title_accent: "Lofi Looper",
      tag: "Terminal case of chronic procrastination",
      summary: SUMMARY[spice],
      tier: "S+",
      resistance: "0.00% (complete surrender)",
      hero_video_id: null,
    },
    metrics: [
      {
        kicker: "Metric #01 // Lifespan flushed",
        label: "Watch time wasted",
        value: "61.7",
        unit: "Days",
        caption:
          "Equivalent to completing an accelerated Master's degree, except you learned literally nothing.",
        tone: "light",
      },
      {
        kicker: "Metric #02 // Secondhand shame",
        label: "Cringe factor",
        value: "94.2",
        unit: "%",
        caption:
          "You watched “alpha male morning routine full uncut” three times. There is no redemption.",
        badge: "Biohazard",
        tone: "red",
      },
      {
        kicker: "Metric #03 // REM cycle torture",
        label: "Peak guilt hours",
        value: "01:42 - 04:15",
        unit: "AM",
        caption:
          "The unholy temporal corridor where every functional decision dies in a sea of autoplay thumbnails.",
        tone: "light",
      },
      {
        kicker: "Metric #04 // Neuron activation",
        label: "Clickbait vulnerability",
        value: "98",
        unit: "/100",
        caption:
          "Gasping YouTuber face + giant red circle + bold comic sans = prefrontal cortex instantly powers down.",
        tone: "light",
      },
    ],
    rabbit_holes: [
      {
        category: "Abandoned productivity",
        name: "Techbro Hustle Alpha",
        count_label: "124 videos watched",
        video_id: null,
        duration_label: "14:22:09 logged",
        gauges: [
          { label: "Tutorials applied", value: "0.00% (47 abandoned)", percent: 2 },
          { label: "Dopamine extracted", value: "100% (pure illusion)", percent: 100 },
        ],
        facts: [
          { label: "Code written", value: "14 lines" },
          { label: "SaaS MRR", value: "$0.00" },
        ],
        assessment:
          "You have consumed 47 tutorials on how to build a venture-backed SaaS in 48 hours, yet your only deployed production build is an abandoned counter app with two open pull requests from a bot.",
        footnote: "Primary trigger: 1:40 AM panic attack",
      },
      {
        category: "Late night regrets",
        name: "Primitive Mud Castles",
        count_label: "88 videos watched",
        video_id: null,
        duration_label: "29:40:11 logged",
        gauges: [
          { label: "Delusion index", value: "99.4% (apocalypse ready)", percent: 99 },
          { label: "Real world mud dug", value: "0.00 grams", percent: 1 },
        ],
        facts: [
          { label: "View peak", value: "3:42 AM" },
          { label: "Real tools owned", value: "1 butter knife" },
        ],
        assessment:
          "If the apocalypse hits tomorrow, you apparently believe you will survive by hand-sculpting a two-story underground villa using bamboo, river clay, and your bare hands.",
        footnote: "Diagnosed habit: chronic insomnia coping",
      },
      {
        category: "Brainrot essentials",
        name: "2-hr 2000s Cartoon Essays",
        count_label: "64 documentaries",
        video_id: null,
        duration_label: "128:15:40 logged",
        gauges: [
          { label: "Attention span remaining", value: "12 seconds", percent: 6 },
          { label: "Texts left on read", value: "42 unanswered", percent: 84 },
        ],
        facts: [
          { label: "Avg duration", value: "2h 45m" },
          { label: "Theme", value: "“Capitalist downfall of Shrek”" },
        ],
        assessment:
          "You won't reply to your mother's text from Tuesday, but you will gladly dedicate 160 uninterrupted minutes to why Shrek 2 is secretly a magnum opus of post-modern cinematic sorrow.",
        footnote: "Status: dissociative deep dive",
      },
      {
        category: "Perpetual procrastination",
        name: "Lo-fi Girl Radio",
        count_label: "412 hours logged",
        video_id: null,
        duration_label: "412:00:00 streamed",
        gauges: [
          { label: "Girl's homework done", value: "4,000 editions", percent: 100 },
          { label: "Your actual thesis", value: "3 lines (title page)", percent: 3 },
        ],
        facts: [
          { label: "Tab left open for", value: "19 days" },
          { label: "Productivity gained", value: "-40%" },
        ],
        assessment:
          "That fictional animated girl has completed her homework 4,000 consecutive times across 17 semesters. Meanwhile, you have typed three sentences into a Google Doc and rearranged your desktop icons.",
        footnote: "Primary symptom: tab hoarding",
      },
    ],
    descent: {
      session_label: "Session: 03:19 AM Wednesday",
      hops: [
        {
          time: "11:15 PM",
          phase: "Innocent intent",
          title: "Best budget USB microphone for Zoom calls",
          caption: "Just a responsible professional trying to optimize audio for Monday standup.",
          dopamine: 12,
          mind: "Rational mind: active",
        },
        {
          time: "11:58 PM",
          phase: "Slight detour",
          title: "Why Cheap Mics Sound Terrible: An Acoustic Physics Breakdown",
          caption: "Convinced yourself that understanding sound compression is critical to sending an email.",
          dopamine: 41,
          mind: "Rational mind: wavering",
        },
        {
          time: "01:45 AM",
          phase: "Off the rails",
          title: "Every Audio Glitch In 90s PlayStation 1 Bios Ranked By Dread",
          caption: "Work laptop closed. Now sitting on the edge of the bed staring into blue light glare.",
          dopamine: 78,
          mind: "Rational mind: flatlining",
        },
        {
          time: "03:19 AM",
          phase: "Total brain liquefaction",
          title: "Can a Silverback Gorilla Defeat a Grizzly Bear in Medieval Armor (Simulated)?",
          caption: "You watched all 34 minutes of mathematical armor penetration calculus without blinking once.",
          dopamine: 100,
          mind: "Soul status: extinguished",
        },
      ],
    },
    poison: {
      score: 9.8,
      blurb:
        "Your recommendation engine is currently tailored for a medieval blacksmith suffering from clinical ADHD and an obsession with forgotten cartoons. Standard clean feeds can no longer save you.",
      bars: [
        { label: "Nostalgia trap susceptibility", percent: 96, note: "Critical" },
        { label: "Fake productivity consumption", percent: 92, note: "Terminal" },
        { label: "Midnight slime / mud hypnosis", percent: 88, note: "Heavy" },
      ],
      recovery:
        "You have passed the point where “Not interested” clicks will retrain the algorithm. You have two exit pathways remaining.",
    },
    receipt: {
      stamp: "Irredeemable",
      cringe_percent: 94.2,
      items: [
        { qty: 1, title: "4-Hour Skyrim Analysis Essay", detail: "Cost: 1 entire social life", tag: "Completed 100%" },
        { qty: 14, title: "“How to Fix Sleep Schedule”", detail: "Watched at: 3:45 AM - 4:15 AM", tag: "Chronic insomnia" },
        { qty: 89, title: "Guy Restoring 1940s Toaster", detail: "Rabbit hole: industrial ASMR", tag: "47.8 hrs total" },
        { qty: 1, title: "“How to Get Rich Quick with AI”", detail: "Account balance: $14.20", tag: "Gullible detected" },
        { qty: 6, title: "“Why do I feel hollow after 8 hrs YT”", detail: "Watched at: 4:02 AM", tag: "Existential" },
      ],
    },
    stats: {
      top_channels: [
        { name: "Primitive Technology Daily", count: 412 },
        { name: "Lofi Girl", count: 388 },
        { name: "Hustle Alpha Academy", count: 124 },
        { name: "Cartoon Autopsy", count: 96 },
        { name: "Toaster Restorations", count: 89 },
      ],
      peak_hour: 2,
      late_night_share: 0.38,
      most_rewatched: [
        { title: "alpha male morning routine full uncut", count: 3 },
        { title: "How to Fix Sleep Schedule", count: 14 },
      ],
      music_plays: 1203,
      longest_binge: { date: "2026-03-11", videos: 47, minutes: 412 },
    },
    closer: CLOSER[spice],
  };
}
