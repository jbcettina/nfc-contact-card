import { profile } from "@/data/profile";
import { Squircle } from "@/components/Squircle";

/**
 * GradientHeader — the pastel mesh header at the top of the card.
 *
 * The mesh is composed from layered radial-gradients here (the component owns the gradient
 * POSITIONS); the colors come from CSS variables (--mesh-*), so a theme swap recolors it
 * without touching this file. Asset-free and cloneable; if pixel-accuracy is ever needed,
 * swap the `backgroundImage` below for a single Figma-exported image (FOUNDATION-PLAN §8).
 */
export function GradientHeader() {
  return (
    <div
      style={{
        backgroundColor: "var(--mesh-base)",
        backgroundImage: [
          "radial-gradient(120% 110% at 6% 0%, var(--mesh-peach), transparent 60%)",
          "radial-gradient(120% 110% at 100% 4%, var(--mesh-blue), transparent 58%)",
          "radial-gradient(130% 120% at 100% 100%, var(--mesh-pink), transparent 62%)",
        ].join(", "),
      }}
      className="flex flex-col items-center px-6 pt-10 pb-7"
    >
      <Squircle src={profile.avatar} name={profile.name} />
      <h1 className="mt-4 text-[26px] font-bold leading-tight text-name">{profile.name}</h1>
      <p className="mt-1 text-[16px] text-title">{profile.title}</p>
    </div>
  );
}
