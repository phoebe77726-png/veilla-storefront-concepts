"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  /** Describes what is being counted, e.g. "Pre-Wash Scalp Kit". */
  label: string;
  size?: "md" | "sm";
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled,
  label,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const button = cn(
    "grid place-items-center text-ink transition-colors hover:bg-linen disabled:cursor-not-allowed disabled:text-ink-soft/50 disabled:hover:bg-transparent",
    size === "md" ? "size-12" : "size-9",
  );

  return (
    <div
      role="group"
      aria-label={`Quantity, ${label}`}
      className={cn("inline-flex items-center border border-sand bg-paper", className)}
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <output
        aria-live="polite"
        aria-label={`Quantity ${value}`}
        className={cn("min-w-8 text-center tabular-nums", size === "md" ? "text-base" : "text-sm")}
      >
        {value}
      </output>
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
