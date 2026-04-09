interface EccoHeroData {
  headline?: string;
  subheadline?: string;
}

interface Props {
  data?: EccoHeroData | null;
}

export default function EccoHero({ data }: Props) {
  const headline    = data?.headline    ?? "ECCO";
  const subheadline = data?.subheadline ?? "Danish Design, Global Quality";

  return (
    <section className="relative min-h-[795px] flex flex-col items-center justify-center overflow-hidden px-6 bg-surface">
      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <h1 className="font-(family-name:--font-manrope) text-[18vw] md:text-[8rem] font-extrabold tracking-tighter leading-none text-stone-900">
          {headline}
        </h1>
        <p className="font-(family-name:--font-manrope) text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-primary">
          {subheadline}
        </p>
        <div className="pt-12">
          {/* Scroll hint */}
          <span
            className="inline-block text-4xl text-outline animate-bounce"
            aria-label="Scrolla ned"
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
