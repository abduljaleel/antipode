// ── Types ──────────────────────────────────────────────────────────────────

export type VehicleType = "shuttle" | "delivery" | "inspection" | "taxi";
export type VehicleStatus = "active" | "idle" | "maintenance" | "offline";
export type AutonomyLevel = "L2" | "L3" | "L4" | "L5";
export type MissionStatus = "in_progress" | "completed" | "scheduled" | "aborted";
export type EventSeverity = "info" | "warning" | "critical";

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  status: VehicleStatus;
  autonomyLevel: AutonomyLevel;
  location: string;
  batteryPct: number;
  totalMissions: number;
  fleetScore: number;
  lastActive: string;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedMinutes: number;
}

export interface Mission {
  id: string;
  vehicleId: string;
  vehicleName: string;
  routeId: string;
  routeName: string;
  status: MissionStatus;
  startedAt: string;
  completedAt: string | null;
  interventions: number;
  score: number;
}

export interface BehaviorEvent {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: string;
  severity: EventSeverity;
  timestamp: string;
  description: string;
  location: string;
}

export interface Telemetry {
  speed: number;
  heading: number;
  batteryPct: number;
  cpuLoad: number;
  sensorStatus: "nominal" | "degraded" | "fault";
  lastPing: string;
}

// ── Vehicles ──────────────────────────────────────────────────────────────

export const vehicles: Vehicle[] = [
  {
    id: "v-001",
    name: "Shuttle Alpha",
    type: "shuttle",
    status: "active",
    autonomyLevel: "L4",
    location: "Downtown Loop — Sector A",
    batteryPct: 78,
    totalMissions: 342,
    fleetScore: 92,
    lastActive: "2026-04-11T09:42:00Z",
  },
  {
    id: "v-002",
    name: "Delivery Bot 7",
    type: "delivery",
    status: "active",
    autonomyLevel: "L3",
    location: "Warehouse District — Bay 4",
    batteryPct: 64,
    totalMissions: 1287,
    fleetScore: 88,
    lastActive: "2026-04-11T09:38:00Z",
  },
  {
    id: "v-003",
    name: "Inspector Drone 3",
    type: "inspection",
    status: "active",
    autonomyLevel: "L5",
    location: "Highway 12 — KM 45",
    batteryPct: 91,
    totalMissions: 156,
    fleetScore: 95,
    lastActive: "2026-04-11T09:45:00Z",
  },
  {
    id: "v-004",
    name: "Taxi Bravo",
    type: "taxi",
    status: "active",
    autonomyLevel: "L4",
    location: "Airport Terminal 2",
    batteryPct: 52,
    totalMissions: 894,
    fleetScore: 85,
    lastActive: "2026-04-11T09:40:00Z",
  },
  {
    id: "v-005",
    name: "Shuttle Beta",
    type: "shuttle",
    status: "active",
    autonomyLevel: "L4",
    location: "University Campus — North Gate",
    batteryPct: 83,
    totalMissions: 278,
    fleetScore: 90,
    lastActive: "2026-04-11T09:35:00Z",
  },
  {
    id: "v-006",
    name: "Delivery Bot 12",
    type: "delivery",
    status: "idle",
    autonomyLevel: "L3",
    location: "Warehouse District — Bay 1",
    batteryPct: 96,
    totalMissions: 965,
    fleetScore: 82,
    lastActive: "2026-04-11T08:15:00Z",
  },
  {
    id: "v-007",
    name: "Taxi Charlie",
    type: "taxi",
    status: "maintenance",
    autonomyLevel: "L4",
    location: "Service Center — Bay 3",
    batteryPct: 100,
    totalMissions: 1102,
    fleetScore: 79,
    lastActive: "2026-04-10T18:00:00Z",
  },
  {
    id: "v-008",
    name: "Inspector Drone 1",
    type: "inspection",
    status: "offline",
    autonomyLevel: "L2",
    location: "Unknown — Last: Highway 7",
    batteryPct: 3,
    totalMissions: 412,
    fleetScore: 71,
    lastActive: "2026-04-09T14:22:00Z",
  },
];

// ── Routes ──────────────────────────────────────────────────────────────

export const routes: Route[] = [
  {
    id: "r-001",
    name: "Downtown Loop",
    origin: "Central Station",
    destination: "Waterfront Terminal",
    distanceKm: 8.4,
    estimatedMinutes: 22,
  },
  {
    id: "r-002",
    name: "Airport Express",
    origin: "City Center Hub",
    destination: "Airport Terminal 2",
    distanceKm: 24.1,
    estimatedMinutes: 35,
  },
  {
    id: "r-003",
    name: "Warehouse Circuit",
    origin: "Distribution Center A",
    destination: "Distribution Center B",
    distanceKm: 12.6,
    estimatedMinutes: 28,
  },
  {
    id: "r-004",
    name: "Campus Shuttle",
    origin: "University North Gate",
    destination: "Research Park South",
    distanceKm: 5.2,
    estimatedMinutes: 14,
  },
  {
    id: "r-005",
    name: "Highway Inspection",
    origin: "Highway 12 Start",
    destination: "Highway 12 End",
    distanceKm: 68.0,
    estimatedMinutes: 55,
  },
];

