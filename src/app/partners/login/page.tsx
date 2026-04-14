'use client';

import { useState } from 'react';
import { Section } from '@/components/layout';
import { Shield, ChevronRight, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PartnerLoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login and redirect to dashboard
        setTimeout(() => {
            window.location.href = '/partners/dashboard';
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#050A18] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            KBD <span className="text-accent">CONNECT</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Partner Portal</h1>
                    <p className="text-slate-400 text-sm">Secure access for authorized connectors and consultants.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">
                                Connector Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">
                                    Access Pin/Password
                                </label>
                                <button type="button" className="text-[10px] uppercase font-bold text-accent hover:underline">
                                    Forgot?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
                                <input 
                                    type="password" 
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-accent text-primary font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group mt-4 shadow-xl shadow-accent/20"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Enter Dashboard</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Footer */}
                <div className="mt-10 text-center">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        By logging in, you agree to the KBD Partner Terms. <br />
                        Need access? <Link href="/partners" className="text-accent font-bold">Apply to become a Partner</Link>
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
