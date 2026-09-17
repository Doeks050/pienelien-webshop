export type OrderItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
};
