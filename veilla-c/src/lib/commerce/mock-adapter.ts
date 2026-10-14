import { sampleCatalog } from "./catalog";
import type { Cart, CartAdapter, CartLine, CatalogAdapter } from "./types";

/**
 * Mock adapter: catalog from sample data, cart persisted in localStorage.
 * Behaves like a remote API (async, returns a fresh Cart) so the UI already
 * handles pending states the way it will against Shopify.
 */

const STORAGE_KEY = "veilla.mock-cart.v1";
const MAX_LINE_QUANTITY = 10;

function findVariant(variantId: string) {
  for (const product of sampleCatalog) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

function summarize(id: string, lines: CartLine[]): Cart {
  const currencyCode = lines[0]?.merchandise.price.currencyCode ?? "USD";
  const subtotal = lines.reduce(
    (sum, line) => sum + line.merchandise.price.amount * line.quantity,
    0,
  );
  return {
    id,
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: { amount: Math.round(subtotal * 100) / 100, currencyCode },
    checkoutUrl: "/checkout",
  };
}

function read(): Cart | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as { id: string; lines: { id: string; variantId: string; quantity: number }[] };
    // Rehydrate from the catalog so prices and images are never stale.
    const lines: CartLine[] = stored.lines.flatMap((line) => {
      const match = findVariant(line.variantId);
      return match ? [toLine(line.id, match, line.quantity)] : [];
    });
    return summarize(stored.id, lines);
  } catch {
    return null;
  }
}

function write(cart: Cart) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        id: cart.id,
        lines: cart.lines.map((l) => ({ id: l.id, variantId: l.merchandise.variantId, quantity: l.quantity })),
      }),
    );
  } catch {
    // Private mode or storage disabled: cart still works for this page view.
  }
}

function toLine(
  id: string,
  { product, variant }: NonNullable<ReturnType<typeof findVariant>>,
  quantity: number,
): CartLine {
  return {
    id,
    quantity,
    merchandise: {
      variantId: variant.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      price: variant.price,
      image: product.images[0] ?? null,
    },
  };
}

const latency = () => new Promise((resolve) => setTimeout(resolve, 280));

let memoryCart: Cart | null = null;

function current(cartId: string | null): Cart {
  const cart = read() ?? memoryCart;
  if (cart && (!cartId || cart.id === cartId)) return cart;
  return summarize(`mock-${crypto.randomUUID()}`, []);
}

function commit(cart: Cart) {
  memoryCart = cart;
  write(cart);
  return cart;
}

export const mockCatalog: CatalogAdapter = {
  async getProduct(handle) {
    return sampleCatalog.find((p) => p.handle === handle) ?? null;
  },
};

export const mockCart: CartAdapter = {
  async getCart() {
    return read() ?? memoryCart;
  },

  async addLine(cartId, variantId, quantity) {
    await latency();
    const match = findVariant(variantId);
    if (!match) throw new Error(`Unknown variant ${variantId}`);
    const cart = current(cartId);
    const existing = cart.lines.find((l) => l.merchandise.variantId === variantId);
    const lines = existing
      ? cart.lines.map((l) =>
          l.id === existing.id ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_LINE_QUANTITY) } : l,
        )
      : [...cart.lines, toLine(`line-${crypto.randomUUID()}`, match, Math.min(quantity, MAX_LINE_QUANTITY))];
    return commit(summarize(cart.id, lines));
  },

  async updateLine(cartId, lineId, quantity) {
    await latency();
    const cart = current(cartId);
    const lines =
      quantity <= 0
        ? cart.lines.filter((l) => l.id !== lineId)
        : cart.lines.map((l) => (l.id === lineId ? { ...l, quantity: Math.min(quantity, MAX_LINE_QUANTITY) } : l));
    return commit(summarize(cart.id, lines));
  },

  async removeLine(cartId, lineId) {
    return mockCart.updateLine(cartId, lineId, 0);
  },

  async getCheckoutUrl() {
    return "/checkout";
  },
};

export { MAX_LINE_QUANTITY };
