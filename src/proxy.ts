import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { ASSETS_PATH, getActiveLink } from '@/content/shared-studies/links';

/**
 * Shared case study links: answer 404 for an expired link's screenshots too
 * (the page checks on its own), and keep every shared URL out of search
 * engines. Static files bypass the page, so this is where they are gated.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(`${ASSETS_PATH}/`)) {
    const id = pathname.split('/')[2];
    if (!getActiveLink(id)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  // The id in the URL is the only secret; never send it to other sites
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}

export const config = {
  matcher: ['/case/:path*', '/case-assets/:path*'],
};
