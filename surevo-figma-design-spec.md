# Surevo — End-to-End Figma Design Spec
### A complete, components-first build prompt for Claude Code (Figma MCP)

> **Read me first (instructions to the builder).**
> You are building the full Figma design file for **Surevo** — the WhatsApp-native, done-for-you AI sales agent for Israeli WooCommerce stores. The brand character is **Vero**, an emerald speech-bubble agent whose right eye is always a checkmark (the “v” in sure**v**o).
>
> **How to build:**
> 1. Use the Figma MCP (`/figma-generate-design`, `use_figma`, `create_new_file`). Read the `/figma-use` skill before calling `use_figma`.
> 2. **Build components first, then assemble pages from instances.** Nothing on a page should be a raw shape that duplicates a component. Everything reusable = a Figma component with **variants** and **component properties**.
> 3. Use **Auto Layout** on every frame, card, button, and section. Use layout grids on page frames.
> 4. Create **Figma Styles / Variables** for every token in §3 before drawing anything (color variables, type styles, spacing/number variables, effect styles).
> 5. The product is **Hebrew-first / RTL**. Design the primary screens in Hebrew RTL; provide an English LTR variant of the home page. See §10 for RTL rules.
> 6. Logo assets live in `brand/logo/*.svg` (8 files). Import them as components. Use the right variant per §4.
> 7. Aim for a **premium, wow-effect** marketing site — see §7. But every effect must stay performant and accessible.
>
> Pair this spec with `surevo-brand-book.html` (visual identity) and `surevo-business-logic.html` (why the site exists). The site has **one job: book the free sales audit.**

---

## 1 · Project context & goals

| | |
|---|---|
| **Product** | Surevo — done-for-you AI sales agent living on WhatsApp + the store's site |
| **Audience** | Israeli WooCommerce store owners (₪100K–₪1M revenue) + digital agencies |
| **Primary goal of the site** | Book a **free WhatsApp sales audit** (lead capture) — NOT self-serve signup |
| **Secondary goals** | Build trust fast · show the live Vero demo · justify the managed/premium price |
| **Voice** | Warm, local, certain. Real Israeli Hebrew, never translated-sounding. |
| **Primary language** | Hebrew (RTL) · English (LTR) secondary |
| **Feeling to evoke** | “This was built for me, in Israel. I trust it. I want the audit.” |

**The single conversion action**, repeated across the site: **`קבל אבחון מכירות חינם`** (“Get a free sales audit”). Everything funnels here.

---

## 2 · Figma file organization

Create these **Figma pages** (tabs) in this order:

| # | Page name | Contents |
|---|-----------|----------|
| 00 | `📐 Cover` | Title board: Surevo logo, version, date, page index |
| 01 | `🎨 Foundations` | Color variables, type styles, spacing, radius, shadows, grid, motion tokens — all visualised on swatched boards |
| 02 | `🧩 Components` | The full component library (§6), each as a component set with variants |
| 03 | `🤖 Vero & Icons` | Vero avatar component (all expressions/sizes/colors) + icon set |
| 04 | `🧱 Patterns` | Composed blocks: nav, footer, hero, pricing block, audit form, CTA band, chat demo |
| 05 | `🖥 Desktop — HE` | All page designs, Hebrew RTL, @1440 |
| 06 | `📱 Mobile — HE` | All page designs, Hebrew RTL, @375 |
| 07 | `🌐 Desktop — EN` | Home + key pages, English LTR, @1440 |
| 08 | `▶️ Flows` | Prototype connections: audit-booking flow, nav, mobile menu |

**Frame naming:** `Page / Section` e.g. `Home / 01 Hero`, `Pricing / 03 Plans`. Components: `Category/Name` e.g. `Button/Primary`, `Card/Pricing`. Use slashes so Figma nests them.

**Breakpoints / frame widths:** Desktop `1440` (content max `1200`, 12-col, 24px gutter, 80px margins) · Tablet `768` (8-col) · Mobile `375` (4-col, 20px margins). Also design a `1280` safety check.

