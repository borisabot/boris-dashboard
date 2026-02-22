export interface HealthResult {
  status: string;
  version: string;
  uptime?: number;
  [key: string]: unknown;
}

export interface AgentInfo {
  id: string;
  name: string;
  status?: string;
  [key: string]: unknown;
}

export interface CronJob {
  id: string;
  agentId: string;
  every: string;
  status?: string;
  lastRun?: string;
  nextRun?: string;
  [key: string]: unknown;
}

export interface CronRun {
  id: string;
  cronId: string;
  startedAt: string;
  completedAt?: string;
  status: string;
  [key: string]: unknown;
}

export interface SessionInfo {
  id: string;
  agentId: string;
  status?: string;
  createdAt?: string;
  tokensUsed?: number;
  cost?: number;
  [key: string]: unknown;
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
