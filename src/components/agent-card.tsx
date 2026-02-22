"use client";

import { StatusBadge } from "./status-badge";
import type { AgentMeta } from "@/lib/types";

interface AgentCardProps {
  agent: AgentMeta;
  status?: string;
}

export function AgentCard({ agent, status }: AgentCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-zinc-100">{agent.name}</h3>
        <StatusBadge status={status} />
      </div>
      <p className="text-xs text-zinc-500 font-mono">{agent.id}</p>
      <p className="text-xs text-zinc-400 mt-1">{agent.role}</p>
    </div>
  );
}