---

## 3 · Foundations — design tokens

Create all of these as **Figma Variables** (color + number) and **Styles** (text + effect). Name them exactly so they map cleanly to code later.

### 3.1 Color variables

**Brand**
| Token | Hex | Use |
|---|---|---|
| `brand/green` | `#0E9F6E` | Primary — buttons, links, Vero, accents |
| `brand/green-bright` | `#16B98A` | Hover, dark-mode brand, highlights |
| `brand/green-deep` | `#0B7E57` | Pressed / active |
| `brand/pine` | `#07231B` | Dark sections, footer bg, dark text |
| `brand/forest` | `#0C3A2A` | Secondary dark surface |
| `brand/v-mint` | `#4FE3B0` | Accent on dark, the “v” on dark bg |
| `brand/mint` | `#E9F4EE` | Light surface / tint blocks |
| `brand/mint-2` | `#F2F8F4` | Lightest tint |
| `brand/honey` | `#FFC857` | Celebration only (sale closed, win state) — sparingly |

**Neutrals**
| Token | Hex |
|---|---|
| `ink` | `#0B1410` |
| `slate` | `#5A6B63` |
| `mist` | `#9AA8A1` |
| `line` | `#E2EDE7` |
| `paper` | `#F6F9F7` |
| `white` | `#FFFFFF` |

**Semantic**
| Token | Hex |
|---|---|
| `success` | `#0E9F6E` |
| `warning` | `#F59E0B` |
| `danger` | `#E24B4A` |
| `info` | `#2563EB` |

**Gradients (for wow — define as Figma gradient fills/styles)**
- `grad/aurora` — radial mesh: `#0E9F6E` → `#16B98A` → `#4FE3B0` at 18–30% opacity over `brand/pine`. Hero & CTA backdrops.
- `grad/emerald` — linear 135°: `#0E9F6E` → `#0B7E57`. Primary buttons option, badges.
- `grad/glass` — white 8% → white 2%, used with backdrop-blur for glass cards on dark.

### 3.2 Typography

Latin: **DM Sans**. Hebrew: **Assistant** (body) + **Heebo** (display alt). Load via Google Fonts. Define these as **text styles** (provide HE and EN variants where wording differs; sizes identical).

| Style | Font | Size / Line | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|
| `display/xl` | DM Sans / Heebo | 64 / 68 | 700 | -2% | Hero H1 (desktop) |
| `display/l` | DM Sans / Heebo | 48 / 54 | 700 | -2% | Section heroes |
| `h1` | DM Sans / Heebo | 40 / 46 | 700 | -1.5% | Page titles |
| `h2` | DM Sans / Heebo | 32 / 40 | 700 | -1.5% | Section titles |
| `h3` | DM Sans / Heebo | 24 / 32 | 700 | -1% | Subsections, card titles |
| `h4` | DM Sans / Assistant | 20 / 28 | 600 | -0.5% | Small headings |
| `body/lg` | DM Sans / Assistant | 18 / 30 | 400 | 0 | Lead paragraphs |
| `body` | DM Sans / Assistant | 16 / 27 | 400 | 0 | Default body |
| `body/sm` | DM Sans / Assistant | 14 / 22 | 400 | 0 | Secondary |
| `caption` | DM Sans / Assistant | 12 / 16 | 500 | 2% | Labels, captions |
| `eyebrow` | DM Sans / Assistant | 12 / 16 | 700 | 14% UPPER | Section eyebrows |
| `mono` | DM Mono | 13 / 20 | 500 | 0 | Numbers, prices, code |

Mobile scale: reduce `display/xl`→40, `display/l`→34, `h1`→30, `h2`→26.

### 3.3 Spacing, radius, elevation, motion

**Spacing scale (number variables, 4-based):** `space/1=4` `2=8` `3=12` `4=16` `5=20` `6=24` `8=32` `10=40` `12=48` `16=64` `20=80` `24=96` `32=128`. Section vertical padding desktop = `space/24` (96) to `space/32`; mobile = `space/16` (64).

