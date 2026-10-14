import { type RoomId, roomNumber, rooms } from "@/lib/rooms";
import { cn } from "@/lib/utils";

type RoomProps = {
  id: RoomId;
  /** Width of the room during the horizontal walk, e.g. "110vw". */
  width?: string;
  tone?: "wall" | "plaster" | "green";
  className?: string;
  children: React.ReactNode;
};

const tones = {
  wall: "bg-ivory text-ink",
  plaster: "bg-plaster text-ink",
  green: "on-dark bg-botanical text-ivory",
};

/** One room of the exhibition. Stacks normally; becomes a full-height panel inside the walk. */
export function Room({ id, width = "100vw", tone = "wall", className, children }: RoomProps) {
  const name = rooms.find((r) => r.id === id)?.name ?? id;
  return (
    <section
      id={id}
      data-room={id}
      tabIndex={-1}
      aria-label={`Room ${roomNumber(id)}: ${name}`}
      style={{ "--room-w": width } as React.CSSProperties}
      className={cn(
        "relative shrink-0 scroll-mt-(--header-h) outline-none walk:h-full walk:w-(--room-w)",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

/** "Room 03 — The object" marker used at the top of every room. */
export function RoomTag({ id, className }: { id: RoomId; className?: string }) {
  const name = rooms.find((r) => r.id === id)?.name;
  return (
    <p className={cn("fig flex items-center gap-3", className)}>
      <span>Room {roomNumber(id)}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{name}</span>
    </p>
  );
}
