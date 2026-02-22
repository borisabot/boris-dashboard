"use client";

import type { HealthResult } from "@/lib/types";

interface SessionsPanelProps {
  data: HealthResult | null;
  error: string | null;
  loading: boolean;
}

function timeAgo(ms: number): string {
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function SessionsPanel({ data, error, loading }: SessionsPanelProps) {
  const totalSessions = data?.agents.reduce((sum, a) => sum + a.sessions.count, 0) ?? 0;
  const allRecent = data?.agents
    .flatMap((a) =>
      a.sessions.recent.map((s) => ({ ...s, agentId: a.agentId }))
    )
    .sort((a, b) => b.updatedAt - a.updatedAt) ?? [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
        Sessions
      </h2>
      {loading ? (
        <p className="text-xs text-zinc-500">loading...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : (
        <div>
          <p className="text-3xl font-bold text-zinc-100">{totalSessions}</p>
          <p className="text-xs text-zinc-500 mb-3">total sessions</p>
          {allRecent.length > 0 && (
            <div className="border-t border-zinc-800 pt-3">
              <p className="text-xs text-zinc-500 mb-2">Recent activity</p>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {allRecent.slice(0, 8).map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-400 font-mono truncate mr-2">
                      {s.agentId}
                    </span>
                    <span className="text-zinc-600 whitespace-nowrap">
                      {timeAgo(s.age)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
