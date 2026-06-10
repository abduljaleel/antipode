"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDate,
  type Mission,
  type MissionStatus,
  type Vehicle,
  type Route,
} from "@/lib/data/fleet";
import {
  listMissions,
  listVehicles,
  listRoutes,
  createMission,
  updateMissionStatus,
} from "@/lib/data/api";

function getMissionStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "in_progress":
      return "default";
    case "completed":
      return "secondary";
    case "scheduled":
      return "outline";
    case "aborted":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newVehicleId, setNewVehicleId] = useState<string>("");
  const [newRouteId, setNewRouteId] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Per-row transition state
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [m, v, r] = await Promise.all([
          listMissions(),
          listVehicles(),
          listRoutes(),
        ]);
        setMissions(m);
        setVehicles(v);
        setRoutes(r);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load missions");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleCreate() {
    if (!newVehicleId || !newRouteId) {
      setCreateError("Select a vehicle and a route");
      return;
    }
    setCreating(true);
    setCreateError(null);
    try {
      const created = await createMission({
        vehicleId: newVehicleId,
        routeId: newRouteId,
      });
      setMissions((prev) => [created, ...prev]);
      setDialogOpen(false);
      setNewVehicleId("");
      setNewRouteId("");
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Failed to create mission"
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleTransition(missionId: string, status: MissionStatus) {
    setUpdatingId(missionId);
    setError(null);
    try {
      const updated = await updateMissionStatus(missionId, status);
      setMissions((prev) =>
        prev.map((m) => (m.id === missionId ? updated : m))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update mission status"
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const sorted = [...missions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
          <p className="text-muted-foreground">
            All fleet missions and their outcomes
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button>New Mission</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Mission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select
                  value={newVehicleId}
                  onValueChange={(v) => setNewVehicleId(v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Route</Label>
                <Select
                  value={newRouteId}
                  onValueChange={(v) => setNewRouteId(v ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} ({r.distanceKm} km)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {routes.length === 0 && !loading && (
                <p className="text-sm text-muted-foreground">
                  No routes available. Load demo data from the dashboard to add
                  routes.
                </p>
              )}
              {createError && (
                <p className="text-sm text-red-600" role="alert">
                  {createError}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Queuing…" : "Queue Mission"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Missions ({missions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead className="text-right">Interventions</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((mission) => (
                  <TableRow key={mission.id}>
                    <TableCell>
                      <Link
                        href={`/fleet/${mission.vehicleId}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {mission.vehicleName}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      {mission.routeName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getMissionStatusVariant(mission.status)}
                        className="capitalize text-xs"
                      >
                        {mission.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(mission.startedAt)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {mission.interventions}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {mission.score || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {mission.status === "scheduled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={updatingId === mission.id}
                            onClick={() =>
                              handleTransition(mission.id, "in_progress")
                            }
                          >
                            Start
                          </Button>
                        )}
                        {mission.status === "in_progress" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={updatingId === mission.id}
                              onClick={() =>
                                handleTransition(mission.id, "completed")
                              }
                            >
                              Complete
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={updatingId === mission.id}
                              onClick={() =>
                                handleTransition(mission.id, "aborted")
                              }
                            >
                              Abort
                            </Button>
                          </>
                        )}
                        {(mission.status === "completed" ||
                          mission.status === "aborted") && (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                    >
                      No missions yet. Queue one above or load demo data from
                      the dashboard.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
