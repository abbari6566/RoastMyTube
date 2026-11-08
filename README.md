# 🔥 RoastMyTube

**Upload your YouTube watch history. Get roasted by AI.**

RoastMyTube is a fun, no-login web app. You export your watch history from Google Takeout, upload
the file, pick how brutal you want it, and an AI tears apart your 3 AM rabbit holes, abandoned
tutorials, and lofi addiction — then hands you a shareable "shame receipt."

Nothing is stored. Your file is processed in memory and thrown away.

---

## How it works

```
 Browser (Next.js)                     Server (FastAPI)                     OpenAI
 ─────────────────                     ────────────────                     ──────
 upload watch-history.json  ───────►   parse   → clean watch events
 + spice level + timezone              digest  → stats + sample titles  ───► writes the jokes
                                       respond → numbers + roast        ◄───
 render dashboard, rabbit   ◄───────
 holes, shareable receipt
```

- **Numbers come from code, jokes come from the LLM.** The server computes every stat (top
  channels, late-night share, longest binge, rewatches); the AI only writes the commentary.
- **The full history never goes to the AI.** Files can be tens of MB, so the server condenses
  them into a small digest first.
- **No accounts, no database.** Upload → roast → done.

### The four screens

| Screen | What you get |
|---|---|
| **1. Upload & Roast** | Drop your file, choose a spice level: 🥒 Mild Banter · 🌶️ Spicy Critique · 💀 Nuclear Incineration |
| **2. Roast Dashboard** | Your "diagnosis", shame metrics, top channels, closing burn |
| **3. Channel Rabbit Holes** | Your biggest obsessions, the path of descent from one late-night session, algorithm poison index |
| **4. Roast Receipt** | A shareable receipt — 4 themes, story or landscape size, export as PNG, share to X / Reddit |

---

## Get your watch history

1. Go to [takeout.google.com](https://takeout.google.com) and click **Deselect all**.
2. Tick **YouTube and YouTube Music**.
3. **All YouTube data included** → keep only **history**.
4. **Multiple formats** → set History to **JSON** (the default is HTML — that won't work).
5. Export, download the zip, and upload
   `Takeout/YouTube and YouTube Music/history/watch-history.json`.

> Accounts created after mid-2020 auto-delete history older than 3 years by default, so your roast
> may only cover recent sins.

---

## Tech stack

| Part | Stack |
|---|---|
| `client/` | Next.js 16, React 19, TypeScript, Tailwind CSS v4 — client-side rendered SPA (static export) |
| `server/` | Python 3.12, FastAPI, managed with [uv](https://docs.astral.sh/uv/) |
| AI | OpenAI API (structured output) |

## Project structure

```
RoastMyTube/
├── client/                 # Next.js frontend
│   ├── app/                # routes: /, /dashboard, /rabbit-holes, /receipt
│   ├── components/         # UI components
│   ├── lib/                # API client, types (response contract), mock data, stores
│   └── design_samples/     # reference UI designs
└── server/                 # FastAPI backend (in progress)
```

---

## Running locally

### Prerequisites
- Node.js 20+
- Python 3.12 and [uv](https://docs.astral.sh/uv/)
- An OpenAI API key

### Client

```bash
cd client
cp .env.example .env.local     # set NEXT_PUBLIC_USE_MOCK=false to use the real server
npm install
npm run dev                    # http://localhost:3000
```

With `NEXT_PUBLIC_USE_MOCK=true` the app runs entirely on sample data — no server needed.
You can also click **Try a sample roast** on the home page any time.

### Server

```bash
cd server
# create server/.env with:
#   OPENAI_API_KEY=your-key
#   OPENAI_MODEL=your-model
uv sync
uv run fastapi dev app/main.py # http://localhost:8000
```

> ⚠️ Never commit `server/.env`. It's covered by the root `.gitignore`.

### Production build (client)

```bash
cd client
npm run build                  # static files in client/out/
```

---

## Status

- ✅ Frontend — all four screens, built against mock data
- 🚧 Backend — parser, stats, OpenAI roast, `/api/roast` endpoint

## Privacy

- Your file is processed in memory and never written to disk or logged.
- Only a small digest (stats + a sample of video titles) is sent to OpenAI to write the roast.
- No accounts, no cookies, no database.
