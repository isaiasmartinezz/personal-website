import type { MethodKey } from "@/lib/methodColors";

// ---------------------------------------------------------------------------
// Structured content for the custom GPT-2 case-study page. Separate from
// projects.ts (which only holds the card/summary data used by the generic
// template) — mirrors the pattern established by epvo-case-study.ts and
// coquest-case-study.ts.
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  value: string;
  label: string;
  isTarget?: boolean;
  note?: string;
}

export interface BackboneStage {
  label: string;
  note?: string;
}

export interface MethodEquation {
  label: string;
  expr: string;
}

export interface MethodDetail {
  key: MethodKey;
  label: string;
  where: string;
  mechanism?: string;
  equations?: MethodEquation[];
  strength: string;
  cost?: string;
  sensitivity?: string;
  limitation?: string;
  highlight: "input" | "attention" | "hidden" | "classifier" | "full" | "decode";
}

export interface TaskCard {
  title: string;
  datasets: string[];
  objective: string[];
  compared: string[];
  metric: string;
  note?: string;
}

export interface DatasetRow {
  dataset: string;
  task: string;
  train: string;
  dev: string;
  test: string;
}

export interface EfficiencyPoint {
  method: MethodKey;
  trainablePct: number;
  peakMemoryMb: number;
  accuracy: number;
}

export interface ReftPlacement {
  key: string;
  label: string;
  layers: number[];
  sst: number;
  cfimdb: number;
}

export interface LoraConfig {
  label: string;
  sst: number;
  cfimdb: number;
}

export interface ParaphraseRow {
  method: string;
  setting: string;
  dev: number;
  test: number | null;
}

export interface CandidateDemoItem {
  id: string;
  descriptor: string;
  selected: boolean;
}

export interface DpoRow {
  strategy: string;
  chrf: number;
}

export interface SeedRow {
  method: string;
  sst: string;
  cfimdb: string;
}

export interface SignificanceRow {
  compare: string;
  p: string;
}

export interface ContributionGroup {
  category: string;
  items: string[];
}

export interface ExperimentLessonEntry {
  title: string;
  decision: string;
  lesson: string;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "ML · NLP · 2025",
  title: "Parameter-Efficient Adaptation of GPT-2",
  intro:
    "Implemented a GPT-2-style Transformer and compared lightweight adaptation methods across sentiment classification, paraphrase detection, and conditional sonnet generation.",
  description:
    "LoRA and ReFT approached or exceeded full fine-tuning on short-form sentiment while updating a fraction of the parameters, but the advantage did not transfer uniformly across longer classification inputs and generation tasks.",
  meta: [
    { label: "Role", value: "Machine Learning Engineer" },
    { label: "Team", value: "3" },
    { label: "Backbone", value: "GPT-2 small" },
    { label: "Tasks", value: "3" },
  ],
  heroCaption: "One pretrained backbone, multiple intervention strategies, and three downstream tasks.",
};

export const projectSummary =
  "We implemented a GPT-2-style decoder-only Transformer and used it as a shared backbone to compare full fine-tuning with LoRA, ReFT, soft prompt tuning, and decoding-based improvements across sentiment classification, paraphrase detection, and conditional sonnet generation.";

export const projectQuestion =
  "The central question was not whether GPT-2 could be adapted, but where adaptation should occur — and how much of the model actually needed to change.";

// ---------------------------------------------------------------------------
// Key findings strip
// ---------------------------------------------------------------------------
export const findingsMetrics: CaseStudyMetric[] = [
  { value: "0.0178%", label: "Trainable parameters, highlighted SST ReFT run" },
  { value: "0.526", label: "Best individual ReFT run on SST" },
  { value: "61.9%", label: "Memory reduction under the selected CFIMDB configuration" },
  { value: "43.11", label: "Development chrF, not classification accuracy" },
  { value: "3", label: "Downstream NLP tasks" },
];
export const findingsFootnote =
  "Metrics come from different task-specific configurations and should not be interpreted as one combined model result.";

