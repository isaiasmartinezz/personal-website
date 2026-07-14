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
  },
];
