import { ContactCard } from "@/components/ContactCard";
import { FistBumpIntro } from "@/components/FistBumpIntro";

// Home — the fist-bump intro plays on a fresh visit, then resolves into the contact card.
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-3 py-3 sm:p-6">
      <FistBumpIntro>
        <ContactCard />
      </FistBumpIntro>
    </main>
  );
}
