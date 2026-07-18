// Project slugs that use a fully custom case-study layout instead of the
// generic template in src/app/projects/[slug]/page.tsx. Kept in its own
// module (rather than inline in page.tsx) so tests can import it without
// pulling in the entire case-study component tree.
export const CUSTOM_CASE_STUDY_SLUGS = new Set([
  "neonatal-photoacoustic-oximeter",
  "coquest",
  "gpt2-from-scratch",
  "biosurveillance-digital-immune-system",
  "fontan-virtual-stenting",
  "centrifuge",
]);
