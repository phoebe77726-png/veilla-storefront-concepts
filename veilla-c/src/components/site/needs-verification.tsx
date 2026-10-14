import { cn } from "@/lib/utils";

/**
 * Marks copy that depends on a fact we have not confirmed (formula, directions,
 * policies). Deliberately visible so it cannot ship unnoticed.
 * Search the codebase for <NeedsVerification to find every open item.
 */
export function NeedsVerification({ note, className }: { note?: string; className?: string }) {
  return (
    <span
      className={cn(
        "ml-1 inline-flex items-center gap-1 border border-dashed border-cocoa/70 px-1.5 py-0.5 align-middle font-sans text-[0.625rem] font-semibold tracking-[0.12em] text-cocoa uppercase not-italic",
        className,
      )}
      title={note}
    >
      Needs verification
      {note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}
