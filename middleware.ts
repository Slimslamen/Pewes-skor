import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production";
const API_VER    = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-07";

async function getMaintenanceMode(): Promise<boolean> {
  if (!PROJECT_ID) return false;
  try {
    const query = encodeURIComponent(
      '*[_type=="siteSettings" && _id=="siteSettings"][0].maintenanceMode'
    );
    const res = await fetch(
      `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VER}/data/query/${DATASET}?query=${query}`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return false;
    const { result } = await res.json() as { result: boolean | null };
    return result === true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow through: maintenance page, Next.js internals, Sanity studio, API routes
  if (
    pathname === "/maintenance" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const maintenance = await getMaintenanceMode();
  if (!maintenance) return NextResponse.next();

  return NextResponse.rewrite(new URL("/maintenance", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
