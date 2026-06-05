/**
 * profile.ts — THE single source of truth for the contact card.
 *
 * This is the one file you edit to make the card yours. Every part of the card and the
 * Save-to-Contacts vCard reads from the `profile` export below; nothing else hardcodes
 * personal details. Update the fields, save, and the whole card updates.
 */

/**
 * Keys for the social glyphs. Each maps to an icon in the registry
 * (see src/components/icons.tsx). Add a key here + an entry there to support a new platform.
 */
export type IconKey =
  | "x"
  | "github"
  | "linkedin"
  | "instagram"
  | "bluesky"
  | "dribbble";

/** A social profile: shown as @handle, but tappable to a real, resolvable URL. */
export type Social = {
  /** Platform name, e.g. "X" — also used as the vCard X-SOCIALPROFILE type. */
  platform: string;
  /** Display text, e.g. "@jbcettina". */
  handle: string;
  /** The resolvable link the handle opens, e.g. "https://x.com/jbcettina". */
  url: string;
  /** Which glyph to render (see IconKey). */
  icon: IconKey;
};

/** Selectable color theme — ties to the (later) palette switcher. */
export type ThemeKey = "sunset" | "ocean";

export type Profile = {
  /** Full name, shown as the card's headline. */
  name: string;
  /** Role / job title, shown muted under the name. */
  title: string;
  /**
   * Avatar image. Put the file in `public/` and reference it from the site root,
   * e.g. "/avatar.jpg". Set to null to show the placeholder squircle (initials).
   */
  avatar: string | null;
  /** Real contact fields — these power tap-to-call / email and the saved vCard. */
  contact: {
    /** Store in international format (e.g. "+1 555 234 5678") so it dials anywhere. */
    phone?: string;
    email?: string;
    /** Full URL, e.g. "https://example.com". */
    website?: string;
  };
  /** Social rows — display a handle, carry a real URL (also saved into the vCard). */
  socials: Social[];
  /** Label/value rows shown on the About tab. */
  about?: { label: string; value: string }[];
  /** Free-text bio shown on the Bio tab. Use blank lines to split into paragraphs. */
  bio?: string;
  /** Active color theme. Optional; defaults to the base palette. */
  theme?: ThemeKey;
};

// Sample data — a fictional persona so this public template ships with no real contact info.
// Replace every field below with your own to make the card yours (uses the reserved 555-01xx
// phone range and example.com on purpose, so it's obvious these are placeholders).
export const profile: Profile = {
  name: "Maya Chen",
  title: "Product Engineer",
  avatar: null, // drop a file in public/ and point here (e.g. "/avatar.jpg")
  contact: {
    phone: "+1 (415) 555-0186",
    email: "maya@example.com",
    website: "https://maya.example.com",
  },
  socials: [
    { platform: "X", handle: "@mayabuilds", url: "https://x.com/mayabuilds", icon: "x" },
    {
      platform: "GitHub",
      handle: "@mayachen",
      url: "https://github.com/mayachen",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      handle: "@mayachen",
      url: "https://linkedin.com/in/mayachen",
      icon: "linkedin",
    },
  ],
  about: [
    {
      label: "Strengths",
      value: "Shipping fast without breaking things, and making complex systems feel simple.",
    },
    {
      label: "Growth areas",
      value: "Learning to say no to good ideas so the great ones actually ship.",
    },
    {
      label: "Toolkit",
      value: "TypeScript, React & Next.js, Postgres — and far too many terminal aliases.",
    },
    {
      label: "Outside work",
      value: "Trail runs, ceramics, and a houseplant collection that's growing faster than my free time.",
    },
  ],
  bio:
    "Product engineer who turns caffeine into shipped features and has strong, " +
    "mostly-correct opinions about keyboard shortcuts.\n\n" +
    "Once debugged a production outage from a chairlift. Collects houseplants faster " +
    "than she can keep them alive, and is convinced the rubber duck on her desk has " +
    "reviewed more code than she has.\n\n" +
    "Will trade you a sticker for a good taco recommendation. 🌮",
};

/** Initials derived from the name — used for the placeholder avatar squircle. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
