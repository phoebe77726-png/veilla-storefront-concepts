/**
 * Runs `setup` for every element matching `selector`, and again whenever the
 * set changes. Page content can stream in after the header hydrates, so a
 * one-off querySelectorAll in an effect may see nothing.
 * Returns a cleanup function for useEffect.
 */
export function onElements<T extends Element = HTMLElement>(
  selector: string,
  setup: (els: T[]) => (() => void) | void,
) {
  let teardown: (() => void) | void;
  let signature = "";

  const run = () => {
    const els = Array.from(document.querySelectorAll<T>(selector));
    const next = String(els.length);
    if (next === signature) return;
    signature = next;
    teardown?.();
    teardown = els.length > 0 ? setup(els) : undefined;
  };

  run();
  const mo = new MutationObserver(run);
  mo.observe(document.body, { childList: true, subtree: true });
  return () => {
    mo.disconnect();
    teardown?.();
  };
}