// ── Missions ──────────────────────────────────────────────────────────────

export const missions: Mission[] = [
  {
    id: "m-001",
    vehicleId: "v-001",
    vehicleName: "Shuttle Alpha",
    routeId: "r-001",
    routeName: "Downtown Loop",
    status: "in_progress",
    startedAt: "2026-04-11T08:30:00Z",
    completedAt: null,
    interventions: 0,
    score: 98,
  },
  {
    id: "m-002",
    vehicleId: "v-002",
    vehicleName: "Delivery Bot 7",
    routeId: "r-003",
    routeName: "Warehouse Circuit",
    status: "in_progress",
    startedAt: "2026-04-11T09:00:00Z",
    completedAt: null,
    interventions: 1,
    score: 91,
  },
  {
    id: "m-003",
    vehicleId: "v-003",
    vehicleName: "Inspector Drone 3",
    routeId: "r-005",
    routeName: "Highway Inspection",
    status: "in_progress",
    startedAt: "2026-04-11T07:15:00Z",
    completedAt: null,
    interventions: 0,
    score: 99,
  },
  {
    id: "m-004",
    vehicleId: "v-004",
    vehicleName: "Taxi Bravo",
    routeId: "r-002",
    routeName: "Airport Express",
    status: "completed",
    startedAt: "2026-04-11T06:45:00Z",
    completedAt: "2026-04-11T07:22:00Z",
    interventions: 0,
    score: 96,
  },
  {
    id: "m-005",
    vehicleId: "v-005",
    vehicleName: "Shuttle Beta",
    routeId: "r-004",
    routeName: "Campus Shuttle",
    status: "completed",
    startedAt: "2026-04-11T08:00:00Z",
    completedAt: "2026-04-11T08:16:00Z",
    interventions: 0,
    score: 100,
  },
  {
    id: "m-006",
    vehicleId: "v-001",
    vehicleName: "Shuttle Alpha",
    routeId: "r-001",
    routeName: "Downtown Loop",
    status: "completed",
    startedAt: "2026-04-11T06:00:00Z",
    completedAt: "2026-04-11T06:24:00Z",
    interventions: 1,
    score: 89,
  },
  {
    id: "m-007",
    vehicleId: "v-006",
    vehicleName: "Delivery Bot 12",
    routeId: "r-003",
    routeName: "Warehouse Circuit",
    status: "scheduled",
    startedAt: "2026-04-11T11:00:00Z",
    completedAt: null,
    interventions: 0,
    score: 0,
  },
  {
    id: "m-008",
    vehicleId: "v-004",
    vehicleName: "Taxi Bravo",
    routeId: "r-002",
    routeName: "Airport Express",
    status: "aborted",
    startedAt: "2026-04-10T22:00:00Z",
    completedAt: "2026-04-10T22:18:00Z",
    interventions: 2,
    score: 45,
  },
];

// ── Behavior Events ──────────────────────────────────────────────────────

