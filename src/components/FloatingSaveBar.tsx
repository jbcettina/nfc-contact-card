import { SaveToContactsButton } from "@/components/SaveToContactsButton";

/**
 * FloatingSaveBar — pins the Save to Contacts pill to the bottom of the viewport so it's
 * always tappable, regardless of card height or browser chrome.
 *
 * Why this exists (FOUNDATION-PLAN §5): on iOS Safari the bottom URL bar overlays the page,
 * and on tiny phones the card itself can exceed the visible viewport. A floating bar
 * sidesteps both — it sits above the URL bar (via safe-area inset) and never scrolls away.
 *
 * Sits OUTSIDE the FistBumpIntro wrapper so its position:fixed isn't broken by the wrapper's
 * transform during the reveal animation. The intro overlay (z-50) covers it during the splash;
 * once the overlay fades, this bar is revealed.
 */
export function FloatingSaveBar() {
  return (
    <div
      // Frosted backdrop so card content scrolling under it stays legible.
      className="fixed inset-x-0 z-30 flex justify-center bg-page-bg/80 backdrop-blur-md"
      style={{
        // iOS Safari quirk: position:fixed anchors to the FULL viewport (100vh, includes chrome
        // like the bottom URL bar). To pin to the DYNAMIC viewport instead, offset by the
        // difference — that's exactly the chrome height when chrome is shown, and zero when
        // it's hidden. Plus safe-area for the home indicator.
        bottom: "calc(100vh - 100dvh + max(0.75rem, env(safe-area-inset-bottom)))",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
      }}
    >
      <div className="w-full max-w-[460px] px-4 sm:max-w-[540px] lg:max-w-[620px]">
        <SaveToContactsButton className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:h-14 sm:text-base" />
      </div>
    </div>
  );
}
