"use client";

import { StatusBadge } from "./status-badge";
import type { HealthResult } from "@/lib/types";

interface GatewayPanelProps {
  data: HealthResult | null;
  error: string | null;
  loading: boolean;
}

function formatUptime(seconds?: number): string {
  if (!seconds) return "—";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function GatewayPanel({ data, error, loading }: GatewayPanelProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Gateway</h2>
        {loading ? (
          <span className="text-xs text-zinc-500">loading...</span>
        ) : (
          <StatusBadge status={error ? "offline" : data?.status} />
        )}
      </div>
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : data ? (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Version</span>
            <span className="text-zinc-200 font-mono">{data.version ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Uptime</span>
            <span className="text-zinc-200">{formatUptime(data.uptime as number)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
