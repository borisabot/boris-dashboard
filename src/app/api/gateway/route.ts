import { NextRequest, NextResponse } from "next/server";
import { rpcCall } from "@/lib/gateway-client";

const ALLOWED_METHODS = [
  "health",
  "agents.list",
  "status",
  "cron.list",
  "cron.runs",
  "sessions.list",
  "sessions.usage",
];

export async function POST(req: NextRequest) {
  try {
    const { method, params } = await req.json();

    if (!method || !ALLOWED_METHODS.includes(method)) {
      return NextResponse.json(
        { error: `Method not allowed: ${method}` },
        { status: 400 }
      );
    }

    const result = await rpcCall(method, params);
    return NextResponse.json({ result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gateway error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
