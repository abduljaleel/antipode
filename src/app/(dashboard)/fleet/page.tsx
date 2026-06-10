"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getStatusBadgeVariant,
  type Vehicle,
  type VehicleType,
  type AutonomyLevel,
} from "@/lib/data/fleet";
import { listVehicles, createVehicle } from "@/lib/data/api";

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // Create dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<string>("shuttle");
  const [newLevel, setNewLevel] = useState<string>("L4");
  const [newLocation, setNewLocation] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setVehicles(await listVehicles());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleCreate() {
    if (!newName.trim()) {
      setCreateError("Name is required");
      return;
    }
    setCreating(true);
    setCreateError(null);
    try {
      const created = await createVehicle({
        name: newName.trim(),
        type: newType as VehicleType,
        autonomyLevel: newLevel as AutonomyLevel,
        location: newLocation.trim() || "Depot",
      });
      setVehicles((prev) => [...prev, created]);
      setDialogOpen(false);
      setNewName("");
      setNewType("shuttle");
      setNewLevel("L4");
      setNewLocation("");
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Failed to create vehicle"
      );
    } finally {
      setCreating(false);
    }
  }

  const filtered = vehicles.filter((v) => {
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (typeFilter !== "all" && v.type !== typeFilter) return false;
    if (levelFilter !== "all" && v.autonomyLevel !== levelFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet</h1>
          <p className="text-muted-foreground">
            Manage and monitor all vehicles
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button>Add Vehicle</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vehicle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-name">Name</Label>
                <Input
                  id="vehicle-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Shuttle Gamma"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newType} onValueChange={(v) => setNewType(v ?? "shuttle")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shuttle">Shuttle</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="taxi">Taxi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Autonomy Level</Label>
                <Select value={newLevel} onValueChange={(v) => setNewLevel(v ?? "L4")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L2">L2</SelectItem>
                    <SelectItem value="L3">L3</SelectItem>
                    <SelectItem value="L4">L4</SelectItem>
                    <SelectItem value="L5">L5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-location">Location</Label>
                <Input
                  id="vehicle-location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Depot — Bay 1"
                />
              </div>
              {createError && (
                <p className="text-sm text-red-600" role="alert">
                  {createError}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Adding…" : "Add Vehicle"}
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

      {/* Filters */}
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="shuttle">Shuttle</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="inspection">Inspection</SelectItem>
            <SelectItem value="taxi">Taxi</SelectItem>
          </SelectContent>
        </Select>
        <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v ?? "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="L2">L2</SelectItem>
            <SelectItem value="L3">L3</SelectItem>
            <SelectItem value="L4">L4</SelectItem>
            <SelectItem value="L5">L5</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicles ({filtered.length})</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Battery</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <Link
                        href={`/fleet/${vehicle.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {vehicle.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize text-xs">
                        {vehicle.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(vehicle.status)}
                        className="capitalize text-xs"
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      {vehicle.autonomyLevel}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-48 truncate">
                      {vehicle.location}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {vehicle.batteryPct}%
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {vehicle.fleetScore}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                    >
                      No vehicles yet. Add one above or load demo data from the
                      dashboard.
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
