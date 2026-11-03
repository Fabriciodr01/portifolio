/**
 * Fixed background: corner glow, HUD grid with "+" crosses, vignette, grain, scanlines and a slow scan band.
 * Purely decorative. Crosses and the scan band are desktop-only; the band stops for reduced-motion users.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="hud-glow absolute inset-0" />
      <div className="hud-grid absolute inset-0" />
      <div className="hud-crosses absolute inset-0 hidden lg:block" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_100%)]" />
      <div className="hud-grain absolute inset-0 opacity-[0.05] mix-blend-screen" />
      <div className="scanlines absolute inset-0" />
      <div className="hud-scan absolute inset-x-0 top-0 hidden animate-scan lg:motion-safe:block" />
    </div>
  )
}
