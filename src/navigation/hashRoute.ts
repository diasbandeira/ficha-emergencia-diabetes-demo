export type AppRoute =
  | { name: "management" }
  | { name: "emergency" }
  | { name: "login" }
  | { name: "app" }
  | { name: "qr" }
  | { name: "public"; token: string };

export function parseHash(hash: string): AppRoute {
  const path = hash
    .replace(/^#/, "")
    .replace(/^\/+/, "")
    .split("?")[0]
    .replace(/\/+$/, "");

  if (path === "emergency") {
    return { name: "emergency" };
  }
  if (path === "login") {
    return { name: "login" };
  }
  if (path === "app") {
    return { name: "app" };
  }
  if (path === "app/qr") {
    return { name: "qr" };
  }
  if (path.startsWith("p/") && path.length > 2) {
    return { name: "public", token: decodeURIComponent(path.slice(2)) };
  }
  return { name: "management" };
}

export function getEmergencyUrl(currentHref: string, basePath: string): string {
  const currentUrl = new URL(currentHref);
  const url = new URL(basePath, currentUrl.origin);
  url.hash = "/emergency";
  return url.toString();
}
