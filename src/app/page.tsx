import Link from "next/link";
import { appConfig } from "@/lib/config";

/* ────────────────────────────────────────────────────────────────────────
   ANTIPODE — THE MIRROR
   The whole page is built around a single vertical seam down the center.
   LEFT half  = PHYSICAL  (warm copper, grainy, real)
   RIGHT half = DIGITAL TWIN (cool cyan wireframe, glowing, live readouts)
   Components on the left mirror their twins on the right; sync lines cross
   the seam. The doubling/reflection IS the visual thesis.
   ──────────────────────────────────────────────────────────────────────── */

const ACCENT = "#40c8d0";          // cyan — the digital plane
const COPPER = "#d08a40";          // copper — the physical plane
const COPPER_DIM = "#7a5a30";
const INK = "#06070b";
const SEAM = "#40c8d0";

const MONO = "var(--font-geist-mono), 'SF Mono', ui-monospace, Menlo, monospace";
const SANS = "var(--font-sans), ui-sans-serif, system-ui, -apple-system, sans-serif";

/* matched component pairs — physical node ↔ its live twin reading.
   `y` is the shared vertical coordinate (the "same coordinate" motif). */
const PAIRS = [
  { id: "VRM-1", phys: "voltage reg · rail 1", twin: "rail 1: 12.04 V", y: 70, warn: false },
  { id: "VRM-2", phys: "voltage reg · rail 2", twin: "rail 2: 12.01 V", y: 132, warn: false },
  { id: "VRM-3", phys: "voltage reg · rail 3", twin: "VRM-3 temp: 84°C ▲", y: 196, warn: true },
  { id: "MCU", phys: "mcu · core", twin: "core: 62.4°C · ok", y: 258, warn: false },
  { id: "I-2", phys: "shunt · rail 2", twin: "current: 2.1 A ▲", y: 320, warn: true },
];

/* ── PHYSICAL board: warm copper PCB, drawn "real" ───────────────────── */
function PhysicalBoard() {
  return (
    <svg viewBox="0 0 300 360" className="w-full max-w-[360px]" aria-hidden>
      <defs>
        <linearGradient id="sub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1206" />
          <stop offset="1" stopColor="#0e0a04" />
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.06" />
          </feComponentTransfer>
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>

      <g filter="url(#grain)">
        <rect x="14" y="14" width="272" height="332" rx="8" fill="url(#sub)" stroke={COPPER_DIM} strokeWidth="1" />

        {/* mounting holes */}
        {[[28, 28], [272, 28], [28, 332], [272, 332]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={INK} stroke={COPPER_DIM} strokeWidth="1.2" />
        ))}

        {/* copper traces — horizontal runs to each component row */}
        {PAIRS.map((p) => (
          <line key={p.id} x1="60" y1={p.y} x2="278" y2={p.y} stroke={COPPER} strokeWidth="1" opacity="0.5" />
        ))}
        {[90, 150, 210].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="320" stroke={COPPER} strokeWidth="0.6" opacity="0.28" />
        ))}

        {/* header pins on the inner (seam-facing) edge */}
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x="276" y={56 + i * 28} width="12" height="6" rx="1" fill="#e3b35a" />
        ))}

        {/* components, each anchored on its shared y-coordinate */}
        {PAIRS.map((p) => {
          const c = p.warn ? "#e0903a" : COPPER;
          if (p.id === "MCU") {
            return (
              <g key={p.id}>
                <rect x="96" y={p.y - 22} width="84" height="44" rx="3" fill="#15100a" stroke="#4a3a20" strokeWidth="1" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect key={i} x={100 + i * 13} y={p.y + 22} width="4" height="8" fill="#7a5a30" />
                ))}
                <text x="138" y={p.y + 4} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#a07a40">MCU</text>
              </g>
            );
          }
          return (
            <g key={p.id}>
              <rect x="78" y={p.y - 13} width="48" height="26" rx="2" fill="#15100a" stroke={c} strokeWidth="1" />
              <circle cx="70" cy={p.y} r="3" fill={c} opacity="0.9" />
              <text x="102" y={p.y + 4} textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill={c}>{p.id}</text>
            </g>
          );
        })}

        {/* electrolytic caps */}
        {[[150, 56], [196, 56], [150, 300]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="9" fill="#241a0c" stroke="#5a4424" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
}

/* ── DIGITAL twin: same board, cyan wireframe + live readouts ────────── */
function DigitalTwin() {
  return (
    <svg viewBox="0 0 300 360" className="w-full max-w-[360px]" aria-hidden>
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* substrate outline — wireframe, no fill */}
      <rect x="14" y="14" width="272" height="332" rx="8" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" filter="url(#glow)" />
      <rect x="14" y="14" width="272" height="332" rx="8" fill={ACCENT} opacity="0.03" />

      {[[28, 28], [272, 28], [28, 332], [272, 332]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
      ))}

      {/* wireframe traces */}
      {PAIRS.map((p) => (
        <line key={p.id} x1="22" y1={p.y} x2="222" y2={p.y} stroke={ACCENT} strokeWidth="0.8" opacity="0.35" />
      ))}

      {/* header pins on the inner (seam-facing) edge — mirrored to the LEFT */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x="12" y={56 + i * 28} width="12" height="6" rx="1" fill="none" stroke={ACCENT} strokeWidth="0.9" opacity="0.7" />
      ))}

      {/* twin components + live readouts */}
      {PAIRS.map((p) => {
        const stroke = p.warn ? "#f0b070" : ACCENT;
        if (p.id === "MCU") {
          return (
            <g key={p.id} filter="url(#glow)">
              <rect x="120" y={p.y - 22} width="84" height="44" rx="3" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
            </g>
          );
        }
        return (
          <g key={p.id}>
            <rect x="174" y={p.y - 13} width="48" height="26" rx="2" fill="none" stroke={stroke} strokeWidth="1" opacity="0.85" filter="url(#glow)" />
            <circle cx="230" cy={p.y} r="3" fill={stroke} opacity="0.9" />
          </g>
        );
      })}

      {/* LIVE READOUTS overlaid, right of each twin component */}
      {PAIRS.map((p) => (
        <text
          key={p.id}
          x="124"
          y={p.id === "MCU" ? p.y + 4 : p.y - 18}
          fontSize="9"
          fontFamily="monospace"
          fill={p.warn ? "#f0b070" : ACCENT}
          opacity="0.95"
        >
          {p.twin}
        </text>
      ))}
    </svg>
  );
}