// ---------------------------------------------------------------------------
// Research question
// ---------------------------------------------------------------------------
export const adaptationSpectrum = [
  { stage: "Frozen encoder", method: "Last linear layer" },
  { stage: "Input adaptation", method: "Soft prompts" },
  { stage: "Representation adaptation", method: "ReFT" },
  { stage: "Weight adaptation", method: "LoRA" },
  { stage: "Full-model adaptation", method: "Full fine-tuning" },
];
export const primaryQuestion =
  "We compared whether task behavior could be changed by modifying only the classifier, learned inputs, hidden representations, low-rank attention updates, or the entire model.";
export const secondaryQuestion =
  "For generation, can inference-time decoding decisions matter more than additional training?";

// ---------------------------------------------------------------------------
// Shared GPT-2 backbone
// ---------------------------------------------------------------------------
export const backboneStages: BackboneStage[] = [
  { label: "Token + positional embeddings" },
  {
    label: "Transformer block × 12",
    note: "Pre-LayerNorm → causal multi-head self-attention → residual → Pre-LayerNorm → feed-forward → residual",
  },
  { label: "Final LayerNorm" },
  { label: "Autoregressive LM head", note: "Tied to the input embedding weights" },
];

export const backboneTable = [
  { component: "Architecture", detail: "Decoder-only Transformer" },
  { component: "Attention", detail: "Causal multi-head self-attention" },
  { component: "Normalization", detail: "Pre-LayerNorm" },
  { component: "Embeddings", detail: "Token and positional embeddings" },
  { component: "Output", detail: "Tied input/output embedding weights" },
  { component: "Classification representation", detail: "Final non-padding token" },
  { component: "Generation", detail: "Autoregressive next-token prediction" },
  { component: "Optimizer", detail: "AdamW" },
  { component: "Model selection", detail: "Best development checkpoint" },
  { component: "Random seed", detail: "11711 for primary experiments" },
];

export const backboneNote =
  "The team implemented this decoder-only architecture and loaded pretrained GPT-2 weights into it — the pretrained language model itself was not trained from scratch.";

// ---------------------------------------------------------------------------
// Adaptation-method explorer
// ---------------------------------------------------------------------------
export const methodDetails: MethodDetail[] = [
  {
    key: "full",
    label: "Full fine-tuning",
    where: "All model parameters",
    mechanism: "Update the entire pretrained backbone and task head.",
    strength: "Maximum adaptation capacity.",
    cost: "Highest trainable-parameter count and GPU-memory use.",
    highlight: "full",
  },
  {
    key: "lora",
    label: "LoRA",
    where: "Query and value projections inside attention blocks.",
    mechanism: "Learn low-rank matrices that produce an additive weight update.",
    equations: [
      { label: "Update", expr: "ΔW = BA" },
      { label: "Forward pass", expr: "y = Wx + (α / r)BAx" },
    ],
    strength: "Competitive performance with substantially fewer trainable weights.",
    sensitivity: "Rank and scaling factor must be tuned carefully.",
    highlight: "attention",
  },
  {
    key: "reft",
    label: "ReFT",
    where: "Intermediate hidden representations.",
    mechanism: "Apply learned low-rank interventions to selected Transformer layers.",
    equations: [{ label: "Intervention", expr: "h′ = h + Wup Wdown h" }],
    strength: "Very small parameter budget and flexible layer placement.",
    sensitivity: "Performance depended strongly on which layers were modified.",
    highlight: "hidden",
  },
  {
    key: "soft",
    label: "Soft prompt tuning",
    where: "Before the original token embeddings.",
    mechanism: "Prepend learned continuous prompt vectors while freezing the backbone.",
    equations: [{ label: "Representation", expr: "X̃ = [P; X]" }],
    strength: "Extremely lightweight input-level adaptation.",
    limitation: "It performed substantially below full fine-tuning in the tested paraphrase setting.",
    highlight: "input",
  },
  {
    key: "linear",
    label: "Last linear layer",
    where: "Task classifier only.",
    strength: "Lowest resource use.",
    limitation: "Large accuracy loss, particularly on CFIMDB.",
    highlight: "classifier",
  },
  {
    key: "decode",
    label: "Decoding and reranking",
    where: "After training, during generation.",
    mechanism: "Generate multiple candidate continuations and score them using lightweight structural penalties.",
    strength: "Produced the strongest sonnet-generation result in this project.",
    highlight: "decode",
  },
];

