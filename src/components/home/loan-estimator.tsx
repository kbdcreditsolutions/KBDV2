"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Modal } from "@/components/ui/modal";
import { Shield, TrendingUp, LineChart, CalendarClock, Activity, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export function LoanEstimator() {
    // State
    const [amount, setAmount] = useState(1500000); // 15 Lakhs default
    const [rate, setRate] = useState(10.5); // 10.5% default
    const [tenure, setTenure] = useState(60); // 60 Months default
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "" });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.from('leads').insert([
                {
                    customer_name: formData.name,
                    phone: formData.phone,
                    amount: amount,
                    loan_type: 'Estimator Lead',
                    status: 'New'
                }
            ]);

            if (error) throw error;
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting lead:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full py-24 bg-[#050A18] overflow-hidden flex items-center justify-center font-sans border-y border-white/5">
            {/* --- Background Effects --- */}
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
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FFC857] rounded-full opacity-[0.10] blur-[140px] mix-blend-screen pointer-events-none delay-100 animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full opacity-[0.10] blur-[140px] mix-blend-screen pointer-events-none animate-pulse duration-[10000ms]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center justify-center text-center relative w-full mx-auto">

                    {/* Background Huge Brutalist Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full flex justify-center items-center pointer-events-none z-0"
                    >
                        <h2 className="text-[100px] sm:text-[180px] lg:text-[250px] font-black text-white/[0.02] select-none tracking-tighter whitespace-nowrap">
                            ESTIMATE
                        </h2>
                    </motion.div>

                    {/* Copywriting */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="relative z-20 mb-16 md:mb-20 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-xl shadow-black/20">
                            <Activity className="w-4 h-4 text-[#FFC857]" />
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                                Instant Estimate
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1] max-w-4xl mx-auto drop-shadow-2xl">
                            Design your <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFC857]">perfect loan</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mix-blend-lighten px-4 border-l border-r border-white/10 md:border-transparent">
                            Adjust your desired amount, interest rate, and tenure to instantly preview your monthly commitments and construct your amortization schedule in real-time.
                        </p>
                    </motion.div>

                    {/* The Widget - Centered 100% Stacked */}
                    <div className="w-full flex justify-center perspective-[2000px] relative z-30">
                        {/* --- 3D Dashboard Card Container --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 60, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full max-w-[680px]"
                        >
                            {/* Stacked Card Background (Depth Effect) */}
                            <div
                                className="absolute inset-0 rounded-[30px] lg:rounded-[40px] z-0 bg-white/[0.02] backdrop-blur-[5px] border border-white/[0.05] transform-none lg:[transform:translateZ(-40px)_translateY(20px)_scale(0.95)]"
                            />

                            {/* Main Dashboard Card (Glassmorphism & Depth) */}
                            <div
                                className="relative z-10 rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] bg-[rgba(15,23,42,0.85)] backdrop-blur-[24px] border border-white/[0.1] text-left ring-1 ring-white/10"
                            >
                                {/* Glow Accent on Card */}
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
                                        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                                            Live Estimator
                                        </h3>
                                    </div>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md hidden sm:block">
                                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                                            ACTIVE_TX
                                        </span>
                                    </div>
                                </div>

                                {/* Main Limit Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-end mb-4">
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
                                <div className="grid grid-cols-2 gap-4 lg:gap-5">
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
                                    <div className="col-span-2 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner mt-2">
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

                                {/* Lead Capture Form Integration */}
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    {!isSubmitted ? (
                                        <div className="space-y-4">
                                            <div className="text-center mb-6">
                                                <h4 className="text-lg font-bold text-white mb-2">Unlock Partner Bank Offers</h4>
                                                <p className="text-xs text-slate-400">Our engine matches you with 180+ banks for this exact EMI.</p>
                                            </div>
                                            <form onSubmit={handleSubmit} className="space-y-3">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857]/50 focus:border-[#FFC857]/50 transition-all"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        placeholder="WhatsApp Number"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857]/50 focus:border-[#FFC857]/50 transition-all"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-4 rounded-xl bg-[#FFC857] text-[#050A18] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#FFC857]/20"
                                                >
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-[#050A18]/20 border-t-[#050A18] rounded-full"
                                                        />
                                                    ) : (
                                                        <>
                                                            <Send className="w-4 h-4" />
                                                            <span>Get Approvals Now</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
                                            <p className="text-sm text-slate-400">Our senior advisor will contact you on WhatsApp within 15 minutes.</p>
                                        </motion.div>
                                    )}
                                </div>

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

                            {/* Floating Live Offers Badge */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 z-20 px-4 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),rgba(255,255,255,0.05)] hidden md:block"
                            >
                                <div className="text-[9px] font-mono text-slate-400 mb-1 leading-none text-right">TRENDING</div>
                                <div className="flex items-center gap-1 justify-end">
                                    <div className="text-xl font-bold text-white font-mono">
                                        10.5%
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>

                {/* Schedule Modal */}
                <Modal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} title="Amortization Schedule">
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl sticky top-0 z-10 shadow-sm border border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Loan Amount</p>
                                <p className="font-bold text-lg text-gray-900 font-mono tracking-tight">{formatCurrency(amount)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Interest</p>
                                <p className="font-bold text-lg text-orange-500 font-mono tracking-tight">
                                    {formatCurrency((emi * tenure) - amount)}
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-[#050A18] text-white">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-xs tracking-wider uppercase text-slate-300">Mo</th>
                                        <th className="px-4 py-3 font-medium text-xs tracking-wider uppercase text-slate-300">Principal</th>
                                        <th className="px-4 py-3 font-medium text-xs tracking-wider uppercase text-slate-300">Interest</th>
                                        <th className="px-4 py-3 font-medium text-xs tracking-wider uppercase text-slate-300 text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {generateSchedule().map((row) => (
                                        <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900 font-mono">{row.month}</td>
                                            <td className="px-4 py-3 font-mono text-emerald-600">₹{Math.round(row.principal).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-3 font-mono text-orange-500">₹{Math.round(row.interest).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-3 font-mono text-slate-500 text-right">₹{Math.round(row.closing).toLocaleString("en-IN")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
}
