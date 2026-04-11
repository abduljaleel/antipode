"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  vehicles,
  getVehicleTelemetry,
  getStatusBadgeVariant,
  formatTime,
  type Vehicle,
} from "@/lib/data/fleet";

function getUrgencyColor(vehicle: Vehicle): string {
  if (vehicle.status === "offline") return "border-red-500 bg-red-500/5";
  if (vehicle.status === "maintenance") return "border-amber-500 bg-amber-500/5";
  if (vehicle.batteryPct < 20) return "border-orange-500 bg-orange-500/5";
  if (vehicle.status === "active") return "border-emerald-500 bg-emerald-500/5";
  return "border-muted";
}

export default function ConsolePage() {
  const [selectedId, setSelectedId] = useState<string>(vehicles[0].id);
  const selected = vehicles.find((v) => v.id === selectedId) ?? vehicles[0];
  const telemetry = getVehicleTelemetry(selected.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Console</h1>
        <p className="text-muted-foreground">
          Real-time fleet command and control
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px] min-h-[600px]">
        {/* Left: Vehicle grid cards */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Vehicle Grid
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedId(vehicle.id)}
                className={`text-left rounded-lg border-2 p-4 transition-all ${getUrgencyColor(vehicle)} ${
                  selectedId === vehicle.id
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{vehicle.name}</span>
                  <Badge
                    variant={getStatusBadgeVariant(vehicle.status)}
                    className="capitalize text-xs"
                  >
                    {vehicle.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Type</span>
                    <p className="font-medium capitalize">{vehicle.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery</span>
                    <p className="font-medium">{vehicle.batteryPct}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level</span>
                    <p className="font-medium">{vehicle.autonomyLevel}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected vehicle panel */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Selected Vehicle
          </h2>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{selected.name}</CardTitle>
              <Badge
                variant={getStatusBadgeVariant(selected.status)}
                className="capitalize"
              >
                {selected.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{selected.location}</p>

              {/* Telemetry */}
              <div className="grid grid-cols-2 gap-3">
                <TelemetryItem label="Speed" value={`${telemetry.speed} km/h`} />
                <TelemetryItem label="Heading" value={`${telemetry.heading}\u00B0`} />
                <TelemetryItem label="Battery" value={`${telemetry.batteryPct}%`} />
                <TelemetryItem label="CPU Load" value={`${telemetry.cpuLoad}%`} />
                <TelemetryItem label="Sensors" value={telemetry.sensorStatus} />
                <TelemetryItem
                  label="Last Ping"
                  value={telemetry.lastPing ? formatTime(telemetry.lastPing) : "—"}
                />
              </div>

              {/* Intervention buttons */}
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-semibold">Intervention Controls</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selected.status !== "active"}
                  >
                    Pause
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selected.status !== "active"}
                  >
                    Reroute
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={selected.status === "offline"}
                  >
                    Return to Base
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fleet score gauge */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Vehicle Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20">
                  <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(selected.fleetScore / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                      className={
                        selected.fleetScore >= 85
                          ? "text-emerald-500"
                          : selected.fleetScore >= 70
                          ? "text-amber-500"
                          : "text-red-500"
                      }
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                    {selected.fleetScore}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">
                    {selected.fleetScore >= 85
                      ? "Excellent"
                      : selected.fleetScore >= 70
                      ? "Good"
                      : "Needs Attention"}
                  </p>
                  <p className="text-muted-foreground">
                    {selected.totalMissions} total missions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TelemetryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/50 p-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold capitalize">{value}</p>
    </div>
  );
}
