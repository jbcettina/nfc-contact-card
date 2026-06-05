import { SaveToContactsButton } from "@/components/SaveToContactsButton";

/**
 * FloatingSaveBar — the Save to Contacts pill, kept always-tappable via position:sticky.
 *
 * Sticky (vs fixed) lets the browser handle every viewport edge case for us. The bar lives at
 * the bottom of main: when the card fits in the visible area, the bar sits at its natural
 * resting position underneath; when the card is taller than the viewport, the page scrolls and
 * the bar pins to the bottom of the visible viewport (which on iOS Safari excludes the URL
 * bar) automatically.
 *
 * Pairs with min-h-svh on the body — together they guarantee the bar lands above iOS Safari's
 * URL bar with no vh/dvh math.
 */
export function FloatingSaveBar() {
  return (
    <div
      // Sticky to bottom-0 of the scroll container. Frosted backdrop keeps it legible when
      // card content scrolls past it on short viewports.
      className="sticky bottom-0 z-30 flex w-full justify-center bg-page-bg/85 px-3 backdrop-blur-md sm:px-6"
      style={{
        // Lift above the iOS home indicator; on devices without it, a small base gutter.
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        paddingTop: "0.75rem",
      }}
    >
      <div className="w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[620px]">
        <SaveToContactsButton className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:h-14 sm:text-base" />
      </div>
    </div>
  );
}
