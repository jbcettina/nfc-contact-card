"use client";

import { useCallback } from "react";
import { profile } from "@/data/profile";
import { buildVCard, vCardFileName } from "@/lib/vcard";

/**
 * Save to Contacts — builds a .vcf entirely in the browser and downloads it. No backend.
 *
 * The download trick: turn the vCard text into a Blob, make an object URL, click a temporary
 * <a download> link, then revoke the URL. This is what works consistently across iOS Safari
 * and Android Chrome — tapping the downloaded .vcf opens the OS "Add Contact" sheet.
 */
export function SaveToContactsButton({ className }: { className?: string }) {
  const handleSave = useCallback(() => {
    const vcard = buildVCard(profile);
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = vCardFileName(profile);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Release the object URL on the next tick, after the download has kicked off.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  return (
    <button
      type="button"
      onClick={handleSave}
      className={
        className ??
        "inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      }
    >
      Save to Contacts
    </button>
  );
}
