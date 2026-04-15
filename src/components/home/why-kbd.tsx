'use client';

import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { Shield, Clock, FileCheck, Headphones, BadgeCheck, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

const bankLogos = [
    { name: 'HDFC Bank', file: '/banks/hdfc.png' },
    { name: 'ICICI Bank', file: '/banks/icici.png' },
    { name: 'SBI', file: '/banks/sbi.png' },
    { name: 'Axis Bank', file: '/banks/axis.png' },
    { name: 'Kotak Mahindra', file: '/banks/kotak.png' },
    { name: 'Bajaj Finserv', file: '/banks/bajaj.png' },
    { name: 'PNB Housing', file: '/banks/pnb.png' },
    { name: 'IDFC First', file: '/banks/idfc.png' },
    { name: 'Tata Capital', file: '/banks/tata.png' },
    { name: 'IndusInd Bank', file: '/banks/indusind.png' },
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
                <p className="text-center text-xs text-gray-400 mb-12 uppercase tracking-[0.2em] font-medium">
                    Partnered with India&apos;s leading banks
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
                    {bankLogos.map((bank) => (
                        <motion.div
                            key={bank.name}
                            whileHover={{ scale: 1.1 }}
                            className="w-full flex items-center justify-center p-4 transition-all duration-300 cursor-default"
                            title={bank.name}
                        >
                            <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
                                <Image
                                    src={bank.file}
                                    alt={bank.name}
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
