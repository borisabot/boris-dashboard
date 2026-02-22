import WebSocket from "ws";
import { randomUUID } from "crypto";

const GATEWAY_URL = process.env.GATEWAY_URL!.trim();
const GATEWAY_TOKEN = process.env.GATEWAY_TOKEN!.trim();

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (err: Error) => void;
}

export async function rpcCall<T = unknown>(
  method: string,
  params?: Record<string, unknown>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const pending = new Map<string, PendingRequest>();
    let connected = false;

    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`RPC timeout: ${method}`));
    }, 12000);

    const ws = new WebSocket(GATEWAY_URL);

    ws.on("open", () => {
      // Wait for connect.challenge event
    });

    ws.on("message", (raw) => {
      try {
        const msg = JSON.parse(raw.toString());

        // Handle connect challenge
        if (msg.type === "event" && msg.event === "connect.challenge") {
          const connectId = randomUUID();
          pending.set(connectId, {
            resolve: () => {
              connected = true;
              // Now send the actual request
              const reqId = randomUUID();
              pending.set(reqId, {
                resolve: (payload) => {
                  clearTimeout(timeout);
                  ws.close();
                  resolve(payload as T);
                },
                reject: (err) => {
                  clearTimeout(timeout);
                  ws.close();
                  reject(err);
                },
              });
              ws.send(
                JSON.stringify({
                  type: "req",
                  id: reqId,
                  method,
                  params: params ?? undefined,
                })
              );
            },
            reject: (err) => {
              clearTimeout(timeout);
              ws.close();
              reject(err);
            },
          });
          ws.send(
            JSON.stringify({
              type: "req",
              id: connectId,
              method: "connect",
              params: {
                minProtocol: 3,
                maxProtocol: 3,
                client: {
                  id: "gateway-client",
                  version: "1.0.0",
                  platform: "linux",
                  mode: "backend",
                },
                auth: { token: GATEWAY_TOKEN },
                role: "operator",
                scopes: ["operator.admin"],
              },
            })
          );
          return;
        }

        // Handle response frames
        if (msg.type === "res") {
          const p = pending.get(msg.id);
          if (!p) return;
          // Skip "accepted" acks, wait for final
          if (msg.payload?.status === "accepted") return;
          pending.delete(msg.id);
          if (msg.ok) {
            p.resolve(msg.payload);
          } else {
            p.reject(
              new Error(msg.error?.message ?? "unknown gateway error")
            );
          }
          return;
        }

        // Ignore events (tick, etc.)
      } catch (e) {
        // parse error, ignore
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    ws.on("close", () => {
      clearTimeout(timeout);
      if (!connected) {
        reject(new Error("WebSocket closed before connect"));
      }
    });
  });
}
