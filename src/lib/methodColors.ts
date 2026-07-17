// Shared color mapping for adaptation methods on the GPT-2 case-study page.
// The CSS custom properties themselves (--m-full, --m-lora, etc.) are defined
// under the `.method-accent` scope in globals.css, light + dark variants.
// Centralized here so every component (method explorer, efficiency chart,
// layer explorer, LoRA grid, etc.) stays visually consistent.

export type MethodKey = "full" | "lora" | "reft" | "soft" | "linear" | "decode";

export const METHOD_LABEL: Record<MethodKey, string> = {
  full: "Full fine-tuning",
  lora: "LoRA",
  reft: "ReFT",
  soft: "Soft prompts",
  linear: "Last linear layer",
  decode: "Decoding & reranking",
};

export const METHOD_VAR: Record<MethodKey, string> = {
  full: "--m-full",
  lora: "--m-lora",
  reft: "--m-reft",
  soft: "--m-soft",
  linear: "--m-linear",
  decode: "--m-decode",
};

export const METHOD_TEXT: Record<MethodKey, string> = {
  full: "text-[color:var(--m-full)]",
  lora: "text-[color:var(--m-lora)]",
  reft: "text-[color:var(--m-reft)]",
  soft: "text-[color:var(--m-soft)]",
  linear: "text-[color:var(--m-linear)]",
  decode: "text-[color:var(--m-decode)]",
};

export const METHOD_BORDER: Record<MethodKey, string> = {
  full: "border-[color-mix(in_oklab,var(--m-full)_45%,transparent)]",
  lora: "border-[color-mix(in_oklab,var(--m-lora)_45%,transparent)]",
  reft: "border-[color-mix(in_oklab,var(--m-reft)_45%,transparent)]",
  soft: "border-[color-mix(in_oklab,var(--m-soft)_45%,transparent)]",
  linear: "border-[color-mix(in_oklab,var(--m-linear)_45%,transparent)]",
  decode: "border-[color-mix(in_oklab,var(--m-decode)_45%,transparent)]",
};

export const METHOD_SOFT_BG: Record<MethodKey, string> = {
  full: "bg-[color-mix(in_oklab,var(--m-full)_8%,transparent)]",
  lora: "bg-[color-mix(in_oklab,var(--m-lora)_10%,transparent)]",
  reft: "bg-[color-mix(in_oklab,var(--m-reft)_10%,transparent)]",
  soft: "bg-[color-mix(in_oklab,var(--m-soft)_10%,transparent)]",
  linear: "bg-[color-mix(in_oklab,var(--m-linear)_8%,transparent)]",
  decode: "bg-[color-mix(in_oklab,var(--m-decode)_10%,transparent)]",
};

export const METHOD_DOT: Record<MethodKey, string> = {
  full: "bg-[color:var(--m-full)]",
  lora: "bg-[color:var(--m-lora)]",
  reft: "bg-[color:var(--m-reft)]",
  soft: "bg-[color:var(--m-soft)]",
  linear: "bg-[color:var(--m-linear)]",
  decode: "bg-[color:var(--m-decode)]",
};
