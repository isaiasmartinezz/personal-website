import type { ExperienceEntry } from "@/lib/types";

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
// Reverse-chronological (newest first). `type` drives the colored label:
//   "industry" | "research" | "teaching" | "other"
// ---------------------------------------------------------------------------

export const experience: ExperienceEntry[] = [
  {
    title: "Software Developer Intern",
    organization: "IBM Verify",
    location: "Remote",
    type: "industry",
    start: "Jun 2026",
    end: "Sep 2026",
    summary:
      "Built agentic AI systems for enterprise identity and access management, combining LLMs with automated reasoning to automate identity risk analysis.",
    highlights: [
      "Built a multi-agent identity risk workflow in Langflow routing cases across 4 specialized agents behind Python services and APIs, cutting end-to-end analysis from ~20 minutes of manual review to under 2 minutes per case.",
      "Designed an MCP-based tool-filtering layer that scopes an agent's available actions to a user's entitlements, cutting exposed tool surface by over 15% across 5 workflows.",
      "Traced ±8% run-to-run behavior variance to tool-ordering nondeterminism and reduced it to ±3%.",
    ],
    tech: ["Python", "LLMs", "Automated Reasoning", "Langflow", "MCP", "APIs"],
    href: "https://www.ibm.com/verify",
  },
  {
    title: "AI Instructor",
    organization: "Inspirit AI",
    type: "teaching",
    start: "Jun 2026",
    end: "Present",
    highlights: [
      "Teach Python, machine learning, and AI concepts through project-based instruction, leading small groups of 5-6 students per cohort.",
      "Mentor students in designing and implementing end-to-end AI projects applied to fields such as education and investment, using real-world datasets.",
      "Provide technical guidance on model development, evaluation, and optimization.",
    ],
    tech: ["Python", "Machine Learning", "AI"],
  },
  {
    title: "Product Manager — Brain Injury Connection",
    organization: "Develop for Good",
    location: "Stanford, CA",
    type: "other",
    start: "Oct 2025",
    end: "Feb 2026",
    summary:
      "Led an accessible, cognitive-friendly website redesign for ABI patients and caregivers, shipped across 8 pages and flows.",
    highlights: [
      "Led an end-to-end redesign shipped across 8 pages and flows as PM with Develop for Good, incorporating feedback from 10+ user-testing participants.",
      "Defined product requirements, user flows, and feature scope, iterating with nonprofit stakeholders.",
      "Coordinated design and low/no-code implementation across a team of engineers and designers.",
      "Partnered with Brain Injury Connection to deliver an intuitive resource platform aligned with its mission and user needs.",
    ],
    href: "https://www.developforgood.org",
  },
  {
    title: "Project Founder & Lead",
    organization: "Gordian Knot Center for National Security Innovation",
    location: "Stanford, CA",
    type: "research",
    start: "Sep 2025",
    end: "Jun 2026",
    summary:
      "Founded and led a biosurveillance \"digital immune system\" research project.",
    highlights: [
      "Fused 3 independent data sources into a single risk index, validated against 50+ synthetic scenarios spanning baseline, outbreak, and stress-test conditions.",
      "Selected an interpretable linear fusion model over higher-capacity alternatives to preserve explainability for decision-makers.",
      "Defined precision, recall, and latency thresholds; achieved 88% precision / 82% recall at 150ms median latency.",
      "Deployed a secure, fault-tolerant data infrastructure with containerized services, API gateways, and automated recovery for resilient biosecurity signal processing.",
    ],
    tech: ["Python", "SQL", "Time-Series Modeling", "ETL", "Containerization"],
  },
  {
    title: "Research & Development Intern",
    organization: "Medtronic Diabetes",
    location: "Los Angeles, CA",
    type: "industry",
    start: "Jun 2025",
    end: "Aug 2025",
    summary:
      "Automated test workflows and analytics for a next-generation blood-glucose analyzer.",
    highlights: [
      "Automated test data collection and visualization with Python and REST APIs for a new glucose analyzer, cutting manual data-processing time by 45%.",
      "Rebuilt the test-data ETL path with secure pipelines and Git-based versioning, cutting runtime from ~25 minutes to ~6 minutes per batch.",
      "Benchmarked device performance with statsmodels and scikit-learn across 200+ test runs for statistical and regression analysis.",
    ],
    tech: ["Python", "REST APIs", "statsmodels", "scikit-learn", "Minitab", "Git"],
  },
  {
    title: "Honors Thesis Researcher",
    organization: "Stanford Marsden Cardiovascular Biomechanics Lab",
    location: "Stanford, CA",
    type: "research",
    start: "Feb 2025",
    end: "Jun 2026",
    summary:
      "Built a patient-specific computational pipeline evaluating virtual stenting in the Fontan circulation, as sole student researcher.",
    highlights: [
      "Built a patient-specific pipeline from 4D flow MRI to CFD as sole student researcher: reconstructed 15 Fontan anatomies, screened to 3, generated paired virtual-stent geometries in svMorph, and ran 12 transient simulations at 32,000 time steps each.",
      "Tuned branch-specific RCR Windkessel outlet conditions until simulated flow splits and mean pressures matched catheterization and MRI data; simulated moderate exercise (3× IVC inflow, 120 bpm) alongside rest.",
      "Virtual stenting cut pressure drop 34.4–97.9% and resistance 70.4–99.5% across all three patients, but power loss rose 45.6% in one under exercise, showing a wider pathway is not automatically a more efficient one.",
    ],
    tech: ["SimVascular", "svMorph", "Python", "Computational Fluid Dynamics"],
  },
  {
    title: "Software Developer",
    organization: "Stanford Medicine — Medical Kiosk",
    location: "Stanford, CA",
    type: "research",
    start: "Jan 2025",
    end: "Present",
    summary:
      "Kiosk software to expand healthcare access in underserved communities.",
    highlights: [
      "Build multilingual intake modules on REST APIs and SQL backends, covering 4 languages across 3 intake flows.",
      "Refined intake UX through feedback loops and A/B testing, cutting mid-intake abandonment from 22% to 9%.",
      "Integrate medical-device APIs behind Dockerized microservices for scalable deployment and cross-device synchronization.",
    ],
    tech: ["Python", "REST APIs", "SQL", "Docker", "Microservices"],
  },
  {
    title: "Residential Assistant",
    organization: "Stanford University",
    location: "Stanford, CA",
    type: "other",
    start: "Sep 2024",
    end: "Present",
    highlights: [
      "Foster a positive, inclusive, and supportive residential community by building meaningful connections with residents.",
      "Plan community programming and serve as a first point of contact for student support and resources.",
    ],
  },
  {
    title: "Research Mentor — Stanford STaRS Program",
    organization: "Stanford Department of Medicine",
    location: "Stanford, CA",
    type: "teaching",
    start: "Jun 2024",
    end: "Aug 2024",
    highlights: [
      "Mentored high-school scholars in a Stanford lab on hands-on biomedical research.",
      "Taught core techniques (histology, imaging, immunohistochemistry) and coached experimental design and data analysis.",
      "Guided students to a final presentation showcase while fostering an inclusive, curiosity-driven environment.",
    ],
  },
  {
    title: "Financial Officer & Trip Co-Lead",
    organization: "Stanford Alternative Spring Break",
    location: "Stanford, CA",
    type: "other",
    start: "May 2024",
    end: "Jun 2025",
    summary:
      "Elected Financial Officer of Stanford's second-largest Volunteer Service Organization (10 trips, ~100 participants, 20 co-leads).",
    highlights: [
      "Oversaw budgeting, fundraising, and financial sustainability across the organization's 10 service trips.",
      "Co-led the Affordable Lifeline trip to Alaska, designing the curriculum and program to explore healthcare access in remote environments.",
      "Managed finances and logistics and facilitated hands-on service projects examining rural healthcare challenges.",
    ],
  },
  {
    title: "Teaching Assistant — BIOE 122",
    organization: "Stanford University School of Medicine",
    location: "Stanford, CA",
    type: "teaching",
    start: "Apr 2024",
    end: "Present",
    highlights: [
      "TA for BIOE 122, “Biosecurity and Pandemic Preparedness.”",
      "Support instruction by facilitating discussions, guiding student projects, and providing feedback.",
    ],
  },
  {
    title: "Teaching Assistant",
    organization: "Stanford Computer Science Department",
    location: "Stanford, CA",
    type: "teaching",
    start: "Sep 2023",
    end: "Jun 2026",
    highlights: [
      "Mentored 10+ students per quarter across 6+ quarters in C++, Python, and JavaScript, teaching code design and debugging practices.",
      "Debugged and reviewed 100+ code submissions quarterly, catching recurring design issues and promoting version control and testing methodology.",
    ],
    tech: ["C++", "Python", "JavaScript"],
  },
  {
    title: "Researcher",
    organization: "Stanford Fallacy Detection CS Research Project",
    location: "Stanford, CA",
    type: "research",
    start: "Jun 2023",
    end: "Dec 2023",
    summary:
      "Benchmarked large language models for logical-fallacy detection.",
    highlights: [
      "Benchmarked LLMs for fallacy detection and built baselines in Python (transformers, scikit-learn) with precision/recall/F1 reporting.",
      "Curated datasets and prompts; implemented ETL, feature engineering, and reproducible evaluation pipelines.",
      "Co-developed a fallacy detector and ran ablation studies and error analysis to refine model design.",
    ],
    tech: ["Python", "Transformers", "scikit-learn"],
  },
];
