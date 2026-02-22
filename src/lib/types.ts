export interface HealthResult {
  ok: boolean;
  ts: number;
  durationMs: number;
  channels: Record<string, ChannelStatus>;
  channelOrder: string[];
  channelLabels: Record<string, string>;
  heartbeatSeconds: number;
  defaultAgentId: string;
  agents: AgentHealth[];
  sessions: SessionsSummary;
}

export interface ChannelStatus {
  configured: boolean;
  running: boolean;
  linked?: boolean;
  connected?: boolean;
  lastError: string | null;
  probe?: {
    ok: boolean;
    error: string | null;
    bot?: { username: string };
  };
  self?: { e164: string };
  [key: string]: unknown;
}

export interface AgentHealth {
  agentId: string;
  isDefault: boolean;
  heartbeat: {
    enabled: boolean;
    every: string;
    everyMs: number | null;
    model: string;
    [key: string]: unknown;
  };
  sessions: SessionsSummary;
}

export interface SessionsSummary {
  count: number;
  recent: SessionRecent[];
  [key: string]: unknown;
}

export interface SessionRecent {
  key: string;
  updatedAt: number;
  age: number;
}

export interface CreditsInfo {
  balance: number;
  limit: number;
  usage: number;
}

export interface AgentMeta {
  id: string;
  name: string;
  role: string;
}
