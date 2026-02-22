import type { AgentMeta } from "./types";

export const AGENTS: AgentMeta[] = [
  { id: "main", name: "Boris", role: "Boss / Orchestrator" },
  { id: "inbox", name: "Sarah", role: "Email triage & cleanup" },
  { id: "calendar", name: "Sarah", role: "Schedule management" },
  { id: "whatsapp-ea", name: "Sarah", role: "WhatsApp EA" },
  { id: "workspace", name: "Sarah", role: "Google Drive & Docs" },
  { id: "travel", name: "Sarah", role: "Flights, hotels, transport" },
  { id: "governor", name: "Rex", role: "Quality control" },
  { id: "briefing", name: "Sarah", role: "Daily briefing" },
  { id: "tasks", name: "Sarah", role: "Task nudge monitor" },
];

export const HEARTBEAT_CONFIG: Record<string, string> = {
  calendar: "30m",
  governor: "4h",
  briefing: "24h",
  tasks: "4h",
};
