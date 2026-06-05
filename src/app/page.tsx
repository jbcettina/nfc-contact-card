import { ContactCard } from "@/components/ContactCard";
import { FistBumpIntro } from "@/components/FistBumpIntro";
import { FloatingSaveBar } from "@/components/FloatingSaveBar";

// Home — the fist-bump intro plays on a fresh visit, then resolves into the contact card.
export default function Home() {
  return (
    <main
      className="flex flex-1 items-center justify-center px-3 py-3 sm:p-6"
      // Top safe-area padding; bottom padding leaves room for the FloatingSaveBar so card
      // content never hides behind it (the bar's own height + safe-area padding live in CSS).
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
      }}
    >
      <FistBumpIntro>
        <ContactCard />
      </FistBumpIntro>
      <FloatingSaveBar />
    </main>
  );
}
