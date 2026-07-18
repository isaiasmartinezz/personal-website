import Image from "next/image";
import { ArrowRightIcon } from "@/components/Icons";

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">{step}</span>
          {i < steps.length - 1 && <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-subtle" />}
        </span>
      ))}
    </div>
  );
}

export function FabricationTracks({
  enclosureExplanation,
  enclosureFlow,
  enclosureImage,
  rotorExplanation,
  rotorFlow,
  rotorImage,
  rotorTradeoff,
}: {
  enclosureExplanation: string[];
  enclosureFlow: string[];
  enclosureImage: { src: string; alt: string; width: number; height: number };
  rotorExplanation: string[];
  rotorFlow: string[];
  rotorImage: { src: string; alt: string; width: number; height: number };
  rotorTradeoff: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div>
        <h3 className="text-base font-semibold text-fg">Laser-cut enclosure</h3>
        <ul className="mt-3 space-y-1.5">
          {enclosureExplanation.map((e) => (
            <li key={e} className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60">
              {e}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Flow steps={enclosureFlow} />
        </div>
        <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={enclosureImage.src}
            alt={enclosureImage.alt}
            width={enclosureImage.width}
            height={enclosureImage.height}
            className="h-auto w-full"
          />
        </figure>
      </div>

      <div>
        <h3 className="text-base font-semibold text-fg">3D-printed rotor assembly</h3>
        <ul className="mt-3 space-y-1.5">
          {rotorExplanation.map((e) => (
            <li key={e} className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent/60">
              {e}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Flow steps={rotorFlow} />
        </div>
        <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={rotorImage.src}
            alt={rotorImage.alt}
            width={rotorImage.width}
            height={rotorImage.height}
            className="h-auto w-full"
          />
        </figure>
        <p className="mt-4 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm leading-relaxed text-fg">
          {rotorTradeoff}
        </p>
      </div>
    </div>
  );
}
