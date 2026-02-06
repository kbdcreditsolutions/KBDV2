'use client';

import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { processSteps } from '@/lib/constants';
import { Search, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
    Search,
    Sparkles,
    CheckCircle,
};

export const HowItWorks: React.FC = () => {
    return (
        <Section background="white" size="md">
            <SectionHeader
                title="How It Works"
                subtitle="Get your loan approved in three simple steps with our streamlined process"
            />

            <div className="grid gap-8 md:grid-cols-3">
                {processSteps.map((step, index) => {
                    const Icon = iconMap[step.icon] || Search;

                    return (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < processSteps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
                            )}

                            <div className="flex flex-col items-center text-center">
                                {/* Step Number */}
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                        <Icon className="w-10 h-10 text-accent" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center text-sm font-bold">
                                        {step.step}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};
