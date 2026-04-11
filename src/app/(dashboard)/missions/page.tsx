import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { missions, formatDate } from "@/lib/data/fleet";

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
  const sorted = [...missions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
        <p className="text-muted-foreground">
          All fleet missions and their outcomes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Missions ({missions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead className="text-right">Interventions</TableHead>
                <TableHead className="text-right">Score</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