**Radius:** `radius/sm=8` · `md=12` · `lg=16` · `xl=24` · `2xl=32` · `pill=999`. Cards use `lg`/`xl`; buttons `pill` or `md` (pick `pill` for the friendly brand); Vero tiles `xl`.

**Elevation (effect styles):**
- `elev/1` — `0 1 2 rgba(7,35,27,.06)` (subtle)
- `elev/2` — `0 8 24 rgba(7,35,27,.08)` (cards, hover)
- `elev/3` — `0 20 48 rgba(7,35,27,.12)` (popovers, featured pricing)
- `glow/green` — `0 8 32 rgba(14,159,110,.35)` (CTA hover, wow)

**Motion tokens:** `dur/fast=150ms` `dur/base=250ms` `dur/slow=450ms` `dur/reveal=700ms`; easing `ease/out=cubic-bezier(.16,1,.3,1)` (springy), `ease/inout=cubic-bezier(.65,0,.35,1)`. Document on a board; used in §7 and the prototype.

---

## 4 · Logo usage map

We have a full logo set in `brand/logo/`. Import each as a component (`Logo/…`). Place per this map — **right logo, right place, every time:**

| Location | Asset | Why |
|---|---|---|
| Desktop header (light bg) | `surevo-horizontal.svg` | Full lockup, dark wordmark |
| Header on dark/transparent hero | `surevo-horizontal-reverse.svg` | White wordmark for contrast |
| Footer (pine bg) | `surevo-horizontal-reverse.svg` | Reverse on dark |
| Mobile header (tight) | `surevo-vero-color.svg` (icon only) | Saves width |
| Favicon / browser tab | `surevo-appicon.svg` | Filled tile reads at 16px |
| App / PWA / WhatsApp profile | `surevo-appicon.svg` | Emerald tile, white Vero |
| Hero / brand moments | `surevo-stacked.svg` | Vertical, centered |
| Hebrew marketing lockup | `surevo-hebrew.svg` | Latin mark + Hebrew tagline RTL |
| Chat widget avatar / “typing” | `surevo-vero-expressions.svg` (talking) | Animated Vero |
| Empty states / 404 / loading | `surevo-vero-expressions.svg` (thinking) | On-brand personality |
| Success / order confirmed | `surevo-vero-expressions.svg` (win) | Celebration |

**Clear space** = height of the bubble tail on all sides. **Min sizes:** icon 24px, horizontal lockup 96px wide. Never recolor, stretch, rotate, swap the checkmark eye, or re-typeset the wordmark.

---

## 5 · Iconography, imagery & Vero

**Icons:** use a single outline set — **Lucide** (or Tabler outline) — 1.75px stroke, 24px grid. Tint `ink` default, `brand/green` when active/accent. Create an `Icon/` component with a `name` swap property. Core icons: message-circle, whatsapp, shopping-cart, bolt/zap, shield-check, trending-up, clock, globe, sparkles, check, chevron, arrow, plug/integration, bar-chart, users, star.

**Vero illustration:** Vero is the mascot, used generously (research: a face humanises AI and is remembered better than a logo). Build **`Vero/Avatar`** as a component with properties: `expression` (idle/talking/wink/win/thinking), `size` (24/40/56/96/160), `tone` (color/reverse/white). Place Vero in: hero, chat demo, empty states, loaders, success, audit confirmation, 404.

**Imagery style:** real Israeli store photography (warm, authentic, not stocky), shown inside soft device/phone frames; WhatsApp-style chat mockups; subtle emerald duotone option for backgrounds. Avoid generic “robot/AI” clip-art — Vero IS our AI face.

**Texture/wow surfaces:** aurora gradient mesh on dark sections, soft grain at 3–4% opacity, glass cards (`grad/glass` + 16px blur) over dark, faint dotted/grid pattern in mint sections.

---

## 6 · Component library

