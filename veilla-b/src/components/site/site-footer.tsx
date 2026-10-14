import Link from "next/link";
import { NeedsVerification } from "@/components/site/needs-verification";
import { PRODUCT_PATH } from "@/lib/site";

const links = [
  { href: "/", label: "The exhibition" },
  { href: PRODUCT_PATH, label: "Object record" },
  { href: "/faq", label: "Visitor questions" },
  { href: "/shipping-returns", label: "Getting it home" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark overflow-hidden bg-botanical-deep text-ivory">
      <div className="container-veil pt-16 pb-28 lg:pb-12">
        <p className="fig text-cocoa-soft">Exit</p>
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <ul className="space-y-3 lg:col-span-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-display text-2xl text-ivory/90 hover:text-ivory hover:italic">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-sm text-ivory/70 lg:col-span-4 lg:col-start-9">
            <p>
              Questions: hello@veilla.example
              <NeedsVerification note="Support email address" className="border-cocoa-soft text-cocoa-soft" />
            </p>
            <p className="mt-4">For external use on the scalp and hair. Patch test before first use.</p>
            <p className="mt-4">© 2026 Veilla</p>
          </div>
        </div>
        <p aria-hidden className="mt-16 font-display text-[clamp(5rem,24vw,22rem)] leading-[0.75] tracking-[-0.05em] text-ivory/10 select-none">
          Veilla
        </p>
      </div>
    </footer>
  );
}
