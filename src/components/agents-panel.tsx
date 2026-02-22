"use client";

import { AgentCard } from "./agent-card";
import { AGENTS } from "@/lib/constants";
import type { HealthResult } from "@/lib/types";

interface AgentsPanelProps {
  data: HealthResult | null;
  error: string | null;
  loading: boolean;
}

export function AgentsPanel({ data, error, loading }: AgentsPanelProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
        Agents ({AGENTS.length})
      </h2>
      {loading ? (
        <p className="text-xs text-zinc-500">loading...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENTS.map((agent) => {
            const agentHealth = data?.agents.find((a) => a.agentId === agent.id);
            return (
              <AgentCard
                key={agent.id}
                agent={agent}
                sessionCount={agentHealth?.sessions.count ?? 0}
                heartbeatEnabled={agentHealth?.heartbeat.enabled ?? false}
                heartbeatEvery={agentHealth?.heartbeat.every}
                isDefault={agentHealth?.isDefault ?? false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
