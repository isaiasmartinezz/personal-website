import type { Project } from "@/lib/types";

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
//   • `slug` must be unique and URL-safe (lowercase, hyphens).
//   • `featured: true` gives the project a page at /projects/<slug> and pulls
//     it onto the home page. Order in this array = display order.
//   • `tags` power the filter buttons on the Projects page.
//   • `image` is optional; a gradient placeholder renders if omitted. Add real
//     screenshots/diagrams in public/images/projects/ and set image + imageAlt.
//   • `links.type`: "demo" | "code" | "paper" | "writeup" | "other".
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "coquest",
    title: "CoQuest — Spontaneous Social Coordination",
    summary:
      "A full-stack React Native + Firebase app that lets students broadcast and join spontaneous hangouts in real time — live in a 3-day pilot, 10 users generated 67 quests.",
    description:
      "College students have moments of free time but hesitate to reach out beyond their closest friends, so spontaneous hangouts rarely happen. CoQuest lets users broadcast lightweight, time-boxed \"quests\" (e.g. \"Jamba run in 5\") to a live campus map and to custom friend groups, so saying yes is a single tap and staying silent carries no social cost. Built end-to-end in React Native with a Firebase/Firestore backend, it was piloted with a real cohort of Stanford students, who used it to coordinate actual in-person meetups.",
    category: "Web",
    tags: [
      "React Native",
      "TypeScript",
      "Firebase Authentication",
      "Firestore",
      "Real-Time Listeners",
      "LocationIQ",
      "Geolocation",
      "Mobile UI Design",
      "Social Computing",
      "Product Experimentation",
    ],
    featured: true,
    year: "2025",
    image: "/images/projects/coquest.jpg",
    imageAlt: "CoQuest's live campus map showing quest pins near Stanford landmarks",
    role: "Team of 4 — Social Computing",
    highlights: [
      "Built a full-stack mobile app (React Native + Firebase) with Firestore-backed real-time listeners for live quest feeds and RSVP counts, and Firebase Auth gated to campus email addresses.",
      "Integrated the LocationIQ API to reverse-geocode quest locations onto a live map, with subscriptions scoped per-user to minimize data usage and keep updates lag-free.",
      "Piloted with a real user cohort: 10 users generated 67 quests over a 3-day deployment, and iterative UX fixes cut average quest-creation time from 18 seconds to under 7.",
      "Designed the data model (users, quests, groups) and read/write flows in Firestore, handling race conditions and async writes for consistent RSVP state.",
    ],
    links: [
      { label: "Code", href: "https://github.com/taralyn26/CoQuest-project", type: "code" },
    ],
  },
  {
    slug: "gpt2-from-scratch",
    title: "Parameter-Efficient Adaptation of GPT-2",
    summary:
      "Built a GPT-2 Transformer from scratch and benchmarked parameter-efficient adaptation methods (LoRA, ReFT, soft prompts) against full fine-tuning — ReFT matched or beat full fine-tuning accuracy using 0.02% of the trainable parameters.",
    description:
      "Our team implemented a decoder-only Transformer in the GPT-2 style — token and positional embeddings, causal multi-head self-attention, pre-LayerNorm blocks with residual connections, and output/embedding weight tying — with support for loading pretrained GPT-2 weights. We then used it as a shared backbone to study parameter-efficient adaptation across sentiment classification, paraphrase detection, and conditional sonnet generation, comparing full fine-tuning against LoRA, ReFT, and soft prompt tuning, and tuning decoding strategies for generation quality.",
    category: "ML",
    tags: [
      "Python",
      "PyTorch",
      "Transformers",
      "GPT-2",
      "LoRA",
      "ReFT",
      "Soft Prompt Tuning",
      "DPO",
      "Hyperparameter Tuning",
      "Autoregressive Decoding",
      "Statistical Analysis",
    ],
    featured: true,
    year: "2025",
    image: "/images/projects/gpt2-from-scratch.jpg",
    imageAlt: "Bar chart comparing peak GPU memory usage across fine-tuning methods on SST",
    role: "Team of 3",
    highlights: [
      "Implemented causal multi-head self-attention, pre-LayerNorm Transformer blocks, and embedding weight tying from scratch.",
      "On sentiment classification (SST), ReFT reached 0.526 accuracy — edging out full fine-tuning's 0.520 — while updating only 0.0178% of parameters (vs. 100%).",
      "On CFIMDB, ReFT held within 0.4 points of full fine-tuning's accuracy (0.976 vs. 0.980) while cutting peak GPU memory by roughly 62% (2,710 MB → 1,033 MB).",
      "Systematically studied how LoRA/ReFT rank and intervention-layer placement trade off accuracy, overfitting, and compute across two datasets.",
    ],
    links: [
      { label: "Report (PDF)", href: "/projects/gpt2-cs224n.pdf", type: "paper" },
    ],
  },
  {
    slug: "biosurveillance-digital-immune-system",
    title: "Biosurveillance “Digital Immune System”",
    summary:
      "An interactive early-warning dashboard that fuses wastewater viral load, hospital admissions, and air-quality signals into a single biosecurity risk index with tiered alerts.",
    description:
      "Biological threats often emerge before they're formally detected. Founded and led at Stanford's Gordian Knot Center for National Security Innovation, this “digital immune system” inverts that pattern by detecting weak anomalies early across multiple public-health signals. The interactive dashboard — built in Python with Streamlit — ingests wastewater viral load, hospital admissions, and environmental air-quality data, computes rolling z-scores against recent baselines, and fuses them with adjustable weights into a unified risk score with High/Medium alert tiers. Users can upload their own CSVs or explore predefined outbreak and bioterror scenarios; planned extensions add machine learning and automated data ingestion.",
    category: "Systems",
    tags: [
      "Python",
      "Streamlit",
      "Pandas",
      "Time-Series Analysis",
      "Rolling Statistics",
      "Anomaly Detection",
      "Data Fusion",
      "Data Visualization",
      "Scenario Simulation",
      "Biosecurity",
      "Public-Health Surveillance",
    ],
    featured: true,
    year: "2025",
    image: "/images/projects/biosurveillance-digital-immune-system.jpg",
    imageAlt: "Digital Immune System dashboard showing risk summary and wastewater, hospital, and air-quality trend lines",
    role: "Founder & Project Lead — Gordian Knot Center for National Security Innovation",
    highlights: [
      "Fused wastewater, hospital-admission, and air-quality streams into a unified risk index using rolling z-scores and adjustable weights.",
      "Built an interactive Streamlit dashboard with CSV upload, scenario simulation (baseline / outbreak / bioterror), trend and standardized plots, and tiered alerts.",
      "Standardized heterogeneous signals to surface weak early-warning anomalies before they become obvious.",
      "Authored a companion strategic brief outlining how the prototype could scale into a distributed national early-warning network.",
    ],
    links: [
      { label: "Live Demo", href: "https://isaiasmartinezz-digitalimmunesystem-dashboard-ulzdkl.streamlit.app/", type: "demo" },
      { label: "Code", href: "https://github.com/isaiasmartinezz/DigitalImmuneSystem", type: "code" },
      { label: "Report (PDF)", href: "/projects/biosurveillance-report.pdf", type: "writeup" },
    ],
  },
  {
    slug: "fontan-virtual-stenting",
    title: "Virtual Stenting in the Fontan Circulation",
    summary:
      "A patient-specific computational pipeline — 3D modeling, mesh generation, and CFD simulation — quantifying how virtual stent placement changes cardiovascular hemodynamics at rest and during exercise.",
    description:
      "Patients with single-ventricle congenital heart disease undergo the Fontan operation, which can leave regions of elevated pressure and abnormal flow. This honors thesis — conducted in Dr. Alison Marsden's lab — builds patient-specific 3D models of the Fontan circulation in SimVascular, virtually places stents to modify the geometry, and runs computational fluid dynamics simulations to quantify the hemodynamic effects (pressure drop and flow) at rest and during exercise across multiple patients.",
    category: "Research",
    tags: [
      "SimVascular",
      "svMorph",
      "Computational Fluid Dynamics",
      "4D Flow MRI",
      "Patient-Specific Modeling",
      "Medical Image Segmentation",
      "Vascular Geometry Reconstruction",
      "Tetrahedral Meshing",
      "Centerlines",
      "Transient Finite-Element Simulation",
      "Windkessel Boundary Conditions",
      "Python",
      "VTK",
      "Cardiovascular Biomechanics",
      "Congenital Heart Disease",
      "Fontan Circulation",
      "Virtual Intervention Planning",
    ],
    featured: true,
    year: "2026",
    image: "/images/projects/fontan-virtual-stenting.jpg",
    imageAlt: "Pipeline from 3D patient model to virtual stent placement to CFD pressure simulation, with a before/after pressure comparison",
    role: "Honors Thesis · Marsden Lab (advisor: Dr. Alison Marsden)",
    highlights: [
      "Engineered a patient-specific 3D modeling and simulation pipeline: vessel pathing, segmentation, volumetric meshing, and centerline generation in SimVascular.",
      "Scripted virtual stent placement to modify conduit geometry and ran CFD simulations comparing pre- vs. post-stent hemodynamics.",
      "Quantified pressure-drop and flow metrics at rest and during exercise across patients, reporting percent change after stenting.",
    ],
    links: [
      { label: "Thesis (PDF)", href: "/projects/fontan-virtual-stenting-thesis.pdf", type: "paper" },
    ],
  },
  {
    slug: "neonatal-photoacoustic-oximeter",
    title: "Neonatal Photoacoustic Oximeter",
    summary:
      "A miniaturized transesophageal photoacoustic sensor developed across four staged milestones to estimate pulmonary venous oxygen saturation in neonates with congenital heart disease.",
    category: "Research",
    tags: ["Medical Devices", "Biosensors", "Photoacoustics", "Hardware", "Signal Processing", "Neonatal Care"],
    featured: true,
    year: "2026",
    image: "/images/projects/neonatal-photoacoustic-oximeter.jpg",
    imageAlt: "Illustration of the E-PVO probe positioned transesophageally near the left atrium and pulmonary veins, with a sample oxygen-saturation readout",
    role: "Capstone Team Member",
    highlights: [
      "Contributed to defining the clinical need and system requirements for a minimally invasive transesophageal photoacoustic oximeter for neonates.",
      "Our team engineered a flexible probe and photoacoustic sensing/signal-processing approach to estimate pulmonary venous oxygen saturation.",
      "Iterated the design across four milestones spanning computational modeling, anatomical analysis, benchtop characterization, and hemoglobin-based validation.",
    ],
    links: [],
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
    image: "/images/projects/tripcompass-sf.jpg",
    imageAlt: "TripCompassSF itinerary planner showing a San Francisco route map and daily schedule",
    role: "Team of 2",
    highlights: [
      "Trained a feed-forward user–POI satisfaction model over engineered features (interest match, popularity, pace × duration).",
      "Integrated the model into a beam-search planner that assembles feasible itineraries under time, budget, and opening-hour constraints.",
      "Built a curated San Francisco POI catalog and a synthetic user–POI interaction dataset for training and evaluation.",
    ],
    links: [
      { label: "Code", href: "https://github.com/isaiasmartinezz/cs221-finalproject", type: "code" },
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
    image: "/images/projects/4d-flow-mri-hepatic-flow.jpg",
    imageAlt: "Hepatic flow pipeline concept visualization showing 4D Flow MRI slices and a 3D vascular flow render",
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
    image: "/images/projects/llm-fallacy-detection.jpg",
    imageAlt: "Concept dashboard illustrating model comparison and evaluation metrics for fallacy detection",
    highlights: [
      "Benchmarked LLMs for fallacy detection and built baselines in Python (transformers, scikit-learn) with precision/recall/F1 reporting.",
      "Curated datasets and prompts; implemented ETL, feature engineering, and reproducible evaluation pipelines.",
      "Co-developed a fallacy detector and ran ablation studies and error analysis to refine model design.",
    ],
    links: [],
  },
  {
    slug: "centrifuge",
    title: "Centrifuge — Phase-Aware Notifications",
    summary:
      "Redesigned a benchtop centrifuge with color-coded visual and auditory cues for each operation phase, so users can safely step away during long runs.",
    category: "Research",
    tags: ["Embedded Systems", "Hardware", "UX", "Bioengineering"],
    featured: false,
    year: "2024",
    image: "/images/projects/centrifuge.jpg",
    imageAlt: "The rebuilt centrifuge prototype with its LCD control display reading \"Press Start To Begin\"",
    role: "Bioengineering Team",
    highlights: [
      "Added color-coded phase indicators (pre-run, centrifugation, post-run) and audible cues at run start and finish.",
      "Closed a real usability gap: users previously had to stay next to the device to know when samples were ready.",
    ],
    links: [],
  },
  {
    slug: "paingone-painguin",
    title: "PainGone PainGuin — Pediatric Recovery Companion",
    summary:
      "A biodesign concept pairing a companion app with a physical plush penguin to help kids and parents manage recovery after pediatric tonsillectomy, cutting readmissions.",
    description:
      "Pediatric tonsillectomy patients face high 7-day readmission rates driven largely by dehydration and uncontrolled pain, and parent interviews revealed real, sometimes dangerous gaps in discharge comprehension (\"I only drank a few sips of water and fainted on day 2\"). PainGone PainGuin addresses this with a companion app — paired with a physical plush penguin — that tracks post-op recovery, answers questions via a chatbot, engages kids through a gamified \"PainGuin world,\" and connects directly to the care team. The team defined quantitative efficacy/usability/cost targets (e.g. ≥40% reduction in 7-day readmissions, ≤$20 total cost per patient) and mapped a path to adoption starting with a pilot in the Stanford CHARIOT Program.",
    category: "Research",
    tags: ["Healthcare Innovation", "Product Design", "User Research", "Biodesign"],
    featured: false,
    year: "2026",
    image: "/images/projects/paingone-painguin.jpg",
    imageAlt: "The PainGuin companion app's recovery dashboard next to the physical plush penguin",
    role: "Biodesign Team",
    highlights: [
      "Conducted patient/caregiver interviews to identify dangerous gaps in post-operative discharge comprehension.",
      "Defined quantitative need criteria (efficacy, usability, cost, safety) grounded in clinical literature, e.g. ≥40% reduction in 7-day readmissions and ≤$20 cost per patient.",
      "Designed a companion app + physical device concept and a business model with a staged path to hospital and insurer adoption.",
    ],
    links: [
      { label: "Presentation", href: "https://www.canva.com/design/DAG5rcD2HdU/IsiQLIv7jgIYJvNsEnBm1A/view", type: "writeup" },
    ],
  },
  {
    slug: "brain-injury-connection",
    title: "Brain Injury Connection — Accessible Redesign",
    summary:
      "As product manager with Develop for Good, led an accessible, cognitive-friendly website redesign for acquired-brain-injury patients and caregivers.",
    description:
      "Brain Injury Connection (BIC) needed an accessible, easy-to-navigate home for its community of ABI survivors, caregivers, and families. As product manager with Develop for Good, I led the redesign end-to-end: defining requirements, mapping user flows, and coordinating a team of engineers and designers. The rebuilt site foregrounds a 988 crisis-line banner, a filterable resource library connecting families to local support organizations, an events and community hub, and an FAQ built from real caregiver questions — all designed around cognitive-friendly, low-friction navigation for users who may themselves be recovering from brain injury.",
    category: "Web",
    tags: ["Product Management", "Accessibility", "UX", "Web"],
    featured: true,
    year: "2025",
    image: "/images/projects/brain-injury-connection.jpg",
    imageAlt: "The redesigned Brain Injury Connection website shown across laptop and tablet screens",
    video: "/videos/brain-injury-connection.mp4",
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
