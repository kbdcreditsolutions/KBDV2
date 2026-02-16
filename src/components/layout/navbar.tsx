'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navLinks, siteConfig } from '@/lib/constants';
import { Menu, X, ChevronRight } from 'lucide-react';
import { KBDLogo } from '@/components/ui/kbd-logo';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-[#050A18]/95 backdrop-blur-md border-b border-white/5'
                        : 'bg-transparent'
                )}
            >
                <nav className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="flex h-20 lg:h-24 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <KBDLogo variant="full" theme="light" size="md" />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-10 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            {navLinks.slice(0, 6).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-[#FFC857] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <button className="hidden lg:flex px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:border-[#FFC857] transition-all border border-white/10 backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)]">
                            Access Terminal
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={cn(
                    'fixed top-0 right-0 z-50 h-full w-[300px] bg-[#050A18] border-l border-white/10 lg:hidden transition-transform duration-300',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
                    <span className="text-lg font-bold text-white">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-white hover:bg-white/10"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="p-6">
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-[#FFC857] rounded-lg transition-colors"
                                >
                                    {link.label}
                                    <ChevronRight className="h-4 w-4 text-slate-600" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <Link href="/estimator">
                            <button className="w-full px-6 py-4 rounded-2xl text-[#050A18] font-extrabold text-sm uppercase tracking-wider bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_100%),#FFC857] shadow-[0_4px_15px_rgba(255,200,87,0.3)]">
                                Launch Estimator
                            </button>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
};
