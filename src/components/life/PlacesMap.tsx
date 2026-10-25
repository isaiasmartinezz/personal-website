"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPoint = { slug: string; title: string; lat: number; lng: number };

// Leaflet + OpenStreetMap tiles. circleMarker avoids Leaflet's default marker
// image assets (which don't bundle cleanly).
export default function PlacesMap({ points }: { points: MapPoint[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || points.length === 0) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;
      map = L.map(ref.current, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const bounds = L.latLngBounds([]);
      for (const p of points) {
        const marker = L.circleMarker([p.lat, p.lng], { radius: 8, weight: 2, fillOpacity: 0.8 }).addTo(map);
        const link = document.createElement("a");
        link.href = `/places/${p.slug}`;
        link.textContent = p.title;
        marker.bindPopup(link);
        bounds.extend([p.lat, p.lng]);
      }
      map.fitBounds(bounds.pad(0.2), { maxZoom: 14 });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [points]);

  return <div ref={ref} role="region" aria-label="Map of places" className="h-80 w-full overflow-hidden rounded-xl border border-border" />;
}