Build every item below as a Figma **component set** with the listed **variants** (Figma variant properties) and **component properties** (boolean/text/instance-swap). Each must include: default · hover · pressed · focus · disabled (and loading/error where relevant). All Auto Layout. All RTL-aware (icons & arrows mirror — see §10).

> Format per component: **Variants** · **Properties** · **States** · **Tokens** · **Notes/RTL**.

### 6.1 Button
- **Variants:** `style` = primary / secondary / ghost / link · `size` = sm(36) / md(44) / lg(52) · `tone` = green / dark / white.
- **Properties:** `label` (text), `iconLeft` (bool+swap), `iconRight` (bool+swap), `loading` (bool), `fullWidth` (bool).
- **States:** default; hover (primary → `green-bright` + `glow/green` + lift 2px); pressed (`green-deep`, scale .98); focus (2px `green` ring offset 2); disabled (`mist` bg, no shadow); loading (spinner + Vero dot pulse).
- **Tokens:** radius `pill`; padding `space/3`×`space/6`; text `body`/600; `dur/fast` `ease/out`.
- **RTL:** trailing arrow points left (←) in HE, right (→) in EN; icon order mirrors.

### 6.2 Inputs & form controls
- **TextField / Textarea / Select**: `size` sm/md/lg; states default/hover/focus/filled/error/disabled; props `label`, `placeholder`, `helper`, `error`, `iconLeft`. Label above, RTL-aligned right. Focus = `green` 2px ring. Error = `danger` border + helper.
- **PhoneField (IL)**: prefixed `+972` flag selector; numeric; placeholder `5X-XXX-XXXX`.
- **Checkbox / Radio / Toggle**: green when checked; toggle used for pricing monthly/annual.
- **Field group / Form row**: Auto Layout, gap `space/4`.

### 6.3 Badge / Pill / Tag
- **Variants:** `tone` = green / mint / honey / dark / outline; `size` sm/md. Props: `label`, `iconLeft` (bool). Uses: “חינם”, “הכי פופולרי”, “Beta”, integration names. Text uses the same-family dark stop on tinted fills (per brand rules).

### 6.4 Navigation bar
- **Variants:** `theme` = onLight / onDark(transparent over hero) · `state` = top / scrolled(solid white + `elev/1`, becomes sticky).
- **Contents (RTL order, right→left):** Logo (right) · nav links (How it works / Pricing / For agencies / Blog) · **Language switch HE|EN** · **Primary CTA button “קבל אבחון חינם”** (left end).
- **Mobile:** logo + hamburger; full-screen overlay menu with large links, lang switch, CTA, and Vero (idle) peeking. Slide-in `dur/slow` `ease/out`.
- **Behavior:** transparent over dark hero → on scroll past hero, transitions to solid. Document both variants.

### 6.5 Footer
- Pine bg, reverse logo, aurora hint. Columns (RTL): brand + tagline + Vero · Product · Company · Legal · “Made in Israel 🇮🇱” + WhatsApp contact. Newsletter input. Bottom row: © + social. Big CTA band sits directly above footer (see 6.14).

### 6.6 Vero Avatar  ★ (key component)
- **Variants:** `expression` idle/talking/wink/win/thinking · `size` 24/40/56/96/160 · `tone` color/reverse/white.
- Built from `brand/logo/surevo-vero-expressions.svg`. Used as chat avatar, hero figure, loaders, empty states. `talking` variant is the one animated in the hero & chat demo (§7).

### 6.7 Chat bubble + Chat demo  ★ (hero proof element)
- **ChatBubble variants:** `from` = them / us · `tail` = on/off · with `ticks` (✓✓) on “us”. them = white card; us = `brand/green` + white text; RTL right-aligned. Radius `lg`, tail corner 5px.
- **ChatDemo (pattern):** a WhatsApp-style thread inside a phone frame. Header = Vero (talking) + “Surevo · ורו · ● מקליד…”. Auto-plays a scripted Hebrew sale: customer asks → Vero recommends, handles price objection, sends payment link, closes (win). This is the site's single most important proof element — give it pride of place and motion.

