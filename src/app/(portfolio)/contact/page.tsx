import type { Metadata } from "next";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { PageHeader, LinkButton } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SocialLinks } from "@/components/SocialLinks";
import { MailIcon, MapPinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="I'm always open to research collaborations, internship conversations, or a good systems discussion. The fastest way to reach me is email."
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Direct contact */}
        <div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-subtle">
              Email
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-all font-medium text-accent hover:text-accent-hover"
            >
              {site.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-3">
              <LinkButton href={`mailto:${site.email}`} variant="primary">
                <MailIcon className="size-4" />
                Email me
              </LinkButton>
              <CopyEmailButton email={site.email} />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-subtle">
              Elsewhere
            </h2>
            <SocialLinks className="mt-3" />
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPinIcon className="size-4 text-accent" />
              {site.location}
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-lg font-semibold">Send a message</h2>
          <p className="mt-1 text-sm text-muted">
            Prefer a form? Drop a note here and I&apos;ll reply by email.
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
