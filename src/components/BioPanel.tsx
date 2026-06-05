import { profile } from "@/data/profile";

/**
 * BioPanel — the Bio tab body. Renders the free-text `bio` from the profile, splitting on
 * blank lines into paragraphs. Returns nothing if no bio is set (the tab then shows its
 * placeholder).
 */
export function BioPanel() {
  if (!profile.bio) return null;

  const paragraphs = profile.bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-3 py-2 text-[15px] leading-relaxed text-name/80 sm:text-base">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
