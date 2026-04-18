'use client';

"use client";

import { useState, useEffect } from "react";
import { Navbar, Footer } from '@/components/layout';
import { Slider } from "@/components/ui/slider";
import { Modal } from "@/components/ui/modal";
import { Shield, TrendingUp, CalendarClock, Activity, Home, User, Car, Calculator, Briefcase, Download } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { pdfService } from "@/lib/services/pdf-service";

type LoanType = 'home' | 'personal' | 'vehicle' | 'business';
type TenureType = 'yr' | 'mo';

export default function LoanDashboard() {
    // State
    const [loanType, setLoanType] = useState<LoanType>('home');
    const [amount, setAmount] = useState(5000000); // 50 Lakhs default for Home
    const [rate, setRate] = useState(8.5); // 8.5% default for Home
    const [tenure, setTenure] = useState(20); // 20 Years default for Home
    const [tenureType, setTenureType] = useState<TenureType>('yr');
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Loan Type Change
    const handleLoanTypeChange = (type: LoanType) => {
        setLoanType(type);
        if (type === 'home') {
            setAmount(5000000);
            setRate(8.5);
            setTenure(20);
            setTenureType('yr');
        } else if (type === 'personal') {
            setAmount(500000);
            setRate(10.5);
            setTenure(5);
            setTenureType('yr');
        } else if (type === 'vehicle') {
            setAmount(800000);
            setRate(9.5);
            setTenure(5);
            setTenureType('yr');
        } else if (type === 'business') {
            setAmount(2000000);
            setRate(14);
            setTenure(5);
            setTenureType('yr');
        }
    };

    // Derived values
    const totalMonths = tenureType === 'yr' ? Math.round(tenure * 12) : Math.round(tenure);

    // Constraints setup based on Loan Type
    const constraints = {
        home:     { minAmt: 100000,  maxAmt: 100000000, stepAmt: 100000, minRate: 5,  maxRate: 20, minTenureYr: 1, maxTenureYr: 30, minTenureMo: 12, maxTenureMo: 360 },
        personal: { minAmt: 50000,   maxAmt: 5000000,   stepAmt: 10000,  minRate: 8,  maxRate: 24, minTenureYr: 1, maxTenureYr: 7,  minTenureMo: 12, maxTenureMo: 84  },
        vehicle:  { minAmt: 100000,  maxAmt: 10000000,  stepAmt: 10000,  minRate: 7,  maxRate: 20, minTenureYr: 1, maxTenureYr: 8,  minTenureMo: 12, maxTenureMo: 96  },
        business: { minAmt: 100000,  maxAmt: 20000000,  stepAmt: 50000,  minRate: 12, maxRate: 22, minTenureYr: 1, maxTenureYr: 10, minTenureMo: 12, maxTenureMo: 120 },
    }[loanType];

    const minTenure = tenureType === 'yr' ? constraints.minTenureYr : constraints.minTenureMo;
    const maxTenure = tenureType === 'yr' ? constraints.maxTenureYr : constraints.maxTenureMo;

    // EMI Calculation
    const calculateEMI = () => {
        if (amount === 0 || rate === 0 || totalMonths === 0) return 0;
        const monthlyRate = rate / 12 / 100;
        const emi =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();
    const totalPayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - amount);

    // Amortization Schedule Calculation
    const generateSchedule = () => {
        const schedule = [];
        let balance = amount;
        const monthlyRate = rate / 12 / 100;
        const monthlyEMI = emi;

        for (let i = 1; i <= totalMonths; i++) {
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
        pdfService.generateAmortizationPDF({
            amount,
            rate,
            tenure,
            tenureType,
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

    const formatInputValue = (val: number) =>
        new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
            useGrouping: true
        }).format(val);

    const pieData = [
        { name: 'Principal Amount', value: amount, color: '#334155' },
        { name: 'Total Interest', value: totalInterest, color: '#FFC857' }
    ];

    // Group schedule by year/month for plotting
    const getChartData = () => {
        const schedule = generateSchedule();
        if (totalMonths <= 36) {
            return schedule.map(item => ({
                name: `Mo ${item.month}`,
                Principal: Math.round(item.principal),
                Interest: Math.round(item.interest),
                Balance: Math.round(item.closing)
            }));
        }

        // Group by year
        const yearly = [];
        for (let i = 0; i < schedule.length; i += 12) {
            const yearData = schedule.slice(i, i + 12);
            const yearPrincipal = yearData.reduce((sum, item) => sum + item.principal, 0);
            const yearInterest = yearData.reduce((sum, item) => sum + item.interest, 0);
            const balance = yearData[yearData.length - 1]?.closing || 0;
            yearly.push({
                name: `Yr ${Math.floor(i / 12) + 1}`,
                Principal: Math.round(yearPrincipal),
                Interest: Math.round(yearInterest),
                Balance: Math.round(balance)
            });
        }
        return yearly;
    };

    // Handle inputs carefully
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
        if (!isNaN(val)) setAmount(Math.min(val, constraints.maxAmt));
        else setAmount(0);
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) setRate(val);
    };

    const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) setTenure(val);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050A18] pt-24 pb-20 px-4 font-sans relative overflow-hidden flex flex-col items-center">

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

                {/* Glow Effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FFC857] rounded-full opacity-[0.10] blur-[140px] mix-blend-screen pointer-events-none delay-100 animate-pulse duration-[8000ms]" />

                {/* Content Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-20 mb-12 flex flex-col items-center text-center mt-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm shadow-xl">
                        <Activity className="w-4 h-4 text-[#FFC857]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                            Advanced EMI Estimator
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
                        Estimate <span className="text-[#FFC857]">Calculations</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl px-4">
                        Adjust desired amounts, rates, and terms across Home, Personal, and Vehicle loans to project precise monthly commitments.
                    </p>
                </motion.div>

                {/* EMI Widget - Layered HUD Design */}
                <div className="relative w-full max-w-6xl z-30 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 lg:bg-[rgba(15,23,42,0.85)] lg:backdrop-blur-2xl lg:pl-10 lg:pr-6 lg:py-10">

                        {/* Left: Input Console */}
                        <div className="lg:col-span-7 space-y-8 bg-[rgba(15,23,42,0.85)] lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none border border-white/10 lg:border-none p-6 sm:p-8 lg:p-0 overflow-hidden">
                            {/* Header / Badges */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className="w-4 h-4 text-[#FFC857]" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC857]">
                                            RBI REGULATED TERMINAL
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Segmented Control - Loan Type */}
                            <div className="flex flex-col sm:flex-row p-1 bg-black/40 border border-white/5 rounded-xl gap-1 sm:gap-0">
                                <button
                                    onClick={() => handleLoanTypeChange('home')}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-lg ${loanType === 'home' ? 'bg-[#FFC857] text-[#050A18]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Home className="w-4 h-4" />
                                    Home Loan
                                </button>
                                <button
                                    onClick={() => handleLoanTypeChange('personal')}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-lg ${loanType === 'personal' ? 'bg-[#FFC857] text-[#050A18]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <User className="w-4 h-4" />
                                    Personal Loan
                                </button>
                                <button
                                    onClick={() => handleLoanTypeChange('vehicle')}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-lg ${loanType === 'vehicle' ? 'bg-[#FFC857] text-[#050A18]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Car className="w-4 h-4" />
                                    Car Loan
                                </button>
                                <button
                                    onClick={() => handleLoanTypeChange('business')}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-lg ${loanType === 'business' ? 'bg-[#FFC857] text-[#050A18]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Business Loan
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-10 mt-8">
                                {/* Amount */}
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                        {loanType === 'home' ? 'Home' : loanType === 'personal' ? 'Personal' : loanType === 'vehicle' ? 'Car' : 'Business'} Loan Amount
                                        </label>
                                        <div className="relative w-full sm:w-auto self-start">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-mono text-lg font-bold">₹</span>
                                            <input
                                                type="text"
                                                value={formatInputValue(amount)}
                                                onChange={handleAmountChange}
                                                className="w-full sm:w-56 bg-black/40 border border-white/10 py-3 pl-10 pr-4 text-left text-xl font-bold text-white font-mono focus:outline-none focus:border-[#FFC857]/50 focus:ring-1 focus:ring-[#FFC857]/50"
                                            />
                                        </div>
                                    </div>
                                    <Slider
                                        min={constraints.minAmt}
                                        max={constraints.maxAmt}
                                        step={constraints.stepAmt}
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="py-2"
                                    />
                                    <div className="flex justify-start gap-4 mt-1">
                                        <span className="text-[10px] font-mono text-slate-500">Min: {formatCurrency(constraints.minAmt)}</span>
                                        <span className="text-[10px] font-mono text-slate-500">Max: {formatCurrency(constraints.maxAmt)}</span>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                            Interest Rate (p.a)
                                        </label>
                                        <div className="relative w-full sm:w-auto self-start">
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={rate}
                                                onChange={handleRateChange}
                                                className="w-full sm:w-40 bg-black/40 border border-white/10 py-3 pl-4 pr-8 text-left text-xl font-bold text-white font-mono focus:outline-none focus:border-[#FFC857]/50 focus:ring-1 focus:ring-[#FFC857]/50"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFC857] font-bold text-lg">%</span>
                                        </div>
                                    </div>
                                    <Slider
                                        min={constraints.minRate}
                                        max={constraints.maxRate}
                                        step={0.1}
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="py-2"
                                    />
                                    <div className="flex justify-start gap-4 mt-1">
                                        <span className="text-[10px] font-mono text-slate-500">Min: {constraints.minRate}%</span>
                                        <span className="text-[10px] font-mono text-slate-500">Max: {constraints.maxRate}%</span>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                            Loan Tenure
                                        </label>
                                        <div className="flex gap-4 items-center w-full sm:w-auto justify-start self-start">
                                            <input
                                                type="number"
                                                step="1"
                                                value={tenure}
                                                onChange={handleTenureChange}
                                                className="w-full sm:w-32 bg-black/40 border border-white/10 py-3 px-4 text-left text-xl font-bold text-white font-mono focus:outline-none focus:border-[#FFC857]/50 focus:ring-1 focus:ring-[#FFC857]/50"
                                            />
                                            <div className="flex bg-black/40 border border-white/10 p-1 shrink-0">
                                                <button
                                                    onClick={() => {
                                                        if (tenureType !== 'yr') {
                                                            setTenureType('yr');
                                                            setTenure(Math.max(constraints.minTenureYr, Math.round(tenure / 12)));
                                                        }
                                                    }}
                                                    className={`px-4 py-2 font-mono text-xs font-bold transition-colors ${tenureType === 'yr' ? 'bg-[#FFC857] text-black' : 'text-slate-400 border border-transparent hover:text-white'}`}
                                                >
                                                    Yr
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (tenureType !== 'mo') {
                                                            setTenureType('mo');
                                                            setTenure(Math.min(constraints.maxTenureMo, tenure * 12));
                                                        }
                                                    }}
                                                    className={`px-4 py-2 font-mono text-xs font-bold transition-colors ${tenureType === 'mo' ? 'bg-[#FFC857] text-black' : 'text-slate-400 border border-transparent hover:text-white'}`}
                                                >
                                                    Mo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Slider
                                        min={minTenure}
                                        max={maxTenure}
                                        step={1}
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="py-2"
                                    />
                                    <div className="flex justify-start gap-4 mt-1">
                                        <span className="text-[10px] font-mono text-slate-500">Min: {minTenure} {tenureType === 'yr' ? 'Years' : 'Months'}</span>
                                        <span className="text-[10px] font-mono text-slate-500">Max: {maxTenure} {tenureType === 'yr' ? 'Years' : 'Months'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Output Breakdown (Overlapping Chart) */}
                        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col justify-center">


                            <div className="bg-[rgba(11,17,33,0.95)] p-6 sm:p-8 lg:p-10 relative z-10 w-full mx-auto shadow-2xl">

                                {/* SVG Recharts Pie */}
                                <div className="h-[300px] sm:h-[340px] w-full relative mb-6">
                                    {mounted && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    innerRadius="50%"
                                                    outerRadius="75%"
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    stroke="none"
                                                    animationBegin={0}
                                                    animationDuration={1500}
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value: any) => formatCurrency(Number(value))}
                                                    contentStyle={{ backgroundColor: '#050A18', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                                                    itemStyle={{ color: 'white' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    )}
                                    {/* Center Text inside Donut */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Monthly EMI</span>
                                        <span className="text-lg sm:text-2xl font-bold text-[#FFC857] font-mono tracking-tighter tabular-nums mt-0.5">
                                            {formatCurrency(emi)}
                                        </span>
                                    </div>
                                </div>

                                {/* Details Breakdown */}
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-slate-700 rounded-sm" />
                                            <span className="text-sm font-mono text-slate-400">Principal Amount</span>
                                        </div>
                                        <span className="font-bold text-white font-mono tabular-nums">{formatCurrency(amount)}</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-[#FFC857] rounded-sm" />
                                            <span className="text-sm font-mono text-slate-400">Total Interest</span>
                                        </div>
                                        <span className="font-bold text-white font-mono tabular-nums">{formatCurrency(totalInterest)}</span>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm font-bold uppercase tracking-widest text-[#FFC857]">Total Payment</span>
                                        <span className="font-extrabold text-2xl text-white font-mono tabular-nums text-right break-all ml-4">
                                            {formatCurrency(totalPayment)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsScheduleOpen(true)}
                                    className="w-full mt-10 py-4 rounded-sm border border-white/10 bg-white/5 hover:bg-[#FFC857] hover:text-[#050A18] flex items-center justify-center gap-3 text-sm font-bold text-white transition-all group focus:outline-none"
                                >
                                    <CalendarClock className="w-5 h-5 group-hover:text-[#050A18] transition-colors text-[#FFC857]" />
                                    <span className="uppercase tracking-wider">Amortization Schedule</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Graphical Representation of Schedule */}
                <div className="relative w-full max-w-6xl z-30 mx-auto mt-8">
                    <div className="bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 lg:p-10 relative shadow-2xl overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <Activity className="w-5 h-5 text-[#FFC857]" />
                            <h2 className="text-xl font-bold text-white tracking-tight uppercase font-mono">
                                Amortization Graph
                            </h2>
                        </div>

                        <div className="h-[350px] w-full mt-4">
                            {mounted && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={getChartData()}
                                        margin={{ top: 20, right: 0, left: -20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="rgba(255,255,255,0.3)"
                                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
                                            axisLine={false}
                                            tickLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="rgba(255,255,255,0.3)"
                                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                                        />
                                        <Tooltip
                                            formatter={(value: any, name: any) => [formatCurrency(Number(value)), String(name)]}
                                            contentStyle={{ backgroundColor: '#050A18', borderColor: 'rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace' }}
                                            itemStyle={{ color: 'white', fontWeight: 'bold' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            labelStyle={{ color: '#FFC857', marginBottom: '8px', fontWeight: 'bold' }}
                                        />
                                        <Legend
                                            wrapperStyle={{ paddingTop: '20px', fontFamily: 'monospace', fontSize: '12px' }}
                                            iconType="square"
                                        />
                                        <Bar dataKey="Principal" stackId="a" fill="#334155" animationDuration={1000} />
                                        <Bar dataKey="Interest" stackId="a" fill="#FFC857" animationDuration={1000} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>

                {/* EMI Formula Explanation */}
                <div className="relative w-full max-w-6xl z-30 mx-auto mt-8">
                    <div className="bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">

                        <div className="flex items-center gap-3 mb-8">
                            <Calculator className="w-5 h-5 text-[#FFC857]" />
                            <h2 className="text-xl font-bold text-white tracking-tight uppercase font-mono">
                                How EMI Is Calculated
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                            {/* Formula Block */}
                            <div className="space-y-6">
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    The <span className="text-[#FFC857] font-semibold">Equated Monthly Instalment (EMI)</span> uses
                                    a reducing-balance formula — each payment covers both interest and a portion of the principal,
                                    so the outstanding balance shrinks with every EMI paid.
                                </p>

                                {/* Formula Box */}
                                <div className="bg-black/40 border border-white/10 rounded-lg p-5 font-mono text-center space-y-3">
                                    <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-3">Standard EMI Formula</p>
                                    <div className="text-white text-base sm:text-lg leading-relaxed">
                                        <span className="text-[#FFC857] font-bold">EMI</span>
                                        <span className="text-slate-400"> = </span>
                                        <span className="text-white">P × r × (1 + r)</span>
                                        <sup className="text-[#FFC857]">n</sup>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 text-white text-base sm:text-lg">
                                        <span className="text-slate-400 text-sm">divided by </span>
                                        <span className="text-white">(1 + r)</span>
                                        <sup className="text-[#FFC857]">n</sup>
                                        <span className="text-white"> − 1</span>
                                    </div>
                                </div>

                                {/* Variable Definitions */}
                                <div className="space-y-3">
                                    {[
                                        { symbol: 'P', label: 'Principal', desc: 'The original loan amount borrowed' },
                                        { symbol: 'r', label: 'Monthly Rate', desc: 'Annual interest rate ÷ 12 ÷ 100' },
                                        { symbol: 'n', label: 'Tenor (months)', desc: 'Total number of monthly instalments' },
                                    ].map(({ symbol, label, desc }) => (
                                        <div key={symbol} className="flex items-start gap-4">
                                            <span className="w-8 h-8 flex items-center justify-center bg-[#FFC857]/10 border border-[#FFC857]/20 text-[#FFC857] font-mono font-bold text-sm rounded shrink-0">{symbol}</span>
                                            <div>
                                                <p className="text-white text-sm font-semibold">{label}</p>
                                                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Example + Tips */}
                            <div className="space-y-6">

                                {/* Worked Example with live values */}
                                <div className="bg-black/40 border border-white/10 rounded-lg p-5 space-y-4">
                                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Worked Example — Current Values</p>
                                    <div className="space-y-2 font-mono text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Principal (P)</span>
                                            <span className="text-white tabular-nums">{formatCurrency(amount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Annual Rate</span>
                                            <span className="text-white tabular-nums">{rate}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Monthly Rate (r)</span>
                                            <span className="text-white tabular-nums">{(rate / 12 / 100).toFixed(5)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Tenor (n)</span>
                                            <span className="text-white tabular-nums">{tenureType === 'yr' ? tenure * 12 : tenure} months</span>
                                        </div>
                                        <div className="border-t border-white/10 pt-3 flex justify-between">
                                            <span className="text-[#FFC857] font-bold">Monthly EMI</span>
                                            <span className="text-[#FFC857] font-bold tabular-nums">{formatCurrency(emi)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Tips */}
                                <div className="space-y-3">
                                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Key Factors That Affect Your EMI</p>
                                    {[
                                        { tip: 'Higher principal → Higher EMI', sub: 'Borrow only what you need to keep payments manageable' },
                                        { tip: 'Higher interest rate → Higher EMI', sub: 'Even a 0.5% difference can save lakhs over the tenure' },
                                        { tip: 'Longer tenure → Lower EMI, more total interest', sub: 'Shorter tenure reduces total cost significantly' },
                                    ].map(({ tip, sub }) => (
                                        <div key={tip} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857] mt-2 shrink-0" />
                                            <div>
                                                <p className="text-white text-sm">{tip}</p>
                                                <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secure Badge below widget */}
                <div className="mt-12 flex justify-center w-full z-20">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-sm backdrop-blur-md">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                            Real-time RBI Rates &middot; Secure Terminal
                        </span>
                    </div>
                </div>

                {/* Schedule Modal */}
                <Modal 
                    isOpen={isScheduleOpen} 
                    onClose={() => setIsScheduleOpen(false)} 
                    title="Amortization Schedule"
                    className="max-w-2xl"
                >
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-sm sticky top-0 z-10 shadow-sm border border-gray-200 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Loan Amount</p>
                                <p className="font-bold text-lg text-[#050A18] font-mono tracking-tight">{formatCurrency(amount)}</p>
                            </div>
                            <div className="sm:text-right flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Interest</p>
                                    <p className="font-bold text-lg text-orange-600 font-mono tracking-tight">
                                        {formatCurrency(totalInterest)}
                                    </p>
                                </div>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 bg-[#050A18] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    DOWNLOAD PDF
                                </button>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto w-full max-w-[100vw]">
                                <table className="w-full text-sm text-left whitespace-nowrap min-w-[500px]">
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
                    </div>
                </Modal>

            </main>
            <Footer />
        </>
    );
}
