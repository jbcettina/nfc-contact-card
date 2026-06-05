import { profile } from "@/data/profile";
import { GradientHeader } from "@/components/GradientHeader";
import { CardTabs } from "@/components/CardTabs";
import { ContactRows } from "@/components/ContactRows";
import { AboutPanel } from "@/components/AboutPanel";
import { BioPanel } from "@/components/BioPanel";

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
      className="w-full max-w-[460px] overflow-hidden rounded-card bg-panel shadow-card sm:max-w-[540px] lg:max-w-[620px]"
    >
      <GradientHeader>
        <CardTabs contact={<ContactRows />} about={<AboutPanel />} bio={<BioPanel />} />
      </GradientHeader>
    </div>
  );
}
