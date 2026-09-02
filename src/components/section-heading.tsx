import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="label-tag label-tag--accent mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-muted leading-relaxed">{description}</p>}
    </div>
  );
}
