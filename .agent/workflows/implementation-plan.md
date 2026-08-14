# KisanMitra AI – Market Decision Engine
## Complete Implementation & Deployment Plan (REVISED)

---

## Current State (as of 14 Aug 2026, 2:41 PM)
- **Repo:** `d:\Practice\kisanmitra-market-engine`
- **GitHub:** `https://github.com/lakadeamit220/kisanmitra-market-engine`
- **Branch:** `main` (no commits yet)

### ✅ Already Done (Phase 1 — Steps 1.1 through 1.7)
- Next.js 16.3.1 (App Router) initialized with Tailwind CSS v4
- Dependencies installed: `next-pwa`, `lucide-react`, `@anthropic-ai/sdk`
- `next.config.js` created with PWA config (using `require()` / CJS)
- `public/manifest.json` created
- `public/icons/icon-192.png` and `icon-512.png` placeholder icons created
- `.env.local` created (now with `GEMINI_API_KEY`)
- `app/layout.js` updated with Inter font, PWA meta tags
- `jsconfig.json` paths updated (`@/*` → `./*` since no `src/` dir)
- `package.json` name fixed to `kisanmitra-market-engine`
- `npm run dev` verified working at `http://localhost:3000`

### ⚠️ Important Notes About Current Setup
- **Next.js 16.3.1** (not 14/15) — uses Turbopack by default
- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax (no `tailwind.config.js` file needed; customization via CSS `@theme` block)
- **No `src/` directory** — `app/` is at project root
- **PWA disabled in dev** — `next-pwa` only generates service worker in production build
- **`next-pwa` uses CJS `require()`** — `next.config.js` (not `.mjs`)

---

## 🔄 KEY CHANGE: Gemini AI Instead of Claude

**Reason:** User does not have Anthropic API key.

**What changes:**
- `.env.local` → `GEMINI_API_KEY=your_key_here`
- Install `@google/generative-ai` package (replace `@anthropic-ai/sdk`)
- `/api/explain/route.js` → use Gemini API instead of Claude
- `lib/prompts.js` → same prompt format (works with any LLM)
- Everything else stays the same

**Get your free Gemini API key:** https://aistudio.google.com/apikeys

---

## Tech Stack (REVISED)
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** JavaScript only (NO TypeScript)
- **Styling:** Tailwind CSS v4 (`@theme` CSS syntax, NOT `tailwind.config.js`)
- **PWA:** `next-pwa` package
- **AI:** Google Gemini (`gemini-2.0-flash` via `@google/generative-ai`)
- **Icons:** Lucide React
- **State:** React `useState` + `localStorage`
- **Deployment:** Vercel

---

## Remaining Work — Phase-by-Phase

---

## PHASE 1 — Remaining Setup (Steps 1.8–1.9)
**Goal:** Tailwind config finalized + first git commit  
**Agent can stop after:** `git push origin main` succeeds

### Step 1.8 — Update Tailwind Theme in `globals.css`
> **Tailwind v4 note:** There is NO `tailwind.config.js`. Customization goes in `globals.css` via `@theme inline {}` block.

Update `app/globals.css`:
```css
@import "tailwindcss";

@theme inline {
  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-500: #22c55e;
  --color-brand-600: #16a34a;
  --color-brand-700: #15803d;
  --color-brand-800: #166534;
  --color-brand-900: #14532d;
  --color-amber-50: #fffbeb;
  --color-amber-500: #f59e0b;
  --color-amber-600: #d97706;
  --font-sans: 'Inter', sans-serif;
}

body {
  background: #f9fafb;
  color: #171717;
  font-family: var(--font-sans);
}
```

### Step 1.9 — Install Gemini SDK + Remove Anthropic SDK
```bash
npm uninstall @anthropic-ai/sdk
npm install @google/generative-ai
```

### Step 1.10 — Initial Git Commit & Push
```bash
git add .
git commit -m "Phase 1: Next.js 16 + Tailwind v4 + PWA scaffolding + Gemini setup"
git push origin main
```

---

## PHASE 2 — Core Business Logic (Pure JavaScript, No AI)
**Goal:** Net Realization calculation + mock mandi data fully working  
**Agent can stop after:** Running calculation test script shows correct ranked output

