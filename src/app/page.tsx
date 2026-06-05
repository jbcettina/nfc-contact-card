import { ContactCard } from "@/components/ContactCard";

// Home — composes the contact card. The fist-bump intro overlay is added in a later step.
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <ContactCard />
    </main>
  );
}
