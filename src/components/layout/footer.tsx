import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/constants';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from 'lucide-react';
import { KBDLogo } from '@/components/ui/kbd-logo';

const footerLinks = {
    services: [
        { href: '/loans?type=personal', label: 'Personal Loans' },
        { href: '/loans?type=home', label: 'Home Loans' },
        { href: '/loans?type=vehicle', label: 'Vehicle Loans' },
        { href: '/loans?type=business', label: 'Business Loans' },
        { href: '/estimator', label: 'Loan Estimator' },
    ],
    company: [
        { href: '/about', label: 'About Us' },
        { href: '/partners', label: 'Bank Partners' },
        { href: '/assistance', label: 'How It Works' },
        { href: '/contact', label: 'Contact Us' },
    ],
    legal: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookies', label: 'Cookie Policy' },
        { href: '/disclaimer', label: 'Disclaimer' },
    ],
};

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="container-wide py-12 lg:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <KBDLogo variant="full" theme="light" size="md" />
                        </Link>
                        <p className="mt-4 text-sm text-white/70 leading-relaxed">
                            {siteConfig.description}
                        </p>
                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            <a
                                href={siteConfig.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href={siteConfig.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href={siteConfig.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href={siteConfig.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                            Contact Us
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a
                                    href={`tel:${siteConfig.phone}`}
                                    className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors"
                                >
                                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>{siteConfig.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors"
                                >
                                    <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>{siteConfig.email}</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-sm text-white/70">
                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>{siteConfig.address}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-wide py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-white/60">
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-4 md:gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-white/40">
                        Disclaimer: KBD Credit Solutions is a loan comparison platform. We do not directly
                        provide loans. All loans are subject to approval from our RBI-regulated bank partners.
                        Interest rates and terms may vary.
                    </p>
                </div>
            </div>
        </footer>
    );
};
