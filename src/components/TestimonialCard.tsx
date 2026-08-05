import type { Testimonial } from '../data/content';

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card card-hover flex h-full flex-col p-6">
      <span className="mb-3 font-mono text-3xl leading-none text-sunshine-600" aria-hidden="true">
        “
      </span>
      <blockquote className="flex-1 text-sm leading-relaxed text-mist-300">{t.quote}</blockquote>
      <figcaption className="mt-5 border-t border-ink-600 pt-4">
        <p className="text-sm font-semibold text-mist-100">{t.name}</p>
        <p className="text-xs text-mist-400">
          {t.title} · {t.org}
        </p>
        <p className="mt-1 font-mono text-[11px] text-sunshine-600">{'//'} {t.relationship}</p>
      </figcaption>
    </figure>
  );
}
