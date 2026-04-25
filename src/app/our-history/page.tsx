'use client';

import { Navbar, Footer } from '@/components/layout';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Rocket, Users, Heart, ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const chapters = [
    {
        icon: BookOpen,
        label: 'Chapter 01',
        title: 'Where It All Started',
        year: '2023',
        color: 'from-[#FFC857]/20 to-transparent',
        iconColor: 'text-[#FFC857]',
        borderColor: 'border-[#FFC857]/20',
        content: [
            'Before KBD Credit Solutions was founded in 2023, two individuals working within the financial ecosystem noticed a recurring pattern.',
            'Every day, people approached banks and loan agents with hope — hopes of starting a business, buying a home, or managing urgent financial needs. But many walked away disappointed.',
            'Not because they weren\'t eligible. Not because opportunities didn\'t exist. But because they lacked the right guidance.',
        ],
    },
    {
        icon: Lightbulb,
        label: 'Chapter 02',
        title: 'The Real Problem: Not Rejection, But Direction',
        year: 'The Insight',
        color: 'from-blue-500/20 to-transparent',
        iconColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        content: [
            'The founders observed something most people overlooked: loan rejections were often not about capability, but about misalignment.',
        ],
        bullets: [
            'The wrong bank was approached',
            'The application wasn\'t structured properly',
            'Documentation had gaps',
            'Or no one explained the process clearly',
        ],
        extra: 'And in many cases, one critical factor stood in the way — CIBIL score issues. For most applicants, a low or impacted CIBIL score felt like a dead end. But the founders saw it differently.',
    },
    {
        icon: Rocket,
        label: 'Chapter 03',
        title: 'A Different Approach: Fix Before You Apply',
        year: 'The Solution',
        color: 'from-emerald-500/20 to-transparent',
        iconColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
        content: [
            'Instead of treating rejections as the end of the journey, they asked a simple but powerful question:',
        ],
        quote: '"What if we could help people become eligible instead?"',
        extra: 'This mindset changed everything. They began helping individuals understand what affects their CIBIL score, identify errors or gaps in their credit profile, take actionable steps to improve their score, and apply strategically — at the right time, to the right lender.',
        extraNote: 'It wasn\'t just about processing loans anymore. It was about preparing people for approval.',
    },
    {
        icon: Rocket,
        label: 'Chapter 04',
        title: 'The Birth of KBD Credit Solutions',
        year: '2023 Launch',
        color: 'from-[#FFC857]/20 to-transparent',
        iconColor: 'text-[#FFC857]',
        borderColor: 'border-[#FFC857]/20',
        content: [
            'In 2023, this idea transformed into reality with the launch of KBD Credit Solutions.',
            'Built on the belief that every rejection has a reason and every reason has a solution, KBD set out to redefine how financial assistance is delivered.',
            'Rather than being just another DSA, KBD positioned itself as a financial partner.',
        ],
    },
    {
        icon: Users,
        label: 'Chapter 05',
        title: 'Growing With Purpose',
        year: 'Today',
        color: 'from-violet-500/20 to-transparent',
        iconColor: 'text-violet-400',
        borderColor: 'border-violet-500/20',
        content: [
            'Today, KBD Credit Solutions partners with 100+ banks and Non-Banking Financial Companies (NBFCs), offering a wide range of financial products.',
        ],
        bullets: [
            'Personal Loans',
            'Business Loans',
            'Home Loans & Mortgages',
            'CIBIL Score Repair',
        ],
        extra: 'But what truly sets KBD apart is not just access to options — it\'s the ability to match the right customer with the right solution.',
    },
    {
        icon: Heart,
        label: 'Chapter 06',
        title: 'More Than Loans: Building Financial Confidence',
        year: 'Our Mission',
        color: 'from-rose-500/20 to-transparent',
        iconColor: 'text-rose-400',
        borderColor: 'border-rose-500/20',
        content: [
            'At its core, KBD Credit Solutions is about more than approvals.',
        ],
        bullets: [
            'Educating clients',
            'Building financial awareness',
            'Improving credit health',
            'Turning uncertainty into confidence',
        ],
        extra: 'Because sometimes, all someone needs is not just a loan — but the right direction to move forward.',
    },
];

