"use client";

import type { CreditsInfo } from "@/lib/types";

interface CreditsPanelProps {
  data: CreditsInfo | null;
  error: string | null;
  loading: boolean;
}

export function CreditsPanel({ data, error, loading }: CreditsPanelProps) {
  const pct = data ? Math.max(0, Math.min(100, (data.balance / data.limit) * 100)) : 0;

  const barColor =
    pct > 50 ? "bg-emerald-500" : pct > 20 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
        OpenRouter Credits
      </h2>
      {loading ? (
        <p className="text-xs text-zinc-500">loading...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : data ? (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Balance</span>
            <span className="text-zinc-100 font-mono font-semibold">
              ${data.balance.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Used: ${data.usage.toFixed(2)}</span>
            <span>Limit: ${data.limit.toFixed(2)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
