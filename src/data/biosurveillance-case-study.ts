// ---------------------------------------------------------------------------
// Structured content for the custom Biosurveillance case-study page. Mirrors
// the pattern established by epvo/coquest/gpt2-case-study.ts.
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  value: string;
  label: string;
  isTarget?: boolean;
  note?: string;
}

export type SignalKey = "wastewater" | "hospital" | "env";

export interface SignalNarrative {
  key: SignalKey;
  title: string;
  body: string;
  prototypeSignal: string;
}

export interface MathTerm {
  symbol: string;
  meaning: string;
}

export interface Scenario {
  key: "baseline" | "outbreak" | "bioterror";
  label: string;
  behavior: string[];
  purpose: string;
}

export interface DashboardPanel {
  title: string;
  points: string[];
}

export interface RiskContribution {
  signal: SignalKey;
  label: string;
  value: number;
}

export interface AlertTier {
  key: "baseline" | "low" | "medium" | "high";
  label: string;
  description: string;
  interpretation: string;
}

export type ArchNodeKind = "input" | "process" | "fusion" | "present" | "app";

export interface ArchLayer {
  title: string;
  kind: ArchNodeKind;
  items: string[];
}

export interface DataContractRow {
  input: string;
  content: string;
  example: string;
}

export interface MaturityColumn {
  heading: string;
  items: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  scope: string[];
  goals: string[];
}

export type FutureArchKind = "provider" | "ingestion" | "analytics" | "federation" | "decision" | "governance";

export interface FutureArchLayer {
  title: string;
  kind: FutureArchKind;
  items: string[];
}

export interface GovernancePillar {
  title: string;
  items: string[];
}

export interface FailureRow {
  mode: string;
  risk: string;
  mitigation: string;
}

export interface ContributionGroup {
  category: string;
  items: string[];
}

export interface SystemDecisionEntry {
  title: string;
  reason: string;
  tradeoff: string;
}

export interface FutureTrack {
  track: string;
  items: string[];
  note?: string;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "SYSTEMS · BIOSECURITY · 2025",
  title: "Biosurveillance “Digital Immune System”",
  intro:
    "An interactive early-warning dashboard that fuses wastewater viral load, hospital admissions, and environmental signals into a single interpretable risk index.",
  description:
    "Built in Python and Streamlit, the prototype lets users upload data or explore synthetic scenarios, adjust rolling baselines and signal weights, and inspect how multiple anomalies combine into tiered alerts.",
  meta: [
    { label: "Role", value: "Founder & Project Lead" },
    { label: "Organization", value: "Gordian Knot Center" },
    { label: "Stage", value: "Functional Prototype" },
    { label: "Signals", value: "3" },
    { label: "Stack", value: "Python + Streamlit" },
  ],
  heroCaption:
    "The prototype exposes the full detection loop: data selection, rolling-window controls, signal weighting, raw trends, summary metrics, standardized anomalies, and tiered alerts.",
};

export const projectSummary =
  "Designed and implemented an interactive biosurveillance prototype that combines wastewater viral load, hospital admissions, and environmental signals into a unified early-warning risk index.";

export const systemStatement =
  "The system treats each signal as one imperfect sensor. Rolling baselines standardize the streams, configurable weights fuse their evidence, and tiered alerts reveal when multiple weak anomalies begin to align.";

export const strategicStatement =
  "The prototype demonstrates the core sensing loop; the accompanying brief explores how that loop could evolve into a distributed, governed national biosecurity network.";

export const immuneResponseFlow = ["Sense", "Standardize", "Fuse", "Interpret", "Alert", "Respond"];

// ---------------------------------------------------------------------------
// At-a-glance system strip
// ---------------------------------------------------------------------------
export const factsMetrics: CaseStudyMetric[] = [
  { value: "3", label: "Independent signal streams" },
  { value: "28 days", label: "Example rolling baseline window", note: "Configurable default" },
  { value: "1", label: "Fused risk index" },
  { value: "3", label: "Synthetic scenario modes" },
  { value: "4", label: "Operational alert states" },
];
export const factsNote = "The current prototype operates on uploaded or packaged synthetic datasets.";

// ---------------------------------------------------------------------------
// The early-warning problem
// ---------------------------------------------------------------------------
export const signalNarratives: SignalNarrative[] = [
  {
    key: "wastewater",
    title: "Wastewater",
    body: "Can show changes in population-level pathogen shedding before severe clinical outcomes become visible.",
    prototypeSignal: "Viral-load time series",
  },
  {
    key: "hospital",
    title: "Hospital admissions",
    body: "Reflects downstream healthcare burden and severity.",
    prototypeSignal: "Respiratory or outbreak-related admission counts",
  },
  {
    key: "env",
    title: "Environmental conditions",
    body: "May reveal air-quality anomalies, hazardous exposure, or context that changes how other signals are interpreted.",
    prototypeSignal: "AQI or PM2.5-style measurements",
  },
];