### 6.8 Feature / Icon card
- **Variants:** `layout` = iconTop / iconInline · `emphasis` = default / featured. Props: icon, title, body, optional link. Mint or white surface, `radius/lg`, hover lift + border→`green`.

### 6.9 Pricing card  ★
- **Variants:** `plan` = launch / growth / scale · `featured` = bool (growth = featured: `green` 2px border, “הכי פופולרי” badge, `elev/3`, slight scale).
- Contents: plan name (HE/EN), setup line (₪1,490 / ₪2,900 / custom), big monthly price (`mono` + ₪/mo), feature list with green checks, CTA button, “30-day guarantee” line. Monthly/annual toggle above the row. RTL: prices right-aligned, checks on the right.

### 6.10 Testimonial / Case-study card  ★
- Store owner photo/avatar, name + store + city, quote (Hebrew), and a **₪ metric chip** (e.g. “+23% המרות”, “₪14,000 הוחזרו”). Variants: compact / featured(with big stat). Honey accent allowed on the win metric.

### 6.11 Stat / Metric block
- Big number (`mono`, count-up on scroll), label below, optional icon. Used in results strips and the audit landing. 2–4 across.

### 6.12 Integration / logo strip
- Row of Israeli system logos in pill chips: iCount, Greeninvoice, Cardcom, Hyp/Pelecard, Tranzilla, WooCommerce, WhatsApp. Grayscale → color on hover. Marquee option for wow.

### 6.13 Accordion (FAQ)
- Item: question row (RTL, chevron on the left) + expandable answer. States collapsed/expanded; `dur/base` height + chevron rotate. One open at a time optional.

### 6.14 CTA band
- Full-width pine + aurora section. Big headline, sub, primary CTA + secondary “ראה הדגמה”. Vero (win) on the side. Appears above footer on every page and mid-page on home.

### 6.15 Steps / Timeline
- Numbered steps (1·2·3) for “How it works”: Install → Vero learns your store → Sells 24/7. Connector line; icon per step; RTL flows right→left.

### 6.16 Section header
- Eyebrow (`eyebrow` style, `green`) + H2 + optional lead. Reusable atop every section. Alignment: right (HE) / left (EN) / center variant.

### 6.17 Audit form block  ★ (the conversion unit)
- The lead-capture form: store URL, name, WhatsApp (PhoneField IL), monthly revenue range (select), submit “קבל אבחון חינם”. Trust line: “ללא התחייבות · 2 דקות · תשובה תוך 24 שעות”. Success state = Vero (win) + “קיבלנו! נחזור אליך בוואטסאפ.” Used on home, audit LP, contact.

### 6.18 Utility components
- **Modal/Dialog** (overlay + glass card), **Toast** (success/error, Vero mini), **Tabs**, **Breadcrumb** (blog), **Pagination**, **Cookie banner** (Israeli privacy), **Floating launcher** (sticky WhatsApp/Vero button bottom — RTL: bottom-left in HE).

---

## 7 · Motion & wow-effect

Design these as documented interactions on the `Flows` page + notes on each frame. Tasteful, fast, and `prefers-reduced-motion` friendly (all decorative motion off when reduced).

| Effect | Where | Spec |
|---|---|---|
| **Live Vero typing** | Hero + chat demo | Vero `talking` expression loops; “● מקליד…” pulses; chat auto-types a scripted Hebrew sale, bubble by bubble, then loops. |
| **Aurora drift** | Dark hero & CTA bg | `grad/aurora` mesh slowly drifts/scales (20s loop, 8–12% movement). GPU-cheap. |
| **Scroll reveal** | Every section | Elements fade + rise 16px, `dur/reveal` `ease/out`, staggered 60ms. |
| **Number count-up** | Stat blocks | Counts from 0 on enter-view (e.g. 0→23%). |
| **Hover lift** | Cards & buttons | translateY -2 to -4, shadow `elev/2`→`elev/3`, `dur/fast`. |
| **Magnetic CTA** | Primary hero CTA | Button nudges slightly toward cursor; green glow on hover. |
| **Logo marquee** | Integration strip | Infinite horizontal scroll of IL system logos (pauses on hover). |
| **Parallax phone** | Hero device | Phone frame drifts a few px on scroll/mouse. |
| **Checkmark draw-on** | Section transitions / win state | The Vero check eye / success checks animate stroke-draw. |
| **Sticky nav morph** | Header | Transparent→solid white with shadow as hero scrolls out. |
| **Page load** | First paint | Logo mark draws in, then content reveals. Keep < 1s. |

