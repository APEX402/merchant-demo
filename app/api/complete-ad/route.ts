import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hash, facilitatorSignature } = body || {};

    if (!hash || !facilitatorSignature) {
      return NextResponse.json(
        { error: "Missing hash or facilitatorSignature" },
        { status: 400 }
      );
    }

    const upstreamResponse = await fetch(
      "http://13.42.87.11:8080/complete-ad",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash, facilitatorSignature }),
      }
    );

    const data = await upstreamResponse.json().catch(() => null);

    return NextResponse.json(
      {
        ok: upstreamResponse.ok,
        status: upstreamResponse.status,
        data,
      },
      { status: upstreamResponse.ok ? 200 : 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
