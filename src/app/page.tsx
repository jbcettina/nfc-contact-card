import { ContactCard } from "@/components/ContactCard";
import { FistBumpIntro } from "@/components/FistBumpIntro";

// Home — the fist-bump intro plays on a fresh visit, then resolves into the contact card.
export default function Home() {
  return (
    <main
      className="flex flex-1 items-center justify-center px-3 py-3 sm:p-6"
      // Top/bottom safe-area padding so the card never slides under the iOS home indicator
      // or Safari's bottom URL bar (combined with min-h-dvh on body).
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <FistBumpIntro>
        <ContactCard />
      </FistBumpIntro>
    </main>
  );
}
