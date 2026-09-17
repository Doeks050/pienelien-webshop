import { NextResponse } from "next/server";
import { validateCart } from "@/lib/checkout/validate-cart";
import { createOrder } from "@/lib/checkout/create-order";
import type { CartItem } from "@/types/cart";
import type { Customer } from "@/types/customer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const items = body.items as CartItem[];
    const customer = body.customer as Customer;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Winkelmand is leeg." },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.firstName) {
      return NextResponse.json(
        { error: "Klantgegevens ontbreken." },
        { status: 400 }
      );
    }

    const validated = await validateCart(items);

    const order = await createOrder({
      items: validated,
      customer,
    });

    return NextResponse.json({
      orderId: order.id,
      total: order.total,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout mislukt.";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
