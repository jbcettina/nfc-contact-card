/**
 * vcard.ts — builds a vCard (.vcf) string from profile data.
 *
 * Pure and DOM-free on purpose: this is the data half of "Save to Contacts" and must not
 * depend on how the card looks. The browser-side download lives in the SaveToContactsButton
 * component, which calls buildVCard() and hands the result to a Blob.
 *
 * We emit vCard 3.0 — the most broadly compatible version across iOS Contacts, Android,
 * and desktop address books.
 *
 * The gotcha (see FOUNDATION-PLAN §6): the displayed @handles are cosmetic. A useful saved
 * contact needs resolvable data, so the vCard carries the real contact fields PLUS each
 * social's URL — so the saved contact opens with a callable number, an email, and working links.
 */
import type { Profile } from "@/data/profile";

/** Escape a value per RFC 6350: backslashes, commas, semicolons, and newlines. */
function escape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Split a full name into family + given names for the structured N field. */
function splitName(name: string): { family: string; given: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return { family: "", given: name.trim() };
  const family = parts[parts.length - 1];
  const given = parts.slice(0, -1).join(" ");
  return { family, given };
}

/**
 * Build the vCard text for a profile. Lines are CRLF-joined as the spec requires.
 * Only fields present on the profile are included.
 */
export function buildVCard(profile: Profile): string {
  const { family, given } = splitName(profile.name);
  const { phone, email, website } = profile.contact;
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  // N (structured) and FN (display) are the only required fields.
  lines.push(`N:${escape(family)};${escape(given)};;;`);
  lines.push(`FN:${escape(profile.name)}`);

  if (profile.title) lines.push(`TITLE:${escape(profile.title)}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${escape(phone)}`);
  if (email) lines.push(`EMAIL;TYPE=INTERNET,PREF:${escape(email)}`);
  if (website) lines.push(`URL:${escape(website)}`);

  // Social profiles: X-SOCIALPROFILE is the cleanest spec-compliant form and is recognized
  // by Apple Contacts; the labelled URL keeps the link useful everywhere else too.
  for (const social of profile.socials) {
    lines.push(
      `X-SOCIALPROFILE;TYPE=${escape(social.platform.toLowerCase())}:${escape(social.url)}`,
    );
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

/** A filesystem-friendly filename for the download, e.g. "joel-cettina.vcf". */
export function vCardFileName(profile: Profile): string {
  const slug = profile.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || "contact"}.vcf`;
}
