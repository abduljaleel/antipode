import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import {
  ArrowRight,
  Car,
  Monitor,
  Navigation,
  BarChart3,
  ClipboardList,
  Route,
  Pause,
  RotateCcw,
  Home,
  AlertTriangle,
  Activity,
  Shield,
  Radio,
} from "lucide-react";

export default function LandingPage() {
  const vehicles = [
    { id: "AV-001", mission: "Route 7A Downtown", status: "green", mode: "Autonomous" },
    { id: "AV-002", mission: "Depot Return", status: "yellow", mode: "Supervised" },
    { id: "AV-003", mission: "Route 12B Airport", status: "green", mode: "Autonomous" },
    { id: "AV-004", mission: "Standby", status: "gray", mode: "Idle" },
    { id: "AV-005", mission: "Route 3C Hospital", status: "red", mode: "Intervention" },
    { id: "AV-006", mission: "Route 9D Campus", status: "green", mode: "Autonomous" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0c0a09] text-[#fafaf9]">
      {/* Nav */}
      <header className="border-b border-[#292524]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#dc2626] text-[#fafaf9] text-sm font-black">
              <Car className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight font-mono">{appConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[#a8a29e] hover:text-[#fafaf9]">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#dc2626] text-[#fafaf9] hover:bg-[#ef4444] font-semibold">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#dc2626]/5 to-transparent" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/10 px-4 py-1.5 text-sm text-[#dc2626] mb-8 font-mono">
            <Radio className="h-3.5 w-3.5" />
            Fleet control platform
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-7xl leading-[0.95] font-mono">
            Algorithms to
            <span className="text-[#dc2626]"> live by</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a8a29e] leading-relaxed">
            The human-in-the-loop control plane for autonomous fleets.
            Supervise, intervene, and optimize every vehicle from a single command center.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-[#dc2626] text-[#fafaf9] hover:bg-[#ef4444] font-semibold px-8">
                Enter command center
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-[#292524] text-[#fafaf9] hover:bg-[#1c1917]">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Status Grid Preview */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-lg border border-[#292524] bg-[#1c1917] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-[#a8a29e] font-mono">
                <Radio className="h-4 w-4 text-[#dc2626] animate-pulse" />
                Fleet status — live
              </div>
              <div className="text-sm text-[#a8a29e] font-mono">6 vehicles connected</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className={`rounded border p-4 ${
                    v.status === "red"
                      ? "border-[#dc2626]/50 bg-[#dc2626]/5"
                      : v.status === "yellow"
                      ? "border-yellow-500/50 bg-yellow-500/5"
                      : v.status === "green"
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-[#292524] bg-[#0c0a09]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm">{v.id}</span>
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        v.status === "green"
                          ? "bg-emerald-400"
                          : v.status === "yellow"
                          ? "bg-yellow-400"
                          : v.status === "red"
                          ? "bg-[#dc2626] animate-pulse"
                          : "bg-[#44403c]"
                      }`}
                    />
                  </div>
                  <div className="text-xs text-[#a8a29e]">{v.mission}</div>
                  <div className={`text-xs mt-1 font-mono ${
                    v.status === "red" ? "text-[#dc2626]" : "text-[#a8a29e]"
                  }`}>
                    {v.mode}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 text-xs text-[#a8a29e] mt-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Autonomous
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                Supervised
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#dc2626]" />
                Intervention
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#44403c]" />
                Idle
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#292524] bg-[#0f0d0c]">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-black tracking-tight font-mono">
            Everything you need to run an autonomous fleet
          </h2>
          <p className="text-center text-[#a8a29e] mt-4 max-w-2xl mx-auto">
            Purpose-built for fleet operators who need real-time supervision, not just telemetry dashboards.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Monitor,
                title: "Supervision Console",
                desc: "Real-time command and control for your entire fleet. Monitor telemetry, camera feeds, and decision states from a single pane.",
              },
              {
                icon: Navigation,
                title: "Mission Management",
                desc: "Plan, dispatch, and track missions across routes. Full audit trail of every journey, intervention, and outcome.",
              },
              {
                icon: BarChart3,
                title: "Behavior Analytics",
                desc: "Understand how vehicles perform in the real world. Intervention rates, near-miss analysis, and fleet scoring.",
              },
              {
                icon: ClipboardList,
                title: "Intervention Logging",
                desc: "Every human override recorded, categorized, and analyzed. Build the safety case with structured evidence.",
              },
              {
                icon: Route,
                title: "Route Intelligence",
                desc: "Performance data by route segment. Identify challenging zones, optimize operational design domains.",
              },
              {
                icon: Shield,
                title: "Safety Scoring",
                desc: "Composite safety scores for vehicles, routes, and operators. Continuous monitoring against regulatory thresholds.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-[#292524] bg-[#1c1917] p-6 hover:border-[#dc2626]/40 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#dc2626]/10">
                  <feature.icon className="h-5 w-5 text-[#dc2626]" />
                </div>
                <h3 className="mt-4 text-lg font-bold font-mono">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#a8a29e] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control, Don't Just Monitor */}
      <section className="border-t border-[#292524]">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-black tracking-tight font-mono">
            Control, don&apos;t just monitor
          </h2>
          <p className="text-center text-[#a8a29e] mt-4 max-w-xl mx-auto">
            When autonomy needs a human, act instantly from anywhere.
          </p>
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="rounded-lg border border-[#292524] bg-[#1c1917] p-6 flex flex-col items-center gap-3 min-w-[180px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                <Pause className="h-6 w-6 text-yellow-400" />
              </div>
              <span className="font-mono font-bold text-sm">Pause</span>
              <span className="text-xs text-[#a8a29e] text-center">Safely stop a vehicle in place</span>
            </div>
            <div className="rounded-lg border border-[#292524] bg-[#1c1917] p-6 flex flex-col items-center gap-3 min-w-[180px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#06b6d4]/30 bg-[#06b6d4]/10">
                <RotateCcw className="h-6 w-6 text-[#06b6d4]" />
              </div>
              <span className="font-mono font-bold text-sm">Reroute</span>
              <span className="text-xs text-[#a8a29e] text-center">Assign alternate route live</span>
            </div>
            <div className="rounded-lg border border-[#dc2626]/30 bg-[#dc2626]/5 p-6 flex flex-col items-center gap-3 min-w-[180px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#dc2626]/30 bg-[#dc2626]/10">
                <Home className="h-6 w-6 text-[#dc2626]" />
              </div>
              <span className="font-mono font-bold text-sm">Return to Base</span>
              <span className="text-xs text-[#a8a29e] text-center">Recall vehicle to depot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-[#292524] bg-[#dc2626]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-[#fafaf9] font-mono">8</div>
              <div className="text-sm text-[#fafaf9]/70 mt-1 font-medium">vehicles</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#fafaf9] font-mono">5</div>
              <div className="text-sm text-[#fafaf9]/70 mt-1 font-medium">active missions</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#fafaf9] font-mono">87</div>
              <div className="text-sm text-[#fafaf9]/70 mt-1 font-medium">fleet score</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#fafaf9] font-mono">2</div>
              <div className="text-sm text-[#fafaf9]/70 mt-1 font-medium">interventions today</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#292524]">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-black tracking-tight font-mono">Ready to take the wheel?</h2>
          <p className="mt-4 text-lg text-[#a8a29e]">
            Join operators already using {appConfig.name} to run safer, smarter autonomous fleets.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg" className="bg-[#dc2626] text-[#fafaf9] hover:bg-[#ef4444] font-semibold px-8">
              Request access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#292524]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-[#a8a29e]">
          <span>&copy; {new Date().getFullYear()} {appConfig.name}. All rights reserved.</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}
