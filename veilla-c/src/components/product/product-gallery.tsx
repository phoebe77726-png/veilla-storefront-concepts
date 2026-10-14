"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const active = images[index];
  if (!active) return null;

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-plaster">
        <Image
          key={index}
          src={active.src}
          alt={active.alt}
          fill
          preload={index === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-in object-cover fade-in duration-300"
        />
        <p className="absolute right-3 bottom-3 bg-ivory/90 px-2 py-1 text-xs tabular-nums text-ink" aria-hidden>
          {index + 1} / {images.length}
        </p>
      </div>

      <ul className="flex gap-2 overflow-x-auto pb-1 lg:w-20 lg:flex-col lg:overflow-visible" aria-label={`${title} images`}>
        {images.map((image, i) => (
          <li key={i} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              className={cn(
                "relative block size-18 overflow-hidden border-2 transition-colors lg:size-20",
                i === index ? "border-botanical" : "border-transparent opacity-75 hover:opacity-100",
              )}
            >
              <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
