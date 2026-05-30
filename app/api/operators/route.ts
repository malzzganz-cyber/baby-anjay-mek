import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const providerId = searchParams.get("provider_id");

  if (!country || !providerId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  try {
    const res = await fetch(`${SETTINGS.BASE_URL}/v2/operators?country=${country}&provider_id=${providerId}`, {
      headers: {
        "x-apikey": SETTINGS.API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch operators" }, { status: 500 });
  }
}
