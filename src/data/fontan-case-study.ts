// ---------------------------------------------------------------------------
// Structured content for the custom Fontan virtual-stenting case-study page.
// Mirrors the pattern established by epvo/coquest/gpt2/biosurveillance-case-
// study.ts. This was a solo honors thesis — every contribution statement
// below uses first-person singular language, never team framing.
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  value: string;
  label: string;
  isTarget?: boolean;
  note?: string;
}

export type GeometryState = "pre" | "post";
export type PhysiologicState = "rest" | "exercise";
export type MetricKey = "pressure" | "resistance" | "power";
export type PatientKey = "p18" | "p21" | "p23";

export interface PipelineStep {
  label: string;
  category: "Manual" | "Semi-automated" | "Computational" | "Analytical";
  detail: string;
}

export interface ReconstructionStage {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface StentStep {
  step: string;
}

export interface SimSpecRow {
  parameter: string;
  value: string;
}

export interface MetricExplainer {
  key: MetricKey;
  title: string;
  question: string;
  definition: string;
  relevance: string;
  equation?: string;
}

export interface MetricRow {
  metric: string;
  pre: string;
  post: string;
  change: string;
}

export interface PatientData {
  key: PatientKey;
  label: string;
  headline: string;
  restRows: MetricRow[];
  exerciseRows: MetricRow[];
  interpretation: string[];
  responseType: "consistent" | "mixed";
}

export interface Finding {
  title: string;
  body: string;
}

export interface ContributionArea {
  category: string;
  items: string[];
}

export interface EffortPhase {
  phase: string;
  title: string;
  body: string;
}

export interface ChallengeEntry {
  title: string;
  decision: string;
  lesson: string;
}

export interface FutureTrack {
  track: string;
  items: string[];
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "HONORS THESIS · BIOENGINEERING · 2026",
  title: "Virtual Stenting in the Fontan Circulation",
  formalTitle: "Hemodynamic Effects of Virtual Stenting at Rest and During Exercise",
  intro:
    "A patient-specific computational study of how virtual pathway enlargement changes pressure burden and flow efficiency in the Fontan circulation.",
  description:
    "I independently reconstructed vascular anatomies from 4D flow MRI, generated virtual post-stent models, created simulation-ready meshes, and ran transient CFD under resting and exercise conditions.",
  meta: [
    { label: "Role", value: "Sole Student Researcher" },
    { label: "Thesis", value: "Stanford Bioengineering Honors" },
    { label: "Advisor", value: "Dr. Alison Marsden" },
    { label: "Time", value: "200+ hours" },
    { label: "Year", value: "2026" },
  ],
  heroCaption:
    "Patient-specific anatomy was reconstructed, virtually enlarged at the narrowed pathway, and simulated before and after intervention under two physiologic states.",
  ownershipNote:
    "Independently executed honors thesis under faculty and laboratory mentorship.",
};

export const projectSummary =
  "I developed a patient-specific computational pipeline to evaluate how virtual stent placement alters Fontan hemodynamics at rest and during exercise. Starting from 4D flow MRI, I reconstructed three-dimensional vascular anatomy, generated virtual post-stent geometries, created volumetric meshes, ran transient CFD simulations, and compared pressure drop, power loss, and resistance before and after intervention.";

export const centralFinding =
  "Virtual stenting reduced pressure drop and resistance in all three modeled patients, but the effect on power loss was not uniform — showing that apparent anatomical narrowing alone does not guarantee a consistently favorable hemodynamic response.";

export const strategicInterpretation =
  "The results support patient-specific simulation as a potential method for distinguishing patients who may benefit from pathway enlargement from those whose broader flow geometry may limit or complicate that benefit.";

export const fourStateFramework = [
  "Pre-stent at rest",
  "Post-stent at rest",
  "Pre-stent during exercise",
  "Post-stent during exercise",
];

export const workflowMotif = ["Image", "Model", "Virtual intervention", "Mesh", "Simulation", "Hemodynamic comparison"];

// ---------------------------------------------------------------------------
// Thesis-at-a-glance strip
// ---------------------------------------------------------------------------
export const factsMetrics: CaseStudyMetric[] = [
  { value: "200+", label: "Hours of independent research" },
  { value: "15", label: "Fontan anatomies reconstructed and screened" },
  { value: "3", label: "Patients selected for detailed analysis" },
  { value: "12", label: "Final pre/post and rest/exercise simulation states" },
  { value: "32,000", label: "Time steps per transient simulation" },
];
export const factsNote =
  "Three cases were selected from the larger reconstructed cohort for detailed paired virtual-intervention analysis.";

// ---------------------------------------------------------------------------
// Clinical problem
// ---------------------------------------------------------------------------
export const physiologyPoints = [
  "In a normal circulation, a ventricle pumps blood through the lungs.",
  "In the Fontan circulation, systemic venous blood reaches the pulmonary arteries without a pumping ventricle.",
  "Pulmonary blood flow therefore depends on elevated venous pressure and low pathway resistance.",
  "Even modest narrowing can increase the pressure required to sustain flow.",
  "Patients have limited reserve when metabolic demand rises.",
];

export const normalCircuit = ["Venous return", "Right ventricle", "Pulmonary arteries"];
export const fontanCircuit = ["Venous return", "Passive conduit", "Pulmonary arteries"];

export const physiologyCallout =
  "In a low-energy circulation, small geometric inefficiencies can have outsized consequences.";

// ---------------------------------------------------------------------------
// Why exercise matters
// ---------------------------------------------------------------------------
export const restPoints = [
  "Lower venous return",
  "Lower pathway flow",
  "Smaller pressure burden",
  "Some obstruction may remain partially hidden",
];
export const exercisePoints = [
  "IVC flow increases",
  "Cardiac cycle shortens",
  "Pathway demand rises",
  "Geometric inefficiencies become more consequential",
];
export const exerciseFraming =
  "The exercise simulation was a standardized moderate physiologic stress condition, not a patient-specific prediction of maximal exercise performance.";

// ---------------------------------------------------------------------------
// Research question
// ---------------------------------------------------------------------------
export const primaryQuestion = "Does virtual stent-related pathway enlargement consistently improve Fontan hemodynamics?";
export const secondaryQuestion = "Does the apparent benefit change when flow demand increases during exercise?";
export const outcomesList = ["Pressure drop", "Resistance", "Power loss"];
export const studyDesignSummary =
  "Within each patient, I held the remaining anatomy constant and compared the original and virtually enlarged pathways under matched resting and exercise boundary conditions.";

// ---------------------------------------------------------------------------
// Full computational workflow
// ---------------------------------------------------------------------------
export const pipelineSteps: PipelineStep[] = [
  { label: "4D flow MRI", category: "Manual", detail: "Selected the anatomical imaging volume used for reconstruction." },
  { label: "Vessel pathing", category: "Manual", detail: "Placed centerline paths through each vessel of interest." },
  { label: "Cross-sectional segmentation", category: "Manual", detail: "Created and corrected lumen contours along each path." },
  { label: "Surface lofting and vessel union", category: "Semi-automated", detail: "Connected contours into continuous surfaces and merged them at junctions." },
  { label: "Geometry cleanup and truncation", category: "Manual", detail: "Removed distal anatomy outside the region of interest." },
  { label: "Inlet and outlet capping", category: "Semi-automated", detail: "Sealed the model into a watertight surface with distinct boundary faces." },
  { label: "Tetrahedral volume meshing", category: "Computational", detail: "Discretized the fluid domain for finite-element simulation." },
  { label: "Centerline extraction", category: "Computational", detail: "Computed centerlines used to guide the virtual intervention." },
  { label: "Virtual stent deployment", category: "Semi-automated", detail: "Enlarged the targeted pathway using svMorph." },
  { label: "Post-stent remeshing", category: "Computational", detail: "Rebuilt a simulation-ready mesh for the deformed geometry." },
  { label: "Boundary-condition assignment", category: "Manual", detail: "Assigned patient-specific inflow and outlet Windkessel parameters." },
  { label: "Transient CFD", category: "Computational", detail: "Ran the finite-element flow simulation across 32,000 time steps." },
  { label: "Hemodynamic extraction", category: "Analytical", detail: "Computed pressure drop, resistance, and power loss from the sixth cycle." },
  { label: "Pre/post comparison", category: "Analytical", detail: "Compared original and post-stent results within each patient." },
];

export const pipelineCategoryNote =
  "Reconstruction and boundary-condition work were manual; geometry processing and virtual stenting were semi-automated; meshing and simulation were computational; the final comparisons were analytical. No stage of this pipeline ran unattended.";

// ---------------------------------------------------------------------------
// Reconstruction from 4D flow MRI
// ---------------------------------------------------------------------------
export const reconstructionStages: ReconstructionStage[] = [
  {
    title: "Imaging volume",
    body: "The selected anatomical volume from the 4D flow MRI dataset provided the basis for segmentation.",
  },
  {
    title: "Vessel paths",
    body: "I manually placed centerline paths through the superior vena cava, inferior vena cava, left and right pulmonary arteries, hepatic veins, and relevant branch vessels.",
  },
  {
    title: "Cross-sectional contours",
    body: "I created and corrected lumen contours along each vessel path.",
  },
  {
    title: "Lofted vessels",
    body: "Local contours were connected into continuous three-dimensional vessel surfaces.",
  },
  {
    title: "Unified model",
    body: "Individual vessel surfaces were unioned and blended at complex junctions.",
    image: "/images/projects/fontan-model.jpg",
    imageAlt: "Reconstructed unified Fontan vascular model rendered as a smooth silver surface",
  },
  {
    title: "Truncated domain",
    body: "Distal anatomy outside the region of interest was removed to focus the simulation.",
  },
  {
    title: "Watertight surface",
    body: "Inlets and outlets were capped and assigned distinct boundary faces.",
    image: "/images/projects/fontan-capped.jpg",
    imageAlt: "Fontan vessel model with colored inlet and outlet cap faces marking the simulation boundary conditions",
  },
  {
    title: "Tetrahedral volume mesh",
    body: "The final fluid domain was discretized for finite-element simulation.",
    image: "/images/projects/fontan-mesh.jpg",
    imageAlt: "Tetrahedral volumetric mesh of a reconstructed Fontan vascular model",
  },
];

export const reconstructionEffortCaption =
  "Complex postsurgical anatomy required dense manual correction around narrowing, branches, and junctions where automated segmentation was unreliable.";

export const centerlineImage = {
  src: "/images/projects/fontan-centerline.jpg",
  alt: "Fontan vascular model with an extracted centerline running through the reconstructed conduit",
};

// ---------------------------------------------------------------------------
// Virtual stent design
// ---------------------------------------------------------------------------
export const stentWorkflowSteps: string[] = [
  "Generate a centerline from the original Fontan model",
  "Identify the narrowed or distorted target segment",
  "Select the intervention axis",
  "Adjust virtual stent length and diameter",
  "Expand the lumen until focal narrowing is removed",
  "Export the deformed post-stent geometry",
  "Rebuild a simulation-ready mesh",
  "Compare it with the original anatomy",
];

export const stentQualification =
  "The virtual model represents the enlarged luminal geometry, not the mechanical structure or deployment physics of the stent itself.";

export const stentGridImage = {
  src: "/images/projects/fontan-virtual-stent-grid.jpg",
  alt: "Pre-stent, stenting-process, and post-stent geometry comparison for Fontan patients 18, 21, and 23",
};

export const stentDetailImage = {
  src: "/images/projects/fontan-stent-detail.jpg",
  alt: "Close-up of the virtual stent expansion region overlaid on a translucent Fontan vessel model, with capped inlet and outlet faces",
};

export const pressureFieldImage = {
  src: "/images/projects/fontan-pressure-field.jpg",
  alt: "Simulated pressure field on a Fontan vessel model before and after virtual stenting, colored from low (blue) to high (red) pressure",
};

// ---------------------------------------------------------------------------
// Study cohort and selection
// ---------------------------------------------------------------------------
export const funnelStages = [
  "15 reconstructed Fontan anatomies",
  "Preliminary geometric and hemodynamic review",
  "3 selected cases",
  "4 states per patient",
  "12 paired simulations",
];

export const funnelExplanation = [
  "The fifteen cases were reviewed for anatomies where pathway enlargement had a plausible mechanistic rationale.",
  "Three patients were selected for detailed study.",
  "The purpose was in-depth within-patient comparison rather than population-level statistical inference.",
];

// ---------------------------------------------------------------------------
// Simulation experiment matrix
// ---------------------------------------------------------------------------
export const matrixPatients: PatientKey[] = ["p18", "p21", "p23"];
export const matrixPatientLabels: Record<PatientKey, string> = {
  p18: "Patient 18",
  p21: "Patient 21",
  p23: "Patient 23",
};
export const matrixColumns: { physiologic: PhysiologicState; geometry: GeometryState; label: string }[] = [
  { physiologic: "rest", geometry: "pre", label: "Rest · Pre-stent" },
  { physiologic: "rest", geometry: "post", label: "Rest · Post-stent" },
  { physiologic: "exercise", geometry: "pre", label: "Exercise · Pre-stent" },
  { physiologic: "exercise", geometry: "post", label: "Exercise · Post-stent" },
];

// ---------------------------------------------------------------------------
// Simulation configuration
// ---------------------------------------------------------------------------
export const simSpecRows: SimSpecRow[] = [
  { parameter: "Solver", value: "SimVascular finite-element framework" },
  { parameter: "Simulation type", value: "Transient three-dimensional fluid simulation" },
  { parameter: "Time step", value: "0.001 seconds" },
  { parameter: "Time steps", value: "32,000" },
  { parameter: "Blood model", value: "Incompressible Newtonian fluid" },
  { parameter: "Density", value: "1.06 g/cm³" },
  { parameter: "Dynamic viscosity", value: "0.04 P" },
  { parameter: "Vessel walls", value: "Rigid" },
  { parameter: "Wall condition", value: "No slip" },
  { parameter: "Inlets", value: "Pulsatile imposed-flux waveforms" },
  { parameter: "Outlets", value: "Branch-specific three-element RCR Windkessel models" },
  { parameter: "Analysis cycle", value: "Sixth cardiac cycle" },
  { parameter: "Primary outcomes", value: "Pressure drop, resistance, power loss" },
];

export const simTechnicalDetails = [
  {
    title: "Nonlinear convergence",
    body: "Each time step was iterated until the nonlinear residual met the solver's convergence tolerance before advancing.",
  },
  {
    title: "Backflow stabilization",
    body: "Outlet backflow stabilization was applied to prevent divergence from transient flow reversal at branch outlets.",
  },
  {
    title: "Krylov-based linear solves",
    body: "The linear systems at each nonlinear iteration were solved with a Krylov-subspace iterative method.",
  },
  {
    title: "Boundary-condition tuning",
    body: "RCR parameters were iteratively adjusted so simulated flow splits and mean pressures matched available patient data.",
  },
];

// ---------------------------------------------------------------------------
// Rest and exercise conditions
// ---------------------------------------------------------------------------
export const restConditions = [
  "Patient-specific venous inflow waveforms",
  "Patient-specific pulmonary outlet conditions",
  "Clinical pressure and flow information used for tuning",
];
export const exerciseConditions = [
  "Mean IVC inflow: 3× resting value",
  "Mean SVC inflow: unchanged",
  "Pulmonary outlet resistance: reduced by 10%",
  "Heart rate: 120 beats per minute",
];
export const exercisePrescriptionNote =
  "The exercise prescription was derived from prior Fontan CFD studies and used as a standardized moderate-stress condition.";

// ---------------------------------------------------------------------------
// Model grounding and validation
// ---------------------------------------------------------------------------
export const groundingChecks = [
  { from: "4D flow MRI", through: "Measured pulmonary flow split", to: "Simulated LPA/RPA split" },
  { from: "Catheterization", through: "Reported Fontan pressure", to: "Simulated average pressure" },
];
export const groundingNote =
  "Boundary conditions were adjusted so the simulations reproduced these available clinical observations — described here as patient-data-informed calibration and physiologic consistency checks, not as a clinically validated model.";

// ---------------------------------------------------------------------------
// Hemodynamic metrics
// ---------------------------------------------------------------------------
export const metricExplainers: MetricExplainer[] = [
  {
    key: "pressure",
    title: "Pressure drop",
    question: "How much pressure is required to move blood across the Fontan pathway?",
    definition: "Difference between area-averaged inflow and outflow pressure.",
    relevance: "Higher pressure burden may require greater upstream venous pressure.",
  },
  {
    key: "resistance",
    title: "Resistance",
    question: "How strongly does the pathway oppose flow?",
    definition: "Summarizes pathway opposition relative to the amount of flow, also expressed as a percentage of pulmonary vascular resistance.",
    relevance: "Higher effective resistance means the pathway itself consumes a larger share of the total resistance the circulation must overcome.",
    equation: "R = ΔP / Q",
  },
  {
    key: "power",
    title: "Power loss",
    question: "How much mechanical energy is dissipated as blood traverses the connection?",
    definition: "Rate of mechanical energy dissipated by the pathway geometry.",
    relevance: "Captures energetic inefficiency that pressure drop alone may not reveal.",
  },
];

export const metricLesson = "No single metric fully described the intervention response.";

// ---------------------------------------------------------------------------
// Patient results
// ---------------------------------------------------------------------------
export const patients: PatientData[] = [
  {
    key: "p18",
    label: "Patient 18",
    headline: "Mixed response",
    responseType: "mixed",
    restRows: [
      { metric: "Pressure drop", pre: "0.240 mmHg", post: "0.0682 mmHg", change: "−71.6%" },
      { metric: "Power loss", pre: "0.000267 W", post: "0.000343 W", change: "+28.5%" },
      { metric: "Resistance", pre: "38.38 dyn·s/cm⁵", post: "2.41 dyn·s/cm⁵", change: "−93.7%" },
      { metric: "Resistance as % PVR", pre: "28.2%", post: "1.8%", change: "—" },
    ],
    exerciseRows: [
      { metric: "Pressure drop", pre: "0.292 mmHg", post: "0.192 mmHg", change: "−34.4%" },
      { metric: "Power loss", pre: "0.000543 W", post: "0.000790 W", change: "+45.6%" },
      { metric: "Resistance", pre: "28.00 dyn·s/cm⁵", post: "8.28 dyn·s/cm⁵", change: "−70.4%" },
      { metric: "Resistance as % PVR", pre: "20.6%", post: "6.1%", change: "—" },
    ],
    interpretation: [
      "Pressure drop and resistance improved.",
      "Power loss increased at both physiologic states.",
      "The more complex venous anatomy likely altered how flow reorganized after pathway enlargement.",
      "This was not a uniformly favorable hemodynamic response.",
    ],
  },
  {
    key: "p21",
    label: "Patient 21",
    headline: "Consistent improvement",
    responseType: "consistent",
    restRows: [
      { metric: "Pressure drop", pre: "0.510 mmHg", post: "0.100 mmHg", change: "−80.5%" },
      { metric: "Power loss", pre: "0.002309 W", post: "0.001315 W", change: "−43.0%" },
      { metric: "Resistance", pre: "20.03 dyn·s/cm⁵", post: "1.34 dyn·s/cm⁵", change: "−93.3%" },
      { metric: "Resistance as % PVR", pre: "10.9%", post: "0.7%", change: "—" },
    ],
    exerciseRows: [
      { metric: "Pressure drop", pre: "2.115 mmHg", post: "0.231 mmHg", change: "−89.1%" },
      { metric: "Power loss", pre: "0.0452 W", post: "0.0283 W", change: "−37.3%" },
      { metric: "Resistance", pre: "17.61 dyn·s/cm⁵", post: "0.334 dyn·s/cm⁵", change: "−98.1%" },
      { metric: "Resistance as % PVR", pre: "9.6%", post: "0.2%", change: "—" },
    ],
    interpretation: [
      "All three primary metrics improved at rest and during exercise.",
      "Pressure-drop and resistance reductions were larger under the exercise condition.",
      "The focal pathway enlargement produced a consistently favorable predicted response.",
    ],
  },
  {
    key: "p23",
    label: "Patient 23",
    headline: "Strong pressure and resistance response",
    responseType: "consistent",
    restRows: [
      { metric: "Pressure drop", pre: "0.217 mmHg", post: "0.0284 mmHg", change: "−86.9%" },
      { metric: "Power loss", pre: "0.000597 W", post: "0.000372 W", change: "−37.7%" },
      { metric: "Resistance", pre: "14.03 dyn·s/cm⁵", post: "0.384 dyn·s/cm⁵", change: "−97.3%" },
      { metric: "Resistance as % PVR", pre: "11.0%", post: "0.3%", change: "—" },
    ],
    exerciseRows: [
      { metric: "Pressure drop", pre: "0.903 mmHg", post: "0.0190 mmHg", change: "−97.9%" },
      { metric: "Power loss", pre: "0.009337 W", post: "0.008508 W", change: "−8.9%" },
      { metric: "Resistance", pre: "15.53 dyn·s/cm⁵", post: "0.0758 dyn·s/cm⁵", change: "≈−99.5%" },
      { metric: "Resistance as % PVR", pre: "12.1%", post: "0.06%", change: "—" },
    ],
    interpretation: [
      "Pressure drop and resistance improved strongly at both states.",
      "The largest relative reductions occurred during exercise.",
      "Power loss improved, but its exercise reduction was much smaller than the pressure-drop and resistance reductions.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Percent-change chart data (derived from the same source numbers above)
// ---------------------------------------------------------------------------
export interface PercentChangePoint {
  patient: PatientKey;
  physiologic: PhysiologicState;
  pressure: number;
  resistance: number;
  power: number;
}

export const percentChangeData: PercentChangePoint[] = [
  { patient: "p18", physiologic: "rest", pressure: -71.6, resistance: -93.7, power: 28.5 },
  { patient: "p18", physiologic: "exercise", pressure: -34.4, resistance: -70.4, power: 45.6 },
  { patient: "p21", physiologic: "rest", pressure: -80.5, resistance: -93.3, power: -43.0 },
  { patient: "p21", physiologic: "exercise", pressure: -89.1, resistance: -98.1, power: -37.3 },
  { patient: "p23", physiologic: "rest", pressure: -86.9, resistance: -97.3, power: -37.7 },
  { patient: "p23", physiologic: "exercise", pressure: -97.9, resistance: -99.5, power: -8.9 },
];

// Paired pre/post raw values for the slope chart, one series per metric.
// Resistance values are re-scaled per patient in the component (units are
// comparable across patients already: dyn·s/cm⁵).
export interface PairedPoint {
  patient: PatientKey;
  physiologic: PhysiologicState;
  pre: number;
  post: number;
}

export const pairedPressure: PairedPoint[] = [
  { patient: "p18", physiologic: "rest", pre: 0.24, post: 0.0682 },
  { patient: "p18", physiologic: "exercise", pre: 0.292, post: 0.192 },
  { patient: "p21", physiologic: "rest", pre: 0.51, post: 0.1 },
  { patient: "p21", physiologic: "exercise", pre: 2.115, post: 0.231 },
  { patient: "p23", physiologic: "rest", pre: 0.217, post: 0.0284 },
  { patient: "p23", physiologic: "exercise", pre: 0.903, post: 0.019 },
];

export const pairedResistance: PairedPoint[] = [
  { patient: "p18", physiologic: "rest", pre: 38.38, post: 2.41 },
  { patient: "p18", physiologic: "exercise", pre: 28.0, post: 8.28 },
  { patient: "p21", physiologic: "rest", pre: 20.03, post: 1.34 },
  { patient: "p21", physiologic: "exercise", pre: 17.61, post: 0.334 },
  { patient: "p23", physiologic: "rest", pre: 14.03, post: 0.384 },
  { patient: "p23", physiologic: "exercise", pre: 15.53, post: 0.0758 },
];

export const pairedPower: PairedPoint[] = [
  { patient: "p18", physiologic: "rest", pre: 0.000267, post: 0.000343 },
  { patient: "p18", physiologic: "exercise", pre: 0.000543, post: 0.00079 },
  { patient: "p21", physiologic: "rest", pre: 0.002309, post: 0.001315 },
  { patient: "p21", physiologic: "exercise", pre: 0.0452, post: 0.0283 },
  { patient: "p23", physiologic: "rest", pre: 0.000597, post: 0.000372 },
  { patient: "p23", physiologic: "exercise", pre: 0.009337, post: 0.008508 },
];

export const pairedMetricUnits: Record<MetricKey, string> = {
  pressure: "mmHg",
  resistance: "dyn·s/cm⁵",
  power: "W",
};
export const pairedMetricLabels: Record<MetricKey, string> = {
  pressure: "Pressure drop",
  resistance: "Resistance",
  power: "Power loss",
};

// ---------------------------------------------------------------------------
// Rest-versus-exercise comparison
// ---------------------------------------------------------------------------
export const restExerciseNarrative = [
  {
    patient: "Patient 21",
    lines: [
      "Pressure-drop reduction: 80.5% at rest → 89.1% during exercise",
      "Resistance reduction: 93.3% at rest → 98.1% during exercise",
    ],
  },
  {
    patient: "Patient 23",
    lines: [
      "Pressure-drop reduction: 86.9% at rest → 97.9% during exercise",
      "Resistance reduction: 97.3% at rest → approximately 99.5% during exercise",
    ],
  },
  {
    patient: "Patient 18",
    lines: [
      "Pressure-drop reduction became smaller during exercise",
      "Resistance still improved",
      "Power loss increased further during exercise",
    ],
  },
];
export const restExerciseConclusion =
  "Higher-flow conditions amplified the predicted benefit in two patients, but they also made the mixed response in the third case more apparent.";

// ---------------------------------------------------------------------------
// Patient 18 deep dive
// ---------------------------------------------------------------------------
export const p18Factors = [
  "More complex venous anatomy",
  "Azygous return",
  "Prior hepatic-vein connection to the Fontan graft",
  "Multiple competing flow streams",
];
export const p18Observations = ["Enlarged pathway", "Reduced pressure burden", "Increased power dissipation"];
export const p18Mechanism = [
  "Geometric enlargement",
  "Lower local resistance",
  "Altered mixing and flow organization",
  "Lower pressure drop but higher power loss",
];
export const p18Insight = "Minimum diameter alone did not predict the complete hemodynamic response.";

// ---------------------------------------------------------------------------
// Main findings
// ---------------------------------------------------------------------------
export const mainFindings: Finding[] = [
  {
    title: "Finding 1",
    body: "Virtual stenting reduced pressure drop in all three patients at rest and during exercise.",
  },
  {
    title: "Finding 2",
    body: "Effective pathway resistance also decreased in all three patients.",
  },
  {
    title: "Finding 3",
    body: "Power loss was patient-specific: it decreased in Patients 21 and 23 but increased in Patient 18.",
  },
  {
    title: "Finding 4",
    body: "Exercise analysis revealed differences that were not fully captured by resting results alone.",
  },
];
export const findingsConclusion = "The same geometric intervention produced three distinct hemodynamic profiles.";

// ---------------------------------------------------------------------------
// Independent scope and contribution
// ---------------------------------------------------------------------------
export const contributionAreas: ContributionArea[] = [
  {
    category: "Research framing",
    items: [
      "Reviewed Fontan physiology, pathway obstruction, stenting, and prior computational studies",
      "Defined the research question and study design",
      "Selected outcome metrics and comparison strategy",
    ],
  },
  {
    category: "Medical image reconstruction",
    items: [
      "Reviewed 4D flow MRI datasets",
      "Created vessel paths",
      "Produced and corrected cross-sectional segmentations",
      "Lofted and unioned vascular surfaces",
      "Cleaned complex junctions",
      "Truncated and capped computational domains",
    ],
  },
  {
    category: "Computational geometry",
    items: [
      "Generated centerlines",
      "Identified target segments",
      "Created virtual post-stent geometries in svMorph",
      "Prepared paired pre-stent and post-stent models",
    ],
  },
  {
    category: "Meshing and simulation",
    items: [
      "Generated volumetric tetrahedral meshes",
      "Assigned inlet and outlet faces",
      "Configured transient simulations",
      "Applied patient-specific and exercise boundary conditions",
      "Troubleshot model and solver issues",
      "Verified convergence and usable simulation states",
    ],
  },
  {
    category: "Analysis",
    items: [
      "Extracted pressure and flow results",
      "Calculated pressure drop",
      "Calculated resistance",
      "Calculated power loss",
      "Compared pre-versus-post changes",
      "Interpreted rest-versus-exercise differences",
    ],
  },
  {
    category: "Scientific communication",
    items: [
      "Produced figures and tables",
      "Reviewed literature",
      "Wrote and revised the full honors thesis",
      "Defended the interpretation and limitations",
      "Prepared the thesis for faculty approval",
    ],
  },
];

export const contributionStatement =
  "This was not one isolated simulation. It was an end-to-end research workflow repeated across patient anatomies, intervention states, and physiologic conditions.";

// ---------------------------------------------------------------------------
// Effort timeline
// ---------------------------------------------------------------------------
export const effortPhases: EffortPhase[] = [
  {
    phase: "Phase 1",
    title: "Clinical and literature grounding",
    body: "Fontan physiology, stenting, and computational-planning literature.",
  },
  {
    phase: "Phase 2",
    title: "Cohort reconstruction",
    body: "Fifteen patient-specific anatomical models.",
  },
  {
    phase: "Phase 3",
    title: "Case screening",
    body: "Geometric and preliminary hemodynamic review.",
  },
  {
    phase: "Phase 4",
    title: "Virtual intervention",
    body: "Three paired post-stent geometries.",
  },
  {
    phase: "Phase 5",
    title: "Simulation campaign",
    body: "Rest and exercise, pre and post.",
  },
  {
    phase: "Phase 6",
    title: "Quantitative analysis",
    body: "Pressure drop, resistance, power loss.",
  },
  {
    phase: "Phase 7",
    title: "Thesis synthesis",
    body: "Interpretation, limitations, figures, tables, writing, revision.",
  },
];

// ---------------------------------------------------------------------------
// Technical challenges and decisions
// ---------------------------------------------------------------------------
export const challenges: ChallengeEntry[] = [
  {
    title: "Postsurgical anatomy resisted automatic segmentation",
    decision: "Use path-based cross-sectional reconstruction with dense manual correction near narrowing and junctions.",
    lesson: "Small geometric artifacts could produce artificial flow disturbances or prevent successful meshing.",
  },
  {
    title: "Pre- and post-stent comparisons needed to isolate geometry",
    decision: "Virtually deform only the targeted pathway while holding the remaining patient anatomy constant.",
    lesson: "This enabled a controlled within-patient comparison.",
  },
  {
    title: "The simulation domain omitted distal pulmonary anatomy",
    decision: "Represent distal vascular loading using branch-specific RCR Windkessel boundary conditions.",
    lesson: "The three-dimensional model could remain tractable while retaining downstream hemodynamic influence.",
  },
  {
    title: "Resting conditions might understate obstruction",
    decision: "Repeat every pre/post comparison under a standardized moderate-exercise condition.",
    lesson: "Higher flow revealed stronger effects in two patients and a more nuanced response in the third.",
  },
  {
    title: "Pressure drop alone could produce an incomplete conclusion",
    decision: "Evaluate pressure drop, resistance, and power loss together.",
    lesson: "Patient 18 improved in pressure-based metrics but worsened in energetic efficiency.",
  },
];

// ---------------------------------------------------------------------------
// Limitations
// ---------------------------------------------------------------------------
export const limitations = [
  "Only three patients underwent detailed paired analysis",
  "Case selection was targeted rather than population representative",
  "The study was not designed for population-level inference",
  "Vessel walls were assumed rigid",
  "Blood was modeled as Newtonian",
  "Fluid–structure interaction was not included",
  "Boundary conditions were prescribed in an open-loop framework",
  "Whole-body circulatory feedback was not represented",
  "The post-stent models were virtual geometric deformations",
  "Stent mechanics and wall contact were not modeled",
  "Exercise was standardized rather than individually measured",
  "Quantitative absolute-pressure prediction is more limited than relative pressure-drop comparison",
  "Simulated benefit was not compared with actual postoperative outcomes",
  "Power-loss interpretation remains sensitive to broader flow organization and domain assumptions",
];

export const limitationsFraming =
  "The study was designed to test feasibility and within-patient trends, not to establish a clinical decision threshold.";

// ---------------------------------------------------------------------------
// Future directions
// ---------------------------------------------------------------------------
export const futureTracks: FutureTrack[] = [
  {
    track: "Larger validation cohort",
    items: [
      "Apply the workflow to additional Fontan anatomies",
      "Include a wider range of narrowing and surgical configurations",
      "Test whether geometric or flow features predict response",
      "Develop statistically supported patient-selection criteria",
    ],
  },
  {
    track: "More complete physiology",
    items: [
      "Patient-specific exercise measurements",
      "Closed-loop or multiscale circulation models",
      "Vessel-wall compliance",
      "Fluid–structure interaction",
      "Respiratory effects",
      "Uncertainty quantification",
      "Sensitivity analysis of boundary conditions",
    ],
  },
  {
    track: "Clinical translation",
    items: [
      "Compare predictions with catheter-based pre/post measurements",
      "Compare virtual interventions with postoperative imaging",
      "Evaluate alternative stent diameters and placements",
      "Quantify uncertainty alongside predicted benefit",
      "Develop faster preprocedural workflows",
      "Build clinician-facing intervention comparison tools",
    ],
  },
];

// ---------------------------------------------------------------------------
// Thesis document
// ---------------------------------------------------------------------------
export const thesisDocument = {
  title: header.formalTitle,
  author: "Isaias Martinez",
  department: "Stanford Department of Bioengineering",
  advisor: "Dr. Alison Marsden",
  year: "2026",
  honors: "Honors Thesis",
  pageCount: "56 pages",
};

// ---------------------------------------------------------------------------
// Section nav
// ---------------------------------------------------------------------------
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "physiology", label: "Physiology" },
  { id: "question", label: "Question" },
  { id: "workflow", label: "Workflow" },
  { id: "stenting", label: "Stenting" },
  { id: "simulations", label: "Simulations" },
  { id: "metrics", label: "Metrics" },
  { id: "results", label: "Results" },
  { id: "interpretation", label: "Interpretation" },
  { id: "my-work", label: "My Work" },
  { id: "limitations", label: "Limitations" },
];
