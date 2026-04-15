import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kbdv3.onrender.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/partners/dashboard', '/api/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