export default function OurHistoryPage() {
    return (
        <>
            <Navbar />
            <main className="bg-[#050A18] min-h-screen">

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                    {/* Background grid */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />
                    {/* Glow */}
                    <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#FFC857] rounded-full opacity-[0.06] blur-[120px] pointer-events-none" />

                    <div className="relative max-w-4xl mx-auto text-center">
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#FFC857]/20 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857] animate-pulse" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
                                Est. 2023 · Bangalore
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
                        >
                            Not the First,{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC857] via-orange-300 to-[#FFC857]">
                                But Different
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            The story of how KBD Credit Solutions began — not as the first Direct Sales Associate
                            in the market, but with a purpose that set it apart.
                        </motion.p>

                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-4 text-sm text-slate-500 italic"
                        >
                            In a world where financial services are everywhere, being first isn&apos;t always what matters.
                            What truly makes a difference is being better, more human, and more trustworthy.
                        </motion.p>
                    </div>
                </section>

                {/* Timeline Chapters */}
                <section className="max-w-4xl mx-auto px-4 pb-16 space-y-8">
                    {chapters.map((chapter, i) => {
                        const Icon = chapter.icon;
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className={`relative rounded-2xl border ${chapter.borderColor} bg-white/[0.03] backdrop-blur-sm overflow-hidden`}
                            >
                                {/* Top gradient stripe */}
                                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${chapter.color}`} />

                                <div className="p-6 sm:p-8">
                                    {/* Chapter label + year */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border ${chapter.borderColor}`}>
                                                <Icon className={`w-4 h-4 ${chapter.iconColor}`} />
                                            </div>
                                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">
                                                {chapter.label}
                                            </span>
                                        </div>
                                        <span className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border ${chapter.borderColor} ${chapter.iconColor}`}>
                                            {chapter.year}
                                        </span>
                                    </div>

                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                                        {chapter.title}
                                    </h2>

                                    <div className="space-y-3">
                                        {chapter.content.map((para, j) => (
                                            <p key={j} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                                {para}
                                            </p>
                                        ))}

                                        {chapter.quote && (
                                            <div className="relative my-5 pl-5 border-l-2 border-[#FFC857]/40">
                                                <Quote className="absolute -left-2 -top-1 w-4 h-4 text-[#FFC857]/60" />
                                                <p className="text-white font-semibold italic text-base sm:text-lg">
                                                    {chapter.quote}
                                                </p>
                                            </div>
                                        )}

                                        {chapter.bullets && (
                                            <ul className="space-y-2 my-3">
                                                {chapter.bullets.map((bullet, k) => (
                                                    <li key={k} className="flex items-center gap-3 text-slate-300 text-sm">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current ${chapter.iconColor}`} />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {chapter.extra && (
                                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                                {chapter.extra}
                                            </p>
                                        )}
                                        {chapter.extraNote && (
                                            <p className="text-slate-400 leading-relaxed text-sm italic">
                                                {chapter.extraNote}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </section>

                {/* Looking Ahead */}
                <section className="max-w-4xl mx-auto px-4 pb-12">
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#FFC857]/5 to-transparent p-8 sm:p-10 text-center"
                    >
                        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFC857]/70 mb-4">Looking Ahead</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            This is just the beginning.
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                            KBD Credit Solutions may not have been the first in the industry, but it continues to strive
                            to be one of the most <span className="text-white font-semibold">reliable and customer-focused</span> names in the space.
                        </p>
                    </motion.div>
                </section>

                {/* Final Thought CTA */}
                <section className="max-w-4xl mx-auto px-4 pb-24">
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-2xl overflow-hidden border border-[#FFC857]/20 bg-[#050A18]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC857]/8 via-transparent to-blue-600/8 pointer-events-none" />
                        <div className="relative p-8 sm:p-12 text-center space-y-4">
                            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">Final Thought</p>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                Don&apos;t just apply for a loan.
                            </p>
                            <p className="text-xl text-[#FFC857] font-semibold">
                                Apply with the right guidance.
                            </p>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">
                                KBD Credit Solutions — Empowering your journey, one approval at a time.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/contact">
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FFC857] text-[#050A18] font-extrabold uppercase tracking-wider text-sm hover:bg-[#f0b800] transition-colors shadow-[0_4px_20px_rgba(255,200,87,0.3)]">
                                        Get Guidance
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                                <Link href="/services/cibil-repair">
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">
                                        Check CIBIL Score
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>

            </main>
            <Footer />
        </>
    );
}
