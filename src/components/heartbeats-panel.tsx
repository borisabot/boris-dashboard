"use client";

import { StatusBadge } from "./status-badge";
import { HEARTBEAT_CONFIG } from "@/lib/constants";
import type { CronJob } from "@/lib/types";

interface HeartbeatsPanelProps {
  data: CronJob[] | null;
  error: string | null;
  loading: boolean;
}

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function HeartbeatsPanel({ data, error, loading }: HeartbeatsPanelProps) {
  // Show heartbeat config even without data
  const heartbeatAgents = Object.keys(HEARTBEAT_CONFIG);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
        Heartbeats
      </h2>
      {loading ? (
        <p className="text-xs text-zinc-500">loading...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-2 font-medium">Agent</th>
                <th className="text-left py-2 font-medium">Interval</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-left py-2 font-medium">Last Run</th>
              </tr>
            </thead>
            <tbody>
              {heartbeatAgents.map((agentId) => {
                const cron = data?.find((c) => c.agentId === agentId);
                return (
                  <tr key={agentId} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-200 font-mono">{agentId}</td>
                    <td className="py-2 text-zinc-400">{HEARTBEAT_CONFIG[agentId]}</td>
                    <td className="py-2">
                      <StatusBadge status={cron?.status ?? "unknown"} />
                    </td>
                    <td className="py-2 text-zinc-400">{timeAgo(cron?.lastRun)}</td>
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
