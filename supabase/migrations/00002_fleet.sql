-- robocars: Fleet and autonomous vehicle management tables
-- Migration: 00002_fleet

-- Vehicles
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  vehicle_type text not null check (vehicle_type in ('shuttle', 'delivery', 'inspection', 'taxi')),
  status text not null default 'idle' check (status in ('active', 'idle', 'maintenance', 'offline')),
  autonomy_level text not null check (autonomy_level in ('l2', 'l3', 'l4', 'l5')),
  current_location jsonb,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

create policy "Users can view vehicles in their org"
  on public.vehicles for select
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can insert vehicles in their org"
  on public.vehicles for insert
  with check (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can update vehicles in their org"
  on public.vehicles for update
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can delete vehicles in their org"
  on public.vehicles for delete
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

-- Routes
create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  waypoints jsonb,
  distance_km numeric,
  estimated_duration_min int,
  route_type text not null check (route_type in ('scheduled', 'on_demand', 'test')),
  risk_score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.routes enable row level security;

create policy "Users can view routes in their org"
  on public.routes for select
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can insert routes in their org"
  on public.routes for insert
  with check (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can update routes in their org"
  on public.routes for update
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can delete routes in their org"
  on public.routes for delete
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

-- Missions
create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id),
  route_id uuid references public.routes(id),
  status text not null default 'queued' check (status in ('queued', 'in_progress', 'completed', 'aborted', 'intervention_required')),
  started_at timestamptz,
  completed_at timestamptz,
  interventions_count int not null default 0,
  performance_score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.missions enable row level security;

create policy "Users can view missions via vehicle org"
  on public.missions for select
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can insert missions via vehicle org"
  on public.missions for insert
  with check (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can update missions via vehicle org"
  on public.missions for update
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can delete missions via vehicle org"
  on public.missions for delete
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

-- Interventions
create table if not exists public.interventions (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id),
  intervention_type text not null check (intervention_type in ('remote_takeover', 'stop', 'reroute', 'speed_adjust')),
  reason text,
  initiated_by uuid references auth.users(id),
  started_at timestamptz,
  resolved_at timestamptz,
  outcome text,
  created_at timestamptz not null default now()
);

alter table public.interventions enable row level security;

create policy "Users can view interventions via mission vehicle org"
  on public.interventions for select
  using (mission_id in (
    select id from public.missions where vehicle_id in (
      select id from public.vehicles where org_id in (
        select org_id from public.profiles where user_id = auth.uid()
      )
    )
  ));

create policy "Users can insert interventions via mission vehicle org"
  on public.interventions for insert
  with check (mission_id in (
    select id from public.missions where vehicle_id in (
      select id from public.vehicles where org_id in (
        select org_id from public.profiles where user_id = auth.uid()
      )
    )
  ));

create policy "Users can update interventions via mission vehicle org"
  on public.interventions for update
  using (mission_id in (
    select id from public.missions where vehicle_id in (
      select id from public.vehicles where org_id in (
        select org_id from public.profiles where user_id = auth.uid()
      )
    )
  ));

create policy "Users can delete interventions via mission vehicle org"
  on public.interventions for delete
  using (mission_id in (
    select id from public.missions where vehicle_id in (
      select id from public.vehicles where org_id in (
        select org_id from public.profiles where user_id = auth.uid()
      )
    )
  ));

-- Behavior Events
create table if not exists public.behavior_events (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id),
  mission_id uuid references public.missions(id),
  event_type text,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  location jsonb,
  timestamp timestamptz not null default now(),
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.behavior_events enable row level security;

create policy "Users can view behavior events via vehicle org"
  on public.behavior_events for select
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can insert behavior events via vehicle org"
  on public.behavior_events for insert
  with check (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can update behavior events via vehicle org"
  on public.behavior_events for update
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can delete behavior events via vehicle org"
  on public.behavior_events for delete
  using (vehicle_id in (
    select id from public.vehicles where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));
