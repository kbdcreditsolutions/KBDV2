"use client";

import { useState } from 'react';
import { Section } from '@/components/layout';
import { Card, CardContent, Badge, Button, Switch } from '@/components/ui';
import { bankPartners } from '@/lib/constants';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { ArrowRight, Filter, Clock, Percent, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Mock loan data for comparison
const loanOffers = [
    {
        id: 1,
        bank: 'HDFC Bank',
        loanType: 'Personal Loan',
        interestRate: 10.5,
        maxAmount: 4000000,
        tenure: '12-60 months',
        processingFee: '1%',
        processingTime: '24-48 hours',
        features: ['No collateral', 'Flexi EMI', 'Part prepayment'],
    },
    {
        id: 2,
        bank: 'ICICI Bank',
        loanType: 'Personal Loan',
        interestRate: 10.75,
        maxAmount: 3500000,
        tenure: '12-60 months',
        processingFee: '0.5%',
        processingTime: '24 hours',
        features: ['Instant approval', 'No hidden charges', 'Balance transfer'],
    },
    {
        id: 3,
        bank: 'SBI',
        loanType: 'Personal Loan',
        interestRate: 10.25,
        maxAmount: 5000000,
        tenure: '12-84 months',
        processingFee: '1.5%',
        processingTime: '3-5 days',
        features: ['Lowest rate', 'Doorstep service', 'Special for govt employees'],
    },
    {
        id: 4,
        bank: 'Axis Bank',
        loanType: 'Personal Loan',
        interestRate: 10.49,
        maxAmount: 4000000,
        tenure: '12-60 months',
        processingFee: '1%',
        processingTime: '24-48 hours',
        features: ['Top-up facility', 'Zero foreclosure', 'Flexible tenure'],
    },
    {
        id: 5,
        bank: 'Kotak Mahindra',
        loanType: 'Personal Loan',
        interestRate: 10.99,
        maxAmount: 2500000,
        tenure: '12-48 months',
        processingFee: '1.25%',
        processingTime: '24 hours',
        features: ['Quick disbursal', 'Minimal documentation'],
    },
    {
        id: 6,
        bank: 'Bajaj Finserv',
        loanType: 'Personal Loan',
        interestRate: 11.50,
        maxAmount: 3000000,
        tenure: '12-60 months',
        processingFee: '2%',
        processingTime: 'Instant',
        features: ['Pre-approved offers', 'Online process'],
    },
];

export function LoanComparison() {
    const [smartMatch, setSmartMatch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Filter logic (placeholder for now, just affects sort/display)
    const displayOffers = smartMatch
        ? loanOffers.filter(o => o.interestRate < 10.6)
        : loanOffers;

    const totalPages = Math.ceil(displayOffers.length / itemsPerPage);
    const paginatedOffers = displayOffers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* Filters */}
            <section className="bg-white [[.theme-premium]_&]:bg-surface/90 [[.theme-premium]_&]:backdrop-blur-md [[.theme-premium]_&]:border-white/10 border-b sticky top-16 lg:top-20 z-30 transition-colors">
                <div className="container-wide py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Filter className="h-4 w-4" />
                                <span>Filter by:</span>
                            </div>
                            <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                                <option value="">Loan Type</option>
                                <option value="personal">Personal Loan</option>
                                <option value="home">Home Loan</option>
                                <option value="vehicle">Vehicle Loan</option>
                                <option value="business">Business Loan</option>
                            </select>
                            <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                                <option value="">Amount Range</option>
                                <option value="1-5">₹1L - ₹5L</option>
                                <option value="5-10">₹5L - ₹10L</option>
                                <option value="10-25">₹10L - ₹25L</option>
                                <option value="25+">₹25L+</option>
                            </select>
                            <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                                <option value="">Bank</option>
                                {bankPartners.map((bank) => (
                                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l [[.theme-premium]_&]:border-white/10">
                            <Switch checked={smartMatch} onCheckedChange={setSmartMatch} />
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                smartMatch ? 'text-accent' : 'text-gray-600 [[.theme-premium]_&]:text-white/60'
                            )}>
                                Smart Match
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loan Cards */}
            <Section background="surface" size="md">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-white/60">
                        Showing <span className="font-semibold text-white">{paginatedOffers.length}</span> of {displayOffers.length} loan offers
                    </p>
                    <select className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent">
                        <option value="rate-low">Interest Rate: Low to High</option>
                        <option value="rate-high">Interest Rate: High to Low</option>
                        <option value="amount">Max Amount</option>
                    </select>
                </div>

                <div className="grid gap-6">
                    {paginatedOffers.map((offer) => (
                        <Card key={offer.id} variant="default" hover className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-[1fr,auto] lg:grid-cols-[200px,1fr,auto]">
                                    {/* Bank Info */}
                                    <div className="p-6 bg-white/5 flex flex-col justify-center items-center lg:items-start border-b md:border-b-0 md:border-r border-white/10">
                                        <div className="w-16 h-16 rounded-xl bg-white shadow-subtle flex items-center justify-center mb-3">
                                            <Building2 className="w-8 h-8 text-primary-dark" />
                                        </div>
                                        <h3 className="font-semibold text-white">{offer.bank}</h3>
                                        <p className="text-sm text-white/50">{offer.loanType}</p>
                                    </div>

                                    {/* Details */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-1 text-white/50 text-xs mb-1">
                                                    <Percent className="h-3 w-3" />
                                                    Interest Rate
                                                </div>
                                                <p className="text-xl font-bold text-accent">{formatPercentage(offer.interestRate)}</p>
                                            </div>
                                            <div>
                                                <p className="text-white/50 text-xs mb-1">Max Amount</p>
                                                <p className="text-lg font-semibold">{formatCurrency(offer.maxAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-white/50 text-xs mb-1">Tenure</p>
                                                <p className="text-lg font-semibold">{offer.tenure}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1 text-white/50 text-xs mb-1">
                                                    <Clock className="h-3 w-3" />
                                                    Processing
                                                </div>
                                                <p className="text-lg font-semibold">{offer.processingTime}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {offer.features.map((feature) => (
                                                <Badge key={feature} variant="outline" size="sm">
                                                    {feature}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10 bg-white/5">
                                        <Link href={`/estimator?bank=${offer.bank.toLowerCase().replace(' ', '-')}`}>
                                            <Button variant="gold" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                                Apply Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        <Button
                            variant="outline-light"
                            size="icon"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "gold" : "outline-light"}
                                className="w-10 h-10 p-0"
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline-light"
                            size="icon"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </Section>
        </>
    );
}
