import { usePageTitle } from '../hooks/usePageTitle';
import { contact, profile } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import TerminalWindow from '../components/TerminalWindow';
import StatusBadge from '../components/StatusBadge';

export default function Contact() {
  usePageTitle('Contact');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading code="07. contact" title={contact.headline} lead={contact.body} />

        <div className="grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="card card-hover block p-6 text-center"
            >
              <p className="font-mono text-xs text-fg-faint">the fastest way</p>
              <p className="mt-2 break-all font-mono text-lg font-semibold text-accent">
                {profile.email}
              </p>
              <span className="btn-primary mt-4">send an email →</span>
            </a>

            <div className="flex flex-wrap gap-3">
              {profile.socials
                .filter((s) => !s.url.startsWith('mailto:'))
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    {s.short} · {s.label}
                  </a>
                ))}
            </div>

            <div>
              <StatusBadge />
              <p className="mt-3 font-mono text-xs text-fg-faint">
                {profile.location} · {profile.timezone}
              </p>
            </div>
          </div>

          <TerminalWindow title="open_to.sh">
            <p className="mb-2">
              <span className="text-data">➜</span> <span className="text-fg">./open_to.sh --list</span>
            </p>
            {contact.openTo.map((o, i) => (
              <p key={o} className="text-fg-muted">
                <span className="text-accent">[{i + 1}]</span> {o}
              </p>
            ))}
            <p className="mt-3 text-fg-faint">
              exit 0 · replies within 48h
              <span className="animate-blink text-accent">▍</span>
            </p>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
