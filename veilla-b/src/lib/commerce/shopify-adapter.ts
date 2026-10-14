import type { Cart, CartAdapter, CatalogAdapter, Product } from "./types";

/**
 * Shopify Storefront API adapter — NOT YET CONNECTED.
 *
 * Enable with:
 *   NEXT_PUBLIC_COMMERCE_PROVIDER=shopify
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<public Storefront API access token>
 *
 * The public Storefront token is designed to be exposed to browsers, which is why
 * cart calls run client-side. Shopify's hosted checkout is returned by `checkoutUrl`.
 * This file compiles and maps Shopify's shapes onto ours, but has not been
 * exercised against a live store yet.
 */

const API_VERSION = "2026-07";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!domain || !token) throw new Error("Shopify Storefront env vars are not set");
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length || !json.data) {
    throw new Error(json.errors?.map((e) => e.message).join("; ") ?? `Storefront ${res.status}`);
  }
  return json.data;
}

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: ShopifyMoney;
        image: { url: string; altText: string | null; width: number; height: number } | null;
        product: { handle: string; title: string };
      };
    }[];
  };
};

const money = (m: ShopifyMoney) => ({ amount: Number(m.amount), currencyCode: m.currencyCode });

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText width height }
            product { handle title }
          }
        }
      }
    }
  }
`;

function toCart(c: ShopifyCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: money(c.cost.subtotalAmount),
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      merchandise: {
        variantId: l.merchandise.id,
        productHandle: l.merchandise.product.handle,
        productTitle: l.merchandise.product.title,
        variantTitle: l.merchandise.title,
        price: money(l.merchandise.price),
        image: l.merchandise.image
          ? {
              src: l.merchandise.image.url,
              alt: l.merchandise.image.altText ?? l.merchandise.product.title,
              width: l.merchandise.image.width,
              height: l.merchandise.image.height,
            }
          : null,
      },
    })),
  };
}

export const shopifyCatalog: CatalogAdapter = {
  async getProduct(handle) {
    const data = await storefront<{
      product: {
        id: string;
        handle: string;
        title: string;
        description: string;
        subtitle: { value: string } | null;
        images: { nodes: { url: string; altText: string | null; width: number; height: number }[] };
        variants: { nodes: { id: string; title: string; availableForSale: boolean; price: ShopifyMoney; compareAtPrice: ShopifyMoney | null }[] };
      } | null;
    }>(
      /* GraphQL */ `
        query Product($handle: String!) {
          product(handle: $handle) {
            id handle title description
            subtitle: metafield(namespace: "custom", key: "subtitle") { value }
            images(first: 10) { nodes { url altText width height } }
            variants(first: 10) {
              nodes { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } }
            }
          }
        }
      `,
      { handle },
    );
    const p = data.product;
    if (!p) return null;
    const product: Product = {
      id: p.id,
      handle: p.handle,
      title: p.title,
      subtitle: p.subtitle?.value ?? "",
      description: p.description,
      images: p.images.nodes.map((i) => ({ src: i.url, alt: i.altText ?? p.title, width: i.width, height: i.height })),
      variants: p.variants.nodes.map((v) => ({
        id: v.id,
        title: v.title,
        availableForSale: v.availableForSale,
        price: money(v.price),
        compareAtPrice: v.compareAtPrice ? money(v.compareAtPrice) : null,
      })),
      // TODO: source from a metafield once the Shopify product is set up.
      includes: [],
    };
    return product;
  },
};

export const shopifyCart: CartAdapter = {
  async getCart(cartId) {
    if (!cartId) return null;
    const data = await storefront<{ cart: ShopifyCart | null }>(
      `${CART_FIELDS} query Cart($id: ID!) { cart(id: $id) { ...CartFields } }`,
      { id: cartId },
    );
    return data.cart ? toCart(data.cart) : null;
  },

  async addLine(cartId, variantId, quantity) {
    const lines = [{ merchandiseId: variantId, quantity }];
    if (!cartId) {
      const data = await storefront<{ cartCreate: { cart: ShopifyCart } }>(
        `${CART_FIELDS} mutation Create($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { ...CartFields } } }`,
        { lines },
      );
      return toCart(data.cartCreate.cart);
    }
    const data = await storefront<{ cartLinesAdd: { cart: ShopifyCart } }>(
      `${CART_FIELDS} mutation Add($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ...CartFields } } }`,
      { id: cartId, lines },
    );
    return toCart(data.cartLinesAdd.cart);
  },

  async updateLine(cartId, lineId, quantity) {
    const data = await storefront<{ cartLinesUpdate: { cart: ShopifyCart } }>(
      `${CART_FIELDS} mutation Update($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ...CartFields } } }`,
      { id: cartId, lines: [{ id: lineId, quantity }] },
    );
    return toCart(data.cartLinesUpdate.cart);
  },

  async removeLine(cartId, lineId) {
    const data = await storefront<{ cartLinesRemove: { cart: ShopifyCart } }>(
      `${CART_FIELDS} mutation Remove($id: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $lineIds) { cart { ...CartFields } } }`,
      { id: cartId, lineIds: [lineId] },
    );
    return toCart(data.cartLinesRemove.cart);
  },

  async getCheckoutUrl(cart) {
    if (!cart.checkoutUrl) throw new Error("Cart has no checkout URL");
    return cart.checkoutUrl;
  },
};
