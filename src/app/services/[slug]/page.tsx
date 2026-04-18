'use client';

import { Navbar, Footer, Section } from '@/components/layout';
import { notFound } from 'next/navigation';
import { 
    User, Briefcase, Home, ShieldCheck, CheckCircle2,
    ArrowRight, Calculator, Phone, IndianRupee, Clock,
    Shield, FileCheck, TrendingUp, Percent, Building2, Star
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = {
    'personal-loan': {
        title: 'Personal Loan',
        subtitle: 'Fast. Digital. No Collateral.',
        description: 'Get funds in 24-48 hours for any personal need — medical, wedding, renovation, or travel. Salaried & self-employed welcome.',
        icon: User,
        color: 'blue',
        heroGradient: 'from-blue-600 via-blue-700 to-indigo-800',
        lightColor: 'bg-blue-50 text-blue-700',
        accentColor: 'text-blue-600',
        stats: [
            { value: '10.49%', label: 'Starting Rate' },
            { value: '₹40L', label: 'Max Amount' },
            { value: '48 Hrs', label: 'Disbursal' },
            { value: '5 Yrs', label: 'Max Tenure' },
        ],
        features: [
            { icon: Percent, title: 'Rates from 10.49%', desc: 'Competitive rates from HDFC, ICICI, Axis, IDFC First & more' },
            { icon: Clock, title: '24-48 Hr Disbursal', desc: 'Digital onboarding — no branch visits, no paperwork delays' },
            { icon: Shield, title: 'Zero Collateral', desc: 'Fully unsecured loans for salaried and self-employed professionals' },
            { icon: FileCheck, title: 'Minimal Documents', desc: 'Just PAN, Aadhaar, bank statement & salary slips (or ITR)' },
        ],
        eligibility: [
            'Age: 21-60 years',
            'Salaried: Min ₹25,000/month income',
            'Self-employed: Min 2 years ITR',
            'CIBIL Score: 700+ preferred (650+ considered)',
        ],
        useCases: [
            { title: 'Medical Emergency', desc: 'Instant funds when health can\'t wait' },
            { title: 'Wedding Expenses', desc: 'Celebrate without breaking your savings' },
            { title: 'Home Renovation', desc: 'Upgrade your space without selling investments' },
            { title: 'Debt Consolidation', desc: 'Merge multiple EMIs into one lower payment' },
        ],
        longDescription: 'At KBD Credit Solutions, we compare personal loan offers from 120+ Banking Partners to find you the lowest rate. Our tech professionals in Bangalore especially benefit from pre-approved limits at top banks.',
        relatedBlog: 'instant-personal-loans-tech',
    },
    'business-loan': {
        title: 'Business Loan',
        subtitle: 'Scale Without Pledging Assets.',
        description: 'Collateral-free MSME loans up to ₹5 Cr through CGTMSE, Mudra, and GST-based lending. From sole proprietors to Pvt Ltd companies.',
        icon: Briefcase,
        color: 'emerald',
        heroGradient: 'from-emerald-600 via-emerald-700 to-teal-800',
        lightColor: 'bg-emerald-50 text-emerald-700',
        accentColor: 'text-emerald-600',
        stats: [
            { value: '10%', label: 'Starting Rate' },
            { value: '₹5 Cr', label: 'Max Amount' },
            { value: '7 Days', label: 'Processing' },
            { value: '7 Yrs', label: 'Max Tenure' },
        ],
        features: [
            { icon: Shield, title: 'No Collateral Needed', desc: 'CGTMSE guarantee covers loans up to ₹5 Cr — no property pledge' },
            { icon: TrendingUp, title: 'GST-Based Lending', desc: 'Borrow 20-25% of annual GST turnover with minimal documentation' },
            { icon: Building2, title: 'Mudra Loans', desc: 'Shishu to Tarun — collateral-free options from ₹50K to ₹20L' },
            { icon: FileCheck, title: 'Working Capital', desc: 'Overdraft facilities and credit lines for seasonal cash flow needs' },
        ],
        eligibility: [
            'Business vintage: 1+ year (existing) or strong plan (new)',
            'Annual turnover: No minimum for Mudra',
            'GST registered (for GST-based loans)',
            'Udyam/MSME Registration',
        ],
        useCases: [
            { title: 'Working Capital', desc: 'Bridge cash flow gaps and fund daily operations' },
            { title: 'Equipment Purchase', desc: 'Invest in machinery without tying up reserves' },
            { title: 'Business Expansion', desc: 'Open new locations or enter new markets' },
            { title: 'Inventory Financing', desc: 'Stock up for peak seasons with confidence' },
        ],
        longDescription: 'We\'ve processed 200+ MSME loans across Bangalore. From Mudra Shishu to CGTMSE-backed ₹5 Cr facilities, our team handles the entire bank negotiation process.',
        relatedBlog: 'msme-loans-growth',
    },
    'home-loan': {
        title: 'Home Loan',
        subtitle: 'Your Dream Home, Best Rate.',
        description: 'Purchase, construction, or balance transfer — we compare 120+ Banking Partners to find you the lowest rate with maximum tax benefits.',
        icon: Home,
        color: 'amber',
        heroGradient: 'from-amber-600 via-amber-700 to-orange-800',
        lightColor: 'bg-amber-50 text-amber-700',
        accentColor: 'text-amber-600',
        stats: [
            { value: '8.4%', label: 'Starting Rate' },
            { value: '₹10 Cr', label: 'Max Amount' },
            { value: '30 Yrs', label: 'Max Tenure' },
            { value: '0%', label: 'Prepayment Fee' },
        ],
        features: [
            { icon: Percent, title: 'Rates from 8.4%', desc: 'Best-in-market rates from SBI, HDFC, LIC Housing, PNB Housing' },
            { icon: TrendingUp, title: 'Balance Transfer', desc: 'Move your existing loan to a lower rate — save lakhs in interest' },
            { icon: IndianRupee, title: 'Tax Benefits', desc: 'Save up to ₹5L/year under Section 24(b), 80C, and 80EEA' },
            { icon: Shield, title: '0% Prepayment', desc: 'Floating rate loans have zero prepayment penalty by RBI mandate' },
        ],
        eligibility: [
            'Age: 21-65 years (at loan maturity)',
            'Salaried: Min ₹30,000/month',
            'Self-employed: Min 3 years ITR',
            'CIBIL: 700+ (lower scores with co-applicant)',
        ],
        useCases: [
            { title: 'New Home Purchase', desc: 'Ready-to-move or under-construction properties' },
            { title: 'Balance Transfer', desc: 'Switch to lower rates and save lakhs' },
            { title: 'Home Construction', desc: 'Phase-wise disbursal for plot + construction' },
            { title: 'Top-Up Loan', desc: 'Additional funds on your existing home loan' },
        ],
        longDescription: 'A home loan is the biggest financial decision you\'ll make. We ensure you don\'t overpay by comparing across every major bank and HFC — and negotiating on your behalf.',
        relatedBlog: 'home-loan-prepayment-hack',
    },
    'cibil-repair': {
        title: 'CIBIL Repair',
        subtitle: 'From Rejected to Respected.',
        description: 'Our 90-day credit repair program has an 85% success rate in boosting scores by 50-100 points. Data-driven, not guesswork.',
        icon: ShieldCheck,
        color: 'violet',
        heroGradient: 'from-violet-600 via-violet-700 to-purple-800',
        lightColor: 'bg-violet-50 text-violet-700',
        accentColor: 'text-violet-600',
        stats: [
            { value: '750+', label: 'Target Score' },
            { value: '90 Days', label: 'Program Duration' },
            { value: '85%', label: 'Success Rate' },
            { value: '50-100', label: 'Pts Improvement' },
        ],
        features: [
            { icon: FileCheck, title: 'Credit Report Audit', desc: 'Line-by-line analysis of all tradelines, disputes, and defaults' },
            { icon: TrendingUp, title: 'Score Boost Strategy', desc: 'Targeted actions to improve your score in the shortest time' },
            { icon: Shield, title: 'Dispute Resolution', desc: 'We file disputes for errors, settle old debts, and remove duplicates' },
            { icon: Clock, title: 'Bi-Weekly Monitoring', desc: 'Track your progress every 2 weeks with detailed score reports' },
        ],
        eligibility: [
            'Current CIBIL score: Any (even -1 / NA)',
            'Willingness to follow the action plan',
            'Ability to clear small outstanding dues (if any)',
            'Patience for 90-day systematic improvement',
        ],
        useCases: [
            { title: 'Pre-Loan Preparation', desc: 'Boost your score before applying for a major loan' },
            { title: 'Post-Default Recovery', desc: 'Rebuild credit after settlements or write-offs' },
            { title: 'Error Correction', desc: 'Fix incorrect reporting by banks or NBFCs' },
            { title: 'Score Optimization', desc: 'Move from 650 to 750+ for better loan terms' },
        ],
        longDescription: 'A low CIBIL score isn\'t a permanent stain. Our credit repair experts provide a data-driven roadmap to clear disputes, settle old debts, and build a profile that banks respect.',
        relatedBlog: 'home-loan-low-cibil',
    }
};

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services[params.slug as keyof typeof services];

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className={`relative pt-32 pb-20 bg-gradient-to-br ${service.heroGradient} overflow-hidden`}>
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left — Text */}
                            <motion.div {...fadeIn} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-6">
                                    <Icon className="w-4 h-4" />
                                    <span>{service.title}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                                    {service.subtitle}
                                </h1>
                                <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                                    {service.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link 
                                        href="/estimator"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all shadow-xl"
                                    >
                                        <Calculator className="w-5 h-5" />
                                        Check Eligibility
                                    </Link>
                                    <Link 
                                        href={`https://wa.me/916360681493?text=Hi, I'm interested in ${service.title}`}
                                        target="_blank"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Talk to Advisor
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Right — Stats Grid */}
                            <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
                                <div className="grid grid-cols-2 gap-4">
                                    {service.stats.map((stat, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                                            <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                                            <div className="text-sm text-white/60">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <Section background="white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why KBD for {service.title}?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {service.longDescription}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-xl ${service.lightColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* Use Cases + Eligibility */}
                <Section background="surface">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Use Cases */}
                        <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For</h2>
                            <div className="space-y-4">
                                {service.useCases.map((uc, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-sm transition-all">
                                        <div className={`w-10 h-10 rounded-lg ${service.lightColor} flex items-center justify-center flex-shrink-0`}>
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">{uc.title}</h4>
                                            <p className="text-sm text-gray-500">{uc.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Eligibility */}
                        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.2 }}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Checklist</h2>
                            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                                <div className="space-y-5">
                                    {service.eligibility.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${service.accentColor}`} />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 mb-4">Not sure if you qualify? Check instantly — no impact on your credit score.</p>
                                    <Link
                                        href="/estimator"
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${service.lightColor} font-semibold hover:opacity-80 transition-all`}
                                    >
                                        Check My Eligibility
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Section>

                {/* How It Works */}
                <Section background="white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">3 Steps to Your {service.title}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '01', title: 'Tell Us Your Need', desc: 'Use our estimator or WhatsApp us your requirement. Takes 2 minutes.' },
                            { step: '02', title: 'We Find the Best Offer', desc: 'We compare across 120+ Banking Partners and negotiate the lowest rate for your profile.' },
                            { step: '03', title: 'Get Your Funds', desc: 'Dedicated case manager handles all paperwork. You just sign and receive.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ duration: 0.4, delay: i * 0.15 }}
                                className="text-center relative"
                            >
                                <div className={`text-5xl font-extrabold ${service.accentColor} opacity-20 mb-4`}>{item.step}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-8 -right-4 text-gray-200">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* Final CTA */}
                <section className={`py-20 bg-gradient-to-br ${service.heroGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0">
                        <div className="absolute top-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    </div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
                                Check your eligibility in 2 minutes. Zero impact on your credit score.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/estimator"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all shadow-xl"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Launch Estimator
                                </Link>
                                <Link
                                    href={`https://wa.me/916360681493?text=Hi, I need help with ${service.title}`}
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <Phone className="w-5 h-5" />
                                    WhatsApp Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