Wow ≠ heavy. Target: feels alive and premium, loads fast, never blocks reading.

---

## 8 · Sitemap

| Page | Path | Purpose | Priority |
|---|---|---|---|
| **Home** | `/` | Hook → demo → proof → audit | ★★★ |
| **Free Audit (LP)** | `/audit` | Dedicated landing for ads → capture | ★★★ |
| **How it works** | `/how-it-works` | Install→learn→sell, reassurance | ★★ |
| **Pricing** | `/pricing` | Plans + guarantee + FAQ | ★★★ |
| **The Agent (product)** | `/agent` | What Vero does, capabilities, integrations | ★★ |
| **Results / Case studies** | `/results` | ₪ proof, testimonials | ★★ |
| **For Agencies** | `/agencies` | White-label, reseller, commission | ★★ |
| **About / Story** | `/about` | Fast Cybers, founder, “Made in Israel” trust | ★ |
| **Blog index** | `/blog` | SEO content, Hebrew | ★ |
| **Blog article** | `/blog/:slug` | Article template | ★ |
| **Contact / Book** | `/contact` | Audit form + WhatsApp | ★★ |
| **Legal** | `/privacy` `/terms` `/accessibility` | Israeli compliance | ★ |
| **404** | `*` | On-brand Vero (thinking) | ★ |

**Global (every page):** sticky nav (6.4), CTA band (6.14) + footer (6.5), cookie banner, floating Vero/WhatsApp launcher.

---

## 9 · Page-by-page, section-by-section

> For each section: **layout · components · copy direction (HE primary / EN) · CTA · wow.** Design HE-RTL first (page 05/06), then EN-LTR home (page 07). Copy below is direction, not final — keep it real-Israeli, not translated.

### 9.1 Home `/`  — the flagship (design every section)

**01 · Nav** — Component 6.4 (transparent over hero). Logo right, links, HE|EN, CTA “קבל אבחון חינם”.

**02 · Hero** — Split layout. **Right (RTL):** eyebrow “סוכן מכירות בוואטסאפ”; H1 `display/xl` **“המוכר שלך בוואטסאפ. תמיד ער, תמיד סוגר.”** (“Your seller on WhatsApp. Always awake, always closing.”); lead `body/lg`; primary CTA “קבל אבחון מכירות חינם” + secondary “ראה הדגמה ↓”; trust row (3 mini points: ללא התחייבות · 2 דקות · מענה תוך 24ש). **Left:** phone frame with the **live ChatDemo (6.7)** auto-playing a Hebrew sale, Vero header typing. Background: pine + `grad/aurora` drift. Vero (idle, 160) may peek. **Wow:** aurora + live typing + magnetic CTA + parallax phone.

**03 · Logo / integration strip** — “עובד עם הכלים שאתם כבר משתמשים” + marquee of WooCommerce, WhatsApp, iCount, Greeninvoice, Cardcom, Hyp, Tranzilla (6.12).

**04 · The problem** — Section header “כל שאלה שלא נענתה — מכירה שאבדה”. 4 Feature cards (6.8) with icons: repetitive questions · customers leave at 11pm · missed recommendations · peak overload. Mint surface.

**05 · The solution / How Vero sells** — Alternating media rows (text + chat snippet) showing: discovery → recommendation → objection handling (“תוריד לי במחיר?”) → payment link → close. Each row a small ChatDemo + copy. Vero expressions change per row. **Wow:** scroll-synced chat.