// ---------------------------------------------------------------------------
// Task and dataset matrix
// ---------------------------------------------------------------------------
export const taskCards: TaskCard[] = [
  {
    title: "Sentiment classification",
    datasets: ["SST", "CFIMDB"],
    objective: ["5-class sentence sentiment", "Binary movie-review sentiment"],
    compared: ["Last linear layer", "Full fine-tuning", "LoRA", "ReFT"],
    metric: "Development accuracy",
  },
  {
    title: "Paraphrase detection",
    datasets: ["Quora question pairs"],
    objective: ["Binary paraphrase classification"],
    compared: ["Full fine-tuning", "LoRA", "ReFT", "Soft prompt tuning"],
    metric: "Development accuracy and final full-model test accuracy",
    note: "Parameter-efficient experiments used a 25% training subset; the full-model result used the complete training set.",
  },
  {
    title: "Conditional sonnet generation",
    datasets: ["Shakespeare sonnets"],
    objective: ["Continue a sonnet from its first three lines"],
    compared: ["Full fine-tuning", "LoRA and ReFT experiments", "DPO", "Hyperparameter tuning", "Sampling and reranking"],
    metric: "chrF",
  },
];

export const datasetTable: DatasetRow[] = [
  { dataset: "SST", task: "5-class sentiment", train: "8,544", dev: "1,101", test: "2,210" },
  { dataset: "CFIMDB", task: "Binary sentiment", train: "1,701", dev: "245", test: "488" },
  { dataset: "Quora", task: "Paraphrase detection", train: "283,003", dev: "40,429", test: "80,858" },
  { dataset: "Sonnets", task: "Conditional generation", train: "131", dev: "12", test: "12" },
];

// ---------------------------------------------------------------------------
// Experimental workflow
// ---------------------------------------------------------------------------
export const pipelineStages = [
  "Source dataset",
  "Tokenize & batch",
  "Load shared pretrained backbone",
  "Apply adaptation method",
  "Train for up to 10 epochs",
  "Select best development checkpoint",
  "Evaluate performance",
  "Record trainable parameters & GPU memory",
];

export const pipelineBranches = [
  { title: "Classification", steps: ["Final-token representation", "Linear head", "Accuracy"] },
  { title: "Generation", steps: ["Next-token loss", "Autoregressive decoding", "chrF"] },
  {
    title: "DPO",
    steps: [
      "Construct synthetic preferred/dispreferred pairs",
      "Preference loss",
      "Generate on held-out prompts",
      "chrF",
    ],
  },
];

export const pipelineCallout = "Test data was not used for hyperparameter selection.";

// ---------------------------------------------------------------------------
// Sentiment efficiency
// ---------------------------------------------------------------------------
export const efficiencyDatasets: Record<"sst" | "cfimdb", EfficiencyPoint[]> = {
  sst: [
    { method: "linear", trainablePct: 0.0031, peakMemoryMb: 681.36, accuracy: 0.467 },
    { method: "full", trainablePct: 100, peakMemoryMb: 4865.96, accuracy: 0.52 },
    { method: "reft", trainablePct: 0.0178, peakMemoryMb: 2398.49, accuracy: 0.526 },
    { method: "lora", trainablePct: 0.1209, peakMemoryMb: 2861.55, accuracy: 0.519 },
  ],
  cfimdb: [
    { method: "linear", trainablePct: 0.0012, peakMemoryMb: 591.18, accuracy: 0.865 },
    { method: "full", trainablePct: 100, peakMemoryMb: 2710.3, accuracy: 0.98 },
    { method: "reft", trainablePct: 0.0061, peakMemoryMb: 1032.63, accuracy: 0.976 },
    { method: "lora", trainablePct: 0.119, peakMemoryMb: 1544.81, accuracy: 0.971 },
  ],
};

