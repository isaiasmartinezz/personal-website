import type { Metadata } from "next";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader, LinkButton } from "@/components/ui";
import { FileTextIcon, MailIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume / CV of ${site.name}.`,
};

export default function ResumePage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <PageHeader
          eyebrow="Resume / CV"
          title="Resume"
          lead="View it inline below, or download the PDF."
        />
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.resumePath} variant="primary" showExternalIcon>
            <FileTextIcon className="size-4" />
            Download PDF
          </LinkButton>
          <LinkButton href={`mailto:${site.email}`} variant="secondary">
            <MailIcon className="size-4" />
            Email me
          </LinkButton>
        </div>
      </div>

      {/* Inline PDF preview. If the file isn't present yet, the fallback shows. */}
      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
        <object
          data={site.resumePath}
          type="application/pdf"
          aria-label={`${site.name} resume`}
          className="h-[80vh] min-h-[600px] w-full"
        >
          <div className="p-10 text-center">
            <p className="text-muted">
              Your browser can&apos;t display the PDF inline.
            </p>
            <p className="mt-2 text-sm text-subtle">
              {/* Reminder for the site owner: */}
              If nothing loads, make sure your resume exists at{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                public{site.resumePath}
              </code>
              .
            </p>
            <div className="mt-6">
              <LinkButton href={site.resumePath} variant="primary" showExternalIcon>
                <FileTextIcon className="size-4" />
                Open the PDF
              </LinkButton>
            </div>
          </div>
        </object>
      </div>
    </Container>
  );
}
