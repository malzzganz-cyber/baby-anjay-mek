import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET() {
  try {
    const res = await fetch(`${SETTINGS.BASE_URL}/v1/user/balance`, {
      headers: {
        "x-apikey": SETTINGS.API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin balance" }, { status: 500 });
  }
}
