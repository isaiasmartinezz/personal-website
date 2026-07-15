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
    title: "Influence of Early Life Adversity on Academic, Behavioral, and Health Outcomes at Elementary School",
    authors: [
      "Anjali Gupta",
      "Maxwell Hartshorn",
      "Leilani Ivery",
      "Zoie Carter",
      "Jesse Tapia",
      "Harpreet Nijjer",
      "Isaias Martinez",
      "Cheryl Tolomeo",
      "Cynthia R. Rovnaghi",
      "Kanwaljeet J.S. Anand",
    ],
    venue: "Academic Pediatrics",
    year: "2026",
    type: "journal",
    abstract:
      "A longitudinal follow-up study (N=189) of children first assessed at preschool age, examining whether adverse childhood experiences (ACEs) and hair-based cortisol/oxytocin biomarkers measured in early childhood predict academic, behavioral, and health outcomes years later in elementary school. Greater ACE exposure was consistently and dose-dependently associated with worse outcomes across all three domains.",
    links: [
      { label: "Read the paper", href: "https://www.academicpedsjnl.net/article/S1876-2859(26)00042-2/fulltext" },
    ],
  },
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
  {
    title:
      "Liposome-Stabilized WNT3A Protein (L-WNT) Upregulates Adult Hepatic Stem Cells and Reduces Cell Death in Liver during Cold Preservation",
    authors: [
      "Isaias Martinez",
      "Bo Liu",
      "Fabiana Aellos",
      "Amarissa Ramos",
      "Marc L. Melcher",
      "Joshua Badshah",
      "Varvara A. Kirchner",
      "Jill A. Helms",
    ],
    venue: "Holman Research Day, Stanford Department of Surgery",
    year: "2024",
    abstract:
      "Studied L-WNT, a stabilized Wnt-pathway activator, as a liver pre-conditioning treatment to improve donor organ viability before transplantation. In mouse models, L-WNT treatment increased Wnt-responsive adult hepatic stem cells and reduced apoptotic cell death during cold storage, suggesting a potential way to improve outcomes for extended-criteria liver transplants.",
    links: [
      { label: "Read the abstract", href: "https://surgery.stanford.edu/holman/2024/L-WNT-upregulates-adult-hepatic-stem-cells.html" },
    ],
  },
  {
    title: "Exploring the Role of Wnt Signaling in the Liver",
    authors: [
      "Isaias Martinez",
      "Greta Cywinska",
      "Joshua Badshah",
      "Melanie Marin",
      "Danna Cruz",
      "Fabiana Aellos",
      "Bo Liu",
      "Jill A. Helms",
      "Varvara A. Kirchner",
    ],
    venue: "MCHRI DRIVE Program — also presented at the 2024 MCHRI Symposium and Stanford SURPS",
    year: "2024",
    abstract:
      "Using lineage tracing in a Wnt-reporter mouse model, examined how adult Wnt-responsive hepatic stem cells respond to ischemia-reperfusion injury (IRI) in the liver. Found a sharp rise in Wnt-responsive cells after injury without a matching increase in proliferation, suggesting IRI recruits hepatic cells into a Wnt-responsive state alongside an inflammatory response — a step toward understanding how the liver regenerates after injury.",
  },
];
