"use client";

import { useState } from "react";

/**
 * CardTabs — the three folder tabs (About / Bio / Contact) and the white content panel.
 *
 * Contact is the default active tab so contact info + the save action are on screen the
 * instant the card opens. The active tab gets a white fill that merges into the white panel
 * directly below it (the folder look). Per FOUNDATION-PLAN §8 we keep the corner-tuck
 * directional — a clean white active tab over the gradient reads the same at phone size.
 *
 * Panel content is passed in as slots (`contact`, `bio`) so this stays a thin, reusable tab
 * shell. Any tab without content shows a "coming soon" placeholder (About is left as feature
 * fodder).
 */
const TABS = ["Contact", "About", "Bio"] as const;
type Tab = (typeof TABS)[number];

export function CardTabs({
  contact,
  about,
  bio,
}: {
  contact: React.ReactNode;
  about?: React.ReactNode;
  bio?: React.ReactNode;
}) {
  const [active, setActive] = useState<Tab>("Contact");
  const panels: Partial<Record<Tab, React.ReactNode>> = { Contact: contact, About: about, Bio: bio };

  return (
    <div>
      {/* Tab row — sits on the gradient; the active tab is white. */}
      <div role="tablist" aria-label="Card sections" className="flex gap-1.5 px-4">
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={`flex-1 rounded-t-2xl px-4 pt-2.5 pb-3 text-sm font-semibold transition-colors sm:text-base ${
                isActive
                  ? "bg-panel text-name"
                  : "text-name/45 hover:text-name/70"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* White content panel — merges with the active tab above it. */}
      {/* Locked panel height so switching tabs is a content swap, not a layout jump.
          --tab-panel-h is set in globals.css and sized to hold the tallest panel (Contact). */}
      <div className="bg-panel px-6 pt-5 pb-2 sm:px-7" style={{ minHeight: "var(--tab-panel-h)" }}>
        {/* `key` forces a remount on tab change so the fade-in animation re-runs. */}
        <div key={active} className="animate-[fade-in_180ms_ease-out]">
          {panels[active] ?? (
            <p className="pt-8 text-center text-sm text-title">{active} is coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
