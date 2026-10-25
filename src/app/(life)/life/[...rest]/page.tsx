import { notFound } from "next/navigation";

// Deeper unknown paths (e.g. /a/b/c) land here and 404 inside the life layout.
export default function Unknown() {
  notFound();
}
