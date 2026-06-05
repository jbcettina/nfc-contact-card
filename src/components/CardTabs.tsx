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
 * In Tier A only the Contact panel has content; About and Bio are intentionally placeholders
 * (they become audience feature fodder). Contact content is passed in as `contact` so this
 * stays a thin, reusable tab shell.
 */
const TABS = ["About", "Bio", "Contact"] as const;
type Tab = (typeof TABS)[number];

export function CardTabs({ contact }: { contact: React.ReactNode }) {
  const [active, setActive] = useState<Tab>("Contact");

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
              className={`flex-1 rounded-t-2xl px-4 pt-2.5 pb-3 text-sm font-semibold transition-colors ${
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
      <div className="min-h-52 bg-panel px-6 pt-5 pb-2">
        {active === "Contact" ? (
          contact
        ) : (
          <p className="pt-8 text-center text-sm text-title">
            {active} is coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
