import type { Money } from "@/lib/commerce/types";

export function formatMoney({ amount, currencyCode }: Money) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(amount);
}