export const efficiencyCaption =
  "Representative best-run configurations, not five-seed means (see the multi-seed analysis below).";

export const efficiencyTakeaways = [
  "On SST, the highlighted ReFT run slightly exceeded the full-model baseline while updating 0.0178% of parameters.",
  "On CFIMDB, full fine-tuning retained the highest accuracy.",
  "ReFT reduced CFIMDB peak GPU memory from 2,710.30 MB to 1,032.63 MB.",
  "The last-linear-layer baseline was cheapest but lost substantial accuracy.",
];

// ---------------------------------------------------------------------------
// ReFT layer-placement explorer
// ---------------------------------------------------------------------------
export const reftPlacements: ReftPlacement[] = [
  { key: "early", label: "Early — layer 2", layers: [2], sst: 0.507, cfimdb: 0.976 },
  { key: "middle", label: "Middle — layer 5", layers: [5], sst: 0.504, cfimdb: 0.967 },
  { key: "late", label: "Late — layer 11", layers: [11], sst: 0.48, cfimdb: 0.873 },
  { key: "distributed", label: "Distributed — layers 1, 6, 11", layers: [1, 6, 11], sst: 0.526, cfimdb: 0.971 },
  { key: "cluster", label: "Late cluster — layers 8, 9, 10", layers: [8, 9, 10], sst: 0.507, cfimdb: 0.976 },
];

export const reftInterpretation = [
  "Distributed interventions produced the strongest individual SST result.",
  "A single final-layer intervention performed poorly, especially on CFIMDB.",
  "Placement produced larger changes than modest rank adjustments.",
  "The result suggests — but doesn't prove — that sentiment information is developed across multiple stages of the network.",
];

// ---------------------------------------------------------------------------
// LoRA rank and scaling analysis
// ---------------------------------------------------------------------------
export const loraConfigs: LoraConfig[] = [
  { label: "Rank 8, α = 16", sst: 0.517, cfimdb: 0.939 },
  { label: "Rank 4, α = 8", sst: 0.519, cfimdb: 0.971 },
  { label: "Rank 8, α = 32", sst: 0.509, cfimdb: 0.82 },
  { label: "Rank 16, α = 32", sst: 0.515, cfimdb: 0.898 },
];

export const loraConclusion =
  "Moderate rank and scaling produced the most stable performance, while larger update magnitudes degraded CFIMDB accuracy.";

// ---------------------------------------------------------------------------
// Paraphrase detection
// ---------------------------------------------------------------------------
export const paraphraseWarning =
  "The full-model baseline and parameter-efficient methods were not trained on equal amounts of data, so this is not a perfectly controlled head-to-head comparison.";

export const paraphraseRows: ParaphraseRow[] = [
  { method: "Full fine-tuning", setting: "Full Quora training set", dev: 0.898, test: 0.859 },
  { method: "LoRA", setting: "25% training subset", dev: 0.856, test: null },
  { method: "ReFT", setting: "25% training subset", dev: 0.817, test: null },
  { method: "Soft prompt tuning", setting: "25% training subset", dev: 0.743, test: null },
];

export const paraphraseExplanation = [
  "Full-model fine-tuning produced the strongest result.",
  "LoRA retained more performance than ReFT or soft prompts in the reduced-data experiment.",
  "Input-level adaptation alone was insufficient under the tested soft-prompt configuration.",
  "Longer or pairwise reasoning tasks may require greater adaptation capacity or better tuning — a hypothesis, not a settled conclusion.",
];

// ---------------------------------------------------------------------------
// Sonnet-generation laboratory
// ---------------------------------------------------------------------------
export const generationStages = [
  {
    title: "Train",
    points: [
      "Fine-tune GPT-2 on complete sonnets",
      "Condition evaluation on the first three lines",
      "Predict the continuation autoregressively",
    ],
  },
  {
    title: "Sample",
    points: ["Temperature", "Top-p", "Candidate-pool size", "Multiple continuations"],
  },
  {
    title: "Rerank",
    points: ["Repetition penalty", "Incorrect line-count penalty", "Structural-issue penalty"],
  },
];

