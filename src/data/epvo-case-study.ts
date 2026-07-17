// ---------------------------------------------------------------------------
// E-PVO case study — structured content
// ---------------------------------------------------------------------------
// Rich, page-specific content for the Neonatal Photoacoustic Oximeter case
// study (src/app/projects/[slug]/epvo-case-study.tsx). Kept separate from the
// generic `projects` data (src/data/projects.ts) because this one project
// gets a fully custom detail-page layout instead of the shared template.
//
// Framing note: this was a two-quarter bioengineering capstone. Results below
// are computational, anatomical, or benchtop findings — not clinical
// validation. Keep new copy consistent with that distinction.
// ---------------------------------------------------------------------------

export type MilestoneStatus =
  | "Computational"
  | "Anatomical"
  | "Benchtop"
  | "Experimental";

export interface CaseStudyMetric {
  value: string;
  label: string;
  isTarget?: boolean;
}

export interface SystemStage {
  number: number;
  title: string;
  description: string;
}

export interface DataTable {
  headers: string[];
  rows: (string | number)[][];
  note?: string;
}

export interface Milestone {
  id: string;
  number: number;
  date: string;
  status: MilestoneStatus;
  question: string;
  whatWeDid: string[];
  notes?: string[];
  outcome: string[];
  targets?: string[];
  table?: DataTable;
  tableCaption?: string;
  tableEmphasis?: string;
}

export interface ConstraintRow {
  constraint: string;
  implication: string;
}

export interface PipelineStage {
  label: string;
  detail: string;
}

export interface ResultRow {
  concentration: string;
  meanVpp: number;
  sd: number;
}

export interface ResultsGroup {
  label: string;
  rows: ResultRow[];
  anovaF: number;
  pValue: string;
}

export interface Challenge {
  title: string;
  decision: string;
  whyItMattered: string;
}

export interface Contribution {
  label: string;
  text: string;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "RESEARCH · 2025–2026",
  title: "Neonatal Photoacoustic Oximeter",
  intro:
    "Designed a miniaturized transesophageal photoacoustic sensing system to estimate pulmonary venous oxygen saturation in neonates with congenital heart disease. Across four milestones, our team combined computational modeling, patient-relevant anatomical analysis, benchtop hardware characterization, and hemoglobin-based signal validation.",
  meta: [
    { label: "Role", value: "Capstone Team Member" },
    { label: "Course", value: "Stanford BIOE 141A/B" },
    { label: "Duration", value: "Two quarters" },
    { label: "Stage", value: "Benchtop validation" },
  ],
  heroCaption:
    "Illustration of probe placement in the esophagus, the sensing window near the left atrium and pulmonary veins, and the resulting signal estimate.",
};

// ---------------------------------------------------------------------------
// At-a-glance metrics
// ---------------------------------------------------------------------------
export const metrics: CaseStudyMetric[] = [
  { value: "4", label: "Staged engineering milestones" },
  { value: "8–15 mm", label: "Target anatomical sensing-depth envelope" },
  { value: "±5%", label: "Oxygen-saturation accuracy target", isTarget: true },
  { value: "200", label: "Peaks analyzed per condition, final benchtop study" },
];

// ---------------------------------------------------------------------------
// Clinical need / design response
// ---------------------------------------------------------------------------
export const clinicalNeed = {
  heading: "The clinical need",
  body: "Neonates with congenital heart disease often require invasive measurements to track oxygenation, and the neonatal chest and vasculature leave very little physical space for additional instrumentation. Our team's proposed system aims to obtain pulmonary venous oxygen-saturation information without vascular cannulation, using a route the body already has: the esophagus.",
};

export const designResponse = {
  heading: "Our design response",
  body: "The E-PVO is positioned transesophageally, adjacent to the left atrium and pulmonary veins. Multispectral optical pulses are delivered through miniature optical fibers and absorbed by hemoglobin; a co-located ultrasound receiver detects the resulting pressure waves, and bedside signal processing estimates oxygen saturation through spectral unmixing.",
};

export const pathwayComparison = {
  current: {
    label: "Current pathway",
    description: "Catheter-based or invasive measurement",
  },
  proposed: {
    label: "Proposed pathway",
    steps: ["Esophageal probe", "Photoacoustic signal", "Saturation estimate"],
  },
};

