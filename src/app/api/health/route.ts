/**
 * Example route handler — establishes the convention for adding dynamic features later
 * WITHOUT standing up a backend or database (see TECH.md → "Dynamism convention").
 *
 * A real dynamic feature (e.g. logging a tap to a Google Sheet, capturing a visitor's
 * details) would live in its own `src/app/api/<name>/route.ts`, read any secret from
 * `process.env` (set in Vercel, never committed — see .env.example), and call an external
 * service. The foundation only stubs the pattern; it does not build such a feature.
 *
 * GET /api/health → { ok: true, service: "contact-card" }
 */
export async function GET() {
  return Response.json({ ok: true, service: "contact-card" });
}
