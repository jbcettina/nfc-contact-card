import type { IconType } from "react-icons";
import { profile } from "@/data/profile";
import { socialIcons, contactIcons } from "@/components/icons";

/**
 * ContactRows — the Contact tab body.
 *
 * Renders the real contact fields (phone / email / website) and the social rows from the
 * profile. Every row is a tappable link: contact fields open tel:/mailto:/the site; social
 * rows display the @handle but open the resolvable URL. Monochrome icon + bold value, generous
 * row height, separated by whitespace (no dividers) — see FOUNDATION-PLAN §4.
 */
export function ContactRows() {
  const { contact, socials } = profile;

  return (
    <ul className="flex flex-col">
      {contact.phone && (
        <Row
          icon={contactIcons.phone}
          value={contact.phone}
          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
        />
      )}
      {contact.email && (
        <Row icon={contactIcons.email} value={contact.email} href={`mailto:${contact.email}`} />
      )}
      {contact.website && (
        <Row
          icon={contactIcons.website}
          value={contact.website.replace(/^https?:\/\//, "")}
          href={contact.website}
          external
        />
      )}
      {socials.map((social) => (
        <Row
          key={social.url}
          icon={socialIcons[social.icon]}
          value={social.handle}
          href={social.url}
          external
        />
      ))}
    </ul>
  );
}

/** A single contact/social row: monochrome icon + bold value, the whole row is tappable. */
function Row({
  icon: Icon,
  value,
  href,
  external,
}: {
  icon: IconType;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-4 rounded-xl px-1 transition-colors hover:bg-black/[0.03] sm:gap-5"
        style={{ minHeight: "var(--row-h)" }}
      >
        <Icon size={24} className="shrink-0 text-icon" aria-hidden />
        <span className="truncate text-[16px] font-semibold text-name sm:text-[17px]">{value}</span>
      </a>
    </li>
  );
}
