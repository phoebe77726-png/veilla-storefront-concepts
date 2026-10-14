export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="container-veil grid gap-6 pt-14 pb-12 sm:pt-20 lg:grid-cols-12 lg:pb-16">
      <p className="eyebrow text-cocoa lg:col-span-2 lg:pt-4">{eyebrow}</p>
      <div className="lg:col-span-8">
        <h1 className="text-display-l">{title}</h1>
        {children ? <div className="mt-6 max-w-xl text-ink-soft">{children}</div> : null}
      </div>
    </header>
  );
}