export const generationResults = {
  bestDevChrf: "≈ 43.11",
  testChrf: "42.220",
  bestPool: "Best-of-10",
  poolNote: "Best-of-5 and best-of-15 performed worse.",
};

// Illustrative only — structural descriptors, not real generated verse (no
// sample generations were pulled from the project report for this demo).
export const candidateDemo: CandidateDemoItem[] = [
  { id: "A", descriptor: "14/14 lines · low repetition", selected: true },
  { id: "B", descriptor: "14/14 lines · high repetition", selected: false },
  { id: "C", descriptor: "12/14 lines · structural issue", selected: false },
];

// ---------------------------------------------------------------------------
// DPO experiment
// ---------------------------------------------------------------------------
export const dpoRows: DpoRow[] = [
  { strategy: "Line shuffling after truncation", chrf: 41.3 },
  { strategy: "Partial continuation replacement", chrf: 41.04 },
  { strategy: "Full continuation replacement", chrf: 41.27 },
];

export const dpoExplanation = [
  "Synthetic corrupted continuations were used because the dataset did not contain human preference pairs.",
  "None of the DPO configurations exceeded the best reranked full-model result.",
  "Qualitative inspection found genre drift, repetition, prose-like narration, and text corruption.",
  "The preference pairs likely did not encode the qualities most important for sonnet continuation.",
];

export const dpoLesson = "A preference objective is only as useful as the preference data used to define it.";

// ---------------------------------------------------------------------------
// Multi-seed statistical analysis
// ---------------------------------------------------------------------------
export const seedRows: SeedRow[] = [
  { method: "ReFT, layer 2", sst: "0.5124 ± 0.0046", cfimdb: "0.9696 ± 0.0040" },
  { method: "ReFT, layers 1/6/11", sst: "0.5148 ± 0.0078", cfimdb: "0.9670 ± 0.0057" },
  { method: "LoRA", sst: "0.5216 ± 0.0053", cfimdb: "0.9666 ± 0.0135" },
  { method: "Full fine-tuning", sst: "0.5080 ± 0.0105", cfimdb: "0.9808 ± 0.0018" },
  { method: "Last linear layer", sst: "0.4630 ± 0.0060", cfimdb: "0.8586 ± 0.0108" },
];

export const significanceSst: SignificanceRow[] = [
  { compare: "LoRA vs. full fine-tuning", p: "0.0411" },
  { compare: "ReFT layer 2 vs. full", p: "0.4910" },
  { compare: "ReFT distributed vs. full", p: "0.2353" },
];

export const significanceCfimdb: SignificanceRow[] = [
  { compare: "LoRA vs. full", p: "0.0653" },
  { compare: "ReFT layer 2 vs. full", p: "0.0070" },
  { compare: "ReFT distributed vs. full", p: "0.0041" },
];

export const significanceInterpretation = [
  "LoRA's SST mean was significantly higher than the full-model mean under the five tested seeds.",
  "ReFT was statistically indistinguishable from full fine-tuning on SST.",
  "Full fine-tuning retained a statistically significant advantage over ReFT on CFIMDB.",
  "LoRA's CFIMDB difference did not meet the p < 0.05 threshold.",
  "Five seeds are not enough for a highly robust statistical conclusion.",
];

// ---------------------------------------------------------------------------
// My contributions
// ---------------------------------------------------------------------------
export const contributionsIntro =
  "This was a three-person team project. ReFT, LoRA, and DPO were primarily implemented by other members of the team — the contributions below describe what I personally worked on.";

export const contributionGroups: ContributionGroup[] = [
  {
    category: "Paraphrase detection",
    items: [
      "Implemented the GPT-2-based paraphrase-detection pipeline",
      "Encoded question pairs for binary classification",
      "Built and evaluated full-model and parameter-efficient experiments",
    ],
  },
  {
    category: "Soft prompt tuning",
    items: [
      "Implemented learned continuous prompt embeddings",
      "Integrated prompt positions with the frozen GPT-2 backbone",
      "Evaluated soft prompting on Quora paraphrase detection",
    ],
  },
  {
    category: "Sonnet generation",
    items: [
      "Implemented and improved the conditional sonnet-generation pipeline",
      "Tuned training and decoding hyperparameters",
      "Explored candidate generation and best-of-N reranking",
      "Helped analyze why decoding improvements outperformed the tested DPO configurations",
    ],
  },
  {
    category: "Communication",
    items: ["Contributed to experiment interpretation and the final technical report"],
  },
];

