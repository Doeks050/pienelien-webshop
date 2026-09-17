import { z } from "zod";

const dutchPostalCode = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;

export const customerSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  street: z.string().trim().min(2).max(120),
  houseNumber: z.string().trim().min(1).max(20),
  postalCode: z
    .string()
    .trim()
    .regex(dutchPostalCode, "Ongeldige Nederlandse postcode")
    .transform((value) => {
      const compact = value.replace(/\s/g, "").toUpperCase();
      return `${compact.slice(0, 4)} ${compact.slice(4)}`;
    }),
  city: z.string().trim().min(2).max(100),
});

export type ValidCustomer = z.infer<typeof customerSchema>;
