'use client';

import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { Shield, Clock, FileCheck, Headphones, BadgeCheck, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
    {
        icon: Shield,
        title: 'RBI Regulated Partners',
        description: 'All our bank partners are regulated by RBI, ensuring your funds are safe.',
    },
    {
        icon: Clock,
        title: 'Quick Processing',
        description: 'Get loan approval within 48 hours with minimal documentation.',
    },
    {
        icon: FileCheck,
        title: 'Transparent Terms',
        description: 'No hidden charges. All fees and interest rates clearly displayed upfront.',
    },
    {
        icon: Headphones,
        title: 'Dedicated Support',
        description: '24/7 customer support to guide you through the entire loan process.',
    },
    {
        icon: BadgeCheck,
        title: 'Best Rates Guaranteed',
        description: 'We compare across 15+ banks to find you the lowest interest rates.',
    },
    {
        icon: PiggyBank,
        title: 'Zero Processing Fee',
        description: 'No additional charges from KBD. Pay only the bank\'s standard fees.',
    },
];

export const WhyKBD: React.FC = () => {
    return (
        <Section background="white" size="md">
            <SectionHeader
                title="Why Choose KBD?"
                subtitle="We're committed to making loan comparison simple, transparent, and stress-free"
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4 p-4"
                    >
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                <benefit.icon className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bank Partner Logos */}
            <div className="mt-16 pt-10 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400 mb-8 uppercase tracking-[0.2em] font-medium">
                    Partnered with India&apos;s leading banks
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
                    {[
                        { name: 'HDFC', sub: 'BANK', color: '#004B87' },
                        { name: 'ICICI', sub: 'BANK', color: '#F58220' },
                        { name: 'SBI', sub: '', color: '#1A4789' },
                        { name: 'Axis', sub: 'BANK', color: '#97144D' },
                        { name: 'Kotak', sub: '', color: '#ED1C24' },
                        { name: 'Bajaj', sub: 'FINSERV', color: '#00529B' },
                        { name: 'PNB', sub: 'HOUSING', color: '#A51C30' },
                        { name: 'IDFC', sub: 'FIRST', color: '#9C1D26' },
                        { name: 'Tata', sub: 'CAPITAL', color: '#486AAE' },
                        { name: 'IndusInd', sub: 'BANK', color: '#174A7C' },
                    ].map((bank) => (
                        <div
                            key={bank.name}
                            className="flex items-baseline gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default select-none"
                        >
                            <span
                                className="text-xl font-extrabold tracking-tight"
                                style={{ color: bank.color }}
                            >
                                {bank.name}
                            </span>
                            {bank.sub && (
                                <span
                                    className="text-[9px] font-bold uppercase tracking-widest"
                                    style={{ color: bank.color }}
                                >
                                    {bank.sub}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