export const behaviorEvents: BehaviorEvent[] = [
  {
    id: "be-001",
    vehicleId: "v-002",
    vehicleName: "Delivery Bot 7",
    type: "hard_brake",
    severity: "warning",
    timestamp: "2026-04-11T09:12:00Z",
    description: "Hard braking event triggered by pedestrian entering crosswalk outside detection zone.",
    location: "Warehouse District — Intersection 4B",
  },
  {
    id: "be-002",
    vehicleId: "v-004",
    vehicleName: "Taxi Bravo",
    type: "lane_departure",
    severity: "info",
    timestamp: "2026-04-11T07:05:00Z",
    description: "Minor lane departure during merge. Corrected within 0.3s. Construction zone signage partially obscured.",
    location: "Highway 1 — Exit 14 Merge",
  },
  {
    id: "be-003",
    vehicleId: "v-008",
    vehicleName: "Inspector Drone 1",
    type: "sensor_fault",
    severity: "critical",
    timestamp: "2026-04-09T14:20:00Z",
    description: "LiDAR unit 2 reporting intermittent failures. Vehicle automatically pulled over and entered safe stop.",
    location: "Highway 7 — KM 32",
  },
  {
    id: "be-004",
    vehicleId: "v-001",
    vehicleName: "Shuttle Alpha",
    type: "route_deviation",
    severity: "info",
    timestamp: "2026-04-11T06:15:00Z",
    description: "Route adjusted to avoid reported road closure. Alternate path added 3 minutes to journey.",
    location: "Downtown — 5th Ave Detour",
  },
  {
    id: "be-005",
    vehicleId: "v-007",
    vehicleName: "Taxi Charlie",
    type: "collision_near_miss",
    severity: "critical",
    timestamp: "2026-04-10T17:45:00Z",
    description: "Emergency stop avoided collision with vehicle running red light. Gap: 0.8m. All passengers safe.",
    location: "Main St & Oak Ave Intersection",
  },
  {
    id: "be-006",
    vehicleId: "v-005",
    vehicleName: "Shuttle Beta",
    type: "passenger_stop",
    severity: "info",
    timestamp: "2026-04-11T08:10:00Z",
    description: "Unscheduled stop requested by passenger via emergency button. No emergency found — passenger requested early disembark.",
    location: "University Campus — Library Stop",
  },
  {
    id: "be-007",
    vehicleId: "v-003",
    vehicleName: "Inspector Drone 3",
    type: "weather_adaptation",
    severity: "info",
    timestamp: "2026-04-11T07:30:00Z",
    description: "Speed reduced to 40 km/h due to fog detection. Visibility estimated at 200m.",
    location: "Highway 12 — KM 22",
  },
  {
    id: "be-008",
    vehicleId: "v-002",
    vehicleName: "Delivery Bot 7",
    type: "delivery_anomaly",
    severity: "warning",
    timestamp: "2026-04-11T09:25:00Z",
    description: "Package compartment sensor indicates door ajar during transit. Auto-secured after 8 seconds.",
    location: "Warehouse District — Route 3C",
  },
];

// ── Telemetry (per vehicle) ──────────────────────────────────────────────

export function getVehicleTelemetry(vehicleId: string): Telemetry {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) {
    return { speed: 0, heading: 0, batteryPct: 0, cpuLoad: 0, sensorStatus: "fault", lastPing: "" };
  }
  const telemetryMap: Record<string, Telemetry> = {
    "v-001": { speed: 32, heading: 185, batteryPct: 78, cpuLoad: 42, sensorStatus: "nominal", lastPing: "2026-04-11T09:42:00Z" },
    "v-002": { speed: 28, heading: 90, batteryPct: 64, cpuLoad: 55, sensorStatus: "nominal", lastPing: "2026-04-11T09:38:00Z" },
    "v-003": { speed: 65, heading: 270, batteryPct: 91, cpuLoad: 68, sensorStatus: "nominal", lastPing: "2026-04-11T09:45:00Z" },
    "v-004": { speed: 48, heading: 320, batteryPct: 52, cpuLoad: 38, sensorStatus: "nominal", lastPing: "2026-04-11T09:40:00Z" },
    "v-005": { speed: 22, heading: 45, batteryPct: 83, cpuLoad: 35, sensorStatus: "nominal", lastPing: "2026-04-11T09:35:00Z" },
    "v-006": { speed: 0, heading: 0, batteryPct: 96, cpuLoad: 8, sensorStatus: "nominal", lastPing: "2026-04-11T08:15:00Z" },
    "v-007": { speed: 0, heading: 0, batteryPct: 100, cpuLoad: 5, sensorStatus: "degraded", lastPing: "2026-04-10T18:00:00Z" },
    "v-008": { speed: 0, heading: 0, batteryPct: 3, cpuLoad: 0, sensorStatus: "fault", lastPing: "2026-04-09T14:22:00Z" },
  };
  return telemetryMap[vehicleId] || telemetryMap["v-001"];
}

// ── Helper functions ─────────────────────────────────────────────────────

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

export function getMissionsForVehicle(vehicleId: string): Mission[] {
  return missions.filter((m) => m.vehicleId === vehicleId);
}

export function getEventsForVehicle(vehicleId: string): BehaviorEvent[] {
  return behaviorEvents.filter((e) => e.vehicleId === vehicleId);
}

export function getActiveVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.status === "active");
}

export function getRunningMissions(): Mission[] {
  return missions.filter((m) => m.status === "in_progress");
}

export function getStatusColor(status: VehicleStatus): string {
  switch (status) {
    case "active": return "text-emerald-600 bg-emerald-500/10";
    case "idle": return "text-blue-600 bg-blue-500/10";
    case "maintenance": return "text-amber-600 bg-amber-500/10";
    case "offline": return "text-red-600 bg-red-500/10";
  }
}

export function getStatusBadgeVariant(status: VehicleStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "active": return "default";
    case "idle": return "secondary";
    case "maintenance": return "outline";
    case "offline": return "destructive";
  }
}

export function getSeverityBadgeVariant(severity: EventSeverity): "default" | "secondary" | "destructive" | "outline" {
  switch (severity) {
    case "info": return "secondary";
    case "warning": return "outline";
    case "critical": return "destructive";
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
