export type DemoRoute = "management" | "emergency";

export function getDemoRoute(hash: string): DemoRoute {
  return hash === "#/emergency" ? "emergency" : "management";
}

export function getEmergencyUrl(currentHref: string, basePath: string): string {
  const currentUrl = new URL(currentHref);
  const url = new URL(basePath, currentUrl.origin);
  url.hash = "/emergency";
  return url.toString();
}
