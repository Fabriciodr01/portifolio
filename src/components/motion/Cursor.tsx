/** Blinking block cursor shown at the write head of typed text. */
export function Cursor() {
  return <span aria-hidden className="inline-block h-[1em] w-[0.6em] translate-y-[0.15em] animate-blink bg-ed" />
}
