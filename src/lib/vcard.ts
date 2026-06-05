/**
 * vcard.ts — builds a vCard (.vcf) string from profile data.
 *
 * Pure and DOM-free on purpose: this is the data half of "Save to Contacts" and must not
 * depend on how the card looks. The browser-side download lives in the SaveToContactsButton
 * component, which calls buildVCard() and hands the result to a Blob.
 *
 * We emit vCard 3.0 — the most broadly compatible version across iOS Contacts, Android,
 * and desktop address books.
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
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  // N (structured) and FN (display) are the only required fields.
  lines.push(`N:${escape(family)};${escape(given)};;;`);
  lines.push(`FN:${escape(profile.name)}`);

  if (profile.company) lines.push(`ORG:${escape(profile.company)}`);
  if (profile.title) lines.push(`TITLE:${escape(profile.title)}`);
  if (profile.email) lines.push(`EMAIL;TYPE=INTERNET,PREF:${escape(profile.email)}`);
  if (profile.phone) lines.push(`TEL;TYPE=CELL:${escape(profile.phone)}`);
  if (profile.website) lines.push(`URL:${escape(profile.website)}`);

  // Extra links become additional URL entries, labelled where the address book supports it.
  for (const link of profile.links ?? []) {
    lines.push(`URL;TYPE=${escape(link.label)}:${escape(link.url)}`);
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