export const signalInsight =
  "Each stream is noisy and incomplete. The system looks for synchronized deviations across multiple independent sources.";

// ---------------------------------------------------------------------------
// Mathematics
// ---------------------------------------------------------------------------
export const zScoreTerms: MathTerm[] = [
  { symbol: "x(t)", meaning: "The current observation" },
  { symbol: "μroll(t)", meaning: "The recent rolling mean" },
  { symbol: "σroll(t)", meaning: "The recent rolling standard deviation" },
];

export const zScoreNotes = [
  "Positive values indicate above-baseline activity",
  "Negative values indicate below-baseline activity",
];

export const riskEquationLabels = [
  "wastewater contribution",
  "hospital contribution",
  "environmental contribution",
];

export const combinationNote =
  "Weights are normalized and adjustable in the prototype.";

export const rawVsStandardized = {
  raw: "copies per liter + admissions + AQI",
  standardized: "z-score + z-score + z-score",
};

// ---------------------------------------------------------------------------
// Scenario laboratory
// ---------------------------------------------------------------------------
export const scenarios: Scenario[] = [
  {
    key: "baseline",
    label: "Baseline",
    behavior: [
      "Signals fluctuate around recent norms",
      "Risk remains near or below zero",
      "Few or no elevated alerts",
    ],
    purpose: "Verify that normal variability does not constantly trigger alarms.",
  },
  {
    key: "outbreak",
    label: "Outbreak",
    behavior: [
      "Wastewater rises first",
      "Hospital admissions rise later",
      "Fused risk increases as evidence aligns",
    ],
    purpose: "Demonstrate how leading and lagging indicators can reinforce one another.",
  },
  {
    key: "bioterror",
    label: "Bioterror stress test",
    behavior: [
      "Abrupt or unusual multi-stream anomalies",
      "Elevated fused risk",
      "Stronger alert escalation",
    ],
    purpose: "Test how the dashboard responds to a deliberately extreme synthetic pattern.",
  },
];

export const scenarioNote =
  "The scenario represents an unusual synthetic anomaly pattern, not a validated method for identifying deliberate biological attacks.";

// ---------------------------------------------------------------------------
// Dashboard walkthrough
// ---------------------------------------------------------------------------
export const dashboardPanels: DashboardPanel[] = [
  {
    title: "Data sources",
    points: [
      "Upload wastewater CSV",
      "Upload hospital CSV",
      "Upload environmental CSV",
      "Or load packaged synthetic scenarios",
    ],
  },
  {
    title: "Detection parameters",
    points: ["Rolling window", "Signal weights", "Medium threshold", "High threshold"],
  },
  {
    title: "Summary",
    points: [
      "Days in dataset",
      "Number of high-alert days",
      "Number of medium-alert days",
      "Number of low-alert days",
    ],
  },
  {
    title: "Raw trends",
    points: ["The three original signals in their native units"],
  },
  {
    title: "Standardized signals",
    points: ["All z-scores and the fused risk index on a comparable scale"],
  },
  {
    title: "Alerts",
    points: ["Date", "Fused risk", "Alert tier", "Downloadable CSV"],
  },
];

export const dataSourceNote =
  "The application attempts to identify date and numeric columns automatically, with user selection when ambiguity exists.";
export const weightNote = "Weights are normalized before fusion.";

// ---------------------------------------------------------------------------
// Risk decomposition
// ---------------------------------------------------------------------------
export const exampleDecomposition = {
  totalRisk: 3.4,
  tier: "Medium" as const,
  contributions: [
    { signal: "wastewater" as SignalKey, label: "Wastewater", value: 1.8 },
    { signal: "hospital" as SignalKey, label: "Hospital admissions", value: 1.2 },
    { signal: "env" as SignalKey, label: "Environment", value: 0.4 },
  ],
};

export const interpretabilityGoal =
  "Decision-makers should see not only that risk increased, but why.";

