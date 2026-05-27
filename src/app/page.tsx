import Link from "next/link";
import { appConfig } from "@/lib/config";

const ACCENT = "#40c8d0";

const sensors = [
  { label: "VRM-1 voltage", value: "12.04 V", tone: "ok" },
  { label: "VRM-2 voltage", value: "12.01 V", tone: "ok" },
  { label: "VRM-3 voltage", value: "11.78 V", tone: "warn" },
  { label: "Core temp", value: "62.4 °C", tone: "ok" },
  { label: "VRM-3 temp", value: "84.2 °C", tone: "warn" },
  { label: "Rail-2 current", value: "4.18 A", tone: "warn" },
  { label: "Clock skew", value: "+1.2 ppm", tone: "ok" },
  { label: "I2C latency", value: "0.84 ms", tone: "ok" },
];

const toneColor: Record<string, string> = {
  ok: "#7adfa0",
  warn: "#f0b070",
  alert: "#ef6b85",
};

export default function LandingPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#08090d] text-[#d4d4d8]"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      {/* ──────────────────────────────────────────────────────────────
          NAV
      ────────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#16181d]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
            />
            <span
              className="text-base tracking-wide text-[#fafafa]"
              style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 600 }}
            >
              Antipode
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#52525b] hidden sm:inline"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              · Auckland
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs text-[#71717a] hover:text-[#fafafa] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              sign in
            </Link>
            <Link
              href="/signup"
              className="text-xs border px-4 py-1.5 transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                borderColor: `${ACCENT}66`,
                color: ACCENT,
              }}
            >
              get started
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-28 pb-16 text-center">
        <div className="flex items-center gap-2 mb-10">
          <span
            className="inline-block h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
          />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Antipode · Auckland · Frontier Layer
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] max-w-4xl"
          style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
        >
          Hot-reloading for physical engineering.
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg text-[#d4d4d8] leading-snug">
          Hardware iteration is weeks. Software is seconds. Antipode pairs your prototype with a
          live digital twin, runs simulations ahead of real time, and warns you before the smoke comes out.
        </p>
        <p
          className="mt-6 text-sm text-[#71717a]"
          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
        >
          From Auckland — antipode of Europe, where atoms meet their digital twin.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-block border px-6 py-2.5 text-xs transition-all duration-200"
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
              borderColor: ACCENT,
              color: ACCENT,
              boxShadow: `0 0 20px ${ACCENT}30`,
            }}
          >
            $ antipode pair →
          </Link>
          <Link
            href="/login"
            className="inline-block text-xs text-[#71717a] hover:text-[#fafafa] transition-colors px-4 py-2.5"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            or sign in
          </Link>
        </div>

        <div
          className="mt-10 inline-block border-l-2 pl-4 py-1 text-left text-sm text-[#a1a1aa] max-w-md"
          style={{ borderColor: `${ACCENT}80` }}
        >
          &ldquo;The next revision is faster than the next prototype.&rdquo;
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SPLIT — physical PCB ↔ digital twin
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.25em] text-[#71717a]"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
              >
                /pair — live mirror, board #A7-04
              </span>
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#52525b]"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              sync 2.1ms · drift 0.4ms
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-stretch">
            {/* Left: physical PCB */}
            <div className="rounded-md border border-[#16181d] bg-[#0a0c11] p-5">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] uppercase tracking-[0.25em] text-[#71717a]"
                  style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  Physical · PCB prototype
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "#7adfa0", fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  ◉ powered
                </span>
              </div>

              <svg viewBox="0 0 320 200" className="w-full">
                {/* PCB substrate */}
                <rect x="10" y="10" width="300" height="180" rx="6" fill="#0e1a14" stroke="#1f4a2f" strokeWidth="1" />

                {/* Mounting holes */}
                {[
                  [22, 22],
                  [298, 22],
                  [22, 178],
                  [298, 178],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="5" fill="#08090d" stroke="#1f4a2f" />
                ))}

                {/* Traces */}
                {[40, 60, 80, 100, 120, 140].map((y) => (
                  <line key={y} x1="50" y1={y} x2="270" y2={y} stroke="#3a8f5a" strokeWidth="0.6" opacity="0.55" />
                ))}
                {[80, 120, 160, 200, 240].map((x) => (
                  <line key={x} x1={x} y1="30" x2={x} y2="170" stroke="#3a8f5a" strokeWidth="0.6" opacity="0.4" />
                ))}

                {/* MCU */}
                <rect x="125" y="75" width="70" height="50" rx="2" fill="#16181d" stroke="#3a3a3a" />
                <text x="160" y="105" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#71717a">
                  MCU
                </text>

                {/* VRMs */}
                {[
                  { x: 50, y: 50, label: "VRM-1", color: "#7adfa0" },
                  { x: 50, y: 110, label: "VRM-2", color: "#7adfa0" },
                  { x: 230, y: 80, label: "VRM-3", color: "#f0b070" },
                ].map((c) => (
                  <g key={c.label}>
                    <rect
                      x={c.x - 16}
                      y={c.y - 12}
                      width="32"
                      height="24"
                      rx="2"
                      fill="#16181d"
                      stroke={c.color}
                      strokeWidth="0.8"
                    />
                    <circle cx={c.x} cy={c.y - 16} r="2.5" fill={c.color} opacity="0.85" />
                    <text
                      x={c.x}
                      y={c.y + 24}
                      textAnchor="middle"
                      fontSize="7"
                      fontFamily="ui-monospace, monospace"
                      fill={c.color}
                    >
                      {c.label}
                    </text>
                  </g>
                ))}

                {/* Capacitors */}
                {[80, 110, 210, 240].map((x) => (
                  <circle key={x} cx={x} cy="155" r="5" fill="#3a3a3a" stroke="#5a5a5a" />
                ))}

                {/* Header pins */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect key={i} x={280} y={50 + i * 12} width="14" height="6" fill="#d4af37" />
                ))}
              </svg>
            </div>

            {/* Center: sync arrows */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span
                    style={{ color: ACCENT, fontSize: "16px", lineHeight: 1 }}
                  >
                    ⇄
                  </span>
                  <span
                    style={{
                      color: "#52525b",
                      fontSize: "8px",
                      fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                    }}
                  >
                    SYNC
                  </span>
                </div>
              ))}
            </div>

            {/* Right: digital twin */}
            <div
              className="rounded-md border bg-[#0a0c11] p-5"
              style={{ borderColor: `${ACCENT}40`, boxShadow: `0 0 24px ${ACCENT}15` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  Digital · twin telemetry
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  +200ms ahead
                </span>
              </div>

              <div className="space-y-1.5">
                {sensors.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center py-1.5 px-2 rounded-sm"
                    style={{
                      backgroundColor: s.tone === "warn" ? "#f0b07015" : "#0e1118",
                      border: `1px solid ${s.tone === "warn" ? "#f0b07040" : "#16181d"}`,
                    }}
                  >
                    <span
                      className="text-[11px]"
                      style={{
                        color: "#71717a",
                        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        color: toneColor[s.tone],
                        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FAILURE PREDICTION — terminal panel
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center"
            style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Failure prediction
          </p>
          <h2
            className="text-3xl sm:text-4xl tracking-tight text-white text-center mb-10"
            style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
          >
            The twin sees failure before the board feels it.
          </h2>

          <div
            className="rounded-md overflow-hidden border border-[#16181d] bg-[#0a0c11]"
          >
            {/* Terminal header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b border-[#16181d] bg-[#06070a]"
            >
              <span
                className="text-[11px]"
                style={{ color: "#71717a", fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
              >
                $ antipode predict --board A7-04
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: ACCENT }}
                />
                <span
                  className="text-[10px]"
                  style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  twin running 200ms ahead
                </span>
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="p-6 text-sm leading-relaxed space-y-1.5"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              <p>
                <span style={{ color: "#71717a" }}>sensor data ingested:</span>{" "}
                <span style={{ color: "#fafafa" }}>14,200 samples/sec</span>
              </p>
              <p>
                <span style={{ color: "#71717a" }}>twin simulation:</span>{" "}
                <span style={{ color: "#fafafa" }}>running 200ms ahead of real time</span>
              </p>

              <div className="pt-3 mt-3 border-t border-[#16181d]">
                <p style={{ color: "#ef6b85" }}>
                  <span className="font-bold">⚠ PREDICTED FAILURE in 4.2 sec</span>
                </p>
                <div className="mt-2 pl-5 space-y-1" style={{ color: "#fafafa" }}>
                  <p>
                    └ component: <span style={{ color: "#f0b070" }}>VRM-3</span> (voltage regulator)
                  </p>
                  <p>
                    └ cause: thermal runaway at <span style={{ color: "#ef6b85" }}>87°C</span>
                  </p>
                  <p>└ recommendation: reduce load on rail-2 by 15%</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#16181d]">
                <p style={{ color: "#7adfa0" }}>action taken: reduced load. Thermal stabilized.</p>
                <p style={{ color: "#71717a" }}>hardware iteration saved.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FEATURES — 4 cards
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-10 text-center"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Four primitives
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                cmd: "antipode.twin()",
                label: "Real-time digital twin",
                desc: "Mirror your board in software the moment it powers on. Every node, every rail.",
              },
              {
                cmd: "antipode.predict()",
                label: "Failure prediction",
                desc: "Simulate 200ms ahead of real time. See the thermal runaway before the smoke.",
              },
              {
                cmd: "antipode.ingest()",
                label: "Sensor integration",
                desc: "14,200 samples/sec ingested from voltage, current, thermal, and I2C buses.",
              },
              {
                cmd: "antipode.test()",
                label: "Pre-commit testing",
                desc: "Validate firmware against the twin before flashing atoms. Iterate at code-speed.",
              },
            ].map((f) => (
              <div
                key={f.cmd}
                className="border border-[#16181d] bg-[#0a0c11] p-5 hover:border-[#40c8d0]/40 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[#52525b]"
                    style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                  >
                    &gt;
                  </span>
                  <span
                    className="text-sm group-hover:text-white transition-colors"
                    style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                  >
                    {f.cmd}
                  </span>
                </div>
                <div className="text-white text-sm font-medium mb-2">{f.label}</div>
                <div className="text-xs text-[#71717a] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          STATS
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]" style={{ background: "#06070a" }}>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 text-center md:text-left">
            <div>
              <div
                className="text-5xl sm:text-6xl text-white tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
              >
                <span style={{ color: ACCENT }}>200ms</span>
              </div>
              <div
                className="mt-3 text-xs uppercase tracking-[0.25em] text-[#71717a]"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
              >
                predictions verified to this accuracy
              </div>
            </div>
            <div>
              <div
                className="text-5xl sm:text-6xl text-white tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
              >
                89<span style={{ color: ACCENT }}>%</span>
              </div>
              <div
                className="mt-3 text-xs uppercase tracking-[0.25em] text-[#71717a]"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
              >
                of failures pre-empted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CTA
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-6"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Pair a board. Mirror the rails. Run the twin ahead.
          </p>
          <Link
            href="/signup"
            className="inline-block border px-8 py-3 text-sm transition-all duration-200 hover:bg-opacity-10"
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
              borderColor: ACCENT,
              color: ACCENT,
              boxShadow: `0 0 20px ${ACCENT}30`,
            }}
          >
            $ antipode init →
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#16181d]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="text-xs text-[#52525b]"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            <span
              className="text-[#a1a1aa]"
              style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 600, fontSize: "0.9rem" }}
            >
              {appConfig.name}
            </span>
            <span className="mx-2">·</span>
            <span>Auckland</span>
            <span className="mx-2">·</span>
            <span>antipode.co.nz</span>
          </div>
          <a
            href="https://abduljaleel.xyz/aletheia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 border transition-colors hover:bg-opacity-10"
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
              borderColor: `${ACCENT}40`,
              color: ACCENT,
            }}
          >
            Part of the Aletheia stack ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
