import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { WebVitals } from '@/components/analytics/web-vitals';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { ChatWidget } from '@/components/chat/chat-widget';
import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://kbdcredit.com'),
    title: {
        default: 'KBD Credit Solutions - Empowering Your Finances',
        template: '%s | KBD Credit Solutions',
    },
    description:
        'Compare bank loans, find your best match, and smoothly process your application with expert-backed guidance. Your trusted fintech companion.',
    keywords: [
        'loan comparison',
        'personal loan',
        'home loan',
        'vehicle loan',
        'business loan',
        'bank loans',
        'loan calculator',
        'credit solutions',
        'financial services',
    ],
    authors: [{ name: 'KBD Credit Solutions' }],
    creator: 'KBD Credit Solutions',
    publisher: 'KBD Credit Solutions',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://kbdcredit.com',
        siteName: 'KBD Credit Solutions',
        title: 'KBD Credit Solutions - Empowering Your Finances',
        description:
            'Compare bank loans, find your best match, and process your application with expert guidance.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'KBD Credit Solutions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KBD Credit Solutions - Empowering Your Finances',
        description:
            'Compare bank loans, find your best match, and process your application with expert guidance.',
        images: ['/og-image.png'],
    },
};

export const viewport: Viewport = {
    themeColor: '#14213D',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
            <body className="min-h-screen bg-[#050A18] antialiased" suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FinancialService',
                            name: 'KBD Credit Solutions',
                            url: 'https://kbdcredit.com',
                            logo: 'https://kbdcredit.com/logo.png',
                            sameAs: [
                                'https://facebook.com/kbdcredit',
                                'https://twitter.com/kbdcredit',
                                'https://linkedin.com/company/kbdcredit',
                            ],
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: '123 Finance Street',
                                addressLocality: 'Mumbai',
                                addressRegion: 'MH',
                                postalCode: '400001',
                                addressCountry: 'IN',
                            },
                        }),
                    }}
                />
                {children}
                <GoogleAnalytics gaId="G-XYZ" />
                <WebVitals />
                <CookieConsent />
                <ChatWidget />
            </body>
        </html>
    );
}
