import { mockCart, mockCatalog } from "./mock-adapter";
import { shopifyCart, shopifyCatalog } from "./shopify-adapter";
import type { CartAdapter, CatalogAdapter } from "./types";

/**
 * The single switch between commerce providers.
 * Stripe Checkout would add a `stripe` branch: catalog from local data,
 * cart kept client-side (as in the mock), and getCheckoutUrl() POSTing the
 * cart to a route handler that creates a Checkout Session.
 */
const provider = process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? "mock";

export const catalog: CatalogAdapter = provider === "shopify" ? shopifyCatalog : mockCatalog;
export const cartAdapter: CartAdapter = provider === "shopify" ? shopifyCart : mockCart;
export const isMockCommerce = provider !== "shopify";

export { KIT_HANDLE } from "./catalog";
export type * from "./types";
