/**
 * Turns what a visitor typed into a clean public http(s) URL, or null when it is not one.
 * Rejects localhost, bare IP addresses and names without a dot.
 */
export function normaliseUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 2000) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let u: URL;
  try {
    u = new URL(withScheme);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  if (u.username || u.password) return null;
  const host = u.hostname.toLowerCase();
  if (!host.includes(".") || host.endsWith(".")) return null;
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
  if (/^[0-9.]+$/.test(host) || host.includes(":")) return null; // IPv4 / IPv6 literals
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) return null;
  if (!/\.[a-z]{2,}$/.test(host)) return null;
  u.hash = "";
  return u.toString();
}
