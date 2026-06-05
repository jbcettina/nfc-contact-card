import { profile } from "@/data/profile";

/**
 * AboutPanel — the About tab body. Renders the profile's `about` entries as label/value rows
 * (bold label, muted value beneath), generously spaced. Returns nothing if no entries are set
 * (the tab then shows its placeholder).
 */
export function AboutPanel() {
  const { about } = profile;
  if (!about || about.length === 0) return null;

  return (
    <dl className="flex flex-col gap-5 py-2">
      {about.map((item) => (
        <div key={item.label}>
          <dt className="text-[15px] font-semibold text-name sm:text-base">{item.label}</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-title sm:text-base">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