// ---------------------------------------------------------------------------
// Alert tiers
// ---------------------------------------------------------------------------
export const alertTiers: AlertTier[] = [
  {
    key: "baseline",
    label: "Baseline",
    description: "Risk below the low-alert region or below zero.",
    interpretation: "No meaningful synchronized elevation.",
  },
  {
    key: "low",
    label: "Low",
    description: "Small or early deviation.",
    interpretation: "Observe and continue monitoring.",
  },
  {
    key: "medium",
    label: "Medium",
    description: "Multiple signals or stronger deviation.",
    interpretation: "Review data quality and consider enhanced surveillance.",
  },
  {
    key: "high",
    label: "High",
    description: "Strong fused anomaly above the configured threshold.",
    interpretation: "Escalate for expert review under an operational protocol.",
  },
];

export const alertTierNote =
  "The prototype exposes configurable thresholds; it does not establish clinically or operationally validated alert cutoffs.";

// ---------------------------------------------------------------------------
// Prototype architecture
// ---------------------------------------------------------------------------
export const prototypeArchitecture: ArchLayer[] = [
  {
    title: "Input layer",
    kind: "input",
    items: ["Uploaded CSVs", "Packaged scenarios", "Date-column detection", "Numeric-column detection"],
  },
  {
    title: "Processing layer",
    kind: "process",
    items: ["Cleaning", "Alignment", "Rolling mean", "Rolling standard deviation", "Per-stream z-scores"],
  },
  {
    title: "Fusion layer",
    kind: "fusion",
    items: ["Weight normalization", "Weighted risk calculation", "Threshold comparison", "Alert assignment"],
  },
  {
    title: "Presentation layer",
    kind: "present",
    items: [
      "Raw trends",
      "Standardized trends",
      "Fused risk curve",
      "Summary metrics",
      "Alert table",
      "CSV export",
    ],
  },
  {
    title: "Application layer",
    kind: "app",
    items: ["Python", "Pandas", "Streamlit"],
  },
];

// ---------------------------------------------------------------------------
// Data contract table
// ---------------------------------------------------------------------------
export const dataContractRows: DataContractRow[] = [
  { input: "Wastewater CSV", content: "Date and numeric viral-load field", example: "RNA copies per liter" },
  { input: "Hospital CSV", content: "Date and numeric admissions field", example: "Daily admissions" },
  { input: "Environment CSV", content: "Date and numeric environmental field", example: "AQI or PM2.5" },
  {
    input: "Scenario mode",
    content: "One packaged synthetic configuration",
    example: "Baseline, outbreak, bioterror",
  },
];

export const dataContractNotes = [
  "Automatic date-column detection",
  "Automatic numeric-column detection where unambiguous",
  "User selection when multiple numeric columns exist",
];

export const dataContractCallout =
  "Production ingestion would require formal schemas, quality metadata, provenance, and missing-data handling.";

// ---------------------------------------------------------------------------
// Prototype vs. operational
// ---------------------------------------------------------------------------
export const currentPrototype: MaturityColumn = {
  heading: "Current prototype",
  items: [
    "Synthetic or manually uploaded data",
    "Single-region analysis",
    "Rolling z-scores",
    "User-adjustable weights",
    "Rule-based thresholds",
    "Streamlit dashboard",
    "Manual exploration",
    "CSV export",
  ],
};

export const proposedOperational: MaturityColumn = {
  heading: "Proposed operational capability",
  items: [
    "Automated data connectors",
    "Multiple regions",
    "Data-quality scoring",
    "Historical and adaptive baselines",
    "Probabilistic anomaly detection",
    "Forecasting",
    "Secure role-based access",
    "Alert routing",
    "Human review workflows",
    "Auditing and model-version tracking",
    "Federated regional nodes",
  ],
};

// ---------------------------------------------------------------------------
// National scaling roadmap
// ---------------------------------------------------------------------------
export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Regional pilots",
    scope: [
      "Cities or states with mature wastewater surveillance",
      "Reliable hospital reporting",
      "Accessible environmental monitoring",
    ],
    goals: [
      "Validate ingestion",
      "Calibrate thresholds",
      "Test operational workflows",
      "Compare alerts against known historical events",
    ],
  },
  {
    phase: "Phase 2",
    title: "Broader coverage",
    scope: ["Additional states", "Rural communities", "Tribal nations", "Territories", "Diverse infrastructure environments"],
    goals: [
      "Handle missing data",
      "Handle delayed reporting",
      "Improve resilience",
      "Train local users",
      "Standardize interfaces",
    ],
  },
  {
    phase: "Phase 3",
    title: "Federated national network",
    scope: [
      "Regional nodes maintain local models and context",
      "Shared standards define data and risk outputs",
      "A central coordination hub receives summarized signals",
      "Cross-regional anomalies can be detected",
    ],
    goals: ["Preserve local autonomy", "Enable national situational awareness", "Support cross-jurisdictional detection"],
  },
];

