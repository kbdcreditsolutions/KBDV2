'use client';

import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { 
    Users, 
    CreditCard, 
    TrendingUp, 
    PlusCircle, 
    Search, 
    Filter,
    ChevronRight,
    LayoutDashboard,
    Briefcase,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function PartnerDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const { data, error } = await supabase
                    .from('leads')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                setLeads(data || []);
            } catch (err) {
                console.error("Error fetching leads:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLeads();
    }, []);

    const stats = [
        { label: 'Total Leads', value: leads.length.toString(), icon: Users, color: 'text-blue-500' },
        { label: 'Active Cases', value: leads.filter(l => l.status === 'New').length.toString(), icon: Briefcase, color: 'text-amber-500' },
        { label: 'Total Volume', value: '₹' + (leads.reduce((acc, l) => acc + (parseFloat(l.amount) || 0), 0) / 100000).toFixed(1) + 'L', icon: TrendingUp, color: 'text-emerald-500' },
        { label: 'Estimated Payout', value: '₹' + (leads.reduce((acc, l) => acc + (parseFloat(l.amount) || 0), 0) * 0.005 / 1000).toFixed(1) + 'K', icon: CreditCard, color: 'text-accent' },
    ];

    return (
        <>
            <div className="min-h-screen bg-[#050A18] text-white">
                <nav className="border-b border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                                <span className="text-primary font-bold text-xs">KBD</span>
                             </div>
                             <span className="font-bold tracking-tighter">PARTNER HUB</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-xs text-slate-400 hidden md:block">Welcome, <span className="text-white font-bold">KBD Master Partner</span></span>
                            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30" />
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto px-6 py-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                            <p className="text-slate-400 text-sm">Real-time performance and lead tracking engine.</p>
                        </div>
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-accent/20">
                            <PlusCircle className="w-5 h-5" />
                            Log New Lead
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">REALTIME</span>
                                </div>
                                <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider font-bold">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Leads Table */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <h2 className="font-bold flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4 text-accent" />
                                Pipeline Overview
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input 
                                        type="text" 
                                        placeholder="Search leads..." 
                                        className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-accent/50"
                                    />
                                </div>
                                <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.01] text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Customer Name</th>
                                        <th className="px-6 py-4">Loan Details</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                                                <p className="text-slate-500 text-sm">Syncing with KBD Connect...</p>
                                            </td>
                                        </tr>
                                    ) : leads.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <p className="text-slate-500 text-sm">No leads discovered yet. Start your engine!</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        leads.map((lead, i) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-sm text-white">{lead.customer_name}</p>
                                                    <p className="text-[10px] text-slate-500">{lead.phone}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-bold text-accent">₹{(parseFloat(lead.amount) || 0).toLocaleString('en-IN')}</p>
                                                    <p className="text-[10px] text-slate-500">{lead.loan_type}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        lead.status === 'New' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                                                    }`}>
                                                        {lead.status === 'New' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-[10px] text-slate-500">
                                                        {new Date(lead.created_at).toLocaleDateString()}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
