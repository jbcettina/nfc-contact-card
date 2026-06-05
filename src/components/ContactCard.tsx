import { profile } from "@/data/profile";
import { GradientHeader } from "@/components/GradientHeader";
import { CardTabs } from "@/components/CardTabs";
import { ContactRows } from "@/components/ContactRows";
import { SaveToContactsButton } from "@/components/SaveToContactsButton";

/**
 * ContactCard — the card shell.
 *
 * Centered rounded card on the gray page field: the pastel gradient header (with the folder
 * tab row) on top, and the white content panel below. The contact rows fill the Contact tab
 * in the next step; the sticky Save bar is added after that. `data-theme` carries the selected
 * palette so a theme swap recolors the card via CSS variables alone.
 */
export function ContactCard() {
  return (
    <div
      data-theme={profile.theme}
      className="w-full max-w-[400px] overflow-hidden rounded-card bg-panel shadow-card"
    >
      <GradientHeader>
        <CardTabs contact={<ContactRows />} />
      </GradientHeader>

      {/* Save bar — outside the tabs so it stays visible on every tab. */}
      <div className="bg-panel px-6 pt-2 pb-6">
        <SaveToContactsButton className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-foreground transition-opacity hover:opacity-90" />
      </div>
    </div>
  );
}
