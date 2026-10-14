import type { StaticImageData } from "next/image";

/**
 * Provider-neutral commerce models. UI components only ever see these types,
 * so swapping the mock adapter for Shopify Storefront or Stripe Checkout does
 * not touch any component.
 */

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductImage = {
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  compareAtPrice?: Money | null;
  availableForSale: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  includes: { title: string; detail: string }[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    variantId: string;
    productHandle: string;
    productTitle: string;
    variantTitle: string;
    price: Money;
    image: ProductImage | null;
  };
};

export type Cart = {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: Money;
  checkoutUrl: string | null;
};

/** Read-only catalog access. Safe to call from Server Components. */
export interface CatalogAdapter {
  getProduct(handle: string): Promise<Product | null>;
}

/** Cart mutations. Called from the browser via CartProvider. */
export interface CartAdapter {
  getCart(cartId: string | null): Promise<Cart | null>;
  addLine(cartId: string | null, variantId: string, quantity: number): Promise<Cart>;
  updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart>;
  removeLine(cartId: string, lineId: string): Promise<Cart>;
  /** Returns a URL to hand the shopper off to checkout. */
  getCheckoutUrl(cart: Cart): Promise<string>;
}
