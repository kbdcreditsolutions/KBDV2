'use client';

import * as React from 'react';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout';
import { Card, CardContent, Button } from '@/components/ui';
import { loanTypes } from '@/lib/constants';
import { User, Home, ShieldCheck, Briefcase, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
    User,
    Home,
    ShieldCheck,
    Briefcase,
};

export const LoanCategories: React.FC = () => {
    return (
        <Section background="surface" size="md">
            <SectionHeader
                title="Explore Loan Options"
                subtitle="Find the perfect loan type for your needs with competitive rates from our bank partners"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {loanTypes.map((loan, index) => {
                    const Icon = iconMap[loan.icon] || User;

                    return (
                        <motion.div
                            key={loan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/services/${loan.id}`}>
                                <Card
                                    variant="default"
                                    hover
                                    className="h-full group cursor-pointer"
                                >
                                    <CardContent className="h-full flex flex-col">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                                            <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                                        </div>

                                        {/* Info */}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {loan.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 flex-1">
                                            {loan.description}
                                        </p>

                                        {/* Amount Range */}
                                        <div className="text-sm mt-auto pt-4 border-t border-dashed border-gray-100">
                                            <span className="text-gray-400">Up to </span>
                                            <span className="font-semibold text-primary">
                                                {formatCurrency(loan.maxAmount)}
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <div className="mt-4 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>View Options</span>
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
                <Link href="/loans">
                    <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                        View All Loan Types
                    </Button>
                </Link>
            </div>
        </Section>
    );
};
