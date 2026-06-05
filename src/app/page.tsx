import { ContactCard } from "@/components/ContactCard";
import { FistBumpIntro } from "@/components/FistBumpIntro";
import { FloatingSaveBar } from "@/components/FloatingSaveBar";

/**
 * Home — the fist-bump intro plays on a fresh visit, then resolves into the card.
 *
 * Layout (matters for the iOS Safari URL-bar story):
 *  - main is flex-col, fills the body (which is min-h-svh so the layout always sizes to the
 *    chrome-shown viewport).
 *  - Inner div is flex-1 and centers the card in whatever vertical space is left after the
 *    sticky save bar takes its slot at the bottom.
 *  - FloatingSaveBar is sticky bottom-0, so it sits at the bottom of the visible viewport
 *    on small phones and gracefully scrolls-with-then-pins on tiny ones.
 */
export default function Home() {
  return (
    <main
      className="flex flex-1 flex-col"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
      }}
    >
      <div className="flex flex-1 items-center justify-center px-3 py-3 sm:p-6">
        <FistBumpIntro>
          <ContactCard />
        </FistBumpIntro>
      </div>
      <FloatingSaveBar />
    </main>
  );
}
