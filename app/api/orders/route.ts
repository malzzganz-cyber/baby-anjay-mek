import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const numberId = searchParams.get("number_id");
  const providerId = searchParams.get("provider_id");
  const operatorId = searchParams.get("operator_id");

  if (!numberId || !providerId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  let url = `${SETTINGS.BASE_URL}/v2/orders?number_id=${numberId}&provider_id=${providerId}`;
  if (operatorId && operatorId !== "any") {
    url += `&operator_id=${operatorId}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        "x-apikey": SETTINGS.API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
