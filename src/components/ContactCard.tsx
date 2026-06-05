import { profile } from "@/data/profile";
import { GradientHeader } from "@/components/GradientHeader";

/**
 * ContactCard — the card shell.
 *
 * Centered rounded card on the gray page field, with the pastel gradient header on top. The
 * folder tabs and the contact rows mount into the white panel below in the next steps; the
 * sticky Save bar is added after that. `data-theme` carries the selected palette so a theme
 * swap recolors the card via CSS variables alone.
 */
export function ContactCard() {
  return (
    <div
      data-theme={profile.theme}
      className="w-full max-w-[400px] overflow-hidden rounded-card bg-panel shadow-card"
    >
      <GradientHeader />

      {/* White content panel — tabs + contact rows land here next. */}
      <div className="min-h-48 bg-panel px-6 pt-6 pb-8" />
    </div>
  );
}
