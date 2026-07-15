import type { Profile } from "@/lib/types";

// ---------------------------------------------------------------------------
// About / profile content
// ---------------------------------------------------------------------------
// Feeds the hero pitch, the About page, and the "quick facts" strip.
// ---------------------------------------------------------------------------

export const profile: Profile = {
  bio: [
    "I'm a software engineer and AI builder finishing a coterminal M.S. in Computer Science and B.S. in Bioengineering (with Honors) at Stanford. I like building things end-to-end — full-stack apps with real users, LLM and agentic AI systems, and the data pipelines underneath them — and my bioengineering background gives me depth in healthcare and biosecurity that most software engineers don't have.",
    "My work spans industry and research: developing agentic AI at IBM Verify, shipping a full-stack mobile app (React Native + Firebase) used by real students, implementing a GPT-2 Transformer from scratch, and founding a biosurveillance “digital immune system” at Stanford's Gordian Knot Center. Across all of it I care about reliable, well-tested systems that make a measurable difference for people.",
  ],

  lookingFor:
    "I'm interested in software engineering and applied-AI/ML roles — especially where systems meet healthcare, security, or data infrastructure — and I'm always glad to talk about full-stack builds, LLMs, or interesting engineering problems.",

  focusAreas: [
    "Software Engineering",
    "AI & Machine Learning",
    "Full-Stack & Systems",
    "Health-Tech & Biosecurity",
  ],

  quickFacts: [
    { label: "Education", value: "B.S. Bioengineering · M.S. CS, Stanford" },
    { label: "Focus", value: "Software Engineering · AI · Health-Tech" },
    { label: "Location", value: "Stanford, CA" },
    { label: "Graduating", value: "M.S. June 2027" },
  ],

  // Square avatar in /public. Replace this file to change the photo.
  photo: "/images/profile.jpg",
  photoAlt: "Portrait of Isaias Martinez",
};
