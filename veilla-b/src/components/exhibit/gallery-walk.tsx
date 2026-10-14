"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { goToRoom } from "@/lib/rooms";

const WALK_QUERY = "(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * The signature interaction. On wide screens with a mouse/trackpad, the rooms
 * are laid out in a row and normal vertical scrolling moves you sideways
 * through them (1px down = 1px across). Layout is decided in CSS (`walk:`),
 * so there is no layout flash; JS only measures distance and drives the transform.
 * Everywhere else the rooms simply stack.
 */
export function GalleryWalk({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(WALK_QUERY);
    const track = trackRef.current;
    const measure = () => {
      setActive(mq.matches);
      if (track) setDistance(Math.max(0, track.scrollWidth - document.documentElement.clientWidth));
    };
    measure();
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    if (track) ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", measure);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Arriving at /#gesture from another page: honour the hash once the walk is measured.
  useEffect(() => {
    if (!active || distance === 0) return;
    const id = window.location.hash.slice(1);
    if (id && trackRef.current?.querySelector(`#${CSS.escape(id)}`)) goToRoom(id);
  }, [active, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  return (
    <div
      ref={sectionRef}
      data-walk-active={active ? "true" : "false"}
      className="relative"
      style={active ? { height: `calc(100svh - var(--header-h) + ${distance}px)` } : undefined}
    >
      <div className="walk:sticky walk:top-(--header-h) walk:h-[calc(100svh-var(--header-h))] walk:overflow-hidden">
        <m.div
          ref={trackRef}
          data-walk-track
          style={active ? { x } : undefined}
          className="relative flex flex-col walk:h-full walk:w-max walk:flex-row"
        >
          {children}
        </m.div>
        {/* The sightline: an oil-coloured rule that fills as you walk. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-[3px] bg-sand/50 walk:block">
          <m.div className="h-full origin-left bg-oil" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
}
