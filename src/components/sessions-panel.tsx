"use client";

import type { SessionInfo } from "@/lib/types";

interface SessionsPanelProps {
  data: SessionInfo[] | null;
  error: string | null;
  loading: boolean;
}

export function SessionsPanel({ data, error, loading }: SessionsPanelProps) {
  const activeSessions = data?.filter((s) => s.status === "active") ?? [];
  const totalTokens = data?.reduce((sum, s) => sum + (s.tokensUsed ?? 0), 0) ?? 0;
  const totalCost = data?.reduce((sum, s) => sum + (s.cost ?? 0), 0) ?? 0;

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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-zinc-100">{activeSessions.length}</p>
            <p className="text-xs text-zinc-500">Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-100">
              {totalTokens > 1000 ? `${(totalTokens / 1000).toFixed(1)}k` : totalTokens}
            </p>
            <p className="text-xs text-zinc-500">Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-100">${totalCost.toFixed(2)}</p>
            <p className="text-xs text-zinc-500">Cost</p>
          </div>
          {data && data.length > 0 && (
            <div className="col-span-3 mt-2">
              <p className="text-xs text-zinc-500 mb-2">
                {data.length} total session{data.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {data.slice(0, 20).map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between text-xs py-1 border-b border-zinc-800/50"
                  >
                    <span className="text-zinc-400 font-mono">{s.agentId}</span>
                    <span className="text-zinc-500">{s.status ?? "—"}</span>
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
