import WebSocket from "ws";

const GATEWAY_URL = process.env.GATEWAY_URL!.trim();
const GATEWAY_TOKEN = process.env.GATEWAY_TOKEN!.trim();

let rpcId = 0;

export async function rpcCall<T = unknown>(
  method: string,
  params?: Record<string, unknown>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = ++rpcId;
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`RPC timeout: ${method}`));
    }, 8000);

    const ws = new WebSocket(GATEWAY_URL, {
      headers: { Authorization: `Bearer ${GATEWAY_TOKEN}` },
    });

    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          method,
          params: params ?? {},
        })
      );
    });

    ws.on("message", (data) => {
      clearTimeout(timeout);
      try {
        const msg = JSON.parse(data.toString());
        if (msg.error) {
          reject(new Error(msg.error.message ?? JSON.stringify(msg.error)));
        } else {
          resolve(msg.result as T);
        }
      } catch (e) {
        reject(e);
      } finally {
        ws.close();
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
