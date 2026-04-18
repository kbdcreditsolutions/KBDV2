'use client';

'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, Shield, TrendingUp, LineChart, CalendarClock, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Modal } from '@/components/ui/modal';
import { pdfService } from '@/lib/services/pdf-service';

export const Hero: React.FC = () => {
    // Loan Estimator State
    const [amount, setAmount] = useState(1500000);
    const [rate, setRate] = useState(10.5);
    const [tenure, setTenure] = useState(60);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);

    // EMI Calculation
    const calculateEMI = () => {
        const monthlyRate = rate / 12 / 100;
        const emi =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();

    // Amortization Schedule
    const generateSchedule = () => {
        const schedule = [];
        let balance = amount;
        const monthlyRate = rate / 12 / 100;
        const monthlyEMI = emi;

        for (let i = 1; i <= tenure; i++) {
            const interest = balance * monthlyRate;
            const principal = monthlyEMI - interest;
            const closingBalance = balance - principal;

            schedule.push({
                month: i,
                opening: balance,
                emi: monthlyEMI,
                interest: interest,
                principal: principal,
                closing: closingBalance > 0 ? closingBalance : 0
            });
            balance = closingBalance;
        }
        return schedule;
    };

    const handleDownloadPDF = () => {
        const schedule = generateSchedule();
        const totalPayment = emi * tenure;
        const totalInterest = totalPayment - amount;

        pdfService.generateAmortizationPDF({
            amount,
            rate,
            tenure,
            tenureType: 'mo', // Hero calculator uses months by default
            emi,
            totalInterest,
            totalPayment
        }, schedule);
    };

    // Formatters
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <section className="relative min-h-[100dvh] bg-[#050A18] overflow-hidden">
            {/* Grid Pattern Background */}
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

            {/* Sub Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,200,87,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,200,87,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '15px 15px',
                }}
            />

            {/* Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FFC857] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full opacity-[0.12] blur-[140px] pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-center py-20 pt-24 lg:py-24 lg:pt-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-6 lg:space-y-8"
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
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight text-white flex flex-col">
                                <span>REDEFINING</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC857] via-orange-300 to-[#FFC857]">
                                    CAPITAL
                                </span>
                                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-slate-400 mt-3">
                                    Flow Management
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-lg leading-relaxed font-light pt-4">
                                Next-generation credit infrastructure for the modern era.
                                Experience real-time eligibility with our institutional-grade dashboard.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                            <Link href="/estimator">
                                <button className="group w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-2xl text-primary font-extrabold flex items-center justify-center sm:justify-start space-x-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(255,200,87,0.3)] bg-accent hover:bg-accent/90">
                                    <span className="uppercase tracking-wider text-sm">Launch Estimator</span>
                                    <Zap className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                            <Link href="/loans">
                                <button className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-2xl text-white font-extrabold transition-all hover:bg-white/10 border border-white/10 backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)] text-center">
                                    <span className="uppercase tracking-wider text-sm">View Portfolio</span>
                                </button>
                            </Link>
                            <Link href="/check-score">
                                <button className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-2xl text-white font-extrabold transition-all hover:bg-white/10 border border-[#FFC857]/30 backdrop-blur-md bg-white/[0.02] flex items-center justify-center gap-2 group">
                                    <span className="uppercase tracking-wider text-sm">Check Score</span>
                                    <ShieldCheck className="w-4 h-4 text-[#FFC857] group-hover:scale-110 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="hidden sm:flex items-center space-x-6 pt-4">
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

                    {/* Right - Interactive Loan Estimator Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7 relative"
                    >
                        <div className="relative w-full max-w-[580px] mx-auto lg:ml-auto">
                            {/* Stacked Card Background */}
                            <div
                                className="absolute inset-0 rounded-2xl sm:rounded-[30px] lg:rounded-[40px] z-0 bg-[rgba(11,17,33,0.4)] backdrop-blur-[10px] border border-white/[0.08] hidden lg:block lg:[transform:perspective(1000px)_translateZ(-40px)_translateX(20px)_translateY(10px)_rotateY(-5deg)]"
                            />

                            {/* Main Dashboard Card */}
                            <div
                                className="relative z-10 rounded-2xl sm:rounded-[30px] lg:rounded-[40px] p-5 sm:p-6 md:p-8 lg:p-10 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-[rgba(11,17,33,0.7)] backdrop-blur-[20px] border border-white/[0.08] lg:[transform:perspective(1000px)_rotateY(-5deg)_rotateX(2deg)]"
                            >
                                {/* Glow Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC857]/5 blur-3xl" />

                                {/* Notch */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/10 rounded-full" />

                                {/* Header */}
                                <div className="flex justify-between items-start mb-10 mt-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Shield className="w-4 h-4 text-[#FFC857]" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC857]">
                                                RBI REGULATED TERMINAL
                                            </span>
                                        </div>
                                        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                                            Live Estimator
                                        </h2>
                                    </div>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md hidden sm:block">
                                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                                            ACTIVE_TX
                                        </span>
                                    </div>
                                </div>

                                {/* Main Limit Section */}
                                <div className="mb-8">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-1">
                                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                                            Eligibility Limit
                                        </span>
                                        <span className="text-2xl lg:text-3xl font-bold text-white font-mono tracking-tighter tabular-nums">
                                            {formatCurrency(amount)}
                                        </span>
                                    </div>

                                    {/* Eligibility Slider */}
                                    <Slider
                                        min={100000}
                                        max={5000000}
                                        step={10000}
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="h-10"
                                    />

                                    <div className="flex justify-between mt-2">
                                        <span className="text-[9px] font-mono text-slate-600">0.00</span>
                                        <span className="text-[9px] font-mono text-slate-600">MAX_CAP</span>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                                    {/* Interest Rate */}
                                    <div className="space-y-2 group">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Interest Rate
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl lg:text-2xl font-bold text-white font-mono tabular-nums">{rate.toFixed(1)}</span>
                                            <span className="text-[#FFC857] font-bold">%</span>
                                        </div>
                                        <Slider
                                            min={8}
                                            max={24}
                                            step={0.1}
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                            className="py-2"
                                        />
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-50 bg-gradient-to-r from-[#FFC857] to-transparent" />
                                    </div>

                                    {/* Tenure */}
                                    <div className="space-y-2 group">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Term Tenure
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl lg:text-2xl font-bold text-white font-mono tabular-nums">{tenure}</span>
                                            <span className="text-[#FFC857] font-bold text-sm">MO</span>
                                        </div>
                                        <Slider
                                            min={12}
                                            max={84}
                                            step={6}
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="py-2"
                                        />
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-50 bg-gradient-to-r from-[#FFC857] to-transparent" />
                                    </div>

                                    {/* EMI Card */}
                                    <div className="sm:col-span-2 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner mt-2">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            Monthly EMI Projection
                                        </div>
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-[#FFC857] font-mono tracking-tighter tabular-nums">
                                                {formatCurrency(emi)}
                                            </span>
                                            <LineChart className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                                        </div>
                                    </div>
                                </div>

                                {/* View Schedule Button */}
                                <button
                                    onClick={() => setIsScheduleOpen(true)}
                                    className="w-full mt-6 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm font-bold text-white transition-all group focus:outline-none focus:ring-2 focus:ring-[#FFC857]/50"
                                >
                                    <CalendarClock className="w-4 h-4 text-[#FFC857] group-hover:scale-110 transition-transform" />
                                    <span>View Amortization Schedule</span>
                                </button>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center hidden sm:flex">
                                            <TrendingUp className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-[9px] font-mono text-slate-500 uppercase leading-tight">
                                            Calculations are estimates<br />Actual rates may vary
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
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 z-20 px-4 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)] hidden md:block"
                            >
                                <div className="text-[9px] font-mono text-slate-400 mb-1 leading-none text-right">TRENDING</div>
                                <div className="flex items-center gap-1 justify-end">
                                    <div className="text-xl font-bold text-white font-mono">
                                        {rate.toFixed(1)}%
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Live Offers Badge */}
                            <div className="absolute -bottom-4 -left-4 z-20 px-5 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)] hidden md:block">
                                <div className="text-[9px] font-mono text-slate-400 mb-1">LIVE_OFFERS</div>
                                <div className="text-2xl font-bold text-white">
                                    06<span className="text-xs text-emerald-400 ml-1">↑</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Schedule Modal */}
            <Modal 
                isOpen={isScheduleOpen} 
                onClose={() => setIsScheduleOpen(false)} 
                title="Amortization Schedule"
                className="!max-w-4xl !bg-[#050A18] dark" 
            >
                <div className="space-y-4 max-h-[75vh] overflow-y-auto w-full px-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0F172A] p-5 rounded-2xl sticky top-0 z-10 shadow-xl border border-white/5 gap-4">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest mb-1">Loan Amount</p>
                            <p className="font-bold text-xl text-[#FFC857] font-mono tracking-tight">{formatCurrency(amount)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                            <div className="sm:text-right">
                                <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest mb-1">Total Interest</p>
                                <p className="font-bold text-xl text-white font-mono tracking-tight">
                                    {formatCurrency((emi * tenure) - amount)}
                                </p>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 bg-[#FFC857] text-[#050A18] px-6 py-2.5 rounded-xl text-xs font-black hover:scale-105 transition-all shadow-lg shadow-[#FFC857]/20 ml-auto sm:ml-0"
                            >
                                <Download className="w-4 h-4" />
                                DOWNLOAD PDF
                            </button>
                        </div>
                    </div>

                    <div className="border border-white/5 rounded-2xl overflow-hidden shadow-2xl bg-black/40">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
                                <thead className="bg-[#050A18] text-white/70 border-b border-white/5">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-4 font-mono text-[10px] uppercase tracking-widest">Month</th>
                                        <th className="px-3 sm:px-6 py-4 font-mono text-[10px] uppercase tracking-widest">Principal</th>
                                        <th className="px-3 sm:px-6 py-4 font-mono text-[10px] uppercase tracking-widest">Interest</th>
                                        <th className="px-3 sm:px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {generateSchedule().map((row) => (
                                        <tr key={row.month} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-3 sm:px-6 py-4 font-bold text-slate-400 font-mono">{row.month}</td>
                                            <td className="px-3 sm:px-6 py-4 font-mono text-emerald-400/80">₹{Math.round(row.principal).toLocaleString("en-IN")}</td>
                                            <td className="px-3 sm:px-6 py-4 font-mono text-orange-400/80">₹{Math.round(row.interest).toLocaleString("en-IN")}</td>
                                            <td className="px-3 sm:px-6 py-4 font-mono text-white text-right font-bold group-hover:text-[#FFC857]">₹{Math.round(row.closing).toLocaleString("en-IN")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
};
