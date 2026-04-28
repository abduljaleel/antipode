import Link from "next/link";
import { appConfig } from "@/lib/config";

export default function LandingPage() {
  const vehicles = [
    { id: "AV-001", status: "green", speed: "32 km/h", battery: "78%", mission: "Route 7A Downtown" },
    { id: "AV-002", status: "green", speed: "45 km/h", battery: "91%", mission: "Airport Express" },
    { id: "AV-003", status: "yellow", speed: "12 km/h", battery: "54%", mission: "Depot Return" },
    { id: "AV-004", status: "red", speed: "0 km/h", battery: "33%", mission: "Route 3C Hospital" },
    { id: "AV-005", status: "green", speed: "28 km/h", battery: "85%", mission: "Campus Loop" },
    { id: "AV-006", status: "green", speed: "51 km/h", battery: "67%", mission: "Suburbs Ring" },
  ];

  const waypoints = [
    { label: "Mission Start", done: true },
    { label: "Waypoint 1", done: true },
    { label: "Waypoint 2", done: true },
    { label: "Waypoint 3", done: false, current: true },
    { label: "Waypoint 4", done: false },
    { label: "Destination", done: false },
  ];

  return (
    <div className="flex min-h-screen flex-col font-mono" style={{ backgroundColor: '#000000', color: '#e5e5e5' }}>
      {/* HUD border frame */}
      <div className="fixed inset-4 pointer-events-none z-20" style={{ border: '1px solid rgba(220, 38, 38, 0.15)' }}>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: '2px solid rgba(220, 38, 38, 0.4)', borderLeft: '2px solid rgba(220, 38, 38, 0.4)' }} />
        <div className="absolute top-0 right-0 w-8 h-8" style={{ borderTop: '2px solid rgba(220, 38, 38, 0.4)', borderRight: '2px solid rgba(220, 38, 38, 0.4)' }} />
        <div className="absolute bottom-0 left-0 w-8 h-8" style={{ borderBottom: '2px solid rgba(220, 38, 38, 0.4)', borderLeft: '2px solid rgba(220, 38, 38, 0.4)' }} />
        <div className="absolute bottom-0 right-0 w-8 h-8" style={{ borderBottom: '2px solid rgba(220, 38, 38, 0.4)', borderRight: '2px solid rgba(220, 38, 38, 0.4)' }} />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <header style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-8">
            <span className="text-sm font-bold tracking-widest" style={{ color: '#dc2626' }}>
              {appConfig.name}
            </span>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center rounded px-5 py-2 text-sm font-semibold transition-colors"
                style={{ border: '1px solid #dc2626', color: '#dc2626' }}
              >
                Access console
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center pt-24 pb-16 px-8 text-center">
          <h1
            className="text-5xl sm:text-7xl font-bold tracking-wider"
            style={{ color: '#dc2626', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
          >
            ROBOCARS
          </h1>
          <p className="mt-4 text-base" style={{ color: '#525252' }}>
            Human-in-the-loop fleet control.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: '#dc2626',
                boxShadow: '0 0 8px #dc2626',
                animation: 'hud-pulse 2s ease-in-out infinite',
              }}
            />
            <span className="text-sm" style={{ color: '#dc2626' }}>5 vehicles active</span>
          </div>
        </section>

        {/* Fleet HUD */}
        <section className="mx-auto max-w-4xl w-full px-8 pb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#525252' }}>Fleet Telemetry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vehicles.map((v) => {
              const borderColor = v.status === "red" ? "#dc2626" : v.status === "yellow" ? "#eab308" : "#22c55e";
              const isRed = v.status === "red";
              return (
                <div
                  key={v.id}
                  className="rounded p-4 relative"
                  style={{
                    border: `1px solid ${borderColor}40`,
                    backgroundColor: `${borderColor}08`,
                  }}
                >
                  {/* Status bar at top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: borderColor, opacity: 0.6 }} />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold" style={{ color: borderColor }}>{v.id}</span>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: borderColor, boxShadow: `0 0 4px ${borderColor}` }} />
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <span className="text-gray-600">SPD</span>
                      <p className="text-sm text-gray-300">{v.speed}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">BAT</span>
                      <p className="text-sm text-gray-300">{v.battery}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 truncate">{v.mission}</p>

                  {isRed && (
                    <div
                      className="mt-3 text-xs font-bold text-center py-1 rounded"
                      style={{
                        color: '#dc2626',
                        backgroundColor: '#dc262615',
                        border: '1px solid #dc262630',
                        animation: 'flash-warning 1s ease-in-out infinite',
                      }}
                    >
                      &#9888; INTERVENTION REQUIRED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Intervention Panel */}
        <section className="mx-auto max-w-4xl w-full px-8 pb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#525252' }}>Intervention Controls</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { label: "PAUSE", color: "#eab308", icon: "&#9646;&#9646;" },
              { label: "REROUTE", color: "#3b82f6", icon: "&#8634;" },
              { label: "RETURN TO BASE", color: "#dc2626", icon: "&#9675;" },
            ].map((btn) => (
              <button
                key={btn.label}
                className="flex-1 rounded px-6 py-5 text-center transition-all cursor-pointer"
                style={{
                  border: `2px solid ${btn.color}50`,
                  backgroundColor: `${btn.color}10`,
                  color: btn.color,
                  boxShadow: `inset 0 2px 0 ${btn.color}15, inset 0 -2px 0 ${btn.color}08`,
                }}
              >
                <span className="text-2xl block mb-1" dangerouslySetInnerHTML={{ __html: btn.icon }} />
                <span className="text-sm font-bold tracking-wider">{btn.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Mission Telemetry — Timeline */}
        <section className="mx-auto max-w-4xl w-full px-8 pb-20">
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#525252' }}>Mission Timeline — AV-004</p>
          <div className="flex items-center w-full">
            {waypoints.map((wp, i) => (
              <div key={i} className="flex items-center" style={{ flex: i < waypoints.length - 1 ? 1 : 'none' }}>
                {/* Node */}
                <div className="flex flex-col items-center relative">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: wp.current ? '16px' : '10px',
                      height: wp.current ? '16px' : '10px',
                      backgroundColor: wp.done ? '#22c55e' : wp.current ? '#dc2626' : '#333',
                      boxShadow: wp.current ? '0 0 12px #dc2626' : 'none',
                      animation: wp.current ? 'hud-pulse 2s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span
                    className="absolute text-xs whitespace-nowrap"
                    style={{
                      top: '24px',
                      color: wp.current ? '#dc2626' : wp.done ? '#525252' : '#333',
                      fontSize: '10px',
                    }}
                  >
                    {wp.label}
                    {wp.done && !wp.current && " ✓"}
                  </span>
                </div>
                {/* Connector line */}
                {i < waypoints.length - 1 && (
                  <div
                    className="flex-1 h-px mx-1"
                    style={{
                      backgroundColor: wp.done ? '#22c55e50' : '#222',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center pb-24 px-8 pt-8">
          <Link
            href="/signup"
            className="inline-flex items-center rounded px-10 py-4 text-lg font-bold tracking-wider transition-colors"
            style={{ border: '2px solid #dc2626', color: '#dc2626', backgroundColor: 'transparent' }}
          >
            Access fleet console &rarr;
          </Link>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #1a1a1a' }}>
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-8 text-xs text-gray-700">
            <span>&copy; {new Date().getFullYear()} {appConfig.name}</span>
            <span>A 12 Cities venture</span>
          </div>
        </footer>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes hud-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes flash-warning {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
