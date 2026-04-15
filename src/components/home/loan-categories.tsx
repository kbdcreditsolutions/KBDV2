'use client';

import * as React from 'react';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout';
import { loanTypes } from '@/lib/constants';
import { User, Home, ShieldCheck, Briefcase, ArrowRight, TrendingUp, Percent } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
    User,
    Home,
    ShieldCheck,
    Briefcase,
};

const cardGradients = [
    'from-blue-500/10 to-cyan-500/5',
    'from-amber-500/10 to-orange-500/5',
    'from-emerald-500/10 to-teal-500/5',
    'from-violet-500/10 to-purple-500/5',
];

const iconColors = [
    'bg-blue-500/10 text-blue-600',
    'bg-amber-500/10 text-amber-600',
    'bg-emerald-500/10 text-emerald-600',
    'bg-violet-500/10 text-violet-600',
];

const accentColors = [
    'text-blue-600',
    'text-amber-600',
    'text-emerald-600',
    'text-violet-600',
];

export const LoanCategories: React.FC = () => {
    return (
        <Section background="surface" size="md">
            <SectionHeader
                title="Explore Loan Options"
                subtitle="Competitive rates from India's top banks — choose the loan that fits your ambition"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {loanTypes.map((loan, index) => {
                    const Icon = iconMap[loan.icon] || User;

                    return (
                        <motion.div
                            key={loan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/services/${loan.id}`}>
                                <div className={`relative group h-full rounded-2xl bg-gradient-to-br ${cardGradients[index]} border border-gray-100 hover:border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                                    
                                    {/* Highlight badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${accentColors[index]} bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm`}>
                                            {loan.highlight}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl ${iconColors[index]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {loan.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                        {loan.description}
                                    </p>

                                    {/* Amount / Highlight */}
                                    {loan.maxAmount > 0 ? (
                                        <div className="flex items-baseline gap-1 mb-5">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Up to</span>
                                            <span className={`text-xl font-extrabold ${accentColors[index]}`}>
                                                {formatCurrency(loan.maxAmount)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 mb-5">
                                            <TrendingUp className={`w-4 h-4 ${accentColors[index]}`} />
                                            <span className={`text-base font-bold ${accentColors[index]}`}>
                                                {loan.highlight}
                                            </span>
                                        </div>
                                    )}

                                    {/* CTA Arrow */}
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-gray-900 transition-colors">
                                        <span>Explore</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};
