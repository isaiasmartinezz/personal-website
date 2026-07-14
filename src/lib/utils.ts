// Tiny className joiner (keeps us dependency-free; drop-in for `clsx`).
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
