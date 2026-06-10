"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getStatusBadgeVariant,
  getSeverityBadgeVariant,
  formatTime,
  type Vehicle,
  type BehaviorEvent,
} from "@/lib/data/fleet";
import {
  listVehicles,
  listBehaviorEvents,
  listInterventions,
  createIntervention,
  deriveTelemetry,
  type InterventionItem,
} from "@/lib/data/api";

function getUrgencyColor(vehicle: Vehicle): string {
  if (vehicle.status === "offline") return "border-red-500 bg-red-500/5";
  if (vehicle.status === "maintenance") return "border-amber-500 bg-amber-500/5";
  if (vehicle.batteryPct < 20) return "border-orange-500 bg-orange-500/5";
  if (vehicle.status === "active") return "border-emerald-500 bg-emerald-500/5";
  return "border-muted";
}

interface FeedItem {
  id: string;
  kind: "event" | "intervention";
  vehicleName: string;
  label: string;
  detail: string;
  severity: BehaviorEvent["severity"] | null;
  timestamp: string;
}

export default function ConsolePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intervening, setIntervening] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    const [events, interventions] = await Promise.all([
      listBehaviorEvents(15),
      listInterventions(15),
    ]);
    const items: FeedItem[] = [
      ...events.map(
        (e): FeedItem => ({
          id: `event-${e.id}`,
          kind: "event",
          vehicleName: e.vehicleName,
          label: e.type.replace(/_/g, " "),
          detail: e.description,
          severity: e.severity,
          timestamp: e.timestamp,
        })
      ),
      ...interventions.map(
        (i): FeedItem => ({
          id: `intervention-${i.id}`,
          kind: "intervention",
          vehicleName: i.vehicleName,
          label: i.type.replace(/_/g, " "),
          detail: i.reason,
          severity: null,
          timestamp: i.startedAt,
        })
      ),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 15);
    setFeed(items);
  }, []);

  const load = useCallback(async () => {
    try {
      setError(null);
      const v = await listVehicles();
      setVehicles(v);
      setSelectedId((prev) => prev ?? v[0]?.id ?? null);
      await loadFeed();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load console");
    } finally {
      setLoading(false);
    }
  }, [loadFeed]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      setError(null);
      await loadFeed();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh feed");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleIntervention(
    vehicle: Vehicle,
    type: string,
    reason: string
  ) {
    setIntervening(type);
    setError(null);
    try {
      await createIntervention({ vehicleId: vehicle.id, type, reason });
      await loadFeed();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to log intervention"
      );
    } finally {
      setIntervening(null);
    }
  }

  const selected =
    vehicles.find((v) => v.id === selectedId) ?? vehicles[0] ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Console</h1>
        <p className="text-muted-foreground">
          Real-time fleet command and control
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] min-h-[600px]">
          <div className="grid gap-3 sm:grid-cols-2 content-start">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      ) : vehicles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No vehicles in your fleet yet. Add one on the Fleet page or load
            demo data from the dashboard.
          </CardContent>
        </Card>
      ) : (
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

            {/* Live activity feed */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Live Activity
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  {refreshing ? "Refreshing…" : "Refresh"}
                </Button>
              </div>
              <Card>
                <CardContent className="pt-4 space-y-3">
                  {feed.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 border-b last:border-b-0 pb-3 last:pb-0"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm capitalize">
                            {item.label}
                          </span>
                          {item.kind === "intervention" ? (
                            <Badge variant="outline" className="text-xs">
                              intervention
                            </Badge>
                          ) : (
                            item.severity && (
                              <Badge
                                variant={getSeverityBadgeVariant(item.severity)}
                                className="capitalize text-xs"
                              >
                                {item.severity}
                              </Badge>
                            )
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.vehicleName}
                          {item.detail ? ` — ${item.detail}` : ""}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                  ))}
                  {feed.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No recent activity
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right: Selected vehicle panel */}
          {selected && (
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
                  {(() => {
                    const telemetry = deriveTelemetry(selected);
                    return (
                      <div className="grid grid-cols-2 gap-3">
                        <TelemetryItem label="Speed" value={`${telemetry.speed} km/h`} />
                        <TelemetryItem label="Heading" value={`${telemetry.heading}°`} />
                        <TelemetryItem label="Battery" value={`${telemetry.batteryPct}%`} />
                        <TelemetryItem label="CPU Load" value={`${telemetry.cpuLoad}%`} />
                        <TelemetryItem label="Sensors" value={telemetry.sensorStatus} />
                        <TelemetryItem
                          label="Last Ping"
                          value={telemetry.lastPing ? formatTime(telemetry.lastPing) : "—"}
                        />
                      </div>
                    );
                  })()}

                  {/* Intervention buttons */}
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm font-semibold">Intervention Controls</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selected.status !== "active" || intervening !== null}
                        onClick={() =>
                          handleIntervention(
                            selected,
                            "remote_pause",
                            `Operator paused ${selected.name} from the console.`
                          )
                        }
                      >
                        {intervening === "remote_pause" ? "…" : "Pause"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selected.status !== "active" || intervening !== null}
                        onClick={() =>
                          handleIntervention(
                            selected,
                            "reroute",
                            `Operator requested reroute for ${selected.name} from the console.`
                          )
                        }
                      >
                        {intervening === "reroute" ? "…" : "Reroute"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={selected.status === "offline" || intervening !== null}
                        onClick={() =>
                          handleIntervention(
                            selected,
                            "return_to_base",
                            `Operator recalled ${selected.name} to base from the console.`
                          )
                        }
                      >
                        {intervening === "return_to_base" ? "…" : "Return to Base"}
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
          )}
        </div>
      )}
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
