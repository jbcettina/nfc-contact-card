/**
 * profile.ts — THE single source of truth for the contact card.
 *
 * This is the one file you edit to make the card yours. Every component reads from the
 * `profile` export below; nothing else hardcodes personal details. Update the fields, save,
 * and the whole card (and the Save-to-Contacts vCard) updates.
 *
 * Anything optional can be omitted — the UI only renders what's present.
 */

/** A single tappable link shown on the card (e.g. LinkedIn, GitHub, a portfolio). */
export type ProfileLink = {
  /** Visible label, e.g. "LinkedIn". */
  label: string;
  /** Full URL, e.g. "https://linkedin.com/in/you". */
  url: string;
};

export type Profile = {
  /** Full name, shown as the card's headline. */
  name: string;
  /** Role / job title, e.g. "Product Engineer". */
  title?: string;
  /** Company or organization. */
  company?: string;
  /** Primary email — powers tap-to-email and the vCard. */
  email?: string;
  /**
   * Primary phone — powers tap-to-call and the vCard.
   * Store it in international format (e.g. "+1 555 234 5678") so it dials correctly anywhere.
   */
  phone?: string;
  /** Personal or company website (full URL). */
  website?: string;
  /** Short tagline / bio line shown under the name. */
  tagline?: string;
  /**
   * Avatar image. Put the file in `public/` and reference it from the site root,
   * e.g. "/avatar.jpg". Leave undefined to fall back to initials.
   */
  avatar?: string;
  /** Extra links rendered as tappable rows. */
  links?: ProfileLink[];
  /**
   * Accent color as a hex string (e.g. "#2563eb"). Drives the card's themeable accent via a
   * CSS variable — see `src/app/globals.css` and the theming notes in TECH.md.
   */
  accent?: string;
};

export const profile: Profile = {
  name: "Joel Cettina",
  title: "Engineering Leader",
  company: "Acme Co.",
  email: "jbcettina@gmail.com",
  phone: "+1 555 234 5678",
  website: "https://example.com",
  tagline: "Idea → live in 60 minutes.",
  // avatar: "/avatar.jpg", // drop a file in public/ and point here; omitted → initials
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/jbcettina" },
    { label: "GitHub", url: "https://github.com/jbcettina" },
  ],
  accent: "#2563eb",
};

/** Initials derived from the name — used as the avatar fallback. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
