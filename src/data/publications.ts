import type { Publication } from "@/lib/types";

// ---------------------------------------------------------------------------
// Publications / Research
// ---------------------------------------------------------------------------
// Reverse-chronological. Your own name is bolded automatically wherever it
// appears in `authors` (it matches against site.name). Add formal papers here
// as you publish them — see the commented example in git history / types.ts.
// ---------------------------------------------------------------------------

export const publications: Publication[] = [
  {
    title:
      "Hemodynamic Effects of Virtual Stenting in the Fontan Circulation at Rest and During Exercise",
    authors: ["Isaias Martinez"],
    venue: "B.S. Honors Thesis, Stanford University — Marsden Lab (advisor: Dr. Alison Marsden)",
    year: "2026",
    abstract:
      "Patient-specific computational fluid dynamics study of how virtual stent placement alters Fontan hemodynamics — pressure drop and flow — at rest and during exercise, built with SimVascular modeling and simulation.",
    links: [
      { label: "PDF", href: "/projects/fontan-virtual-stenting-thesis.pdf" },
    ],
  },
];
