"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getVehicleById,
  getMissionsForVehicle,
  getEventsForVehicle,
  getVehicleTelemetry,
  getStatusBadgeVariant,
  getSeverityBadgeVariant,
  formatDate,
} from "@/lib/data/fleet";

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = params.id as string;
  const vehicle = getVehicleById(vehicleId);
  const missions = getMissionsForVehicle(vehicleId);
  const events = getEventsForVehicle(vehicleId);
  const telemetry = getVehicleTelemetry(vehicleId);

  if (!vehicle) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Vehicle Not Found</h1>
        <p className="text-muted-foreground">
          No vehicle with ID &quot;{vehicleId}&quot; exists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{vehicle.name}</h1>
          <p className="text-muted-foreground">{vehicle.location}</p>
        </div>
        <Badge
          variant={getStatusBadgeVariant(vehicle.status)}
          className="capitalize text-sm px-3 py-1"
        >
          {vehicle.status}
        </Badge>
      </div>

      {/* Overview cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{vehicle.type}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Autonomy Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{vehicle.autonomyLevel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Battery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{vehicle.batteryPct}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fleet Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{vehicle.fleetScore}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status">
        <TabsList>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="missions">Missions ({missions.length})</TabsTrigger>
          <TabsTrigger value="events">Behavior Events ({events.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Telemetry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="text-xl font-bold">{telemetry.speed} km/h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heading</p>
                  <p className="text-xl font-bold">{telemetry.heading}&deg;</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPU Load</p>
                  <p className="text-xl font-bold">{telemetry.cpuLoad}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sensor Status</p>
                  <Badge
                    variant={
                      telemetry.sensorStatus === "nominal"
                        ? "default"
                        : telemetry.sensorStatus === "degraded"
                        ? "outline"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {telemetry.sensorStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Battery</p>
                  <p className="text-xl font-bold">{telemetry.batteryPct}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Ping</p>
                  <p className="text-sm font-medium">{formatDate(telemetry.lastPing)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Interventions</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missions.map((mission) => (
                    <TableRow key={mission.id}>
                      <TableCell className="font-medium">
                        {mission.routeName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize text-xs">
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
                    </TableRow>
                  ))}
                  {missions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No missions recorded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium capitalize">
                        {event.type.replace("_", " ")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getSeverityBadgeVariant(event.severity)}
                          className="capitalize text-xs"
                        >
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm">
                        {event.description}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {event.location}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(event.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {events.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No behavior events recorded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
