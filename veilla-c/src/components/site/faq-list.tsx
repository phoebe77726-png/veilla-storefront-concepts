import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faq";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion className="border-t border-sand">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="border-b border-sand">
          <AccordionTrigger className="gap-6 py-6 font-display text-[1.35rem] leading-snug font-normal hover:no-underline sm:text-[1.5rem] **:data-[slot=accordion-trigger-icon]:mt-1.5 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-cocoa">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-7 text-body text-ink-soft [&_a]:text-ink">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
