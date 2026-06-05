import Image from "next/image";
import { profile, initials } from "@/data/profile";
import { SaveToContactsButton } from "@/components/SaveToContactsButton";

/**
 * ContactCard — the data + actions layer that every visual skin reuses.
 *
 * Styling here is intentionally minimal/functional: it renders the profile and wires up the
 * tap actions and Save to Contacts. The winning *visual layout* is built on top of this in a
 * later step; the data binding and save logic do not change when the skin does.
 *
 * Server component — the only interactive piece (Save to Contacts) is its own client component.
 */
export function ContactCard() {
  const { name, title, company, email, phone, website, tagline, avatar, links } = profile;

  // Role line: "Title · Company" / "Title" / "Company" depending on what's present.
  const roleLine = [title, company].filter(Boolean).join(" · ");

  return (
    <div
      // Set the themeable accent from the profile, scoped to the card.
      style={profile.accent ? ({ ["--accent" as string]: profile.accent } as React.CSSProperties) : undefined}
      className="flex w-full max-w-sm flex-col items-center gap-5 rounded-card border border-border bg-background p-8 shadow-card"
    >
      {/* Avatar — image if provided, otherwise initials on the accent color. */}
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full object-cover"
          priority
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
          {initials(name)}
        </div>
      )}

      {/* Identity */}
      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-tight">{name}</h1>
        {roleLine && <p className="mt-0.5 text-sm text-foreground/70">{roleLine}</p>}
        {tagline && <p className="mt-2 text-sm text-foreground/50">{tagline}</p>}
      </div>

      {/* Tap actions — email / call / website */}
      <div className="flex w-full flex-col gap-2">
        {email && <ContactRow label="Email" value={email} href={`mailto:${email}`} />}
        {phone && <ContactRow label="Call" value={phone} href={`tel:${phone.replace(/\s+/g, "")}`} />}
        {website && (
          <ContactRow
            label="Website"
            value={website.replace(/^https?:\/\//, "")}
            href={website}
            external
          />
        )}
      </div>

      {/* Extra links */}
      {links && links.length > 0 && (
        <div className="flex w-full flex-wrap justify-center gap-2">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <SaveToContactsButton className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90" />
    </div>
  );
}

/** One tappable contact method row (email / phone / website). */
function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:border-accent"
    >
      <span className="text-xs uppercase tracking-wide text-foreground/50">{label}</span>
      <span className="truncate text-sm font-medium text-foreground">{value}</span>
    </a>
  );
}
