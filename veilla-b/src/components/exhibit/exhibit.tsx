import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type WallLabelProps = {
  fig: string;
  title: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** A museum wall label: figure number, title, then plain facts. */
export function WallLabel({ fig, title, children, tone = "light", className }: WallLabelProps) {
  return (
    <figcaption
      className={cn(
        "w-full max-w-[19rem] border p-4 text-label",
        tone === "light" ? "border-sand bg-paper text-ink" : "border-ivory/25 bg-botanical-deep text-ivory",
        className,
      )}
    >
      <p className={cn("fig", tone === "light" ? "text-cocoa" : "text-cocoa-soft")}>Fig. {fig}</p>
      <p className="mt-2 font-display text-[1.25rem] leading-tight">{title}</p>
      {children ? (
        <div className={cn("mt-2", tone === "light" ? "text-ink-soft" : "text-ivory/75")}>{children}</div>
      ) : null}
    </figcaption>
  );
}

type ExhibitProps = {
  image: { src: StaticImageData | string; alt: string };
  frameClassName: string;
  imageClassName?: string;
  sizes: string;
  preload?: boolean;
  label: WallLabelProps;
  /** Where the label hangs relative to the photo on wide screens. */
  labelPlacement?: "below" | "overlap-left" | "overlap-right" | "side";
  className?: string;
};

/** A photograph hung on the wall with its label. */
export function Exhibit({
  image,
  frameClassName,
  imageClassName,
  sizes,
  preload,
  label,
  labelPlacement = "below",
  className,
}: ExhibitProps) {
  const placement = {
    below: "mt-4",
    "overlap-left": "mt-4 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0",
    "overlap-right": "mt-4 lg:absolute lg:-right-6 lg:-bottom-6 lg:mt-0",
    side: "mt-4 lg:absolute lg:bottom-0 lg:left-full lg:ml-6 lg:mt-0 lg:w-[17rem]",
  }[labelPlacement];

  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden bg-linen", frameClassName)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      <WallLabel {...label} className={cn(placement, label.className)} />
    </figure>
  );
}