### Step 2.1 — Create `lib/mockMandis.js`
5 Nashik-region onion mandis with realistic data:
```js
const mandis = [
  { id: 'nashik', name: 'Nashik APMC', distanceKm: 18, headlinePrice: 2600, marketFeePercent: 1.5, commissionPercent: 1.5, loadingCharge: 12 },
  { id: 'lasalgaon', name: 'Lasalgaon APMC', distanceKm: 35, headlinePrice: 2580, marketFeePercent: 1.75, commissionPercent: 2.0, loadingCharge: 10 },
  { id: 'pune', name: 'Pune APMC', distanceKm: 180, headlinePrice: 2550, marketFeePercent: 2.0, commissionPercent: 2.5, loadingCharge: 15 },
  { id: 'ahmednagar', name: 'Ahmednagar APMC', distanceKm: 95, headlinePrice: 2570, marketFeePercent: 1.75, commissionPercent: 2.0, loadingCharge: 12 },
  { id: 'yeola', name: 'Yeola APMC', distanceKm: 55, headlinePrice: 2560, marketFeePercent: 1.5, commissionPercent: 1.75, loadingCharge: 10 },
];
export default mandis;
```

### Step 2.2 — Create `lib/calculations.js`
Two functions:
- `calculateNetRealization(mandi, quantity, ratePerKm = 2.8)` → returns detailed breakdown
- `rankMandis(mandis, quantity)` → returns sorted array with `rank` and `isRecommended`

Formula:
```
Net = HeadlinePrice - (distanceKm × ratePerKm) - (headline × marketFee%) - (headline × commission%) - loadingCharge
```

### Step 2.3 — Create `lib/storage.js`
localStorage helpers: `saveProfile()`, `loadProfile()`, `clearProfile()`

### Step 2.4 — Create `lib/prompts.js`
`buildExplainPrompt(rankedMandis, farmerProfile)` → returns prompt string with farmer context + mandi numbers + rules for simple language

### Step 2.5 — Test Calculations
Run a quick Node.js test to verify Nashik wins for 120 qtl:
- Nashik net ≈ ₹2,459.6/qtl
- Total ≈ ₹2,95,152

### Step 2.6 — Git Commit
```bash
git add .
git commit -m "Phase 2: Core business logic – calculations, mock data, storage, prompts"
git push origin main
```

---

## PHASE 3 — Market Decision Page (Core UI)
**Goal:** `/market` page shows ranked mandi cards with net realization hero numbers  
**Agent can stop after:** Visiting `/market` shows all 5 mandi cards ranked correctly

### Step 3.1 — Create `components/MandiCard.jsx`
- White card, rounded-2xl, shadow-lg
- Recommended: green border + glow + "RECOMMENDED ✓" badge
- **Big green NET REALIZATION number** (hero, text-3xl)
- Cost breakdown rows with lucide icons (MapPin, Truck, etc.)
- Rank number badge on each card

### Step 3.2 — Create `components/MandiComparison.jsx`
- Takes `rankedMandis` array prop
- Top banner: "You save ₹X per quintal vs next best"
- Renders MandiCard for each, recommended first

### Step 3.3 — Create `app/market/page.js`
- `'use client'` directive
- Loads profile from localStorage, redirects to `/` if missing
- Runs `rankMandis()` on mount
- Shows MandiComparison + "Why this recommendation?" button
- AIExplanation component (created in Phase 6, can stub for now)

### Step 3.4 — Git Commit
```bash
git add .
git commit -m "Phase 3: Market decision page + MandiCard + MandiComparison"
git push origin main
```

---

## PHASE 4 — Farmer Profile Form + Landing Page
**Goal:** `/` page has profile form + "Load Ramesh Demo" button  
**Agent can stop after:** Form submit + Demo button both redirect to `/dashboard`

### Step 4.1 — Create `components/LoadDemoButton.jsx`
Pre-fills: Ramesh Patil, Nashik, Onion, 120 qtl, Near Harvest → saves + redirects

### Step 4.2 — Create `components/ProfileForm.jsx`
Fields: Name, District, Crop, Quantity, Stage, Language
On submit → `saveProfile(data)` → `router.push('/dashboard')`

