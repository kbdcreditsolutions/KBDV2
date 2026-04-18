'use client';

import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Section } from '@/components/layout';
import { 
    Shield, 
    Lock, 
    Smartphone, 
    User, 
    CreditCard, 
    Calendar,
    ChevronRight,
    Loader2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Download,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '@/components/ui';

import { ReportGenerator } from '@/lib/pdf/report-generator';

// Forms are usually better in separate components, but for coherence we'll keep the logic here
type Step = 'PII' | 'OTP' | 'LOADING' | 'DASHBOARD';

export default function CheckScorePage() {
    const [step, setStep] = useState<Step>('PII');
    const [formData, setFormData] = useState({
        fullName: '',
        pan: '',
        dob: '',
        mobile: '',
        otp: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');
    const [requestId, setRequestId] = useState('');
    const [report, setReport] = useState<any>(null);

    const handleDownload = async () => {
        if (!report) return;
        setIsDownloading(true);
        try {
            const blob = await ReportGenerator.generate({
                fullName: formData.fullName,
                pan: formData.pan,
                dob: formData.dob,
                score: report.score,
                accounts: report.accounts,
                factors: report.factors
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `KBD_Credit_Report_${formData.fullName.replace(/\s+/g, '_')}.pdf`;
            a.click();
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleInitiate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/credit/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to initiate pull');
            
            setRequestId(data.requestId);
            setStep('OTP');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStep('LOADING');

        try {
            // Simulated delay for "Bureau Processing"
            await new Promise(r => setTimeout(r, 2000));

            const res = await fetch('/api/credit/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId,
                    otp: formData.otp,
                    profile: formData
                })
            });
            const data = await res.json();
            
            if (!res.ok) {
                setStep('OTP');
                throw new Error(data.error || 'Verification failed');
            }
            
            setReport(data.report);
            setStep('DASHBOARD');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050A18] pt-24">
                <Section>
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {step === 'PII' && (
                                <motion.div 
                                    key="pii"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-bold tracking-wider uppercase">
                                            <ShieldCheck className="w-4 h-4" />
                                            KBD Credit Intelligence
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-black text-white">Check Your Eligibility Instantly.</h1>
                                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                                            Pull your co-branded credit report from 120+ Banking Partners. 
                                            Zero impact on your credit score. Secured with AES-256 encryption.
                                        </p>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                        
                                        <form onSubmit={handleInitiate} className="grid md:grid-cols-2 gap-6 relative z-10">
                                            <Input 
                                                label="Full Legal Name (As per PAN)"
                                                placeholder="John Doe"
                                                required
                                                value={formData.fullName}
                                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10"
                                                labelClassName="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                                                leftIcon={<User className="w-4 h-4 text-slate-500" />}
                                            />
                                            <Input 
                                                label="PAN Number"
                                                placeholder="ABCDE1234F"
                                                required
                                                maxLength={10}
                                                value={formData.pan}
                                                onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                                                className="bg-white/5 border-white/10 text-white uppercase placeholder:text-slate-600 focus:bg-white/10"
                                                labelClassName="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                                                leftIcon={<CreditCard className="w-4 h-4 text-slate-500" />}
                                            />
                                            <Input 
                                                label="Date of Birth"
                                                type="date"
                                                required
                                                value={formData.dob}
                                                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white focus:bg-white/10 [color-scheme:dark]"
                                                labelClassName="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                                            />
                                            <Input 
                                                label="Mobile Number"
                                                placeholder="98765 43210"
                                                required
                                                type="tel"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10"
                                                labelClassName="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                                                leftIcon={<Smartphone className="w-4 h-4 text-slate-500" />}
                                            />
                                            
                                            <div className="md:col-span-2 py-4">
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <div className="mt-1 w-5 h-5 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                                                        <input type="checkbox" required className="opacity-0 absolute w-5 h-5 cursor-pointer peer" />
                                                        <CheckCircle2 className="w-3 h-3 text-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-xs text-slate-500 leading-relaxed">
                                                        I authorize KBD Credit Solutions to pull my credit information from Experian/CRIF for the purpose of loan processing. I understand this is a soft inquiry and won&apos;t affect my score.
                                                    </span>
                                                </label>
                                            </div>

                                            {error && (
                                                <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {error}
                                                </div>
                                            )}

                                            <Button 
                                                type="submit" 
                                                className="md:col-span-2 h-14 bg-accent text-[#050A18] font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.01] transition-all"
                                                isLoading={isLoading}
                                                rightIcon={<ChevronRight className="w-4 h-4" />}
                                            >
                                                Request Bureau Access
                                            </Button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'OTP' && (
                                <motion.div 
                                    key="otp"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="max-w-md mx-auto space-y-8"
                                >
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                            <Lock className="w-10 h-10 text-accent" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Bureau Verification</h2>
                                        <p className="text-slate-400">
                                            A secure OTP has been sent by the Bureau to your mobile number +91 {formData.mobile.slice(-4).padStart(10, '*')}.
                                        </p>
                                    </div>

                                    <form onSubmit={handleVerify} className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/10 space-y-6">
                                        <Input 
                                            label="6-Digit OTP"
                                            placeholder="••••••"
                                            required
                                            maxLength={6}
                                            value={formData.otp}
                                            onChange={e => setFormData({ ...formData, otp: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white text-center text-3xl font-bold tracking-[0.5em]"
                                        />

                                        {error && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs">
                                                <AlertCircle className="w-3 h-3" />
                                                {error}
                                            </div>
                                        )}

                                        <Button 
                                            type="submit" 
                                            className="w-full h-14 bg-accent text-[#050A18] font-black rounded-2xl"
                                            rightIcon={<ChevronRight className="w-4 h-4" />}
                                        >
                                            Verify & Generate Report
                                        </Button>

                                        <p className="text-center text-slate-600 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-accent transition-colors">
                                            Didn&apos;t receive? Resend in 45s
                                        </p>
                                    </form>
                                </motion.div>
                            )}

                            {step === 'LOADING' && (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 space-y-8"
                                >
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                                        <Shield className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-bold text-white">Validating Identity...</h3>
                                        <p className="text-slate-500 animate-pulse">Communicating with Bureau Servers (Experian/CRIF)</p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'DASHBOARD' && report && (
                                <motion.div 
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Dashboard Header */}
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[2rem]">
                                        <div className="space-y-2 text-center md:text-left">
                                            <h2 className="text-2xl font-bold text-white">Welcome, {formData.fullName.split(' ')[0]}</h2>
                                            <p className="text-slate-500 text-sm">Report generated on {new Date().toLocaleDateString()}</p>
                                        </div>
                                        <Button 
                                            className="bg-white/10 text-white border border-white/10 hover:bg-white/20 px-8" 
                                            leftIcon={<Download className="w-4 h-4" />}
                                            onClick={handleDownload}
                                            isLoading={isDownloading}
                                        >
                                            Download Co-branded PDF
                                        </Button>
                                    </div>

                                    {/* Score Meter & Factors */}
                                    <div className="grid lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 p-10 rounded-[3rem] text-center relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,200,87,0.15),transparent)] pointer-events-none" />
                                            
                                            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Bureau Credit Score</h3>
                                            
                                            <div className="relative inline-block">
                                                <svg className="w-64 h-64 transform -rotate-90">
                                                    <circle 
                                                        cx="128" cy="128" r="110" 
                                                        stroke="currentColor" strokeWidth="12" 
                                                        fill="transparent" className="text-white/5" 
                                                    />
                                                    <motion.circle 
                                                        cx="128" cy="128" r="110" 
                                                        stroke="currentColor" strokeWidth="12" 
                                                        strokeDasharray={2 * Math.PI * 110}
                                                        initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                                                        animate={{ strokeDashoffset: (2 * Math.PI * 110) * (1 - (report.score - 300) / 600) }}
                                                        transition={{ duration: 2, ease: "easeOut" }}
                                                        fill="transparent" className="text-accent" 
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                                    <motion.span 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="text-7xl font-black text-white block"
                                                    >
                                                        {report.score}
                                                    </motion.span>
                                                    <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Excellent Profile</span>
                                                </div>
                                            </div>

                                            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Payment History</span>
                                                    <span className="text-white font-bold text-sm">{report.factors.paymentHistory}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Credit Age</span>
                                                    <span className="text-white font-bold text-sm">{report.factors.creditAge}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Inquiries</span>
                                                    <span className="text-white font-bold text-sm">{report.factors.inquiries}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
                                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-accent" />
                                                    Personalized Offers
                                                </h4>
                                                <div className="space-y-4">
                                                    {[
                                                        { label: 'Unsecured Business Loan', amount: '₹50 Lakhs', rate: '11.5%' },
                                                        { label: 'Home Loan Transfer', amount: 'Best Rate', rate: '8.4%' }
                                                    ].map((offer, idx) => (
                                                        <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                                                            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{offer.label}</div>
                                                            <div className="flex justify-between items-end">
                                                                <div className="text-white font-black text-lg">{offer.amount}</div>
                                                                <div className="text-accent text-sm font-bold">@ {offer.rate}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-accent/5 border border-accent/20 p-6 rounded-[2rem]">
                                                <h4 className="text-accent font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    Security Audit
                                                </h4>
                                                <p className="text-slate-400 text-xs leading-relaxed">
                                                    Your data has been purged from our immediate buffer. The full report is stored using AES-256 military-grade encryption.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account List Summary */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
                                        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                                            <h3 className="text-white font-bold">Credit Line Summary</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                                        <th className="p-6">Lender</th>
                                                        <th className="p-6">Account Type</th>
                                                        <th className="p-6">Limit</th>
                                                        <th className="p-6">Outstanding</th>
                                                        <th className="p-6">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-300">
                                                    {report.accounts.map((acc: any, i: number) => (
                                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01]">
                                                            <td className="p-6 font-bold text-white">{acc.bank}</td>
                                                            <td className="p-6 text-sm">{acc.type}</td>
                                                            <td className="p-6 text-sm">₹{acc.limit.toLocaleString()}</td>
                                                            <td className="p-6 text-sm text-red-400/80 font-mono">₹{acc.outstanding.toLocaleString()}</td>
                                                            <td className="p-6">
                                                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-md tracking-wider">
                                                                    {acc.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