// ---------------------------------------------------------------------------
// How the system works
// ---------------------------------------------------------------------------
export const systemStages: SystemStage[] = [
  {
    number: 1,
    title: "Optical excitation",
    description: "Multispectral pulses travel through miniature optical fibers.",
  },
  {
    number: 2,
    title: "Hemoglobin absorption",
    description: "HbO₂ and HbR absorb different amounts of light at different wavelengths.",
  },
  {
    number: 3,
    title: "Photoacoustic response",
    description: "Absorbed energy generates transient thermoelastic pressure waves.",
  },
  {
    number: 4,
    title: "Acoustic detection",
    description: "A co-located ultrasound transducer records the resulting waveform.",
  },
  {
    number: 5,
    title: "Signal processing",
    description: "Filtering, spectral unmixing, and feature extraction recover blood-composition information.",
  },
  {
    number: 6,
    title: "Saturation estimate",
    description: "The processed result is translated into an estimated pulmonary venous oxygen saturation.",
  },
];

// ---------------------------------------------------------------------------
// Milestones
// ---------------------------------------------------------------------------
export const milestones: Milestone[] = [
  {
    id: "milestone-1",
    number: 1,
    date: "Fall 2025 / December 2025",
    status: "Computational",
    question: "Can raw photoacoustic voltage signals be converted into oxygen-saturation estimates?",
    whatWeDid: [
      "Built a simulated photoacoustic forward model",
      "Used hemoglobin extinction spectra",
      "Modeled a 5–7.5 MHz receive chain",
      "Implemented two-wavelength spectral unmixing",
      "Translated voltage signals into HbO₂, HbR, and estimated saturation",
    ],
    notes: [
      "Target depth: approximately 8–15 mm",
      "Pulse-energy study range: approximately 0.25–1.6 μJ per pulse",
      "Modeled post-pulse signal envelope remained below approximately 0.5 V",
    ],
    outcome: [
      "Established an expected signal range and an initial processing architecture",
      "Produced computational benchmarks for later hardware testing",
      "Did not constitute experimental validation because hardware was not yet available",
    ],
    targets: [
      "Calibration R² ≥ 0.9",
      "Mean absolute saturation error ≤ 5%",
      "Reproducible end-to-end processing",
    ],
  },
  {
    id: "milestone-2",
    number: 2,
    date: "February 2026",
    status: "Anatomical",
    question: "Can a transesophageal probe safely reach a useful sensing window within neonatal anatomical constraints?",
    whatWeDid: [
      "Reviewed neonatal and pediatric anatomical literature",
      "Segmented the esophagus and pulmonary venous region",
      "Created three-dimensional models in SimVascular",
      "Calculated closest-point distances between the esophageal wall and target vasculature",
      "Evaluated posterior, lateral, and centered probe orientations",
    ],
    outcome: [
      "Established an approximate 8–15 mm sensing-depth envelope",
      "Identified probe orientation as an important source of depth and signal variability",
      "Converted anatomical measurements into probe-diameter, placement, and sensing requirements",
    ],
    table: {
      headers: ["Anatomical model", "Posterior-facing", "Lateral-facing", "Centered", "Orientation range"],
      rows: [
        ["Model 1", "8.1 mm", "10.6 mm", "9.4 mm", "2.5 mm"],
        ["Model 2", "7.8 mm", "11.9 mm", "10.3 mm", "4.1 mm"],
        ["Model 3", "9.0 mm", "12.7 mm", "11.2 mm", "3.7 mm"],
      ],
    },
    tableEmphasis:
      "Posterior-facing orientations generally reduced the sensing distance in these representative models. This reflects three individual anatomical models, not a completed population-level clinical study.",
  },
  {
    id: "milestone-3",
    number: 3,
    date: "March 2026",
    status: "Benchtop",
    question: "Can the laser–transducer acquisition chain be operated repeatably and produce measurable transient signals?",
    whatWeDid: [
      "Assembled and troubleshot the optical and acoustic acquisition chain",
      "Established baseline transducer noise",
      "Standardized the laser, target, and transducer geometry",
      "Repeated each test condition across three trials",
    ],
    outcome: [
      "Established a repeatable baseline",
      "Identified operating conditions capable of generating measurable transient peaks",
      "Prepared the system for hemoglobin-containing samples",
    ],
  },
  {
    id: "milestone-4",
    number: 4,
    date: "Winter 2026",
    status: "Experimental",
    question: "Can the acquisition and processing pipeline distinguish signal differences in hemoglobin-containing samples?",
    whatWeDid: [
      "Tested hemoglobin concentrations of 25, 75, and 150 mg/mL",
      "Compared hemoglobin-only samples with fibrinogen-containing samples",
      "Aligned and averaged three replicate traces",
      "Subtracted matched background controls",
      "Localized high-energy regions using RMS analysis",
      "Applied matched filtering",
      "Extracted peak-to-peak voltage across 200 detected peaks per condition",
    ],
    outcome: [
      "The system detected composition-dependent differences in controlled hemoglobin samples",
      "The fibrinogen experiment demonstrated that biologically relevant matrix effects may confound amplitude-only measurements",
    ],
  },
];

