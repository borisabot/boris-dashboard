"use client";

import { StatusBadge } from "./status-badge";
import type { HealthResult } from "@/lib/types";

interface GatewayPanelProps {
  data: HealthResult | null;
  error: string | null;
  loading: boolean;
}

export function GatewayPanel({ data, error, loading }: GatewayPanelProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Gateway</h2>
        {loading ? (
          <span className="text-xs text-zinc-500">loading...</span>
        ) : (
          <StatusBadge status={error ? "offline" : data?.ok ? "online" : "error"} />
        )}
      </div>
      {error ? (
        <p className="text-xs text-red-400 break-all">{error}</p>
      ) : data ? (
        <div className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Default Agent</span>
              <span className="text-zinc-200 font-mono">{data.defaultAgentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Agents</span>
              <span className="text-zinc-200">{data.agents.length}</span>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-500 mb-2">Channels</p>
            <div className="space-y-1">
              {data.channelOrder.map((ch) => {
                const status = data.channels[ch];
                const label = data.channelLabels[ch] ?? ch;
                const isOk = status?.configured && (status.probe?.ok !== false);
                return (
                  <div key={ch} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{label}</span>
                    <StatusBadge status={isOk ? "ok" : status?.lastError ? "error" : "offline"} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
