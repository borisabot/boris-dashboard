"use client";

import { StatusBadge } from "./status-badge";
import { AgentIcon } from "./agent-icon";
import type { AgentMeta } from "@/lib/types";

interface AgentCardProps {
  agent: AgentMeta;
  sessionCount: number;
  heartbeatEnabled: boolean;
  heartbeatEvery?: string;
  isDefault: boolean;
}

export function AgentCard({ agent, sessionCount, heartbeatEnabled, heartbeatEvery, isDefault }: AgentCardProps) {
  const status = sessionCount > 0 ? "active" : "idle";

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`${agent.color} shrink-0`}>
            <AgentIcon icon={agent.icon} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-zinc-100">{agent.name}</h3>
              {isDefault && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  default
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 font-mono">{agent.id}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="text-xs text-zinc-400 mt-1">{agent.role}</p>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800">
        <span className="text-[11px] text-zinc-500">
          {sessionCount} session{sessionCount !== 1 ? "s" : ""}
        </span>
        {heartbeatEnabled && (
          <span className="text-[11px] text-emerald-500">
            heartbeat {heartbeatEvery}
          </span>
        )}
      </div>
    </div>
  );
}
