import { checkoutSchema } from "./cart";
import { customerSchema } from "./customer";

export function parseCheckout(body: unknown) {
  const checkout = checkoutSchema.parse(body);
  const customer = customerSchema.parse(checkout.customer);

  return {
    items: checkout.items,
    customer,
  };
}
