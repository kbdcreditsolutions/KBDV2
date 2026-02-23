"use client";

import { useState } from "react";
import { Navbar, Footer } from '@/components/layout';
import { Slider } from "@/components/ui/slider";
import { Modal } from "@/components/ui/modal";
import { Shield, TrendingUp, LineChart, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoanDashboard() {
    // State
    const [amount, setAmount] = useState(1500000); // 15 Lakhs default
    const [rate, setRate] = useState(10.5); // 10.5% default
    const [tenure, setTenure] = useState(60); // 60 Months default
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

    // Amortization Schedule Calculation
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

    // Formatters
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050A18] pt-24 pb-20 px-4 flex items-center justify-center font-sans overflow-hidden relative">

                {/* --- Background Effects from Home --- */}
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
                <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FFC857] rounded-full opacity-[0.15] blur-[140px] mix-blend-screen pointer-events-none" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full opacity-[0.15] blur-[140px] mix-blend-screen pointer-events-none" />


                {/* --- 3D Dashboard Card Container --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full max-w-[540px]"
                >
                    {/* Stacked Card Background (Depth Effect) */}
                    <div
                        className="absolute inset-0 rounded-[40px] z-0 bg-[rgba(11,17,33,0.4)] backdrop-blur-[10px] border border-white/[0.08] transform-none lg:[transform:perspective(1000px)_translateZ(-40px)_translateX(20px)_translateY(10px)_rotateY(-5deg)]"
                    />

                    {/* Main Dashboard Card (Glassmorphism & Tilt) */}
                    <div
                        className="relative z-10 rounded-[40px] p-8 lg:p-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-[rgba(11,17,33,0.7)] backdrop-blur-[20px] border border-white/[0.08] transform-none lg:[transform:perspective(1000px)_rotateY(-5deg)_rotateX(2deg)]"
                    >
                        {/* Glow Accent on Card */}
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
                                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                                    Loan Dashboard
                                </h1>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                                <span className="text-[10px] font-mono font-bold text-emerald-400">
                                    ACTIVE_TX
                                </span>
                            </div>
                        </div>

                        {/* Main Limit Section */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                                    Eligibility Limit
                                </span>
                                <span className="text-2xl lg:text-3xl font-bold text-white font-mono tracking-tighter">
                                    {formatCurrency(amount)}
                                </span>
                            </div>

                            {/* Eligibility Slider (Using custom Slider) */}
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
                        <div className="grid grid-cols-2 gap-5">
                            {/* Interest Rate */}
                            <div className="space-y-2 group">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                    Interest Rate
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-white font-mono">{rate}</span>
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
                                    <span className="text-2xl font-bold text-white font-mono">{tenure}</span>
                                    <span className="text-[#FFC857] font-bold">MO</span>
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
                            <div className="col-span-2 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                    Monthly EMI Projection
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-3xl font-extrabold text-[#FFC857] font-mono tracking-tighter">
                                        {formatCurrency(emi)}
                                    </span>
                                    <LineChart className="w-6 h-6 text-slate-600" />
                                </div>
                            </div>
                        </div>

                        {/* View Schedule Button */}
                        <button
                            onClick={() => setIsScheduleOpen(true)}
                            className="w-full mt-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm font-bold text-white transition-all group"
                        >
                            <CalendarClock className="w-4 h-4 text-[#FFC857] group-hover:scale-110 transition-transform" />
                            View Amortization Schedule
                        </button>

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

                    {/* Floating Live Offers Badge */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-4 -left-4 z-20 px-5 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)] hidden lg:block"
                    >
                        <div className="text-[9px] font-mono text-slate-400 mb-1 leading-none">LIVE_OFFERS</div>
                        <div className="flex items-center gap-1">
                            <div className="text-2xl font-bold text-white">
                                06<span className="text-xs text-emerald-400 ml-1">↑</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Schedule Modal */}
                <Modal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} title="Amortization Schedule">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <div>
                                <p className="text-sm text-gray-500">Loan Amount</p>
                                <p className="font-bold text-lg text-gray-900">{formatCurrency(amount)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Interest</p>
                                <p className="font-bold text-lg text-[#FFC857]">
                                    {formatCurrency((emi * tenure) - amount)}
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#050A18] text-white">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Month</th>
                                        <th className="px-4 py-3 font-medium">Principal</th>
                                        <th className="px-4 py-3 font-medium">Interest</th>
                                        <th className="px-4 py-3 font-medium">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {generateSchedule().map((row) => (
                                        <tr key={row.month} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{row.month}</td>
                                            <td className="px-4 py-3 text-emerald-600">₹{Math.round(row.principal).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-orange-600">₹{Math.round(row.interest).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-gray-500">₹{Math.round(row.closing).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>

            </main>
            <Footer />
        </>
    );
}
