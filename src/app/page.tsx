import Link from "next/link";
import { appConfig } from "@/lib/config";

export default function LandingPage() {
  const accent = "#40c8d0";
  const dark = "#05090c";
  const surface = "#0a1418";
  const border = "#14333a";
  const muted = "#5a7a82";
  const text = "#d4e8ec";

  // Live sensor readings (split-screen right pane)
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

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: dark, color: text }}>
      {/* Nav */}
      <header style={{ borderBottom: `1px solid ${border}` }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
            </svg>
            <span className="font-semibold" style={{ color: text }}>{appConfig.name}</span>
            <span className="text-xs font-mono hidden sm:inline" style={{ color: muted }}>
              antipode.co.nz &middot; Auckland
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm transition-colors" style={{ color: muted }}>
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{ border: `1px solid ${accent}`, color: accent }}
            >
              Pair a board
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl w-full px-6 pt-24 pb-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: accent }}>
              Frontier / Physical-to-digital twins
            </p>
            <h1
              className="text-7xl sm:text-8xl font-normal tracking-tight leading-[0.95]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: text }}
            >
              Antipode
            </h1>
            <p className="mt-4 text-sm italic" style={{ color: muted, fontFamily: 'Georgia, serif' }}>
              <em>n.</em> The point on the globe diametrically opposite. London&apos;s is Auckland.
            </p>
            <p className="mt-8 text-2xl font-light leading-relaxed" style={{ color: text }}>
              Hot-reloading for physical engineering.
            </p>
            <p className="mt-5 text-base leading-relaxed" style={{ color: muted }}>
              Hardware iteration is weeks. Software is seconds.
              Antipode pairs your prototype with a live digital twin, runs simulations
              ahead of real time, and warns you before the smoke comes out.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full px-7 py-3 text-base font-medium"
                style={{ backgroundColor: accent, color: dark }}
              >
                Pair a board &rarr;
              </Link>
              <span className="text-xs font-mono" style={{ color: muted }}>
                From Auckland &mdash; the antipode of Europe, where hardware meets its digital twin.
              </span>
            </div>
          </div>

          {/* Globe — antipode line London → Auckland */}
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-full max-w-sm">
              <defs>
                <radialGradient id="globe-bg" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor={surface} />
                  <stop offset="100%" stopColor={dark} />
                </radialGradient>
              </defs>

              <circle cx="160" cy="160" r="140" fill="url(#globe-bg)" stroke={border} strokeWidth="1" />

              {/* Latitude lines */}
              {[-60, -30, 0, 30, 60].map((lat) => {
                const r = Math.cos((lat * Math.PI) / 180) * 140;
                const cy = 160 + (lat * 140) / 90;
                return (
                  <ellipse
                    key={lat}
                    cx="160"
                    cy={cy}
                    rx={r}
                    ry={Math.max(2, r * 0.2)}
                    fill="none"
                    stroke={border}
                    strokeWidth="0.8"
                  />
                );
              })}
              {/* Longitude lines */}
              {[-60, -30, 0, 30, 60].map((lon) => {
                const rx = Math.abs(Math.sin((lon * Math.PI) / 180)) * 140;
                return (
                  <ellipse
                    key={lon}
                    cx="160"
                    cy="160"
                    rx={rx || 0.5}
                    ry="140"
                    fill="none"
                    stroke={border}
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* London point (top-right) */}
              <g>
                <circle cx="200" cy="100" r="4" fill="#f0b070" />
                <circle cx="200" cy="100" r="10" fill="none" stroke="#f0b070" strokeOpacity="0.4" />
                <text x="210" y="95" fontSize="10" fontFamily="ui-monospace, monospace" fill="#f0b070">
                  London
                </text>
                <text x="210" y="108" fontSize="8" fontFamily="ui-monospace, monospace" fill={muted}>
                  51.5°N, 0.1°W
                </text>
              </g>

              {/* Auckland point (bottom-left, antipode) */}
              <g>
                <circle cx="120" cy="220" r="4" fill={accent} />
                <circle cx="120" cy="220" r="10" fill="none" stroke={accent} strokeOpacity="0.4" />
                <text x="60" y="240" fontSize="10" fontFamily="ui-monospace, monospace" fill={accent}>
                  Auckland
                </text>
                <text x="60" y="252" fontSize="8" fontFamily="ui-monospace, monospace" fill={muted}>
                  36.8°S, 174.7°E
                </text>
              </g>

              {/* Antipode line through the centre */}
              <line
                x1="200"
                y1="100"
                x2="120"
                y2="220"
                stroke={accent}
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.7"
              />
              <text x="172" y="158" fontSize="9" fontFamily="ui-monospace, monospace" fill={muted}>
                antipode
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* Split-screen: physical PCB ↔ digital twin */}
      <section className="mx-auto max-w-6xl w-full px-6 pb-12">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: accent }}>
            Live pairing &mdash; board #A7-04
          </p>
          <span className="text-xs font-mono" style={{ color: muted }}>
            sync 2.1 ms · drift 0.4 ms
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-stretch">
          {/* Left: physical PCB */}
          <div
            className="rounded-xl p-5 relative"
            style={{ border: `1px solid ${border}`, backgroundColor: surface }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-wider uppercase" style={{ color: muted }}>
                Physical &mdash; PCB prototype
              </span>
              <span className="text-xs font-mono" style={{ color: "#7adfa0" }}>
                ◉ powered
              </span>
            </div>

            <svg viewBox="0 0 320 200" className="w-full">
              {/* PCB substrate */}
              <rect x="10" y="10" width="300" height="180" rx="8" fill="#0f2a1a" stroke="#1f4a2f" strokeWidth="1" />

              {/* Mounting holes */}
              {[[22, 22], [298, 22], [22, 178], [298, 178]].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="5" fill={dark} stroke="#1f4a2f" />
                </g>
              ))}

              {/* Traces */}
              {[40, 60, 80, 100, 120, 140].map((y) => (
                <line key={y} x1="50" y1={y} x2="270" y2={y} stroke="#3a8f5a" strokeWidth="0.6" opacity="0.6" />
              ))}
              {[80, 120, 160, 200, 240].map((x) => (
                <line key={x} x1={x} y1="30" x2={x} y2="170" stroke="#3a8f5a" strokeWidth="0.6" opacity="0.4" />
              ))}

              {/* Main chip */}
              <rect x="125" y="75" width="70" height="50" rx="2" fill="#1a1a1a" stroke="#3a3a3a" />
              <text x="160" y="105" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={muted}>
                MCU
              </text>

              {/* VRMs */}
              {[
                { x: 50, y: 50, label: "VRM-1", color: "#7adfa0" },
                { x: 50, y: 110, label: "VRM-2", color: "#7adfa0" },
                { x: 230, y: 80, label: "VRM-3", color: "#f0b070" },
              ].map((c) => (
                <g key={c.label}>
                  <rect x={c.x - 16} y={c.y - 12} width="32" height="24" rx="2" fill="#1a1a1a" stroke={c.color} strokeWidth="0.8" />
                  <circle cx={c.x} cy={c.y - 16} r="2.5" fill={c.color} opacity="0.85" />
                  <text x={c.x} y={c.y + 24} textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill={c.color}>
                    {c.label}
                  </text>
                </g>
              ))}

              {/* Capacitors */}
              {[80, 110, 210, 240].map((x) => (
                <circle key={x} cx={x} cy="155" r="5" fill="#3a3a3a" stroke="#5a5a5a" />
              ))}

              {/* Header pins */}
              <g>
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect key={i} x={280} y={50 + i * 12} width="14" height="6" fill="#d4af37" />
                ))}
              </g>
            </svg>
          </div>

          {/* Center: sync arrows */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span style={{ color: accent, fontSize: "16px", lineHeight: 1 }}>&#8646;</span>
                <span style={{ color: muted, fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>SYNC</span>
              </div>
            ))}
          </div>

          {/* Right: digital twin */}
          <div
            className="rounded-xl p-5 relative"
            style={{ border: `1px solid ${accent}40`, backgroundColor: surface }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-wider uppercase" style={{ color: accent }}>
                Digital &mdash; twin simulation
              </span>
              <span className="text-xs font-mono" style={{ color: accent }}>
                +200ms ahead
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {sensors.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between items-center py-1.5 px-2 rounded"
                  style={{
                    backgroundColor: s.tone === "warn" ? "#f0b07015" : `${dark}80`,
                    border: `1px solid ${s.tone === "warn" ? "#f0b07040" : border}`,
                  }}
                >
                  <span style={{ color: muted }}>{s.label}</span>
                  <span style={{ color: toneColor[s.tone] }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Failure prediction */}
      <section className="mx-auto max-w-6xl w-full px-6 pb-16">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: accent }}>
          Failure prediction
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${border}`, backgroundColor: surface }}
        >
          <div
            className="flex items-center justify-between px-5 py-3 text-xs font-mono"
            style={{ borderBottom: `1px solid ${border}`, color: muted, backgroundColor: dark }}
          >
            <span>$ antipode predict --board A7-04</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
              twin running 200ms ahead
            </span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed space-y-1.5">
            <p>
              <span style={{ color: muted }}>sensor data ingested:</span>{" "}
              <span style={{ color: text }}>14,200 samples/sec</span>
            </p>
            <p>
              <span style={{ color: muted }}>twin simulation:</span>{" "}
              <span style={{ color: text }}>running 200ms ahead of real time</span>
            </p>

            <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${border}` }}>
              <p style={{ color: "#ef6b85" }}>
                <span className="font-bold">&#9888; PREDICTED FAILURE in 4.2 sec</span>
              </p>
              <div className="mt-2 pl-5 space-y-1" style={{ color: text }}>
                <p>&#9492;&nbsp; component: <span style={{ color: "#f0b070" }}>VRM-3</span> (voltage regulator)</p>
                <p>&#9492;&nbsp; cause: thermal runaway at <span style={{ color: "#ef6b85" }}>87°C</span></p>
                <p>&#9492;&nbsp; recommendation: reduce load on rail-2 by 15%</p>
              </div>
            </div>

            <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${border}` }}>
              <p style={{ color: "#7adfa0" }}>action taken: reduced load. Thermal stabilized.</p>
              <p style={{ color: muted }}>hardware iteration saved.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Prediction accuracy", value: "200ms" },
            { label: "Failures pre-empted", value: "89%" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg px-5 py-6 flex items-baseline justify-between"
              style={{ border: `1px solid ${border}`, backgroundColor: surface }}
            >
              <p className="text-xs font-mono tracking-wider uppercase" style={{ color: muted }}>
                {s.label}
              </p>
              <p
                className="text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif", color: accent }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl w-full px-6 pb-24 text-center">
        <h2
          className="text-4xl sm:text-5xl font-normal leading-tight"
          style={{ fontFamily: "Georgia, serif", color: text }}
        >
          Iterate hardware at the speed of code.
        </h2>
        <p className="mt-5 text-base" style={{ color: muted }}>
          Pair a board, mirror its sensors, run the twin ahead. The next revision is faster than the next prototype.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full px-8 py-3 text-base font-medium"
            style={{ backgroundColor: accent, color: dark }}
          >
            Pair a board &rarr;
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${border}` }}>
        <div className="mx-auto flex flex-col sm:flex-row gap-3 max-w-6xl items-center justify-between px-6 py-6 text-xs font-mono">
          <span style={{ color: muted }}>
            {appConfig.name} &middot; Auckland &middot; &copy; {new Date().getFullYear()}
          </span>
          <a
            href="https://abduljaleel.xyz/aletheia/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors"
            style={{ border: `1px solid ${border}`, color: accent }}
          >
            PART OF THE ALETHEIA STACK &#8599;
          </a>
        </div>
      </footer>
    </div>
  );
}
