import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

// Per-project social share card — same visual system as the site-wide one in
// src/app/opengraph-image.tsx, but with this project's title/category/tags so
// a shared project link looks tailored instead of generic.
const detailProjects = projects.filter((p) => p.featured);

export function generateStaticParams() {
  return detailProjects.map((p) => ({ slug: p.slug }));
}

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = detailProjects.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#020617",
          backgroundImage:
            "radial-gradient(1000px 400px at 85% -10%, rgba(59,130,246,0.35), transparent)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#3b82f6",
            }}
          />
          <div style={{ fontSize: 28, color: "#94a3b8", letterSpacing: "0.05em" }}>
            {project ? `${project.category} · ${project.year}` : site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            {project?.title ?? site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              color: "#94a3b8",
              maxWidth: 950,
              lineHeight: 1.4,
            }}
          >
            {project?.summary ?? site.tagline}
          </div>
          {project && project.tags.length > 0 && (
            <div style={{ display: "flex", gap: "12px", marginTop: 32 }}>
              {project.tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 24,
                    color: "#93c5fd",
                    border: "1.5px solid rgba(59,130,246,0.4)",
                    borderRadius: 999,
                    padding: "8px 20px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#64748b" }}>
          <div>{site.name}</div>
          <div>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
