import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-8">
      <Image
        src="/Logo.png"
        alt="Pewes Skor"
        width={160}
        height={60}
        priority
        className="h-14 w-auto object-contain"
      />
      <p
        className="text-center text-sm tracking-widest uppercase"
        style={{ fontFamily: "var(--font-inter), sans-serif", color: "var(--color-text-muted, #888)" }}
      >
        Hemsidan byggs om. Vi är snart uppe igen.
      </p>
    </div>
  );
}
