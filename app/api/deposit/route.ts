import { NextResponse } from "next/server";
import { SETTINGS } from "@/lib/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get("amount");
  const depositId = searchParams.get("deposit_id");
  const action = searchParams.get("action");

  try {
    if (action === "create" && amount) {
      const res = await fetch(`${SETTINGS.BASE_URL}/v2/deposit/create?amount=${amount}&payment_id=qris`, {
        headers: {
          "x-apikey": SETTINGS.API_KEY,
          Accept: "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    } else if (action === "status" && depositId) {
      const res = await fetch(`${SETTINGS.BASE_URL}/v2/deposit/get_status?deposit_id=${depositId}`, {
        headers: {
          "x-apikey": SETTINGS.API_KEY,
          Accept: "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    } else if (action === "cancel" && depositId) {
      const res = await fetch(`${SETTINGS.BASE_URL}/v1/deposit/cancel?deposit_id=${depositId}`, {
        headers: {
          "x-apikey": SETTINGS.API_KEY,
          Accept: "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "API failure" }, { status: 500 });
  }
}
