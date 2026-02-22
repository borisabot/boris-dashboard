import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `OpenRouter API error: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      result: {
        balance: data.data?.limit_remaining ?? 0,
        limit: data.data?.limit ?? 50,
        usage: data.data?.usage ?? 0,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Credits fetch error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
