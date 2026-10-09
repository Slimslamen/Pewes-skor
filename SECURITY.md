# Security maintenance

Reviewed and updated on 2026-10-09.

## Dependencies

The lockfile now resolves Next.js 16.4.0, React/React DOM 19.3.0,
sharp 0.35.5, Sanity 5.31.2, next-sanity 12.4.5, and Vitest 4.1.11.
The dependency refresh removes the reported Next.js and sharp advisories.

Scoped overrides keep Sanity CLI dependencies on patched releases of
adm-zip, js-yaml, and uuid until their upstream dependency ranges catch up.
Review these overrides when updating Sanity.

Use `npm ci` to reproduce the reviewed dependency tree. npm 11.4.2 crashed
during dependency resolution; npm 11.21.0 completed the update successfully.
Run `npm audit` after future updates.

### Remaining upstream advisories

The audit still reports 15 entries (11 high, 4 moderate), all stemming from:

- `braces` 3.0.3: deeply nested patterns can exhaust the stack
  ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)).
  It is pulled in through ESLint's file matching and Sanity's code generation.
- `sprintf-js` 1.0.3: unbounded precision can exhaust resources
  ([GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)).
  It is pulled in through the YAML/argument parsing dependencies of Sanity CLI.

No patched upstream releases were available for these two packages at review
time. The other audit entries are their dependent packages, not additional
root advisories. No public application route was found passing visitor input
to these tools. Do not run these tools on untrusted project inputs. Recheck
upstream fixes; do not use `npm audit fix --force` to downgrade Next.js tooling.

## Announced follow-up

On October 8, the Next.js maintainers announced another security release for
October 14, 2026, covering two Critical and one High upstream vulnerabilities.
Affected versions and fixes were not yet published at this review. Recheck and
apply the patched release when available; the current npm audit cannot establish
whether this build is affected by those undisclosed issues.

[Official announcement](https://nextjs.org/blog/upcoming-nextjs-security-update-october-2026)

## Upgrade compatibility

The upgraded next-sanity returns unknown for queries without generated types.
Sanity TypeGen is now configured in `sanity.cli.ts`; the generated schema and
query types live in `sanity/schema.json` and `sanity/types.ts`. Regenerate them
with `npm run typegen` after changing schemas or GROQ queries, and include the
updated generated files with those changes.

Component contracts now account for nullable CMS fields, static parameters and
navigation skip missing slugs/labels, and the Gabor/Rieker pages no longer read
heritage fields that their query never returned. The responsive story section
uses an external-store subscription with a stable server snapshot, resolving the
React hook lint error without changing its desktop/mobile layouts.

## Validation on 2026-10-09

- `npm run typecheck`: passed.
- `npm run build`: passed; all 27 static generation tasks completed.
- `npm run lint`: passed with five existing unused-variable warnings.
- `npm audit --json`: completed; 15 entries (11 high, 4 moderate), rooted only
  in braces and sprintf-js. No Next.js or sharp entry. TLS verification remained
  enabled; Node's `--use-system-ca` option was needed in this environment.
- Production HTTP checks: security headers passed on six representative routes;
  the image optimizer returned 400 for unapproved remote and loopback URLs.
- The CMS maintenance flag was enabled during HTTP checks. Rewritten responses
  were identified explicitly, and the generated page HTML was checked separately.
  Browser interaction checks could not run because no browser was connected.
- The configured Sanity server token was absent from all 69 client JavaScript
  bundles. This checks that specific token, not every possible secret.
- `git diff --check`: passed.

To repeat the runtime checks, run `npm run build` and `npm start`, then run
`npm run security:check -- http://localhost:3000` in another terminal. The check
also accepts a deployed base URL and reports maintenance rewrites when present.

Next.js still emits a middleware-to-proxy deprecation warning and an informational
warning about a lockfile outside the repository. Neither blocks this build.

## Response headers

`next.config.ts` applies CSP, SAMEORIGIN framing restrictions, nosniff,
strict-origin-when-cross-origin referrer policy, and disabled camera,
microphone, and geolocation permissions to every route. Production also
sets HSTS for one year, without applying it to other subdomains.

The CSP permits the site's image hosts, Google Maps frames, and Sanity API
and live connections. Inline event handlers, objects, and external framing
are blocked. Development alone permits JavaScript eval for the toolchain.

Static Next.js pages require inline bootstrap scripts, so the CSP explicitly
permits inline scripts and styles. This is a baseline source policy, not a
strict nonce-based XSS defense. A nonce-based policy would require changing
the site's static rendering and caching strategy. Keep the existing JSON-LD
escaping and React text escaping in place.

This update does not change Sanity token permissions or production hosting.
Deploy the updated build for the fixes to take effect on the public site.