// ---------------------------------------------------------------------------
// Future national architecture
// ---------------------------------------------------------------------------
export const futureArchitecture: FutureArchLayer[] = [
  {
    title: "Data providers",
    kind: "provider",
    items: [
      "Wastewater utilities",
      "Hospital systems",
      "Clinical laboratory feeds",
      "Environmental networks",
      "Syndromic surveillance",
      "Genomic sequencing",
      "Additional approved sources",
    ],
  },
  {
    title: "Regional ingestion",
    kind: "ingestion",
    items: ["APIs", "Scheduled jobs", "Common schema", "Metadata and provenance", "Quality checks", "De-identification"],
  },
  {
    title: "Regional analytics",
    kind: "analytics",
    items: ["Rolling baselines", "Anomaly detection", "Forecasting", "Signal fusion", "Uncertainty estimation"],
  },
  {
    title: "Federated coordination",
    kind: "federation",
    items: ["Regional summaries", "Cross-region comparisons", "Shared risk standards", "Central coordination hub"],
  },
  {
    title: "Decision support",
    kind: "decision",
    items: [
      "Public-health users",
      "Emergency managers",
      "Approved biodefense stakeholders",
      "Expert review",
      "Alert routing",
    ],
  },
  {
    title: "Governance",
    kind: "governance",
    items: ["Access controls", "Model audit logs", "Threshold governance", "Privacy safeguards", "Independent oversight"],
  },
];

// ---------------------------------------------------------------------------
// Governance and operational model
// ---------------------------------------------------------------------------
export const governancePillars: GovernancePillar[] = [
  {
    title: "Ownership",
    items: [
      "Who operates the system?",
      "Who maintains the data pipelines?",
      "Who approves model changes?",
      "Who is accountable for failures?",
    ],
  },
  {
    title: "Alert authority",
    items: [
      "Who may change thresholds?",
      "Which signals remain internal?",
      "What requires expert review?",
      "What triggers escalation?",
    ],
  },
  {
    title: "Privacy and civil liberties",
    items: [
      "Aggregation",
      "De-identification",
      "Strict access control",
      "Purpose limitation",
      "Community transparency",
      "Prevention of community stigmatization",
    ],
  },
  {
    title: "Oversight",
    items: [
      "Audit trails",
      "Ethics review",
      "Community advisory input",
      "Model-change documentation",
      "Periodic retrospective evaluation",
    ],
  },
];

export const governanceFraming =
  "This is presented as a required governance design problem, not a claim that any single institution has been confirmed as the system's owner.";

// ---------------------------------------------------------------------------
// Failure modes and mitigations
// ---------------------------------------------------------------------------
export const failureModes: FailureRow[] = [
  {
    mode: "False positive",
    risk: "Unnecessary escalation and loss of trust",
    mitigation: "Expert review, multiple-stream confirmation, calibrated thresholds",
  },
  {
    mode: "False negative",
    risk: "Missed early warning",
    mitigation: "Redundant data sources, high-sensitivity internal screening",
  },
  {
    mode: "Missing or delayed data",
    risk: "Distorted risk score",
    mitigation: "Quality flags, imputation policy, source-health monitoring",
  },
  {
    mode: "One noisy stream dominates",
    risk: "Misleading fused risk",
    mitigation: "Weight caps, contribution display, robust fusion",
  },
  {
    mode: "Baseline drift",
    risk: "Normal change appears anomalous",
    mitigation: "Adaptive baselines and retrospective recalibration",
  },
  {
    mode: "Feed manipulation",
    risk: "Artificial or hidden anomaly",
    mitigation: "Source redundancy and integrity monitoring",
  },
  {
    mode: "Model or threshold changes",
    risk: "Untraceable decision shifts",
    mitigation: "Versioning, audit logs, approval workflows",
  },
  {
    mode: "Community stigmatization",
    risk: "Unequal social harm",
    mitigation: "Aggregation, governance, careful public communication",
  },
  {
    mode: "Alert fatigue",
    risk: "Users stop responding",
    mitigation: "Tiered review, suppression logic, performance monitoring",
  },
];

export const failureModePrinciple =
  "High-sensitivity analytic flags should not automatically become public alerts.";

