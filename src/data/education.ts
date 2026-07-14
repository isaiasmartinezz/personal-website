import type { EducationEntry } from "@/lib/types";

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------
// Reverse-chronological. `gpa`, `honors`, `thesis`, and `coursework` are all
// optional — delete any you'd rather not show.
// ---------------------------------------------------------------------------

export const education: EducationEntry[] = [
  {
    degree: "Master of Science",
    field: "Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    start: "Sep 2024",
    end: "Jun 2027",
    // TODO (optional): add a concentration, GPA, or relevant coursework.
  },
  {
    degree: "Bachelor of Science",
    field: "Bioengineering (with Honors)",
    institution: "Stanford University",
    location: "Stanford, CA",
    start: "Sep 2022",
    end: "Jun 2026",
    honors: [
      "Graduated with Honors",
      "Stanford Award of Excellence",
      "Gordian Knot National Security Innovation Scholar",
      "HSF Scholar",
      "SHPE / GE Scholarship",
    ],
    thesis:
      "Hemodynamic Effects of Virtual Stenting in the Fontan Circulation at Rest and During Exercise (advisor: Dr. Alison Marsden).",
  },
];
