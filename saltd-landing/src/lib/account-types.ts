/** Client-safe types shared between the account server actions and the UI. */

export type CustomerOrder = {
  number: string;          // e.g. "#1001"
  processedAt: string | null;
  financialStatus: string; // PAID, PENDING, REFUNDED…
  fulfillmentStatus: string; // FULFILLED, UNFULFILLED, PARTIALLY_FULFILLED…
  total: string;           // formatted, e.g. "₹2100.00"
  itemCount: number;
};

export type Customer = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  orders: CustomerOrder[];
};

export type OrderLineItem = {
  title: string;
  variant: string | null;
  quantity: number;
  total: string; // formatted line total
};

export type ShippingAddress = {
  name: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
} | null;

/** Result of a tracked-order lookup (guest, by order number + email). */
export type TrackedOrder = {
  number: string;
  processedAt: string | null;
  financialStatus: string;
  fulfillmentStatus: string;
  subtotal: string;
  shipping: string;
  total: string;
  lineItems: OrderLineItem[];
  shippingAddress: ShippingAddress;
  tracking: { number: string | null; url: string | null; company: string | null }[];
};

export type AuthResult = { ok: true } | { ok: false; error: string };
export type TrackResult = { ok: true; order: TrackedOrder } | { ok: false; error: string };
