import { NextResponse } from "next/server";
import { validateCart } from "@/lib/checkout/validate-cart";
import { createOrder } from "@/lib/checkout/create-order";
import type { CartItem } from "@/types/cart";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = body.items as CartItem[];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Winkelmand is leeg." },
        { status: 400 }
      );
    }

    const validated = await validateCart(items);
    const order = await createOrder(validated);

    return NextResponse.json({
      orderId: order.id,
      total: order.total,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout mislukt.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