// Milestone 3's parameter matrix — rendered as a compact grid rather than a table.
export const benchtopMatrix = {
  laserSettings: ["2.5", "5", "10"],
  distances: ["2 cm", "5 cm", "10 cm"],
  mediums: [
    "Lights on vs. lights off",
    "DI water",
    "Layered water-front configuration",
    "Carbon suspensions at 1, 2.5, and 5 mg/mL",
  ],
  metrics: [
    "Peak-to-peak voltage",
    "Absolute peak amplitude",
    "Signal RMS",
    "Noise RMS",
    "Peak-based SNR",
    "RMS-based SNR",
    "Peak timing",
  ],
};

// ---------------------------------------------------------------------------
// Anatomical & engineering constraints
// ---------------------------------------------------------------------------
export const constraints: ConstraintRow[] = [
  {
    constraint: "Approximately 8–15 mm target depth",
    implication: "Optical fluence and acoustic sensitivity must remain adequate across variable anatomy",
  },
  {
    constraint: "Limited esophageal lumen",
    implication: "The probe must remain miniaturized and flexible",
  },
  {
    constraint: "Esophageal wall and intervening tissue",
    implication: "Tissue attenuation must be included in the sensing budget",
  },
  {
    constraint: "Rotational variability",
    implication: "The sensing window should tolerate imperfect probe orientation",
  },
  {
    constraint: "Wall apposition and acoustic coupling",
    implication: "Mechanical design must maintain safe, consistent contact",
  },
  {
    constraint: "Neonatal optical safety",
    implication: "Pulse energy and thermal exposure require conservative limits",
  },
  {
    constraint: "Composition-dependent signal behavior",
    implication: "Calibration cannot rely on amplitude alone",
  },
];

// ---------------------------------------------------------------------------
// Signal-processing pipeline (final experimental sequence)
// ---------------------------------------------------------------------------
export const pipelineStages: PipelineStage[] = [
  { label: "Raw oscilloscope traces", detail: "Capture the raw transient waveform from each trial." },
  { label: "Align three replicates", detail: "Time-align the three repeated trials for each condition." },
  { label: "Compute aligned mean", detail: "Average the aligned replicates into a single representative trace." },
  { label: "Subtract matched blank", detail: "Remove the matched background-control trace to isolate the sample response." },
  { label: "Remove baseline drift", detail: "Correct for slow drift unrelated to the photoacoustic signal." },
  { label: "Light denoising", detail: "Apply conservative smoothing without distorting peak timing or amplitude." },
  { label: "Locate RMS-energy region", detail: "Identify the window of highest signal energy for peak analysis." },
  { label: "Matched-filter peak detection", detail: "Apply matched filtering to detect candidate peaks reliably." },
  { label: "Extract 200 Vpp measurements", detail: "Measure peak-to-peak voltage across 200 detected peaks per condition." },
  { label: "Run ANOVA & pairwise comparisons", detail: "Test whether concentration groups differ statistically." },
];

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------
export const results: { hemoglobin: ResultsGroup; fibrinogen: ResultsGroup } = {
  hemoglobin: {
    label: "Hemoglobin only",
    rows: [
      { concentration: "25 mg/mL", meanVpp: 4.605, sd: 0.555 },
      { concentration: "75 mg/mL", meanVpp: 4.345, sd: 0.592 },
      { concentration: "150 mg/mL", meanVpp: 5.782, sd: 0.824 },
    ],
    anovaF: 261.5,
    pValue: "< 0.0001",
  },
  fibrinogen: {
    label: "Fibrinogen + hemoglobin",
    rows: [
      { concentration: "25 mg/mL", meanVpp: 3.402, sd: 0.557 },
      { concentration: "75 mg/mL", meanVpp: 3.427, sd: 0.446 },
      { concentration: "150 mg/mL", meanVpp: 3.435, sd: 0.468 },
    ],
    anovaF: 0.24,
    pValue: "0.784",
  },
};

