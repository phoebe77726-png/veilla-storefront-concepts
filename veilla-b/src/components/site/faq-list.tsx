import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faq";

export function FaqList({ items, numbered = false }: { items: FaqItem[]; numbered?: boolean }) {
  return (
    <Accordion className="border-t border-sand">
      {items.map((item, i) => (
        <AccordionItem key={item.id} value={item.id} className="border-b border-sand">
          <AccordionTrigger className="gap-6 py-6 font-display text-[1.35rem] leading-snug font-normal hover:no-underline sm:text-[1.6rem] **:data-[slot=accordion-trigger-icon]:mt-1.5 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-cocoa">
            <span className="flex gap-5">
              {numbered ? <span className="fig mt-2.5 w-6 shrink-0 text-cocoa">Q{i + 1}</span> : null}
              <span>{item.q}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className={numbered ? "max-w-2xl pb-7 pl-11 text-body text-ink-soft [&_a]:text-ink" : "max-w-2xl pb-7 text-body text-ink-soft [&_a]:text-ink"}>
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
