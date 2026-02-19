import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // Maintenance Mode Check
    if (process.env.MAINTENANCE_MODE === 'true' && !request.nextUrl.pathname.startsWith('/maintenance')) {
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    // Content Security Policy
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://cdn.botpress.cloud https://files.bpcontent.cloud https://*.botpress.cloud;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.botpress.cloud;
        img-src 'self' blob: data: https://maps.googleapis.com https://maps.gstatic.com https://files.bpcontent.cloud https://*.botpress.cloud;
        font-src 'self' https://fonts.gstatic.com https://cdn.botpress.cloud;
        frame-src 'self' https://www.google.com https://*.botpress.cloud;
        connect-src 'self' https://maps.googleapis.com https://*.botpress.cloud wss://*.botpress.cloud https://www.google-analytics.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `;

    response.headers.set(
        'Content-Security-Policy',
        cspHeader.replace(/\s{2,}/g, ' ').trim()
    );

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), browsing-topics=()'
    );

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
