"use client";

import dynamic from "next/dynamic";

interface HeroData {
  heading?: string;
  address?: string;
  hours?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

function HeroShoe3DFallback() {
  // Matches the hero's stacked height so there's no layout jump while the
  // R3F bundle is still arriving.
  return (
    <div className="relative h-[500vh] md:h-[450vh] bg-surface-container">
      <div className="sticky top-0 h-screen" />
    </div>
  );
}

const HeroShoe3D = dynamic(() => import("./HeroShoe3D"), {
  ssr: false,
  loading: () => <HeroShoe3DFallback />,
});

export default function HeroShoe3DClient({ data }: { data?: HeroData | null }) {
  return <HeroShoe3D data={data} />;
}