export const resultsConclusions: string[] = [
  "Hemoglobin-only samples exhibited statistically distinguishable signal amplitudes.",
  "The largest response occurred at 150 mg/mL.",
  "Fibrinogen-containing samples showed nearly overlapping responses, motivating more robust calibration and compensation methods.",
];

export const resultsSummary =
  "The system detected composition-dependent differences in controlled hemoglobin samples, while the fibrinogen experiment demonstrated that biologically relevant matrix effects may confound amplitude-only measurements. Oxygen saturation itself was not experimentally recovered during this milestone.";

// ---------------------------------------------------------------------------
// Contributions
// ---------------------------------------------------------------------------
export const contributions: Contribution[] = [
  {
    label: "Clinical framing",
    text: "Contributed to translating the clinical need into sensing, localization, and validation requirements.",
  },
  {
    label: "Staged strategy",
    text: "Helped develop the project's staged de-risking strategy across simulation, anatomy, and benchtop testing.",
  },
  {
    label: "Anatomical analysis",
    text: "Contributed to anatomical modeling and interpretation of esophagus-to-pulmonary-vein sensing constraints.",
  },
  {
    label: "Experimentation",
    text: "Supported experimental design, waveform analysis, and interpretation of photoacoustic results.",
  },
  {
    label: "Technical communication",
    text: "Helped communicate technical findings through milestone reviews, reports, and design iterations.",
  },
];

// ---------------------------------------------------------------------------
// Challenges & decisions
// ---------------------------------------------------------------------------
export const challenges: Challenge[] = [
  {
    title: "Hardware was unavailable during the initial milestone",
    decision: "Build the signal-processing and expected-voltage framework in simulation first.",
    whyItMattered: "This established expected signal ranges and informed later analog-front-end and acquisition decisions.",
  },
  {
    title: "Sensing performance depends on anatomy and orientation",
    decision: "Use three-dimensional segmentation and closest-point distance analysis to define the feasible operating envelope.",
    whyItMattered: "This connected the abstract sensing concept to realistic probe dimensions and placement constraints.",
  },
  {
    title: "Amplitude can reflect multiple biological and experimental factors",
    decision: "Compare hemoglobin-only samples with fibrinogen-containing samples using the same processing pipeline.",
    whyItMattered: "The flattened fibrinogen results showed that future saturation estimation will require calibration beyond simple amplitude comparisons.",
  },
];

// ---------------------------------------------------------------------------
// Key learnings & next steps
// ---------------------------------------------------------------------------
export const demonstrated: string[] = [
  "A computational pipeline for simulated photoacoustic oximetry",
  "A realistic anatomical sensing-depth envelope",
  "A repeatable laser–transducer benchtop setup",
  "Detectable signal differences in hemoglobin-containing samples",
  "A reusable waveform-processing and statistical-analysis pipeline",
];

export const remaining: string[] = [
  "Use wavelength-dependent excitation to isolate oxygenation effects",
  "Validate saturation estimates against known oxygenation states",
  "Demonstrate the ±5% accuracy target experimentally",
  "Improve compensation for depth, fluence, tissue, and sample composition",
  "Integrate the optical, acoustic, mechanical, and processing subsystems",
  "Validate neonatal-safe optical and thermal operating limits",
  "Test in a more anatomically realistic esophageal–vascular phantom",
];

// ---------------------------------------------------------------------------
// Section navigation
// ---------------------------------------------------------------------------
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "system", label: "System" },
  { id: "timeline", label: "Timeline" },
  { id: "constraints", label: "Constraints" },
  { id: "pipeline", label: "Pipeline" },
  { id: "results", label: "Results" },
  { id: "contributions", label: "Contributions" },
  { id: "next-steps", label: "Next steps" },
];
