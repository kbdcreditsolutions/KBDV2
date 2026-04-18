'use client';

import { useState } from 'react';
import { 
    Shield, 
    ChevronRight, 
    Lock, 
    Mail, 
    ArrowLeft, 
    TrendingUp, 
    Building2, 
    Clock, 
    FileCheck, 
    LayoutDashboard, 
    Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { KBDLogo } from '@/components/ui/kbd-logo';

const benefits = [
    {
        title: "₹1 Lakh+ Potential Payouts",
        description: "High-tier commissions on quality loan referrals.",
        icon: TrendingUp,
    },
    {
        title: "120+ Banking Partners",
        description: "Direct mapping with India's top lending institutions.",
        icon: Building2,
    },
    {
        title: "48-Hour Rapid Approval",
        description: "Our tech-first approach accelerates disbursals.",
        icon: Clock,
    },
    {
        title: "Zero Paperwork Chaos",
        description: "We handle all documentation and bank follow-ups.",
        icon: FileCheck,
    },
    {
        title: "Live Pipeline Tracker",
        description: "Monitor every lead's progress in real-time.",
        icon: LayoutDashboard,
    },
    {
        title: "Direct Expert Support",
        description: "Personal relationship manager for complex cases.",
        icon: Headphones,
    }
];

export default function PartnerLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            window.location.href = '/partners/dashboard';
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#050A18] flex flex-col lg:flex-row overflow-hidden font-manrope">
            {/* Left Side: Benefits Exploration (60%) */}
            <div className="hidden lg:flex lg:w-[60%] relative p-12 flex-col justify-between overflow-hidden">
                {/* Immersive Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,200,87,0.1),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.05),transparent_50%)]" />
                
                {/* Logo & Navigation */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10"
                >
                    <Link href="/" className="inline-flex items-center group">
                        <KBDLogo variant="full" size="lg" theme="light" />
                    </Link>
                </motion.div>

                {/* Benefits Content */}
                <div className="relative z-10 my-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                            Build an Elite <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Referral Engine.</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-lg mb-12">
                            Join Bangalore&apos;s fastest-growing partner network. Empower your clients with the best loan rates while you build a sustainable revenue stream.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-accent/5"
                            >
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <benefit.icon className="w-5 h-5 text-accent" />
                                </div>
                                <h4 className="text-white font-bold mb-1">{benefit.title}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Credits */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold"
                >
                    © 2026 KBD Credit Solutions • Authorized Partners Only
                </motion.div>
            </div>

            {/* Right Side: Login Hub (40%) */}
            <div className="flex-1 bg-[#050A18] lg:bg-white/[0.01] relative flex items-center justify-center p-6 border-l border-white/5">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex items-center gap-2">
                        <KBDLogo variant="full" size="sm" theme="light" />
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full max-w-[440px] relative"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-400 text-sm">Access your Partner Hub to track leads and payouts.</p>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                        {/* Decorative Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[60px] rounded-full pointer-events-none group-focus-within:bg-accent/20 transition-colors duration-700" />
                        
                        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <Input 
                                    label="Connector ID / Email"
                                    type="email"
                                    placeholder="partner@kbd.in"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08]"
                                    leftIcon={<Mail className="w-4 h-4" />}
                                />
                                
                                <Input 
                                    label="Access PIN / Password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus:bg-white/[0.08]"
                                    leftIcon={<Lock className="w-4 h-4" />}
                                />
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                                        <div className="w-2 h-2 rounded-sm bg-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                                    </div>
                                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Remember Me</span>
                                </label>
                                <button type="button" className="text-[11px] text-accent font-bold uppercase tracking-wider hover:underline transition-all">
                                    Forgot Password?
                                </button>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-14 bg-accent text-[#050A18] font-black rounded-2xl shadow-[0_8px_25px_rgba(255,200,87,0.25)] hover:shadow-accent/40 flex items-center justify-center gap-3 text-sm tracking-widest uppercase transition-all hover:scale-[1.01] active:scale-[0.99]"
                                isLoading={isLoading}
                                rightIcon={<ChevronRight className="w-4 h-4" />}
                            >
                                Secure Entry
                            </Button>
                        </form>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm">
                            Don&apos;t have a partner account yet? <br className="md:hidden" />
                            <Link href="/partners" className="text-accent font-black hover:underline ml-1">
                                Apply to Join Network
                            </Link>
                        </p>
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 flex justify-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] group">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Return to HQ
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
