import assert from "node:assert/strict";

// Run against a production server: npm run security:check -- http://localhost:3000
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const paths = ["/", "/skor/dam", "/varumarken/ecco", "/studio", "/maintenance", "/robots.txt"];

for (const path of paths) {
  const response = await fetch(new URL(path, base), {
    redirect: "error",
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, 200, path + " must load successfully");
  const headers = response.headers;
  assert.equal(headers.get("x-powered-by"), null, path + " exposes the framework");
  assert.equal(headers.get("x-content-type-options"), "nosniff");
  assert.equal(headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(headers.get("permissions-policy"), "camera=(), microphone=(), geolocation=()");
  assert.match(headers.get("strict-transport-security") ?? "", /max-age=31536000/);

  const csp = headers.get("content-security-policy") ?? "";
  const directives = new Map(csp.split(";").map((part) => {
    const [name, ...sources] = part.trim().split(/\s+/);
    return [name, sources];
  }));
  for (const [name, sources] of [
    ["default-src", ["'self'"]],
    ["object-src", ["'none'"]],
    ["script-src-attr", ["'none'"]],
    ["frame-ancestors", ["'self'"]],
    ["base-uri", ["'self'"]],
  ]) assert.deepEqual(directives.get(name), sources, path + ": " + name);
  assert.ok(directives.get("script-src")?.includes("'self'"), "Missing script policy");
  assert.ok(!csp.includes("'unsafe-eval'"), "Production must not permit eval");
  assert.ok(!csp.includes("localhost:"), "Production must not permit development connections");
  await response.arrayBuffer();
  const rewrite = headers.get("x-middleware-rewrite");
  const target = rewrite ? " (rewritten to " + new URL(rewrite, base).pathname + ")" : "";
  console.log("PASS " + path + " — production security headers" + target);
}

for (const source of ["https://example.invalid/image.png", "http://127.0.0.1/image.png"]) {
  const url = new URL("/_next/image", base);
  url.search = new URLSearchParams({ url: source, w: "640", q: "75" }).toString();
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 400, "Image optimizer must reject unapproved sources");
  await response.arrayBuffer();
}
console.log("PASS image optimizer rejects unapproved remote and loopback URLs");
