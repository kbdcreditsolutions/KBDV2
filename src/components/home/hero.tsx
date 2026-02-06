'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-[#050A18] overflow-hidden">
            {/* Grid Pattern Background */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Sub Grid */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,200,87,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,200,87,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '15px 15px',
                }}
            />

            {/* Glow Effects */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FFC857] rounded-full opacity-[0.15] blur-[140px] mix-blend-screen" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full opacity-[0.15] blur-[140px] mix-blend-screen" />

            {/* Main Content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center py-24 pt-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-8"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-[#FFC857] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                                Verification Protocol Active
                            </span>
                            <span className="text-[10px] font-bold text-[#FFC857] font-mono">
                                10,000+ USERS
                            </span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-2">
                            <h1 className="text-5xl lg:text-6xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight text-white flex flex-col">
                                <span>REDEFINING</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC857] via-orange-300 to-[#FFC857]">
                                    CAPITAL
                                </span>
                                <span className="text-3xl lg:text-4xl xl:text-5xl font-light text-slate-400 mt-3">
                                    Flow Management
                                </span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-400 max-w-lg leading-relaxed font-light pt-4">
                                Next-generation credit infrastructure for the modern era.
                                Experience real-time eligibility with our institutional-grade dashboard.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link href="/estimator">
                                <button className="group px-8 lg:px-10 py-4 lg:py-5 rounded-2xl text-primary font-extrabold flex items-center space-x-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(255,200,87,0.3)] bg-accent hover:bg-accent/90">
                                    <span className="uppercase tracking-wider text-sm">Launch Estimator</span>
                                    <Zap className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                            <Link href="/loans">
                                <button className="px-8 lg:px-10 py-4 lg:py-5 rounded-2xl text-white font-extrabold transition-all hover:bg-white/10 border border-white/10 backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)]">
                                    <span className="uppercase tracking-wider text-sm">View Portfolio</span>
                                </button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex -space-x-3">
                                {['R', 'P', 'A', 'S'].map((initial, i) => (
                                    <div
                                        key={i}
                                        className="w-11 h-11 rounded-full border-4 border-[#050A18] bg-slate-800 flex items-center justify-center text-sm font-bold text-white"
                                    >
                                        {initial}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-[#FFC857]">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-lg font-bold text-white font-mono">4.9/5</span>
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                    Institutional Trust Score
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-6 relative hidden lg:block"
                    >
                        <div className="relative w-full max-w-[540px] mx-auto">
                            {/* Stacked Card Background */}
                            <div
                                className="absolute inset-0 rounded-[40px] z-0 bg-[rgba(11,17,33,0.4)] backdrop-blur-[10px] border border-white/[0.08]"
                                style={{
                                    transform: 'perspective(1000px) translateZ(-40px) translateX(20px) translateY(10px) rotateY(-5deg)',
                                }}
                            />

                            {/* Main Dashboard Card */}
                            <div
                                className="relative z-10 rounded-[40px] p-8 lg:p-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-[rgba(11,17,33,0.7)] backdrop-blur-[20px] border border-white/[0.08]"
                                style={{
                                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                                }}
                            >
                                {/* Glow Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC857]/5 blur-3xl" />

                                {/* Notch */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/10 rounded-full" />

                                {/* Header */}
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Shield className="w-4 h-4 text-[#FFC857]" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC857]">
                                                RBI REGULATED TERMINAL
                                            </span>
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                                            Loan Dashboard
                                        </h2>
                                    </div>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                                            ACTIVE_TX
                                        </span>
                                    </div>
                                </div>

                                {/* Eligibility Meter */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                                            Eligibility Limit
                                        </span>
                                        <span className="text-2xl lg:text-3xl font-bold text-white font-mono tracking-tighter">
                                            ₹15,00,000
                                        </span>
                                    </div>
                                    <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                                        <div className="absolute inset-y-[2px] left-[2px] bg-gradient-to-r from-[#FFC857] to-orange-400 rounded-full w-[72%] shadow-[0_0_15px_rgba(255,200,87,0.4)]">
                                            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 skew-x-[-20deg]" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[9px] font-mono text-slate-600">0.00</span>
                                        <span className="text-[9px] font-mono text-slate-600">MAX_CAP</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2 group">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Interest Rate
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-white font-mono">10.5</span>
                                            <span className="text-[#FFC857] font-bold">%</span>
                                        </div>
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-50 bg-gradient-to-r from-[#FFC857] to-transparent" />
                                    </div>

                                    <div className="space-y-2 group">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Term Tenure
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-white font-mono">60</span>
                                            <span className="text-[#FFC857] font-bold">MO</span>
                                        </div>
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-50 bg-gradient-to-r from-[#FFC857] to-transparent" />
                                    </div>

                                    {/* EMI Card */}
                                    <div className="col-span-2 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Monthly EMI Projection
                                        </div>
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-3xl font-extrabold text-[#FFC857] font-mono tracking-tighter">
                                                ₹32,200
                                            </span>
                                            <LineChart className="w-6 h-6 text-slate-600" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <TrendingUp className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-500 uppercase leading-tight">
                                            Data integrity verified via<br />secure node 812-X
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                                        <div className="w-1.5 h-1.5 bg-[#FFC857] rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -left-4 z-20 px-5 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)]">
                                <div className="text-[9px] font-mono text-slate-400 mb-1">LIVE_OFFERS</div>
                                <div className="text-2xl font-bold text-white">
                                    06<span className="text-xs text-emerald-400 ml-1">↑</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
