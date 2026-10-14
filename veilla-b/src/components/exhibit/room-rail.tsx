"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onElements } from "@/lib/on-elements";
import { goToRoom, rooms } from "@/lib/rooms";
import { cn } from "@/lib/utils";

/** Tracks which room is most in view. Works inside the transformed walk too. */
export function useCurrentRoom() {
  const pathname = usePathname();
  // Keyed by path so a stale room never shows after navigating away.
  const [seen, setSeen] = useState<{ path: string; id: string } | null>(null);

  useEffect(
    () =>
      onElements<HTMLElement>("[data-room]", (els) => {
        const ratios = new Map<string, number>();
        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries)
              ratios.set(
                (e.target as HTMLElement).dataset.room!,
                e.intersectionRect.width * e.intersectionRect.height,
              );
            let best: string | null = null;
            let max = 0;
            for (const [id, r] of ratios) if (r > max) [best, max] = [id, r];
            if (best) setSeen({ path: pathname, id: best });
          },
          { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
      }),
    [pathname],
  );

  return seen?.path === pathname ? seen.id : null;
}

/** Desktop: numbered rail across the header. Mobile: a one-line room counter. */
export function RoomRail({ variant }: { variant: "rail" | "counter" }) {
  const current = useCurrentRoom();
  if (!current) return null;
  const index = rooms.findIndex((r) => r.id === current);

  if (variant === "counter") {
    return (
      <p className="fig text-ink-soft" aria-live="off">
        Room {String(index + 1).padStart(2, "0")} /{" "}
        {String(rooms.length).padStart(2, "0")}
        <span className="ml-3 text-ink">{rooms[index]?.name}</span>
      </p>
    );
  }

  return (
    <nav aria-label="Rooms">
      <ol className="flex items-center gap-1">
        {rooms.map((room, i) => {
          const active = room.id === current;
          return (
            <li key={room.id}>
              <a
                href={`#${room.id}`}
                onClick={(e) => {
                  if (goToRoom(room.id)) e.preventDefault();
                }}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "fig flex h-9 items-center gap-2 px-2 transition-colors",
                  active ? "text-ink" : "text-ink-soft/70 hover:text-ink",
                )}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap",
                    active ? "max-w-48" : "sr-only",
                  )}
                >
                  {room.name}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
