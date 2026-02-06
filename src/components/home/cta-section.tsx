'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
    return (
        <section className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent/50 rounded-full blur-3xl" />
            </div>

            <div className="container-default relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white lg:text-4xl xl:text-5xl">
                        Ready to Find Your{' '}
                        <span className="text-accent">Perfect Loan?</span>
                    </h2>
                    <p className="mt-6 text-lg text-white/70 leading-relaxed">
                        Use our free loan estimator to check your eligibility and compare
                        offers from multiple banks in just 2 minutes.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link href="/estimator">
                            <Button
                                variant="primary"
                                size="xl"
                                leftIcon={<Calculator className="h-5 w-5" />}
                                rightIcon={<ArrowRight className="h-5 w-5" />}
                            >
                                Start Free Loan Estimator
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline-light" size="xl">
                                Talk to an Advisor
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-white/50">
                        No impact on your credit score • Takes only 2 minutes
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
