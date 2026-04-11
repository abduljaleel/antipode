import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  vehicles,
  getActiveVehicles,
  getRunningMissions,
  behaviorEvents,
  getStatusBadgeVariant,
} from "@/lib/data/fleet";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const activeVehicles = getActiveVehicles();
  const runningMissions = getRunningMissions();
  const interventionsToday = behaviorEvents.filter(
    (e) => e.severity === "warning" || e.severity === "critical"
  ).length;
  const fleetScore = Math.round(
    vehicles.reduce((sum, v) => sum + v.fleetScore, 0) / vehicles.length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Fleet overview &mdash;{" "}
          {user?.user_metadata?.full_name || user?.email}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Vehicles"
          value={String(activeVehicles.length)}
          description={`of ${vehicles.length} total in fleet`}
        />
        <MetricCard
          title="Running Missions"
          value={String(runningMissions.length)}
          description="Currently in progress"
        />
        <MetricCard
          title="Interventions Today"
          value={String(interventionsToday)}
          description="Warnings and critical events"
        />
        <MetricCard
          title="Fleet Score"
          value={String(fleetScore)}
          description="Average across all vehicles"
        />
      </div>

      {/* Vehicle status grid */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Vehicle Status</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/fleet/${vehicle.id}`}>
              <Card className="hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {vehicle.name}
                  </CardTitle>
                  <Badge variant={getStatusBadgeVariant(vehicle.status)} className="text-xs capitalize">
                    {vehicle.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Type</p>
                      <p className="font-medium capitalize">{vehicle.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Level</p>
                      <p className="font-medium">{vehicle.autonomyLevel}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Battery</p>
                      <p className="font-medium">{vehicle.batteryPct}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Score</p>
                      <p className="font-medium">{vehicle.fleetScore}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
