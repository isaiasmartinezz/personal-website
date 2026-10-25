export const TYPE_DIRS: Record<string, string>;
export const MAX_COORDINATE_DECIMALS: number;
export function validateLife(options?: { root?: string }): {
  ok: boolean;
  errors: string[];
  items: { path: string; tier: string; item: unknown }[];
  manifest: unknown;
};
export function sha256File(file: string): string;
