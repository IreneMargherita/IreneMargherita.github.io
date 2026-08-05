import { footer, profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-divider mt-20">
      <div className="container-content flex flex-col items-center gap-4 py-10 text-center">
        <p className="font-mono text-xs text-mist-600">
          <span className="text-sunshine-700">{'//'}</span> {footer.line} · © {year}
        </p>

        <ul className="flex items-center gap-3">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="tag transition-colors hover:border-sunshine-600 hover:text-sunshine-400"
                aria-label={s.label}
                title={s.label}
              >
                {s.short}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[11px] text-mist-700">
          {footer.stack} · {footer.sourceNote}
        </p>
      </div>
    </footer>
  );
}
