import Link from "next/link";
import { NeedsVerification } from "@/components/site/needs-verification";
import { PRODUCT_PATH } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: PRODUCT_PATH, label: "The Pre-Wash Scalp Kit" },
      { href: "/#ritual", label: "The ritual" },
      { href: "/#ingredients", label: "Ingredients" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-returns", label: "Shipping & returns" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="on-dark bg-botanical-deep text-ivory">
      <div className="container-veil pt-20 pb-28 sm:pt-28 lg:pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-display-l">
              Part. Place. <em className="text-cocoa-soft">Rest.</em>
            </p>
            <p className="mt-6 max-w-md text-ivory/75">
              One oil, one applicator, one considered step before you wash.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow font-sans text-cocoa-soft">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-ivory/85 hover:text-ivory hover:underline underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2">
              <h2 className="eyebrow font-sans text-cocoa-soft">Contact</h2>
              <p className="mt-5 text-ivory/85">
                hello@veilla.example
                <NeedsVerification note="Support email address" className="border-cocoa-soft text-cocoa-soft" />
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden className="mt-20 h-px bg-ivory/15" />
        <div className="mt-6 flex flex-col gap-3 text-sm text-ivory/60 sm:flex-row sm:justify-between">
          <p>© 2026 Veilla</p>
          <p>For external use on the scalp and hair. Patch test before first use.</p>
        </div>
      </div>
    </footer>
  );
}
