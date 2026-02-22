"use client";

export function StatusBadge({ status }: { status: string | undefined }) {
  const s = (status ?? "unknown").toLowerCase();
  const colors: Record<string, string> = {
    online: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    ok: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    healthy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    idle: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
    offline: "bg-red-500/20 text-red-400 border-red-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    unknown: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  const colorClass = colors[s] ?? colors.unknown;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {s}
    </span>
  );
}
