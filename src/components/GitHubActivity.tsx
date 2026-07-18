import { site } from "@/data/site";
import { GithubIcon } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Live "recently shipped" strip: pulls the most recently pushed-to public
// repos straight from the GitHub API at request time (revalidated hourly),
// so this always reflects what's actually being worked on — not a hand-
// maintained list that goes stale. Fails silently (renders nothing) if the
// API is unreachable or rate-limited, since this is a nice-to-have, not
// load-bearing content.
// ---------------------------------------------------------------------------

interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
}

const GITHUB_USERNAME = site.socials.find((s) => s.platform === "github")
  ?.href.split("/")
  .filter(Boolean)
  .pop();

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

async function getRecentRepos(): Promise<GithubRepo[]> {
  if (!GITHUB_USERNAME) return [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    if (!Array.isArray(repos)) return [];
    return repos.filter((r) => !r.fork && !r.archived).slice(0, 4);
  } catch {
    return [];
  }
}

export async function GitHubActivity() {
  const repos = await getRecentRepos();
  if (repos.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <GithubIcon className="size-4 text-subtle" />
        <p className="text-sm font-semibold uppercase tracking-widest text-subtle">
          Recently shipped
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="truncate font-mono text-sm font-semibold text-fg group-hover:text-accent">
                {repo.name}
              </p>
              <span className="shrink-0 text-xs text-subtle">
                {timeAgo(repo.pushed_at)}
              </span>
            </div>
            {repo.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {repo.description}
              </p>
            )}
            {(repo.language || repo.stargazers_count > 0) && (
              <div className="mt-3 flex items-center gap-3 text-xs text-subtle">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="size-2 rounded-full bg-accent/60" />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
