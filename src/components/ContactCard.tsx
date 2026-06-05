import { profile } from "@/data/profile";
import { SaveToContactsButton } from "@/components/SaveToContactsButton";

/**
 * ContactCard — interim version.
 *
 * This renders the migrated profile shape so the app stays deployable while the locked
 * pastel-tabbed layout (card shell, gradient header, folder tabs, contact rows) is built on
 * top of it. The data + save logic below is what every skin reuses.
 */
export function ContactCard() {
  const { name, title, contact, socials } = profile;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-card border border-border bg-background p-8 shadow-card">
      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-tight">{name}</h1>
        <p className="mt-0.5 text-sm text-foreground/70">{title}</p>
      </div>

      <div className="flex w-full flex-col gap-2">
        {contact.email && <Row label="Email" value={contact.email} href={`mailto:${contact.email}`} />}
        {contact.phone && (
          <Row label="Call" value={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, "")}`} />
        )}
        {contact.website && (
          <Row label="Website" value={contact.website.replace(/^https?:\/\//, "")} href={contact.website} external />
        )}
        {socials.map((s) => (
          <Row key={s.url} label={s.platform} value={s.handle} href={s.url} external />
        ))}
      </div>

      <SaveToContactsButton className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90" />
    </div>
  );
}

function Row({
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
