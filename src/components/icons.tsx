import type { IconType } from "react-icons";
import { SiX, SiGithub, SiInstagram, SiBluesky, SiDribbble } from "react-icons/si";
import { LuLinkedin, LuPhone, LuMail, LuGlobe } from "react-icons/lu";
import type { IconKey } from "@/data/profile";

/**
 * Icon registry — maps a profile `icon` key to its glyph component.
 *
 * Add a social platform by adding its key to IconKey (in profile.ts) and an entry here.
 * Brand glyphs come from Simple Icons (react-icons/si) where available; LinkedIn lives in
 * lucide (react-icons/lu). The generic contact glyphs (phone/email/website) are exported
 * separately below.
 */
export const socialIcons: Record<IconKey, IconType> = {
  x: SiX,
  github: SiGithub,
  linkedin: LuLinkedin,
  instagram: SiInstagram,
  bluesky: SiBluesky,
  dribbble: SiDribbble,
};

export const contactIcons = {
  phone: LuPhone,
  email: LuMail,
  website: LuGlobe,
};
