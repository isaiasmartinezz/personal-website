import type { Profile } from "@/lib/types";

// ---------------------------------------------------------------------------
// About / profile content
// ---------------------------------------------------------------------------
// Feeds the hero pitch, the About page, and the "quick facts" strip.
// ---------------------------------------------------------------------------

export const profile: Profile = {
  bio: [
    "I'm a Stanford student finishing a B.S. in Bioengineering (with Honors) and a coterminal M.S. in Computer Science. I build software, AI, and data systems that live where medicine meets engineering — from agentic AI for enterprise security to pipelines that quantify blood flow from MRI.",
    "My work spans industry and research: developing agentic AI at IBM Verify, automating medical-device testing at Medtronic, building HIPAA-compliant kiosk software to widen healthcare access, and founding a biosurveillance “digital immune system” at Stanford's Gordian Knot Center. Across all of it I care about reliable, well-tested systems that make a measurable difference for people.",
  ],

  lookingFor:
    "I'm interested in software engineering and applied-ML roles at the intersection of healthcare, security, and data systems — and I'm always glad to talk about biomedical computing or interesting infrastructure problems.",

  focusAreas: [
    "Software & AI for Healthcare",
    "Machine Learning & LLMs",
    "Biomedical Data & Imaging",
    "Biosecurity & Health Systems",
  ],

  quickFacts: [
    { label: "Education", value: "B.S. Bioengineering · M.S. CS, Stanford" },
    { label: "Focus", value: "Software · AI · Biomedical systems" },
    { label: "Location", value: "Stanford, CA" },
    { label: "Graduating", value: "M.S. June 2027" },
  ],

  // Square avatar in /public. Replace this file to change the photo.
  photo: "/images/profile.jpg",
  photoAlt: "Portrait of Isaias Martinez",
};
