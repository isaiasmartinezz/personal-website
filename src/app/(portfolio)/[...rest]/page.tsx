import { notFound } from "next/navigation";

// Unknown portfolio URLs 404 inside the portfolio layout (nav + footer).
export default function Unknown() {
  notFound();
}