**06 · Capabilities grid** — 6 Feature cards: smart recommendations · any-language native Hebrew · order & service · WhatsApp+site one agent · live inventory sync · weekly owner reports. (Mirror/beat TukiAI's list.)

**07 · Why Surevo (vs DIY/competitors)** — Two-column compare block (done-for-you vs self-serve), pulled from business-logic §5. Emphasise: we install & manage · Israeli invoicing · real Hebrew · a face you can call.

**08 · How it works (3 steps)** — Steps/Timeline (6.15): 1 התקנה (2 דק׳) · 2 ורו לומד את החנות · 3 מוכר 24/7. RTL right→left.

**09 · Results / proof** — Stat blocks (6.11) count-up: “+30% המרות”, “35% עגלות שוחזרו”, “24/7”. Below: 2–3 Testimonial/case cards (6.10) with ₪ metrics.

**10 · Pricing preview** — 3 Pricing cards (6.9), Growth featured, monthly/annual toggle, “30 יום אחריות” line. CTA to `/pricing`.

**11 · FAQ** — Accordion (6.13): תומך בעברית? · איך זה מכיר את המלאי? · מה אם הAI טועה? · עובד עם iCount/Cardcom? · עלויות WhatsApp API? · מה קורה אחרי האבחון?

**12 · Audit CTA band + form** — CTA band (6.14) leading into the Audit form (6.17). Headline “בוא נראה כמה מכירות אתה מפספס — בחינם.” Vero (win).

**13 · Footer** — 6.5.

### 9.2 Free Audit LP `/audit` — ad destination, ruthless on conversion
Stripped, single-goal. **01** minimal nav (logo + CTA only). **02** Hero: promise + the **Audit form (6.17) above the fold**, Vero, trust line. **03** “מה תקבלו באבחון” — 3 bullets (where you leak ₪, a live Vero demo on your store, a 90-day plan). **04** Mini proof: 1 case stat + 1 testimonial. **05** Guarantee + “Made in Israel”. **06** short FAQ (3). **07** footer-lite. No nav distractions, no links out except submit.

### 9.3 Pricing `/pricing`
**01** nav · **02** header “תמחור פשוט. תוצאה מנוהלת.” + toggle · **03** 3 Pricing cards (Growth featured) · **04** comparison table (features × plans, green checks) · **05** the **30-day guarantee** explainer (Vero win) · **06** “מה כלול בהקמה” (DFY onboarding steps) · **07** pricing FAQ accordion · **08** CTA band + footer.

### 9.4 The Agent `/agent`
**01** nav · **02** hero: “תכירו את ורו” with big animated Vero + expression set showcase · **03** capability deep-dive (alternating rows w/ chat demos) · **04** Israeli integrations grid (iCount/Greeninvoice/Cardcom/payments) — the moat · **05** “דובר עברית אמיתית” language section (slang, objection handling examples) · **06** security/compliance row (GDPR, Israeli privacy, human handoff) · **07** CTA band + footer.

### 9.5 How it works `/how-it-works`
**01** nav · **02** hero + 3-step timeline expanded · **03** “מה אנחנו עושים בשבילך” DFY onboarding (we install, integrate, train, tune) · **04** behind-the-scenes (catalog sync, Hebrew training) · **05** support & management (monthly optimisation) · **06** CTA band + footer.

### 9.6 Results `/results`
**01** nav · **02** header + headline stats strip (count-up) · **03** case-study cards grid (6.10) with ₪ metrics, filter pills by industry (fashion/electronics/beauty/food) · **04** featured case study (full story: before/after numbers, owner quote, video slot) · **05** CTA band + footer.

### 9.7 For Agencies `/agencies`
**01** nav · **02** hero “הוסיפו AI מכירות ללקוחות שלכם — white-label” · **03** value props (30% recurring commission, we handle tech, you keep the relationship) · **04** how the partnership works (steps) · **05** agency pricing/commission block · **06** partner audit form · **07** footer.

### 9.8 About `/about`
**01** nav · **02** story hero (Fast Cybers, why we built Surevo for Israel) · **03** founder section (Sona, photo, quote, LinkedIn) · **04** “Made in Israel” values · **05** trust badges/credentials · **06** CTA band + footer.

### 9.9 Blog index `/blog` & article `/blog/:slug`
Index: header + featured post + card grid (category pills, RTL) + newsletter CTA. Article: breadcrumb, title, meta (date/read time), hero image, prose styles (H2/H3/quote/list/code/image), author card (Sona), related posts, inline audit CTA, share. Define full long-form text styles for Hebrew RTL.

### 9.10 Contact `/contact`
Split: Audit form (6.17) + direct WhatsApp button (+972) + response-time promise + map/“Made in Israel”. Footer.

### 9.11 Legal `/privacy /terms /accessibility`
Clean single-column long-form, RTL, TOC sidebar (sticky). Accessibility statement references WCAG 2.1 AA (match/beat TukiAI). Israeli Privacy Protection Law note.

### 9.12 404
Centered Vero (thinking), “הדף לא נמצא, אבל ורו כאן לעזור”, CTA home + audit.

---

## 10 · RTL & responsive rules

- **Direction:** HE pages `dir=rtl`. Mirror layout: logo right, nav flows right→left, text right-aligned, lists/checks on the right, arrows flip (← = forward in HE). Numbers, ₪ prices, Latin words and the `surevo` wordmark stay LTR within RTL flow.
- **Components must be RTL-safe:** build with Auto Layout so direction flips cleanly; don't bake left/right into names — use start/end thinking.
- **EN pages** = LTR mirror of the same components.
- **Responsive:** desktop 1440 (content 1200) → tablet 768 → mobile 375. Stacks: hero becomes single column (chat demo below copy), grids collapse to 1–2 col, nav → hamburger overlay, sticky CTA bar appears on mobile. Type scales per §3.2 mobile.
- Touch targets ≥ 44px. Tap-friendly spacing on mobile.

## 11 · Accessibility (WCAG 2.1 AA — make it a selling point)
- Color contrast ≥ 4.5:1 body / 3:1 large. Check green-on-white (`#0E9F6E` passes for large/UI; use `ink` for body). Never green text on mint for small copy.
- Visible focus rings (`green` 2px). Full keyboard nav. Logical RTL tab order.
- All Vero/illustrations get alt text; icons aria-labelled; forms have real labels + error text.
- `prefers-reduced-motion`: disable aurora drift, count-ups, parallax, auto-typing (show final state).
- Publish an accessibility statement page (9.11).

## 12 · Deliverable checklist (definition of done in Figma)
- [ ] `Foundations` page: all color variables, text styles, spacing/number vars, effect styles, motion tokens, grids — visualised.
- [ ] `Components` page: every §6 component as a component set with variants + properties + all states. Nothing hardcoded.
- [ ] `Vero & Icons`: Vero avatar component (5 expressions × sizes × tones) + icon set.
- [ ] `Patterns`: nav, footer, hero, chat demo, pricing block, audit form, CTA band assembled from components.
- [ ] `Desktop — HE` + `Mobile — HE`: all 13 pages (§8), every section in §9, built from instances, RTL correct.
- [ ] `Desktop — EN`: Home + Pricing + Audit LP, LTR.
- [ ] `Flows`: audit-booking prototype + nav + mobile menu + key motion notes.
- [ ] Logos placed per §4 map. Real Hebrew copy (not lorem), prices in ₪.
- [ ] Spot-check: AA contrast, 44px targets, reduced-motion notes, clear-space on logos.

---

### Hand-off note to Claude Code
Build in this order: **Foundations → Components → Vero & Icons → Patterns → Home (HE) → remaining HE pages → Mobile HE → EN home → Flows.** Confirm the Foundations + Components pages with Karen before assembling full pages, so the system is locked before scaling. Keep everything as components/instances with Auto Layout so Karen can restyle globally from the variables.

