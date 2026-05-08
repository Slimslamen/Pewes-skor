"use client";

import dynamic from "next/dynamic";

function ShoeRiseFallback() {
  return <div className="relative bg-surface-container" style={{ height: "420vh" }} />;
}

const ShoeRise = dynamic(() => import("./ShoeRise"), {
  ssr: false,
  loading: () => <ShoeRiseFallback />,
});

export default function ShoeRiseClient() {
  return <ShoeRise />;
}
