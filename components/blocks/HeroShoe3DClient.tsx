"use client";

import dynamic from "next/dynamic";

function HeroShoe3DFallback() {
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

export default function HeroShoe3DClient() {
  return <HeroShoe3D />;
}
