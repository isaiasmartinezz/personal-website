import Image from "next/image";
import type { Photo } from "@/lib/life/types";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {photos.map((p) => (
        <figure key={p.path} className="overflow-hidden rounded-xl border border-border">
          <Image src={p.path} width={p.width} height={p.height} alt={p.alt} className="h-auto w-full" />
        </figure>
      ))}
    </div>
  );
}
