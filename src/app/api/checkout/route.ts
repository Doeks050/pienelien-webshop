import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { validateCart } from "@/lib/checkout/validate-cart";
import { createOrder } from "@/lib/checkout/create-order";
import { parseCheckout } from "@/lib/validation/checkout";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer } = parseCheckout(body);

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
    if (error instanceof ZodError) {
      const message =
        error.issues[0]?.message ?? "Controleer je gegevens.";

      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Checkout mislukt.";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
