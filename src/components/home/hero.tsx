'use client';

'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, LineChart, CalendarClock, ShieldCheck, Download } from 'lucide-react';
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
                        {/* Story Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#FFC857]/20 backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857] animate-pulse" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
                                Est. 2023 · Bangalore&apos;s Trusted Credit Partner
                            </span>
                        </motion.div>

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

                        {/* KBD Origin Story Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(255, 200, 87, 0.3) transparent'
                            }}
                        >
                            {/* Gold left accent line */}
                            <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FFC857]/0 via-[#FFC857]/60 to-[#FFC857]/0 rounded-full" />

                            <div className="sticky top-0 bg-[#050A18]/80 backdrop-blur-md py-2 z-10 -mt-2 -mx-1 px-1 border-b border-white/5 mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#FFC857] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FFC857] animate-pulse"></span>
                                    Our Story
                                </h3>
                            </div>

                            <div className="space-y-6 text-sm text-slate-300 leading-relaxed pl-2 pr-2 pb-4">
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Not the First, But Different</h4>
                                    <p>
                                        In a world where financial services are everywhere, being first isn&apos;t always what matters. What truly makes a difference is being better, more human, and more trustworthy. This is the story of how KBD Credit Solutions began, not as the first Direct Sales Associate (DSA) in the market, but with a purpose that set it apart.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">Where It All Started</h4>
                                    <p>
                                        Before KBD Credit Solutions was founded in 2023, two individuals working within the financial ecosystem noticed a recurring pattern. Every day, people approached banks and loan agents with hope - hopes of starting a business, buying a home, or managing urgent financial needs.
                                    </p>
                                    <p className="mt-2">
                                        But many walked away disappointed. Not because they weren&apos;t eligible. Not because opportunities didn&apos;t exist. <span className="text-[#FFC857] font-medium">But because they lacked the right guidance.</span>
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">The Real Problem: Not Rejection, But Direction</h4>
                                    <p>
                                        The founders observed something most people overlooked: Loan rejections were often not about capability, but about misalignment.
                                    </p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                                        <li>The wrong bank was approached</li>
                                        <li>The application wasn&apos;t structured properly</li>
                                        <li>Documentation had gaps</li>
                                        <li>Or no one explained the process clearly</li>
                                    </ul>
                                    <p className="mt-2">
                                        And in many cases, one critical factor stood in the way - CIBIL score issues. For most applicants, a low or impacted CIBIL score felt like a dead end. But the founders saw it differently.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">A Different Approach: Fix Before You Apply</h4>
                                    <p>
                                        Instead of treating rejections as the end of the journey, they asked a simple but powerful question:
                                    </p>
                                    <blockquote className="border-l-2 border-[#FFC857] pl-4 my-3 italic text-white">
                                        &ldquo;What if we could help people become eligible instead?&rdquo;
                                    </blockquote>
                                    <p>
                                        This mindset changed everything. They began helping individuals understand what affects their CIBIL score, identify errors or gaps in their credit profile, take actionable steps to improve their score, and apply strategically, at the right time, to the right lender.
                                    </p>
                                    <p className="mt-2 text-[#FFC857]/90 font-medium">
                                        It wasn&apos;t just about processing loans anymore. It was about preparing people for approval.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">The Birth of KBD Credit Solutions</h4>
                                    <p>
                                        In 2023, this idea transformed into reality with the launch of KBD Credit Solutions. Built on the belief that every rejection has a reason and every reason has a solution, KBD set out to redefine how financial assistance is delivered. Rather than being just another DSA, KBD positioned itself as a financial partner.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">Growing With Purpose</h4>
                                    <p>
                                        Today, KBD Credit Solutions partners with 100+ banks and Non-Banking Financial Companies (NBFCs), offering a wide range of financial products including Personal Loans, Business Loans, Home Loans & Mortgages, and Insurance Solutions.
                                    </p>
                                    <p className="mt-2">
                                        But what truly sets KBD apart is not just access to options. It&apos;s the ability to match the right customer with the right solution.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">More Than Loans: Building Financial Confidence</h4>
                                    <p>
                                        At its core, KBD Credit Solutions is about more than approvals. It&apos;s about educating clients, building financial awareness, improving credit health, and turning uncertainty into confidence.
                                    </p>
                                    <p className="mt-2 text-white italic">
                                        Because sometimes, all someone needs is not just a loan but the right direction to move forward.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-2">Looking Ahead</h4>
                                    <p>
                                        KBD Credit Solutions may not have been the first in the industry, but it continues to strive to be one of the most reliable and customer-focused names in the space. And this is just the beginning.
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-lg font-semibold text-white">
                                        Don&apos;t just apply for a loan.
                                        <br />
                                        <span className="text-[#FFC857]">Apply with the right guidance.</span>
                                    </p>
                                    <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">
                                        KBD Credit Solutions - Empowering your journey, one approval at a time.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

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
                                        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                                            Live Estimator
                                        </h2>
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
                                        </div>
                                        <span className="text-[9px] font-mono text-slate-500 uppercase leading-tight">
                                            Calculations are estimates<br />Actual rates may vary
                                        </span>
                                    </div>
                                    <div className="flex gap-1" />
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
                className="max-w-4xl" // Maintained wider modal for balance visibility
            >
                <div className="space-y-4 max-h-[75vh] overflow-y-auto w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-5 rounded-xl sticky top-0 z-10 shadow-sm border border-gray-100 gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Loan Amount</p>
                            <p className="font-bold text-xl text-[#050A18] font-mono tracking-tight">{formatCurrency(amount)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                            <div className="sm:text-right">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Interest</p>
                                <p className="font-bold text-xl text-orange-600 font-mono tracking-tight">
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

                    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-[#050A18] text-white">
                                    <tr>
                                        <th className="px-4 py-4 font-medium text-xs tracking-wider uppercase text-slate-300">Month</th>
                                        <th className="px-4 py-4 font-medium text-xs tracking-wider uppercase text-slate-300">EMI</th>
                                        <th className="px-4 py-4 font-medium text-xs tracking-wider uppercase text-slate-300">Principal</th>
                                        <th className="px-4 py-4 font-medium text-xs tracking-wider uppercase text-slate-300">Interest</th>
                                        <th className="px-4 py-4 font-medium text-xs tracking-wider uppercase text-slate-300 text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {generateSchedule().map((row) => (
                                        <tr key={row.month} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-4 font-medium text-slate-900 font-mono">{row.month}</td>
                                            <td className="px-4 py-4 font-mono text-blue-600 font-bold">₹{Math.round(row.emi).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-4 font-mono text-emerald-600">₹{Math.round(row.principal).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-4 font-mono text-orange-600">₹{Math.round(row.interest).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-4 font-mono text-slate-600 text-right font-bold">₹{Math.round(row.closing).toLocaleString("en-IN")}</td>
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
