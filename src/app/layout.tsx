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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kbdcreditsolutions.in'),
    title: {
        default: 'KBD Credit Solutions - Loan Experts in Bangalore | Home, Personal & Business Loans',
        template: '%s | KBD Credit Solutions',
    },
    description:
        'Compare loans from 10+ banks, get instant EMI estimates, and process applications with expert guidance. Home loans from 8.4%, business loans up to ₹5 Cr. Trusted by 500+ clients in Bangalore.',
    keywords: [
        'loan consultant Bangalore',
        'best home loan rates Bangalore',
        'personal loan Bangalore',
        'business loan for MSME',
        'CIBIL repair services',
        'loan against property Bangalore',
        'home loan balance transfer',
        'low interest personal loan India',
        'collateral free business loan',
        'EMI calculator India',
        'chartered accountant loan referral',
        'loan DSA partner program',
        'KBD Credit Solutions',
        'best loan consultant near me',
        'instant personal loan tech professionals',
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
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kbdcreditsolutions.in',
        siteName: 'KBD Credit Solutions',
        title: 'KBD Credit Solutions - Loan Experts in Bangalore',
        description:
            'Compare loans from 10+ banks, get instant EMI estimates. Home loans from 8.4%, business loans up to ₹5 Cr. Trusted in Bangalore.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'KBD Credit Solutions - Your Trusted Loan Partner in Bangalore',
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
                            url: 'https://kbdv3.onrender.com',
                            description: 'Compare loans from 10+ banks. Home, Personal & Business loan experts in Bangalore.',
                            areaServed: {
                                '@type': 'City',
                                name: 'Bangalore',
                            },
                            serviceType: ['Home Loan', 'Personal Loan', 'Business Loan', 'CIBIL Repair', 'Loan Balance Transfer'],
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Bangalore',
                                addressRegion: 'KA',
                                addressCountry: 'IN',
                            },
                        }),
                    }}
                />
                {children}
                {/* TODO: Replace G-XYZ with your real Google Analytics 4 Measurement ID */}
                {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
                <WebVitals />
                <CookieConsent />
                <ChatWidget />
            </body>
        </html>
    );
}