// ---------------------------------------------------------------------------
// Technical challenges and decisions
// ---------------------------------------------------------------------------
export const challenges: ExperimentLessonEntry[] = [
  {
    title: "One model had to support classification and generation",
    decision: "Use a shared decoder-only GPT-2 backbone and task-specific heads or objectives.",
    lesson:
      "A shared architecture makes method comparisons easier, but task behavior still differs substantially.",
  },
  {
    title: "Efficiency has multiple dimensions",
    decision: "Measure accuracy, percentage of trainable parameters, and peak GPU memory.",
    lesson:
      "Low parameter count does not automatically imply proportionally low memory use because activations and optimizer behavior still matter.",
  },
  {
    title: "ReFT required choosing intervention locations",
    decision: "Sweep rank and layer placement separately.",
    lesson: "Layer placement affected performance more strongly than modest rank changes.",
  },
  {
    title: "Likelihood training did not guarantee strong poetic structure",
    decision: "Tune sampling and rerank multiple candidates using lightweight structural penalties.",
    lesson: "For open-ended generation, inference-time selection can be as important as the training objective.",
  },
];

// ---------------------------------------------------------------------------
// What worked and what did not
// ---------------------------------------------------------------------------
export const worked = [
  "LoRA and ReFT offered strong SST performance with very small trainable parameter budgets",
  "ReFT substantially reduced CFIMDB GPU-memory use",
  "Distributed ReFT interventions performed well on SST",
  "Moderate LoRA rank and scaling were more stable than aggressive configurations",
  "Best-of-10 reranking produced the strongest sonnet-generation result",
  "Multi-seed analysis revealed differences hidden by individual runs",
];

export const didNotWork = [
  "The last-linear-layer baseline lost substantial accuracy",
  "Soft prompting underperformed on the tested paraphrase configuration",
  "Late-only ReFT intervention degraded CFIMDB performance",
  "Larger LoRA scaling did not improve results",
  "PEFT did not match full fine-tuning on the reduced-data paraphrase setting",
  "Synthetic-corruption DPO did not outperform decoding-based reranking",
];

// ---------------------------------------------------------------------------
// Limitations and next steps
// ---------------------------------------------------------------------------
export const limitations = [
  "Experiments used GPT-2 small",
  "Compute limited the number of random seeds",
  "Hyperparameter sweeps were not exhaustive",
  "Some task comparisons used different training-data amounts",
  "Sonnet evaluation relied heavily on chrF",
  "Synthetic DPO negatives may not reflect genuine human preferences",
  "Results may not transfer directly to larger models",
  "Development metrics were used for model selection",
];

export const nextSteps = [
  "Repeat experiments with more seeds",
  "Equalize training data across paraphrase methods",
  "Explore additional ReFT layer combinations",
  "Tune LoRA rank and scaling more systematically",
  "Compare wall-clock training time and energy use",
  "Evaluate larger backbones",
  "Use human evaluation for generation quality",
  "Create preference pairs that explicitly encode meter, rhyme, structure, and semantic coherence",
  "Compare learned rerankers with hand-designed penalties",
  "Analyze whether task complexity predicts the best adaptation location",
];

// ---------------------------------------------------------------------------
// Section nav
// ---------------------------------------------------------------------------
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "backbone", label: "Backbone" },
  { id: "methods", label: "Methods" },
  { id: "tasks", label: "Tasks" },
  { id: "efficiency", label: "Efficiency" },
  { id: "layers", label: "Layers" },
  { id: "paraphrase", label: "Paraphrase" },
  { id: "generation", label: "Generation" },
  { id: "statistics", label: "Statistics" },
  { id: "contributions", label: "Contributions" },
  { id: "lessons", label: "Lessons" },
];
