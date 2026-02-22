"use client";

import { usePolling } from "@/hooks/use-polling";
import { GatewayPanel } from "./gateway-panel";
import { AgentsPanel } from "./agents-panel";
import { CreditsPanel } from "./credits-panel";
import { HeartbeatsPanel } from "./heartbeats-panel";
import { SessionsPanel } from "./sessions-panel";
import type { HealthResult, AgentInfo, CreditsInfo, CronJob, SessionInfo } from "@/lib/types";

async function gateway<T>(method: string, params?: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/gateway", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, params }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result as T;
}

async function fetchCredits(): Promise<CreditsInfo> {
  const res = await fetch("/api/credits");
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result as CreditsInfo;
}

export function Dashboard() {
  const health = usePolling(() => gateway<HealthResult>("health"), 15000);
  const agents = usePolling(() => gateway<AgentInfo[]>("agents.list"), 15000);
  const credits = usePolling(fetchCredits, 60000);
  const heartbeats = usePolling(() => gateway<CronJob[]>("cron.list"), 30000);
  const sessions = usePolling(() => gateway<SessionInfo[]>("sessions.list"), 30000);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Boris Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">OpenClaw Agent Team Monitor</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <GatewayPanel data={health.data} error={health.error} loading={health.loading} />
        <CreditsPanel data={credits.data} error={credits.error} loading={credits.loading} />
        <SessionsPanel data={sessions.data} error={sessions.error} loading={sessions.loading} />
      </div>

      <div className="space-y-4">
        <AgentsPanel data={agents.data} error={agents.error} loading={agents.loading} />
        <HeartbeatsPanel data={heartbeats.data} error={heartbeats.error} loading={heartbeats.loading} />
      </div>
    </div>
  );
}
