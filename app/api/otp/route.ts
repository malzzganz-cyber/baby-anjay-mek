import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id");
  const action = searchParams.get("action");

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  try {
    if (action === "cancel") {
      const res = await fetch(`${SETTINGS.BASE_URL}/v1/orders/set_status?order_id=${orderId}&status=cancel`, {
        headers: {
          "x-apikey": SETTINGS.API_KEY,
          Accept: "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const res = await fetch(`${SETTINGS.BASE_URL}/v1/orders/get_status?order_id=${orderId}`, {
        headers: {
          "x-apikey": SETTINGS.API_KEY,
          Accept: "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ error: "API Failure" }, { status: 500 });
  }
}
