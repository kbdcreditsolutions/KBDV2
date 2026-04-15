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
                <p className="text-center text-xs text-gray-400 mb-10 uppercase tracking-[0.2em] font-medium">
                    Partnered with India&apos;s leading banks
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
                    {bankLogos.map((bank) => (
                        <div
                            key={bank.name}
                            className="opacity-100 hover:scale-105 transition-all duration-300 cursor-default px-4"
                            title={bank.name}
                        >
                            <Image
                                src={bank.file}
                                alt={bank.name}
                                width={120}
                                height={48}
                                className="h-10 md:h-12 w-auto object-contain"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
