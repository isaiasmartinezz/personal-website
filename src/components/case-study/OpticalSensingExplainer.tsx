export function OpticalSensingExplainer({
  steps,
  equation,
  equationNote,
  oscilloscopeNote,
}: {
  steps: string[];
  equation: string;
  equationNote: string;
  oscilloscopeNote: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-6">
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px]" role="img" aria-label="Rotating disc with a reflective marker passing an optical source and phototransistor pair">
          <circle cx="110" cy="110" r="90" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle cx="110" cy="110" r="4" fill="var(--subtle)" />
          <rect x="192" y="98" width="14" height="24" rx="2" fill="var(--cf-ready)" transform="rotate(0 199 110)" />
          <text x="199" y="140" textAnchor="middle" fontSize="9" fill="var(--muted)">Marker</text>

          <g>
            <circle cx="30" cy="70" r="8" fill="none" stroke="var(--fg)" strokeWidth="2" />
            <text x="30" y="50" textAnchor="middle" fontSize="9" fill="var(--muted)">Source</text>
          </g>
          <g>
            <circle cx="30" cy="150" r="8" fill="none" stroke="var(--fg)" strokeWidth="2" />
            <text x="30" y="175" textAnchor="middle" fontSize="9" fill="var(--muted)">Sensor</text>
          </g>
          <path d="M38 70 Q110 20 190 100" fill="none" stroke="var(--border)" strokeDasharray="3 3" strokeWidth="1.5" />
          <path d="M190 120 Q110 200 38 150" fill="none" stroke="var(--border)" strokeDasharray="3 3" strokeWidth="1.5" />
        </svg>
      </div>

      <div>
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-accent">{i + 1}</span>
              <span className="text-muted">{s}</span>
            </li>
          ))}
        </ol>

        <p className="mt-5 inline-block rounded-lg bg-surface-2 px-3 py-2 font-mono text-sm text-fg">{equation}</p>
        <p className="mt-2 text-xs italic text-subtle">{equationNote}</p>

        <div className="mt-6 rounded-xl border border-border bg-surface p-4">
          <svg viewBox="0 0 300 60" className="w-full" role="img" aria-label="Schematic square-wave pulse trace representing rotor revolutions">
            <path
              d="M0,45 L20,45 L20,15 L50,15 L50,45 L80,45 L80,15 L110,15 L110,45 L140,45 L140,15 L170,15 L170,45 L200,45 L200,15 L230,15 L230,45 L260,45 L260,15 L290,15"
              fill="none"
              stroke="var(--cf-ready)"
              strokeWidth="2"
            />
          </svg>
          <p className="mt-2 text-xs italic text-subtle">{oscilloscopeNote}</p>
        </div>
      </div>
    </div>
  );
}
