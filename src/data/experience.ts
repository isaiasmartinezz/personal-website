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
    end: "Present",
    summary:
      "Building agentic AI for enterprise identity security on the IBM Verify team.",
    highlights: [
      "Develop agentic AI applications that automate identity risk analysis by combining LLMs with automated reasoning to strengthen enterprise security decisions.",
      "Build scalable Python services, APIs, and data pipelines for large-scale security analytics.",
      "Quantitatively evaluate and optimize AI systems for latency, accuracy, and reliability.",
    ],
    tech: ["Python", "LLMs", "Automated Reasoning", "APIs"],
    href: "https://www.ibm.com/verify",
  },
  {
    title: "AI Instructor",
    organization: "Inspirit AI",
    type: "teaching",
    start: "Jun 2026",
    end: "Present",
    highlights: [
      "Teach Python, machine learning, and AI concepts to high school students through project-based instruction.",
      "Mentor students in designing and implementing end-to-end AI projects with real-world datasets.",
      "Provide technical guidance on model development, evaluation, and optimization.",
    ],
    tech: ["Python", "Machine Learning", "AI"],
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
      "Automated in-vitro test data collection and visualization with Python and REST APIs for a new glucose analyzer.",
      "Built benchmarking tools to evaluate device performance using statsmodels and scikit-learn for statistical and regression analysis.",
      "Integrated Python with Minitab for repeatable analyses (DOE, ANOVA, regression) and streamlined workflows via secure ETL pipelines and Git-based version control.",
    ],
    tech: ["Python", "REST APIs", "statsmodels", "scikit-learn", "Minitab", "Git"],
  },
  {
    title: "Researcher",
    organization: "Stanford Marsden Cardiovascular Biomechanics Lab",
    location: "Stanford, CA",
    type: "research",
    start: "Feb 2025",
    end: "Present",
    summary:
      "Fontan hemodynamics & AVM-risk research using 4D Flow MRI.",
    highlights: [
      "Build a Python data pipeline to extract and quantify hepatic flow metrics from 4D Flow MRI using NumPy, SciPy, and Matplotlib.",
      "Apply signal processing and pattern recognition for AVM biomarker detection, with statistical validation and visualization in Seaborn and Plotly.",
      "Automate benchmarking with Git/GitHub, Bash, and CI/CD for reproducible research pipelines.",
    ],
    tech: ["Python", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Plotly"],
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
      "Build multilingual intake and symptom-check modules with REST APIs, SQL backends, and secure HIPAA-compliant data pipelines.",
      "Integrate medical-device APIs with Dockerized microservices for scalable deployment and synchronization.",
      "Collaborate with clinicians and engineers to refine UX through user feedback loops and iterative A/B testing.",
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
    title: "Section Leader & Teaching Assistant",
    organization: "Stanford Computer Science Department",
    location: "Stanford, CA",
    type: "teaching",
    start: "Sep 2023",
    end: "Present",
    highlights: [
      "Lead weekly small-group sections mentoring beginner CS students in programming and problem-solving.",
      "Hold office hours in C++, Python, and JavaScript; help students debug and improve code design in 1:1 meetings.",
      "Collaborate with instructors to align teaching strategies with curriculum goals.",
    ],
    tech: ["C++", "Python", "JavaScript"],
  },
];
