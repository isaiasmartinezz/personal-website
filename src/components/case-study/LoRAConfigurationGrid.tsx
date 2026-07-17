import type { LoraConfig } from "@/data/gpt2-case-study";

export function LoRAConfigurationGrid({ configs }: { configs: LoraConfig[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {configs.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-[color-mix(in_oklab,var(--m-lora)_30%,transparent)] bg-[color-mix(in_oklab,var(--m-lora)_6%,transparent)] p-5"
        >
          <p className="text-sm font-semibold text-fg">{c.label}</p>
          <div className="mt-3 flex gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">SST</p>
              <p className="mt-1 font-serif text-xl font-semibold text-fg">{c.sst.toFixed(3)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">CFIMDB</p>
              <p className="mt-1 font-serif text-xl font-semibold text-fg">{c.cfimdb.toFixed(3)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
