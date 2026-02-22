"use client";

import { AgentCard } from "./agent-card";
import { AGENTS } from "@/lib/constants";
import type { AgentInfo } from "@/lib/types";

interface AgentsPanelProps {
  data: AgentInfo[] | null;
  error: string | null;
  loading: boolean;
}

export function AgentsPanel({ data, error, loading }: AgentsPanelProps) {
  const statusMap = new Map<string, string>();
  if (data) {
    for (const a of data) {
      statusMap.set(a.id, (a.status as string) ?? "unknown");
    }
  }

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
          {AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              status={statusMap.get(agent.id) ?? (data ? "idle" : undefined)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