### Step 4.3 — Create `app/page.js` (Landing)
- Green gradient hero header
- "KisanMitra 🌾" logo + tagline
- LoadDemoButton (prominent)
- Divider + ProfileForm

### Step 4.4 — Git Commit
```bash
git add .
git commit -m "Phase 4: Landing page, ProfileForm, LoadDemoButton"
git push origin main
```

---

## PHASE 5 — Dashboard Page
**Goal:** `/dashboard` shows summary + CTA + Action Plan  
**Agent can stop after:** Full nav flow works: Landing → Dashboard → Market

### Step 5.1 — Create `components/DashboardCards.jsx`
2×2 grid: Crop, Quantity, District, Stage (with emoji icons)

### Step 5.2 — Create `components/ActionCards.jsx`
3 hardcoded action cards:
- 🟢 "Go to Market Today"
- 🟡 "Check Tomorrow's Weather"
- 🔴 "Avoid Pune APMC Today"

### Step 5.3 — Create `app/dashboard/page.js`
- Greeting header ("Namaste, {name} 👋")
- DashboardCards
- "Find Best Mandi →" big CTA
- ActionCards

### Step 5.4 — Git Commit
```bash
git add .
git commit -m "Phase 5: Dashboard page, summary cards, action cards"
git push origin main
```

---

## PHASE 6 — Gemini AI Explanation API (REVISED from Claude)
**Goal:** "Why this recommendation?" calls Gemini and shows explanation  
**Agent can stop after:** Clicking the button shows a real Gemini response

### Step 6.1 — Create `app/api/explain/route.js` (GEMINI VERSION)
```js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildExplainPrompt } from '@/lib/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { rankedMandis, farmerProfile } = await request.json();
    if (!rankedMandis || !farmerProfile) {
      return Response.json({ error: 'Missing data' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
      systemInstruction: `You are KisanMitra, a trusted farm advisor for Maharashtra farmers.
You ONLY use the numbers given to you. Never invent prices, distances, or costs.
Reply in simple, friendly language. Max 5 sentences.`,
    });

    const prompt = buildExplainPrompt(rankedMandis, farmerProfile);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ explanation: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json({ error: 'AI explanation failed. Please try again.' }, { status: 500 });
  }
}
```

### Step 6.2 — Create `components/AIExplanation.jsx`
- Auto-fetches explanation on mount (useEffect)
- Shows loading spinner → explanation text
- Error handling with retry

### Step 6.3 — Git Commit
```bash
git add .
git commit -m "Phase 6: Gemini AI explain API + AIExplanation component"
git push origin main
```

---

## PHASE 7 — PWA Polish & Offline Page
**Goal:** App installable on Android  
**Agent can stop after:** Production build succeeds + manifest is valid

### Step 7.1 — Create `app/offline/page.js`
Simple offline message with wheat emoji

### Step 7.2 — Update `next.config.js` with offline fallback
Add `fallbacks: { document: '/offline' }` to next-pwa config

### Step 7.3 — Generate Real PWA Icons
Use `generate_image` tool for proper green circular icons with wheat/KM text

### Step 7.4 — Add apple-touch-icon meta tags to `layout.js`

### Step 7.5 — Git Commit
```bash
git add .
git commit -m "Phase 7: PWA offline page + icons + manifest updates"
git push origin main
```

---

## PHASE 8 — UI Polish & Mobile Optimization
**Goal:** Premium mobile-first design throughout  
**Agent can stop after:** All pages look premium on 390px viewport

### Step 8.1 — Polish `globals.css` (animations, gradients, scrollbar)
### Step 8.2 — Polish Landing Page (green gradient hero, glow effects, animated tagline)
### Step 8.3 — Polish Market Page (recommended card glow, pill badges, entrance animations)
### Step 8.4 — Polish Dashboard (time greeting, icon backgrounds, border-coded action cards)

### Step 8.5 — Git Commit
```bash
git add .
git commit -m "Phase 8: Premium UI polish + mobile optimization"
git push origin main
```

---

## PHASE 9 — End-to-End Testing
**Goal:** Full Ramesh demo story without errors  
**Agent can stop after:** Complete flow verified

