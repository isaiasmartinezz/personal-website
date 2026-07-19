import type { SkillGroup } from "@/lib/types";

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
// Grouped and scannable. Reorder within a group by importance.
// ---------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    skills: ["Python", "C++", "JavaScript", "SQL", "Bash"],
    seenIn: ["gpt2-from-scratch", "centrifuge"],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      "NumPy",
      "SciPy",
      "pandas",
      "scikit-learn",
      "statsmodels",
      "Hugging Face Transformers",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "REST APIs",
    ],
    seenIn: ["gpt2-from-scratch", "biosurveillance-digital-immune-system"],
  },
  {
    name: "Tools & Infrastructure",
    skills: [
      "Git & GitHub",
      "Docker",
      "CI/CD",
      "ETL Pipelines",
      "Microservices",
      "API Gateways",
      "SQL Databases",
      "Minitab",
      "Linux",
    ],
    seenIn: ["4d-flow-mri-hepatic-flow"],
  },
  {
    name: "Concepts & Domains",
    skills: [
      "Agentic AI & LLMs",
      "Machine Learning",
      "Natural Language Processing",
      "Medical Imaging (4D Flow MRI)",
      "Time-Series & Anomaly Detection",
      "Statistical Analysis (DOE, ANOVA, Regression)",
      "Data Visualization",
      "Healthcare & Biomedical Software",
    ],
    seenIn: ["gpt2-from-scratch", "fontan-virtual-stenting"],
  },
];
