import type { SkillGroup } from "@/lib/types";

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
// Grouped and scannable. Reorder within a group by importance.
// ---------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    skills: ["Python", "C++", "JavaScript/TypeScript", "SQL", "Go"],
    seenIn: ["gpt2-from-scratch", "centrifuge"],
  },
  {
    name: "ML/AI",
    skills: [
      "PyTorch",
      "Hugging Face",
      "LoRA/PEFT",
      "Sparse Autoencoders",
      "LLM Evaluation Harnesses",
      "MCP",
    ],
    seenIn: ["gpt2-from-scratch"],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      "React Native",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Streamlit",
      "Firebase",
      "Node.js",
    ],
    seenIn: ["coquest", "biosurveillance-digital-immune-system"],
  },
  {
    name: "Tools",
    skills: [
      "scikit-learn",
      "statsmodels",
      "pandas",
      "Git/GitHub",
      "Docker",
      "CI/CD",
      "Linux",
      "REST APIs",
      "PostgreSQL",
      "SimVascular",
      "Langflow",
    ],
    seenIn: ["4d-flow-mri-hepatic-flow", "fontan-virtual-stenting"],
  },
  {
    name: "Systems & Infrastructure",
    skills: ["Microservices", "Distributed Systems", "Cloud APIs (AWS/GCP)", "Bash"],
    seenIn: ["biosurveillance-digital-immune-system"],
  },
];
