import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("service_id");

  if (!serviceId) {
    return NextResponse.json({ error: "Missing service_id" }, { status: 400 });
  }

  try {
    const res = await fetch(`${SETTINGS.BASE_URL}/v2/countries?service_id=${serviceId}`, {
      headers: {
        "x-apikey": SETTINGS.API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}
