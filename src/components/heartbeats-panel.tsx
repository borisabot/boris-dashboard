"use client";

import { StatusBadge } from "./status-badge";
import type { HealthResult } from "@/lib/types";

interface HeartbeatsPanelProps {
  data: HealthResult | null;
  error: string | null;
  loading: boolean;
}

export function HeartbeatsPanel({ data, error, loading }: HeartbeatsPanelProps) {
  const heartbeatAgents = data?.agents.filter((a) => a.heartbeat.enabled) ?? [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
        Heartbeats ({heartbeatAgents.length})
      </h2>
      {loading ? (
        <p className="text-xs text-zinc-500">loading...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : heartbeatAgents.length === 0 ? (
        <p className="text-xs text-zinc-500">No heartbeats configured</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-2 font-medium">Agent</th>
                <th className="text-left py-2 font-medium">Interval</th>
                <th className="text-left py-2 font-medium">Model</th>
                <th className="text-left py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {heartbeatAgents.map((agent) => {
                const model = agent.heartbeat.model?.split("/").pop() ?? "—";
                return (
                  <tr key={agent.agentId} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-200 font-mono">{agent.agentId}</td>
                    <td className="py-2 text-zinc-400">{agent.heartbeat.every}</td>
                    <td className="py-2 text-zinc-500 text-xs">{model}</td>
                    <td className="py-2">
                      <StatusBadge status={agent.heartbeat.enabled ? "active" : "offline"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
