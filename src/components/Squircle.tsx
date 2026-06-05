import { initials } from "@/data/profile";

/**
 * Squircle — the rounded-square avatar that sits on the gradient header.
 *
 * Renders the avatar image (cover-fit) when `src` is set, otherwise a placeholder showing the
 * person's initials. Kept as its own component because the later "selfie upload" feature just
 * swaps `src` for a local object URL — nothing else changes.
 *
 * The shape is a directional squircle (a generous rounded square, ~30% radius), not a true
 * superellipse — it reads the same at phone size (see FOUNDATION-PLAN §8: directional fidelity).
 */
export function Squircle({
  src,
  name,
  size = 92,
}: {
  src: string | null;
  name: string;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className="overflow-hidden rounded-[30%] bg-panel shadow-[0_8px_24px_-8px_rgba(20,20,20,0.25)] ring-1 ring-black/5"
    >
      {src ? (
        // Plain <img>: the avatar can be a runtime blob: URL (selfie upload), which next/image
        // doesn't handle cleanly. Static and dynamic sources both work here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-title">
          {initials(name)}
        </div>
      )}
    </div>
  );
}
