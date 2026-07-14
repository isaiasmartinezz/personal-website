import type { Project } from "@/lib/types";

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
//   • `slug` must be unique and URL-safe (lowercase, hyphens).
//   • `featured: true` gives the project a page at /projects/<slug> and pulls
//     it onto the home page.
//   • `tags` power the filter buttons on the Projects page.
//   • `image` is optional; a gradient placeholder renders if omitted. Add real
//     screenshots/diagrams in public/images/projects/ and set image + imageAlt.
//   • `links.type`: "demo" | "code" | "paper" | "writeup" | "other".
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "fontan-virtual-stenting",
    title: "Virtual Stenting in the Fontan Circulation",
    summary:
      "B.S. honors thesis: simulating how virtual stent placement changes hemodynamics in the Fontan circulation at rest and during exercise, using patient-specific CFD.",
    description:
      "Patients with single-ventricle congenital heart disease undergo the Fontan operation, which can leave regions of elevated pressure and abnormal flow. This honors thesis — conducted in Dr. Alison Marsden's lab — builds patient-specific 3D models of the Fontan circulation in SimVascular, virtually places stents to modify the geometry, and runs computational fluid dynamics simulations to quantify the hemodynamic effects (pressure drop and flow) at rest and during exercise across multiple patients.",
    category: "Research",
    tags: ["Computational Fluid Dynamics", "SimVascular", "Cardiovascular", "Medical Imaging", "Python", "Simulation"],
    featured: true,
    year: "2026",
    role: "Honors Thesis · Marsden Lab (advisor: Dr. Alison Marsden)",
    highlights: [
      "Built patient-specific 3D Fontan models from imaging in SimVascular: vessel pathing, segmentation, volumetric meshing, and centerline generation.",
      "Virtually placed stents to modify conduit geometry and simulated pre- vs. post-stent hemodynamics with CFD.",
      "Quantified pressure-drop and flow metrics at rest and during exercise across patients, reporting percent change after stenting.",
    ],
    links: [
      { label: "Thesis (PDF)", href: "/projects/fontan-virtual-stenting-thesis.pdf", type: "paper" },
    ],
  },
  {
    slug: "circumflex-epvo",
    title: "Circumflex — Neonatal Photoacoustic Oximeter",
    summary:
      "Two-quarter capstone: a miniaturized transesophageal photoacoustic oximetry probe to non-invasively measure pulmonary venous oxygen saturation in neonates with congenital heart disease.",
    description:
      "Neonates with congenital heart disease often need invasive measurements that extend NICU stays. As part of Team Circumflex (the BIOE 141A/B capstone), we designed the Esophageal Pulmonary Venous Oximeter (E-PVO): a flexible transesophageal probe positioned in the esophagus adjacent to the left atrium that uses photoacoustic sensing to non-invasively estimate pulmonary venous oxygen saturation — aiming to reduce length of stay in the NICU.",
    category: "Research",
    tags: ["Medical Devices", "Biosensors", "Photoacoustics", "Hardware", "Neonatal Care"],
    featured: true,
    year: "2026",
    role: "Capstone Team (Circumflex) — BIOE 141A/B",
    highlights: [
      "Defined the clinical need and concept for a minimally invasive transesophageal photoacoustic oximeter for neonates.",
      "Designed a flexible probe positioned adjacent to the left atrium to estimate pulmonary venous oxygen saturation.",
      "Iterated the design across milestone reviews spanning requirements, prototyping, and validation planning.",
    ],
    links: [],
  },
  {
    slug: "biosurveillance-digital-immune-system",
    title: "Biosurveillance “Digital Immune System”",
    summary:
      "An interactive early-warning dashboard that fuses wastewater viral load, hospital admissions, and air-quality signals into a single biosecurity risk index with tiered alerts.",
    description:
      "Biological threats often emerge before they're formally detected. Founded and led at Stanford's Gordian Knot Center for National Security Innovation, this “digital immune system” inverts that pattern by detecting weak anomalies early across multiple public-health signals. The interactive dashboard — built in Python with Streamlit — ingests wastewater viral load, hospital admissions, and environmental air-quality data, computes rolling z-scores against recent baselines, and fuses them with adjustable weights into a unified risk score with High/Medium alert tiers. Users can upload their own CSVs or explore predefined outbreak and bioterror scenarios; planned extensions add machine learning and automated data ingestion.",
    category: "Systems",
    tags: ["Python", "Streamlit", "Anomaly Detection", "Time-Series", "Data Fusion", "Biosecurity", "Data Visualization"],
    featured: true,
    year: "2025",
    role: "Founder & Project Lead — Gordian Knot Center for National Security Innovation",
    highlights: [
      "Fused wastewater, hospital-admission, and air-quality streams into a unified risk index using rolling z-scores and adjustable weights.",
      "Built an interactive Streamlit dashboard with CSV upload, scenario simulation (baseline / outbreak / bioterror), trend and standardized plots, and tiered alerts.",
      "Standardized heterogeneous signals to surface weak early-warning anomalies before they become obvious.",
    ],
    links: [
      { label: "Report (PDF)", href: "/projects/biosurveillance-report.pdf", type: "writeup" },
    ],
  },
  {
    slug: "gpt2-from-scratch",
    title: "Implementing GPT-2 from Scratch",
    summary:
      "A decoder-only Transformer built in the GPT-2 style, adapted across sentiment analysis, paraphrase detection, and sonnet generation — comparing full fine-tuning to LoRA, ReFT, and DPO.",
    description:
      "For CS224N (NLP with Deep Learning), our team implemented a decoder-only Transformer in the GPT-2 style — token and positional embeddings, causal multi-head self-attention, pre-LayerNorm blocks with residual connections, and output/embedding weight tying — with support for loading pretrained GPT-2 weights. We study how one backbone adapts to three downstream tasks (sentiment analysis, paraphrase detection, and conditional sonnet generation) and compare standard fine-tuning against parameter-efficient methods (LoRA, ReFT) and preference alignment (DPO), measuring the tradeoff between task performance and trainable-parameter efficiency.",
    category: "ML",
    tags: ["NLP", "Transformers", "PyTorch", "LoRA", "DPO", "LLMs"],
    featured: true,
    year: "2025",
    role: "Team of 3 — CS224N",
    highlights: [
      "Implemented causal multi-head self-attention, pre-LayerNorm Transformer blocks, and embedding weight tying from scratch.",
      "Built end-to-end training and evaluation pipelines for sentiment and paraphrase classification on the GPT-2 backbone.",
      "Compared full fine-tuning against LoRA / ReFT and DPO alignment, analyzing the performance-vs-efficiency tradeoff.",
    ],
    links: [
      { label: "Report (PDF)", href: "/projects/gpt2-cs224n.pdf", type: "paper" },
    ],
  },
  {
    slug: "tripcompass-sf",
    title: "TripCompassSF — Personalized Itinerary Planner",
    summary:
      "Generates budget- and time-aware daily itineraries for San Francisco by pairing a learned user–POI satisfaction model with a beam-search planner.",
    category: "ML",
    tags: ["Machine Learning", "Beam Search", "Python", "Recommender Systems"],
    featured: false,
    year: "2025",
    role: "Team of 2 — CS221",
    highlights: [
      "Trained a feed-forward user–POI satisfaction model over engineered features (interest match, popularity, pace × duration).",
      "Integrated the model into a beam-search planner that assembles feasible itineraries under time, budget, and opening-hour constraints.",
      "Built a curated San Francisco POI catalog and a synthetic user–POI interaction dataset for training and evaluation.",
    ],
    links: [
      { label: "Report (PDF)", href: "/projects/tripcompass-cs221.pdf", type: "paper" },
    ],
  },
  {
    slug: "4d-flow-mri-hepatic-flow",
    title: "4D Flow MRI Hepatic Flow Pipeline",
    summary:
      "A Python pipeline that extracts and quantifies hepatic flow metrics from 4D Flow MRI to study Fontan hemodynamics and AVM risk.",
    category: "Research",
    tags: ["Python", "NumPy", "SciPy", "Medical Imaging", "Signal Processing", "Data Visualization"],
    featured: false,
    year: "2025",
    role: "Researcher — Marsden Cardiovascular Biomechanics Lab",
    highlights: [
      "Extract and quantify hepatic flow metrics from 4D Flow MRI using NumPy, SciPy, and Matplotlib.",
      "Apply signal processing and pattern recognition for AVM biomarker detection, with statistical validation and visualization in Seaborn and Plotly.",
      "Automate reproducible benchmarking with Git/GitHub, Bash, and CI/CD.",
    ],
    links: [],
  },
  {
    slug: "llm-fallacy-detection",
    title: "LLM Fallacy Detection",
    summary:
      "Benchmarked large language models for logical-fallacy detection and co-developed a detector with reproducible evaluation pipelines.",
    category: "ML",
    tags: ["NLP", "LLMs", "Python", "scikit-learn", "Machine Learning"],
    featured: false,
    year: "2023",
    highlights: [
      "Benchmarked LLMs for fallacy detection and built baselines in Python (transformers, scikit-learn) with precision/recall/F1 reporting.",
      "Curated datasets and prompts; implemented ETL, feature engineering, and reproducible evaluation pipelines.",
      "Co-developed a fallacy detector and ran ablation studies and error analysis to refine model design.",
    ],
    links: [],
  },
  {
    slug: "v3-centrifuge",
    title: "V3 Centrifuge — Phase-Aware Notifications",
    summary:
      "Redesigned a benchtop centrifuge with color-coded visual and auditory cues for each operation phase, so users can safely step away during long runs.",
    category: "Research",
    tags: ["Embedded Systems", "Hardware", "UX", "Bioengineering"],
    featured: false,
    year: "2024",
    role: "Team 17 — Bioengineering Design",
    highlights: [
      "Added color-coded phase indicators (pre-run, centrifugation, post-run) and audible cues at run start and finish.",
      "Closed a real usability gap: users previously had to stay next to the device to know when samples were ready.",
    ],
    links: [],
  },
  {
    slug: "brain-injury-connection",
    title: "Brain Injury Connection — Accessible Redesign",
    summary:
      "As product manager with Develop for Good, led an accessible, cognitive-friendly website redesign for acquired-brain-injury patients and caregivers.",
    category: "Web",
    tags: ["Product Management", "Accessibility", "UX", "Web"],
    featured: false,
    year: "2025",
    role: "Product Manager — Develop for Good",
    highlights: [
      "Led end-to-end redesign of an accessible, cognitive-friendly website for ABI patients and caregivers.",
      "Defined product requirements, user flows, and feature scope, iterating with nonprofit stakeholders.",
      "Coordinated design and low/no-code implementation across a team of engineers and designers.",
    ],
    links: [
      { label: "Develop for Good", href: "https://www.developforgood.org", type: "other" },
    ],
  },
];
