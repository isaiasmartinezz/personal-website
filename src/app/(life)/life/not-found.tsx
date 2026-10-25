import Link from "next/link";
import { Container } from "@/components/Container";

export default function LifeNotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Nothing here</h1>
      <Link href="/" className="mt-6 text-sm text-muted hover:text-accent">Back to Life</Link>
    </Container>
  );
}
