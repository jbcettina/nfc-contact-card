"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

/**
 * FistBumpIntro — a full-screen intro overlay that plays the fist-bump animation once on a
 * fresh visit, then resolves into whatever card is rendered behind it.
 *
 * It wraps the card (passed as children) so it can coordinate ONE transition: the overlay
 * fades + scales out while the card fades + scales in. The intro is skin-independent — it
 * reveals "whatever card exists," so the visual layout can change without touching this file.
 *
 * Behavior (see FOUNDATION-PLAN §6):
 *  - Plays once on a fresh visit; the transition fires on the animation's `complete` event or
 *    after INTRO_MAX_MS, whichever comes first.
 *  - sessionStorage guard: it does NOT replay on refresh / internal navigation within a session.
 *  - prefers-reduced-motion: skips the animation entirely and shows the card directly.
 */

const SESSION_KEY = "fist-bump-played";
const INTRO_MAX_MS = 1800; // cap on the intro; transition fires by now even if not "complete"
const LEAVE_MS = 400; // overlay fade-out / card fade-in duration (keep in sync with classes)

type Phase = "intro" | "leaving" | "done";

export function FistBumpIntro({ children }: { children: React.ReactNode }) {
  // Start in "intro" so the very first paint is the splash, never a flash of the card.
  // On the client, an effect immediately resolves this for repeat visits / reduced motion.
  const [phase, setPhase] = useState<Phase>("intro");
  const maxTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Begin the transition from overlay → card. Safe to call more than once.
  const startLeaving = useCallback(() => {
    if (maxTimer.current) clearTimeout(maxTimer.current);
    setPhase((p) => {
      if (p !== "intro") return p;
      leaveTimer.current = setTimeout(() => setPhase("done"), LEAVE_MS);
      return "leaving";
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";

    // Repeat visit or reduced motion → no intro, show the card immediately.
    // We deliberately start in "intro" (so a fresh visit never flashes the card before the
    // overlay) and correct to "done" here once we can read these client-only signals — which
    // can't be done during SSR without a hydration mismatch. That makes this setState-in-effect
    // the intended pattern, not an accident.
    if (prefersReducedMotion || alreadyPlayed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    // Fresh visit → mark played (so refresh/nav won't replay) and arm the safety cap.
    sessionStorage.setItem(SESSION_KEY, "1");
    maxTimer.current = setTimeout(startLeaving, INTRO_MAX_MS);

    return () => {
      if (maxTimer.current) clearTimeout(maxTimer.current);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, [startLeaving]);

  // Wire the animation's "complete" event to start the transition.
  const handleRef = useCallback(
    (dotLottie: DotLottie | null) => {
      if (!dotLottie) return;
      dotLottie.addEventListener("complete", startLeaving);
    },
    [startLeaving],
  );

  const leaving = phase === "leaving";

  return (
    <>
      {/* The card, revealed underneath. Fades + scales in as the overlay leaves. */}
      <div
        className={`transition-all duration-[400ms] ease-out ${
          phase === "intro" ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {children}
      </div>

      {/* The intro overlay. Removed from the DOM once the transition completes. */}
      {phase !== "done" && (
        <div
          aria-hidden
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--intro-bg)] transition-all duration-[400ms] ease-out ${
            leaving ? "scale-110 opacity-0 pointer-events-none" : "scale-100 opacity-100"
          }`}
        >
          <DotLottieReact
            src="/animations/fist-bump.lottie"
            autoplay
            loop={false}
            dotLottieRefCallback={handleRef}
            className="h-64 w-64"
          />
        </div>
      )}
    </>
  );
}
