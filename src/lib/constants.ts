import type { AgentMeta } from "./types";

export const AGENTS: AgentMeta[] = [
  { id: "main", name: "Boris", role: "Boss / Orchestrator", icon: "crown", color: "text-amber-400", model: "Sonnet 4.5", subagentModel: null },
  { id: "inbox", name: "Sarah", role: "Email triage & cleanup", icon: "inbox", color: "text-blue-400", model: "Gemini Flash", subagentModel: "Gemini Flash" },
  { id: "calendar", name: "Sarah", role: "Schedule management", icon: "calendar", color: "text-violet-400", model: "Gemini Flash", subagentModel: null },
  { id: "whatsapp-ea", name: "Sarah", role: "WhatsApp EA", icon: "message-circle", color: "text-green-400", model: "Sonnet 4.5", subagentModel: null },
  { id: "workspace", name: "Sarah", role: "Google Drive & Docs", icon: "folder", color: "text-yellow-400", model: "Gemini Flash", subagentModel: null },
  { id: "travel", name: "Sarah", role: "Flights, hotels, transport", icon: "plane", color: "text-cyan-400", model: "Gemini Flash", subagentModel: "Gemini Flash" },
  { id: "governor", name: "Rex", role: "Quality control", icon: "shield", color: "text-red-400", model: "Gemini Flash", subagentModel: null },
  { id: "briefing", name: "Sarah", role: "Daily briefing", icon: "newspaper", color: "text-orange-400", model: "Gemini Flash", subagentModel: "Gemini Flash" },
  { id: "tasks", name: "Sarah", role: "Task nudge monitor", icon: "check-square", color: "text-pink-400", model: "Gemini Flash", subagentModel: "Gemini Flash" },
];

export const HEARTBEAT_CONFIG: Record<string, string> = {
  calendar: "30m",
  governor: "4h",
  briefing: "24h",
  tasks: "4h",
};
