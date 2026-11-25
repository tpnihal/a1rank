# A1 Rank website

Marketing website for [A1 Rank](https://www.a1rank.com), a digital marketing agency in Dubai, UAE.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with the A1 Rank design tokens (`tailwind.config.ts`)
- Framer Motion for motion, React Three Fiber for the 3D hero
- Resend for enquiry and newsletter emails
- Google PageSpeed Insights API + Anthropic Claude API for the Website Audit tool (Stage 4)

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the keys you have
npm run dev                  # http://localhost:3000
```

Other commands: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Environment variables

See `.env.example`. Without `RESEND_API_KEY` and `ENQUIRY_FROM` the forms do not send email and
tell the visitor to write to admin@a1rank.com instead. Never commit real keys.

## Brand

Colours are sampled from the original logo (`public/a1rank-logo-original.png`).

| Token | Hex |
| --- | --- |
| Coral (gradient start) | `#EF5245` |
| Coral red (primary) | `#F04651` |
| Pink (gradient end) | `#EC2563` |
| Black (wordmark) | `#020202` |
| Ink (dark sections) | `#0C0A0B` |

Gradient: `linear-gradient(135deg, #EF5245, #EC2563)`. The vector logo mark (`components/Logo.tsx`,
`public/logo-mark.svg`, `lib/logo-shape.ts`) is traced from the original logo file.

## Structure

- `app/` routes: homepage, `/services` (all ten services on one page, each with an anchor such as
  `/services#meta-google-ads`), `/about`, `/works`, `/industries` and `/industries/[slug]`, `/privacy-policy`, `/terms`,
  `/blog`, `/blog/category/[slug]`, `/blog/[slug]`,
  `/contact` (enquiry form, `?package=go|pro|pro-max|grox` prefills the package),
  `/website-audit` (free audit tool), `/api/audit`, `/api/audit/explain`, `/api/enquiry`
- `components/` page sections and UI
- `lib/site.ts` all site content: services, packages, industries, works, navigation
- `lib/blog/articles/*.ts` blog articles, one file per category. To add an article, append an object to the
  category file: it appears on `/blog`, its category page and the homepage automatically

## Website Audit tool

- The browser posts the URL to `/api/audit` twice (mobile and desktop). The server validates the URL, rate-limits by
  IP and calls Google PageSpeed Insights with `PAGESPEED_API_KEY`. The key never reaches the browser.
- `lib/audit/psi.ts` reduces Google's response to the report data. Every score and metric shown comes from that
  response. If an audit fails, the page says so and shows no scores.
- "Download PDF" uses the browser's print to PDF with a print stylesheet.
- With `ANTHROPIC_API_KEY` set, `/api/audit/explain` adds a short AI-written summary. It receives only scores and
  Lighthouse audit IDs. Without the key the section is omitted.
- Rate limiting is in memory (`lib/rate-limit.ts`). For strict limits on serverless hosting, back it with a shared
  store such as Upstash Redis.
- On Vercel, `/api/audit` needs a function duration of up to 60 seconds (`maxDuration` is set in the route).

## Build stages

1. Design system, navigation, footer and homepage (done)
2. Services, About Us, Our Works and Industries pages (done)
3. Blog system with categories and articles (done)
4. Free public Website Audit tool (done)
5. SEO, accessibility, performance, testing and deployment

## Content still to confirm

- Package inclusions in `lib/site.ts` (`PACKAGES`) must match the official A1 Rank pricing reference.
- Works in `lib/site.ts` (`WORKS`) are placeholder showcases, to be replaced with real client projects.
- Every photo in `public/images/stock/` is a temporary Unsplash stock image. Replace with A1 Rank's own images
  (keep the same file names, or update the `image` fields in `lib/site.ts`).
- `/privacy-policy` and `/terms` are draft wording and need a review before launch.
- Industries list (`INDUSTRIES`) to be confirmed.
