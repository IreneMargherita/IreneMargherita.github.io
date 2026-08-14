import { useEffect, useState } from 'react';

interface Props {
  lines: string[];
  /** ms per typed character */
  speed?: number;
  /** ms to hold a completed line before deleting */
  hold?: number;
}

/**
 * Types each line character by character, holds, deletes, moves on. Loops.
 *
 * Accessibility: users with `prefers-reduced-motion` get the first line as
 * static text — motion is a nice-to-have, never a requirement (Constitution VI).
 */
export default function Typewriter({ lines, speed = 55, hold = 1600 }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const current = lines[lineIndex % lines.length];

    let delay = deleting ? speed / 2.2 : speed;
    if (!deleting && charCount === current.length) delay = hold;

    const t = window.setTimeout(() => {
      if (!deleting && charCount === current.length) {
        setDeleting(true);
      } else if (deleting && charCount === 0) {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
      } else {
        setCharCount((c) => c + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(t);
  }, [charCount, deleting, hold, lineIndex, lines, reduced, speed]);

  const text = reduced ? lines[0] : lines[lineIndex % lines.length].slice(0, charCount);

  return (
    <span className="font-mono text-accent">
      {text}
      <span className="animate-blink text-accent" aria-hidden="true">
        ▍
      </span>
    </span>
  );
}
