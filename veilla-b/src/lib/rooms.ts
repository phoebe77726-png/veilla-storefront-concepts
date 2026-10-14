/** The exhibition's floor plan. Order is the order of the walk. */
export const rooms = [
  { id: "entrance", name: "Entrance" },
  { id: "note", name: "Curator’s note" },
  { id: "object", name: "The object" },
  { id: "gesture", name: "The gesture" },
  { id: "materials", name: "Materials" },
  { id: "ritual", name: "Order of the ritual" },
  { id: "visitors-book", name: "Visitor’s book" },
  { id: "questions", name: "Visitor questions" },
  { id: "take-it-home", name: "Take it home" },
] as const;

export type RoomId = (typeof rooms)[number]["id"];

export function roomNumber(id: RoomId) {
  return String(rooms.findIndex((r) => r.id === id) + 1).padStart(2, "0");
}

/**
 * Scrolls to a room. Rooms inside the active horizontal walk sit at a vertical
 * scroll offset equal to their horizontal offset (the walk maps 1px down to 1px across).
 */
export function goToRoom(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  const walk = el.closest<HTMLElement>('[data-walk-active="true"]');
  if (walk) {
    const top = walk.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + el.offsetLeft, behavior });
  } else {
    el.scrollIntoView({ behavior, block: "start" });
  }
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
  return true;
}
