import { useEffect, useRef, useState } from 'react'

/**
 * "Has this element been scrolled into view yet?" — and once it has, stop
 * watching forever.
 *
 * Why IntersectionObserver instead of a scroll listener:
 * a `scroll` handler fires on the main thread dozens of times per second
 * and every call to getBoundingClientRect() forces the browser to
 * recalculate layout (a "layout thrash"). IntersectionObserver is computed
 * off the main thread and calls you back only when the answer CHANGES.
 * Same result, a fraction of the cost.
 *
 * Usage:
 *   const { ref, inView } = useInView<HTMLDivElement>()
 *   <div ref={ref}>{inView && <Chart />}</div>
 */
export function useInView<T extends HTMLElement>(options?: {
  /** How much of the element must be visible before we call it "in view". 0–1. */
  threshold?: number
  /** Grow/shrink the trigger box, e.g. '0px 0px -10% 0px' fires slightly early. */
  rootMargin?: string
}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (very old browsers, some test runners):
    // degrade to "always visible" rather than to "never animates".
    // Failing open matters — a missing API should not hide content.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // animate once, then stop paying for it
        }
      },
      { threshold: options?.threshold ?? 0.25, rootMargin: options?.rootMargin ?? '0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.threshold, options?.rootMargin])

  return { ref, inView }
}

/**
 * Counts 0 → `target` over `duration` ms once `active` flips true.
 *
 * Uses requestAnimationFrame, not setInterval. rAF is synced to the
 * display's refresh and is paused when the tab is backgrounded;
 * setInterval keeps firing in a hidden tab and drifts out of step with
 * the compositor, which is what makes cheap counters look stuttery.
 */
export function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    // Users who asked for reduced motion get the final number immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    let start: number | null = null

    const tick = (now: number) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic — fast out of the gate, gentle landing.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}
