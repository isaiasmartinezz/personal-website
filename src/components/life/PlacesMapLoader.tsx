"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "./PlacesMap";

const PlacesMap = dynamic(() => import("./PlacesMap"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse rounded-xl border border-border bg-surface-2" />,
});

export function PlacesMapLoader({ points }: { points: MapPoint[] }) {
  return <PlacesMap points={points} />;
}
