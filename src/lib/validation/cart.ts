import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  sku: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200),
  price: z.number().nonnegative(),
  color: z.string().trim().min(1).max(80),
  size: z.string().trim().min(1).max(80),
  quantity: z.number().int().min(1).max(20),
});

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
  customer: z.unknown(),
});
