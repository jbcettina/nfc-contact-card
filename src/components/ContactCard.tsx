import { profile } from "@/data/profile";
import { GradientHeader } from "@/components/GradientHeader";
import { CardTabs } from "@/components/CardTabs";

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
        <CardTabs
          contact={
            // Placeholder until the contact rows land in the next step.
            <p className="pt-8 text-center text-sm text-title">Contact details go here.</p>
          }
        />
      </GradientHeader>
    </div>
  );
}