// ---------------------------------------------------------------------------
// My contributions
// ---------------------------------------------------------------------------
export const contributionGroups: ContributionGroup[] = [
  {
    category: "Concept and strategy",
    items: [
      "Developed the “digital immune system” framing for early biological-threat detection",
      "Defined the initial use case connecting public health and biosecurity",
      "Translated the concept into a staged prototype and national-scaling strategy",
    ],
  },
  {
    category: "System design",
    items: [
      "Designed the multi-signal processing pipeline",
      "Defined the rolling-baseline, standardization, weighted-fusion, and alert workflow",
      "Structured the system so that additional signals can be incorporated later",
    ],
  },
  {
    category: "Implementation",
    items: [
      "Built the interactive Python and Streamlit dashboard",
      "Implemented CSV upload, scenario selection, parameter controls, time-series visualizations, risk scoring, and alert export",
    ],
  },
  {
    category: "Data visualization",
    items: [
      "Designed views for raw signals, standardized anomalies, fused risk, and alert tiers",
      "Prioritized interpretability so users can inspect what drives an elevated risk score",
    ],
  },
  {
    category: "Strategic communication",
    items: [
      "Authored the technical report",
      "Authored the strategic brief describing national architecture, governance, scaling, and risk management",
    ],
  },
];

// ---------------------------------------------------------------------------
// Technical and strategic decisions
// ---------------------------------------------------------------------------
export const systemDecisions: SystemDecisionEntry[] = [
  {
    title: "Use z-scores instead of raw values",
    reason: "The three inputs have different units and ranges.",
    tradeoff: "Z-scores are interpretable but sensitive to baseline-window choice and unusual variance.",
  },
  {
    title: "Start with explicit weighted fusion",
    reason: "A transparent linear model makes signal contributions visible and easy to adjust.",
    tradeoff: "It cannot model complex nonlinear relationships or learn weights automatically.",
  },
  {
    title: "Use synthetic scenarios",
    reason: "Synthetic data supports controlled testing without depending on restricted or unreliable live feeds.",
    tradeoff: "It does not prove real-world detection performance.",
  },
  {
    title: "Pair technical prototyping with governance design",
    reason: "A biosurveillance system can create harm even when the code works correctly.",
    tradeoff: "Operational value depends on institutions, oversight, and response protocols beyond the dashboard itself.",
  },
];

// ---------------------------------------------------------------------------
// What the prototype demonstrated
// ---------------------------------------------------------------------------
export const demonstrated = [
  "Heterogeneous time-series inputs can be aligned and visualized in one workflow",
  "Rolling z-scores can place different signals on a common scale",
  "Adjustable weights can combine signal evidence into a fused score",
  "Thresholds can convert continuous risk into understandable alert tiers",
  "Synthetic scenarios can demonstrate baseline and anomaly behavior",
  "Users can inspect raw signals, standardized signals, and alert outputs",
  "The modular structure supports future data sources and models",
];

export const notClaimed = [
  "Early detection accuracy",
  "Sensitivity or specificity",
  "Lead time over existing systems",
  "Pathogen attribution",
  "Operational deployment",
  "Reduced mortality",
  "National-security effectiveness",
];

// ---------------------------------------------------------------------------
// Future development
// ---------------------------------------------------------------------------
export const futureTracks: FutureTrack[] = [
  {
    track: "Data",
    items: [
      "Automated wastewater feeds",
      "Hospital and laboratory integrations",
      "EPA AirNow or OpenAQ-style environmental feeds",
      "Syndromic surveillance",
      "Genomic sequencing",
      "Data provenance and quality scoring",
    ],
  },
  {
    track: "Modeling",
    items: [
      "Isolation Forest",
      "Local Outlier Factor",
      "Autoencoders",
      "Temporal forecasting",
      "Multimodal fusion",
      "Probabilistic risk",
      "Uncertainty estimates",
    ],
    note: "Candidate approaches, not selected production methods.",
  },
  {
    track: "Engineering",
    items: [
      "Scheduled ingestion",
      "Secure cloud deployment",
      "Docker",
      "Continuous integration",
      "Role-based access control",
      "Monitoring",
      "Alert delivery",
      "Model and threshold versioning",
    ],
  },
  {
    track: "Validation and governance",
    items: [
      "Historical outbreak backtesting",
      "Prospective pilot evaluation",
      "False-positive analysis",
      "Human factors studies",
      "Privacy review",
      "Community engagement",
      "Operational exercises",
    ],
  },
];

// ---------------------------------------------------------------------------
// Section nav
// ---------------------------------------------------------------------------
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "signals", label: "Signals" },
  { id: "fusion", label: "Fusion" },
  { id: "scenarios", label: "Scenarios" },
  { id: "dashboard", label: "Dashboard" },
  { id: "architecture", label: "Architecture" },
  { id: "scaling", label: "Scaling" },
  { id: "governance", label: "Governance" },
  { id: "risks", label: "Risks" },
  { id: "contributions", label: "Contributions" },
  { id: "next-steps", label: "Next steps" },
];