/* small globe with the antipodal line Europe → Auckland */
function AntipodeGlobe() {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden>
      <circle cx="60" cy="60" r="46" fill="none" stroke="#2a2f38" strokeWidth="1" />
      {[18, 30, 42].map((r) => (
        <ellipse key={r} cx="60" cy="60" rx={r} ry="46" fill="none" stroke="#222831" strokeWidth="0.6" />
      ))}
      {[60, 38, 82].map((cy) => (
        <line key={cy} x1="14" y1={cy} x2="106" y2={cy} stroke="#222831" strokeWidth="0.6" />
      ))}
      {/* Europe node (warm) → Auckland node (cyan), through the core */}
      <line x1="44" y1="40" x2="78" y2="84" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
      <circle cx="44" cy="40" r="3.4" fill={COPPER} />
      <circle cx="78" cy="84" r="3.4" fill={ACCENT} />
      <text x="44" y="30" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={COPPER}>EUROPE</text>
      <text x="78" y="100" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={ACCENT}>AUCKLAND</text>
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[#cfd4da]" style={{ background: INK, fontFamily: SANS }}>
      {/* ░░░ THE SEAM — full-height glowing divider down the dead center ░░░ */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden -translate-x-1/2 md:block" aria-hidden>
        <div className="h-full w-px" style={{ background: SEAM, boxShadow: `0 0 14px 1px ${SEAM}, 0 0 4px ${SEAM}` }} />
      </div>
      {/* tonal wash: warm on the left half, cool on the right half */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden>
        <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "radial-gradient(120% 80% at 100% 30%, rgba(208,138,64,0.10), transparent 60%)" }} />
        <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: "radial-gradient(120% 80% at 0% 30%, rgba(64,200,208,0.12), transparent 60%)" }} />
      </div>

      <div className="relative z-10">
        {/* ═══ MASTHEAD — brand sits ON the seam ═══ */}
        <header className="relative">
          {/* sign-in on the physical side, get-started on the digital side */}
          <div className="absolute left-0 top-5 hidden w-1/2 justify-start pl-6 md:flex">
            <Link href="/login" className="text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-[#f0c98a]" style={{ fontFamily: MONO, color: COPPER }}>
              ← sign in
            </Link>
          </div>
          <div className="absolute right-0 top-5 hidden w-1/2 justify-end pr-6 md:flex">
            <Link href="/signup" className="border px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-[#40c8d0] hover:text-black" style={{ fontFamily: MONO, color: ACCENT, borderColor: `${ACCENT}66` }}>
              get started →
            </Link>
          </div>

          <div className="flex flex-col items-center pt-7 pb-3">
            <div className="text-3xl font-semibold tracking-[0.32em]" style={{ color: "#f4f6f8" }}>
              ANTI<span style={{ color: ACCENT }}>PODE</span>
            </div>
            <div className="mt-1 text-[10px] tracking-[0.34em] uppercase" style={{ fontFamily: MONO, color: "#5a626c" }}>
              Auckland 36°S · the opposite plane
            </div>
            {/* mobile-only auth (seam collapses on small screens) */}
            <div className="mt-3 flex items-center gap-4 md:hidden">
              <Link href="/login" className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: COPPER }}>sign in</Link>
              <Link href="/signup" className="border px-3 py-1 text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: ACCENT, borderColor: `${ACCENT}66` }}>get started</Link>
            </div>
          </div>
        </header>

        {/* ═══ HERO — the split. Physical board ↔ its glowing twin ═══ */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT — PHYSICAL */}
          <div className="relative flex flex-col items-end px-6 pt-10 pb-6 md:pr-12">
            <div className="mb-5 flex items-center gap-2 self-end">
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: COPPER }}>physical · board #A7-04</span>
              <span className="h-2 w-2 rounded-full" style={{ background: COPPER, boxShadow: `0 0 8px ${COPPER}` }} />
            </div>
            <PhysicalBoard />
            <div className="mt-5 text-right text-[11px]" style={{ fontFamily: MONO, color: "#6a625a" }}>
              copper · powered · iterating in <span style={{ color: COPPER }}>weeks</span>
            </div>
          </div>

          {/* RIGHT — DIGITAL TWIN */}
          <div className="relative flex flex-col items-start px-6 pt-10 pb-6 md:pl-12">
            <div className="mb-5 flex items-center gap-2 self-start">
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: ACCENT }}>digital twin · +200ms ahead</span>
            </div>
            <DigitalTwin />
            <div className="mt-5 text-left text-[11px]" style={{ fontFamily: MONO, color: "#5b757a" }}>
              wireframe · live · iterating in <span style={{ color: ACCENT }}>seconds</span>
            </div>
          </div>
        </section>

        {/* sync caption straddling the seam */}
        <div className="flex justify-center pb-2">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: "#4a525c" }}>
            <span style={{ color: COPPER }}>◀ pin</span> &nbsp;⇄&nbsp; <span style={{ color: ACCENT }}>twin reading ▶</span> &nbsp;·&nbsp; five components, one coordinate
          </span>
        </div>

        {/* headline sits across / under the split — modest, not a giant serif hero */}
        <section className="px-6 pb-14 pt-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-2 md:grid-cols-2">
            <h1 className="text-right text-2xl font-medium leading-tight tracking-tight md:text-[2rem]" style={{ color: "#eef1f4" }}>
              Test the change in the twin
            </h1>
            <h1 className="text-left text-2xl font-medium leading-tight tracking-tight md:text-[2rem]" style={{ color: ACCENT }}>
              before you touch the iron.
            </h1>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed" style={{ color: "#8b929b" }}>
            Hardware iteration is weeks. Software is seconds. Antipode mirrors your prototype into a live
            digital twin, runs it ahead of real time, and tells you what breaks — before the smoke comes out.
          </p>
        </section>

        {/* ═══ FAILURE-PREDICTION band — full width, crosses the seam ═══ */}
        <section className="border-y" style={{ borderColor: "#15181e", background: "#08090e" }}>
          <div className="relative">
            {/* the seam continues through this band */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" style={{ background: `${SEAM}55` }} aria-hidden />
            <div className="mx-auto max-w-4xl px-6 py-12">
              <div className="overflow-hidden rounded-md border" style={{ borderColor: `${ACCENT}33`, background: "#0a0c12", boxShadow: `0 0 40px ${ACCENT}12` }}>
                <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "#15181e", background: "#070810" }}>
                  <span className="text-[11px]" style={{ fontFamily: MONO, color: "#6a727c" }}>twin://A7-04 — reading ahead of real time</span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
                    <span className="text-[10px]" style={{ fontFamily: MONO, color: ACCENT }}>14,200 samples/sec</span>
                  </span>
                </div>
                <div className="space-y-1.5 px-6 py-5 text-[13px] leading-relaxed" style={{ fontFamily: MONO }}>
                  <p style={{ color: "#6a727c" }}>twin running <span style={{ color: "#e8edf2" }}>200ms ahead</span> of real time · 14,200 samples/sec</p>
                  <div
                    className="mt-3 rounded-sm border-l-2 px-4 py-3"
                    style={{ borderColor: ACCENT, background: `${ACCENT}10`, boxShadow: `0 0 18px ${ACCENT}25`, animation: "antipulse 1.6s ease-in-out infinite" }}
                  >
                    <p style={{ color: ACCENT, fontWeight: 700 }}>⚠ PREDICTED FAILURE in 4.2s</p>
                    <p className="mt-1 pl-4" style={{ color: "#cfd4da" }}>└ component: <span style={{ color: "#f0b070" }}>VRM-3</span> (voltage regulator)</p>
                    <p className="pl-4" style={{ color: "#cfd4da" }}>└ cause: thermal runaway @ <span style={{ color: "#f08070" }}>87°C</span></p>
                    <p className="pl-4" style={{ color: "#cfd4da" }}>└ action: reduce rail-2 load 15%</p>
                  </div>
                  <p className="pt-3" style={{ color: "#7adfa0" }}>✔ load reduced · thermal stabilized · iteration saved</p>
                  <p style={{ color: "#5a626c" }}># the fix landed in the twin. the iron never knew.</p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.28em]" style={{ fontFamily: MONO, color: "#4a525c" }}>
                the failure was averted <span style={{ color: ACCENT }}>before atoms</span> — at code-speed, not prototype-speed
              </p>
            </div>
          </div>
        </section>

        {/* ═══ TWO WORLDS, ONE COORDINATE — globe + antipodal line ═══ */}
        <section className="px-6 py-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
            <AntipodeGlobe />
            <p className="max-w-md text-center text-[13px] leading-relaxed md:text-left" style={{ color: "#9aa1aa" }}>
              An <span style={{ color: "#eef1f4" }}>antipode</span> is the opposite point on the globe — Auckland sits
              almost exactly opposite Europe. The twin is the antipode of the hardware:
              <span style={{ color: ACCENT }}> same coordinates, opposite plane.</span>
            </p>
          </div>
        </section>

        {/* ═══ MIRRORED STATS — one figure each side of the seam ═══ */}
        <section className="border-t" style={{ borderColor: "#15181e" }}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" style={{ background: `${SEAM}55` }} aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col items-end px-6 py-12 md:pr-12">
                <div className="text-5xl font-semibold tracking-tight md:text-6xl" style={{ color: COPPER }}>200ms</div>
                <div className="mt-2 text-right text-[10px] uppercase tracking-[0.26em]" style={{ fontFamily: MONO, color: "#6a625a" }}>predictive accuracy · physical lead time</div>
              </div>
              <div className="flex flex-col items-start px-6 py-12 md:pl-12">
                <div className="text-5xl font-semibold tracking-tight md:text-6xl" style={{ color: ACCENT }}>89%</div>
                <div className="mt-2 text-left text-[10px] uppercase tracking-[0.26em]" style={{ fontFamily: MONO, color: "#5b757a" }}>of failures pre-empted · in the twin</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CLOSE — paired CTAs, one per plane, across the seam ═══ */}
        <section className="border-t" style={{ borderColor: "#15181e", background: "#08090e" }}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" style={{ background: SEAM, boxShadow: `0 0 12px ${SEAM}` }} aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col items-end gap-3 px-6 py-14 md:pr-12">
                <p className="text-right text-sm" style={{ color: "#8b929b" }}>already pairing boards?</p>
                <Link href="/login" className="border px-6 py-2.5 text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-[#d08a40] hover:text-black" style={{ fontFamily: MONO, color: COPPER, borderColor: `${COPPER}66` }}>
                  ← sign in
                </Link>
              </div>
              <div className="flex flex-col items-start gap-3 px-6 py-14 md:pl-12">
                <p className="text-left text-sm" style={{ color: "#8b929b" }}>mirror your first board.</p>
                <Link href="/signup" className="border px-6 py-2.5 text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-[#40c8d0] hover:text-black" style={{ fontFamily: MONO, color: ACCENT, borderColor: `${ACCENT}66`, boxShadow: `0 0 18px ${ACCENT}25` }}>
                  pair the twin →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER — split across the seam ═══ */}
        <footer className="border-t" style={{ borderColor: "#15181e" }}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" style={{ background: `${SEAM}44` }} aria-hidden />
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2">
              <div className="text-[11px] md:text-right" style={{ fontFamily: MONO, color: "#5a626c" }}>
                <span style={{ color: COPPER }}>{appConfig.name}</span> · Auckland 36°S
              </div>
              <a
                href="https://abduljaleel.xyz/aletheia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-[#40c8d0] md:text-left"
                style={{ fontFamily: MONO, color: "#5a626c" }}
              >
                Part of the Aletheia stack ↗
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* keyframes for the predicted-failure pulse */}
      <style>{`
        @keyframes antipulse {
          0%, 100% { box-shadow: 0 0 14px ${ACCENT}20; border-left-color: ${ACCENT}; }
          50%      { box-shadow: 0 0 30px ${ACCENT}55; border-left-color: #9bf0f5; }
        }
      `}</style>
    </div>
  );
}
