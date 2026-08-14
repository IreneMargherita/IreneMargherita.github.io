import { footer, profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-divider mt-20">
      <div className="container-content flex flex-col items-center gap-4 py-10 text-center">
        <p className="font-mono text-xs text-fg-faint">
          <span className="text-accent/60">{'//'}</span> {footer.line} · © {year}
        </p>

        <ul className="flex items-center gap-3">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="tag transition-colors hover:border-accent/60 hover:text-accent"
                aria-label={s.label}
                title={s.label}
              >
                {s.short}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[11px] text-fg-faint">
          {footer.stack} · {footer.sourceNote}
        </p>
      </div>
    </footer>
  );
}
