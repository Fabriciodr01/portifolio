/** Fixed background: HUD grid, dark vignette and faint scanlines. Purely decorative. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="hud-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_100%)]" />
      <div className="scanlines absolute inset-0" />
    </div>
  )
}
