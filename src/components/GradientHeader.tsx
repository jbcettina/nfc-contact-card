import { profile } from "@/data/profile";
import { Squircle } from "@/components/Squircle";

/**
 * GradientHeader — the pastel mesh region at the top of the card.
 *
 * Owns the gradient so it sits continuously behind both the identity block (avatar / name /
 * title) and the folder tab row passed in as `children`. The mesh is composed from layered
 * radial-gradients here (the component owns the gradient POSITIONS); the colors come from CSS
 * variables (--mesh-*), so a theme swap recolors it without touching this file. Asset-free and
 * cloneable; swap `backgroundImage` for one Figma-exported image if pixel-accuracy is ever
 * needed (FOUNDATION-PLAN §8).
 */
export function GradientHeader({ children }: { children?: React.ReactNode }) {
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
    >
      <div className="flex flex-col items-center px-6 pt-10 pb-6 sm:pt-12 sm:pb-7">
        <Squircle src={profile.avatar} name={profile.name} />
        <h1 className="mt-4 text-[26px] font-bold leading-tight text-name sm:mt-5 sm:text-[30px] lg:text-[34px]">
          {profile.name}
        </h1>
        <p className="mt-1 text-[16px] text-title sm:text-[17px] lg:text-[18px]">{profile.title}</p>
      </div>
      {children}
    </div>
  );
}
