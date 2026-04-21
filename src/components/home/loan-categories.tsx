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
    'from-primary/5 to-primary/10',
    'from-accent/5 to-accent/10',
    'from-primary/5 to-primary/10',
    'from-accent/5 to-accent/10',
];

const iconColors = [
    'bg-primary text-accent',
    'bg-accent text-primary',
    'bg-primary text-accent',
    'bg-accent text-primary',
];

const accentColors = [
    'text-accent',
    'text-accent-dark',
    'text-accent',
    'text-accent-dark',
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
                                <div className={`relative group h-full rounded-2xl bg-gradient-to-br ${cardGradients[index]} border border-primary/10 hover:border-accent/30 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                                    
                                    {/* Highlight badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${accentColors[index]} bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm`}>
                                            {loan.highlight}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl ${iconColors[index]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-primary mb-2">
                                        {loan.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-primary/60 leading-relaxed mb-6">
                                        {loan.description}
                                    </p>

                                    {/* Amount / Highlight */}
                                    {loan.maxAmount > 0 ? (
                                        <div className="flex items-baseline gap-1 mb-5">
                                            <span className="text-xs text-primary/40 uppercase tracking-wide">Up to</span>
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
                                    <div className="flex items-center gap-2 text-sm font-semibold text-primary/40 group-hover:text-primary transition-colors">
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