### Step 9.1 — Test Checklist
- [ ] "Load Ramesh Demo" → fills profile → `/dashboard`
- [ ] Dashboard shows Ramesh's info
- [ ] "Find Best Mandi" → `/market`
- [ ] 5 mandis ranked (Nashik #1 with RECOMMENDED badge)
- [ ] Net realization numbers correct
- [ ] "Why this recommendation?" → Gemini explanation
- [ ] Navigation works (back buttons)
- [ ] No console errors
- [ ] localStorage persists on refresh

### Step 9.2 — Manual Calculation Verification
Nashik APMC, 120 qtl:
- Transport: 18 × 2.8 = ₹50.4/qtl
- Market fee: 2600 × 1.5% = ₹39/qtl
- Commission: 2600 × 1.5% = ₹39/qtl
- Loading: ₹12/qtl
- **Net = ₹2,459.6/qtl → Total ₹2,95,152**

### Step 9.3 — Fix bugs found

### Step 9.4 — Git Commit
```bash
git add .
git commit -m "Phase 9: E2E testing + bug fixes"
git push origin main
```

---

## PHASE 10 — Vercel Deployment
**Goal:** Live URL working  
**Agent can stop after:** Live URL accessible + full flow works

### Step 10.1 — Connect GitHub Repo to Vercel
- Go to vercel.com → New Project → Import `lakadeamit220/kisanmitra-market-engine`
- Framework: Next.js (auto-detected)
- Add env var: `GEMINI_API_KEY` = (your key)
- Deploy

### Step 10.2 — Verify Live Deployment
- Test full Ramesh demo flow
- Check PWA install on mobile Chrome
- Verify Gemini API works (env var set in Vercel)

### Step 10.3 — Final Tag
```bash
git tag v1.0.0-mvp
git push origin v1.0.0-mvp
```

---

## Summary: Phase-by-Phase Cheat Sheet

| Phase | What Gets Built | Key Files | Stop Condition |
|-------|----------------|-----------|----------------|
| **1** ✅ | Next.js + Tailwind + PWA scaffold | `next.config.js`, `manifest.json`, `layout.js` | `npm run dev` works |
| **1** 🔲 | Remaining: Tailwind theme + Gemini SDK + git push | `globals.css`, `package.json` | `git push` succeeds |
| **2** | Core business logic | `lib/calculations.js`, `mockMandis.js`, `storage.js`, `prompts.js` | Ranking tested |
| **3** | `/market` page UI | `MandiCard.jsx`, `MandiComparison.jsx`, `market/page.js` | 5 ranked cards visible |
| **4** | `/` landing page | `ProfileForm.jsx`, `LoadDemoButton.jsx`, `page.js` | Form submits + redirects |
| **5** | `/dashboard` page | `DashboardCards.jsx`, `ActionCards.jsx`, `dashboard/page.js` | Full nav flow works |
| **6** | Gemini AI API | `api/explain/route.js`, `AIExplanation.jsx` | AI explanation renders |
| **7** | PWA offline | `offline/page.js`, icons, manifest | Installable |
| **8** | UI Polish | All pages + CSS | Premium mobile look |
| **9** | E2E Testing | Bug fixes | Full demo works |
| **10** | Vercel Deploy | Vercel config + env | Live URL confirmed |

---

## Agent Handoff Notes

1. **Tailwind v4** — NO `tailwind.config.js`. Use `@theme inline {}` in `globals.css`.
2. **Next.js 16** — uses Turbopack, App Router. Default boilerplate uses `next/font`.
3. **`'use client'`** required on any component using `useState`, `useEffect`, `useRouter`, `localStorage`.
4. **Gemini API** (not Claude) — use `@google/generative-ai` package with `gemini-2.0-flash` model.
5. **`.env.local`** has `GEMINI_API_KEY`. Set same in Vercel env vars for production.
6. **PWA only works in prod build** — `next-pwa` is disabled in development.
7. **`next-pwa` compatibility** — if it conflicts with Next.js 16, fall back to manual service worker.
8. **Net realization is the hero** — make it visually dominant.
9. **Never commit `.env.local`** — already in `.gitignore`.
