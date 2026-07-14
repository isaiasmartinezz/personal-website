import { Container } from "@/components/Container";
import { LinkButton } from "@/components/ui";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8">
        <LinkButton href="/" variant="primary">
          Back home
          <ArrowRightIcon className="size-4" />
        </LinkButton>
      </div>
    </Container>
  );
}
