'use client';

import React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
    Briefcase, 
    MapPin, 
    Clock, 
    CheckCircle2, 
    Rocket, 
    Zap, 
    Globe,
    ArrowRight
} from 'lucide-react';
import { siteConfig } from '@/lib/constants';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#050A18] text-white selection:bg-accent/30">
            <Navbar />
            
            <main className="pt-24 lg:pt-32">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
                    </div>

                    <div className="container-wide relative z-10">
                        <div className="max-w-3xl">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <span className="h-px w-8 bg-accent" />
                                <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">Careers at KBD</span>
                            </motion.div>
                            
                            <motion.h1 
                                {...fadeIn}
                                className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]"
                            >
                                Build the Future of <br />
                                <span className="text-accent">Loan Distribution</span>
                            </motion.h1>
                            
                            <motion.p 
                                {...fadeIn}
                                transition={{ delay: 0.2 }}
                                className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl"
                            >
                                KBD Credit Solutions is scaling its next-generation hub. We're looking for operational rockstars to join our founding team and redefine finance for millions.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Job Listing Section */}
                <section className="py-20 lg:py-32">
                    <div className="container-wide">
                        <div className="grid lg:grid-cols-12 gap-16">
                            {/* Left: Job Description */}
                            <div className="lg:col-span-8">
                                <motion.div 
                                    variants={stagger}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                    className="space-y-12"
                                >
                                    {/* Role Header */}
                                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
                                                Active Opening
                                            </span>
                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>Freelance / Full-time</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <MapPin className="w-4 h-4" />
                                                <span>Remote / Bangalore</span>
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-bold mb-4">Case Manager (Loan Distribution Hub)</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            Are you detailed-oriented, tech-savvy, and experienced in the loan industry? We need a High-Performance Case Manager to manage our growing file pipeline and ensure seamless disbursals.
                                        </p>
                                    </div>

                                    {/* Responsibilities */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                            <Zap className="text-accent w-5 h-5" />
                                            What you will do
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                'Manage customer loan files from submission to disbursal',
                                                'Coordinate with master distributors (Andromeda)',
                                                'Engage with Bank Relationship Managers',
                                                'Update real-time status on KBD Connect portal',
                                                'Ensure 100% documentation accuracy',
                                                'Minimize bank rejections through audit'
                                            ].map((item, i) => (
                                                <motion.div 
                                                    key={i}
                                                    variants={fadeIn}
                                                    className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-accent/30 transition-colors"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-300 text-sm">{item}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                            <Rocket className="text-accent w-5 h-5" />
                                            Who you are
                                        </h3>
                                        <ul className="space-y-4">
                                            {[
                                                '1-3 years of experience in DSA / Bank loan operations',
                                                'Proficiency with digital tools and CRM systems',
                                                'Strong communication skills in English and Local Languages',
                                                'Experience with Personal, Business, or Home Loans'
                                            ].map((item, i) => (
                                                <motion.li 
                                                    key={i}
                                                    variants={fadeIn}
                                                    className="flex items-center gap-4 text-slate-300"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right: Sidebar / CTA */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-32 space-y-8">
                                    {/* Why Join Us Card */}
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                                        <h3 className="text-xl font-bold mb-6">Why join KBD?</h3>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <Globe className="w-5 h-5 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">100% Remote</p>
                                                    <p className="text-xs text-slate-400">Work from anywhere in India</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <Zap className="w-5 h-5 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">Performance Based</p>
                                                    <p className="text-xs text-slate-400">High incentives on every disbursal</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <Rocket className="w-5 h-5 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">Founding Member</p>
                                                    <p className="text-xs text-slate-400">Shape the company from day one</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Application Card */}
                                    <div className="p-8 rounded-3xl bg-white border border-white/10 shadow-2xl group">
                                        <h3 className="text-xl font-bold text-[#050A18] mb-4">Interested?</h3>
                                        <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                                            Send your resume to our recruitment team. We respond to all qualified candidates within 48 hours.
                                        </p>
                                        <a 
                                            href={`mailto:${siteConfig.email}?subject=Application for Case Manager Role`}
                                            className="block"
                                        >
                                            <Button 
                                                variant="gold" 
                                                className="w-full h-14 text-lg"
                                                rightIcon={<ArrowRight className="w-5 h-5" />}
                                            >
                                                Apply Now
                                            </Button>
                                        </a>
                                        <p className="text-center mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                            No hidden fees • Direct Hiring
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
