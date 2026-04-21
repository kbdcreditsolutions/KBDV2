"use client";

import { useState } from 'react';
import { Navbar, Footer, Section } from '@/components/layout';
import { Card, CardContent, Button, Badge, Modal } from '@/components/ui';
import { bankPartners, loanTypes } from '@/lib/constants';
import { Building2, CheckCircle, ArrowRight, ExternalLink, ShieldCheck, Filter } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

import Link from 'next/link';

// Extended partner data for the modal
const partnerDetails = {
    hdfc: { features: ['Paperless process', 'Disbursal in 10 seconds', '24x7 support'], processingFee: 'Available on enquiry', rating: 4.8 },
    icici: { features: ['Pre-approved offers', 'Flexible tenure', 'Minimal documentation'], processingFee: 'Starting from ₹999', rating: 4.7 },
    sbi: { features: ['Lowest interest rates', 'No hidden charges', 'Transparent processing'], processingFee: 'Low processing fee', rating: 4.9 },
    axis: { features: ['Quick approval', 'Part-payment facility', 'Competitive rates'], processingFee: '1% of loan amount', rating: 4.6 },
    kotak: { features: ['Instant eligibility check', 'Doorstep service', 'Flexible repayment'], processingFee: 'Variable', rating: 4.5 },
    bajaj: { features: ['Money in bank in 24 hours', 'Collateral free', 'Online account management'], processingFee: 'Upto 2%', rating: 4.7 },
};

export default function PartnersPage() {
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string>('all');

    const handleOpenModal = (id: string) => setSelectedPartner(id);
    const handleCloseModal = () => setSelectedPartner(null);

    const activePartner = selectedPartner ? bankPartners.find(p => p.id === selectedPartner) : null;
    const activeDetails = selectedPartner ? partnerDetails[selectedPartner as keyof typeof partnerDetails] : null;

    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-hero py-16 lg:py-20 border-b border-white/10">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-white lg:text-4xl mb-4">
                            Our Trusted <span className="text-accent">Banking Partners</span>
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            We collaborate with India&apos;s leading banks and NBFCs to bring you the best interest rates
                            and loan offers available in the market.
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <div className="sticky top-20 z-30 bg-primary/80 backdrop-blur-md border-b border-white/5 py-4">
                    <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                            <ShieldCheck className="w-5 h-5 text-accent" />
                            <span>All our partners are RBI Regulated</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-white/50" />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-accent focus:outline-none"
                            >
                                <option value="all" className="bg-primary text-white">All Loan Types</option>
                                {loanTypes.map(type => (
                                    <option key={type.id} value={type.id} className="bg-primary text-white">{type.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <Section background="white">
                    {bankPartners.filter(p => filterType === 'all' || p.tags.includes(filterType as unknown as string)).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bankPartners
                                .filter(p => filterType === 'all' || p.tags.includes(filterType as unknown as string))
                                .map((partner) => (
                                    <Card
                                        key={partner.id}
                                        hover
                                        className="cursor-pointer group border-white/10 bg-white/5 hover:border-accent/30 transition-all"
                                        onClick={() => handleOpenModal(partner.id)}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center p-2 border border-white/10">
                                                    {/* Fallback to icon if logo assumes generic path */}
                                                    <Building2 className="w-8 h-8 text-white/30" />
                                                </div>
                                                <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                                                    RBI Regulated
                                                </Badge>
                                            </div>

                                            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                                {partner.name}
                                            </h3>

                                            <div className="mt-6 flex items-center justify-between text-sm">
                                                <div>
                                                    <p className="text-white/50 mb-1">Interest Rate</p>
                                                    <p className="font-bold text-accent">{formatPercentage(partner.minRate)}+</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white/50 mb-1">Max Tenure</p>
                                                    <p className="font-semibold text-white">{partner.maxTenure} Months</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No partners found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => setFilterType('all')}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </Section>

                {/* Partner Detail Modal */}
                <Modal
                    isOpen={!!selectedPartner}
                    onClose={handleCloseModal}
                    title={activePartner?.name}
                    className="max-w-2xl"
                >
                    {activePartner && activeDetails && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="p-3 bg-white/10 rounded-lg shadow-sm">
                                    <Building2 className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/50">Starting Interest Rate</p>
                                    <p className="text-2xl font-bold text-accent">{formatPercentage(activePartner.minRate)}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-3">Key Features</h4>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {activeDetails.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                                    <p className="text-sm text-white/50 mb-1">Processing Fee</p>
                                    <p className="font-medium text-white">{activeDetails.processingFee}</p>
                                </div>
                                <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                                    <p className="text-sm text-white/50 mb-1">Customer Rating</p>
                                    <p className="font-medium flex items-center gap-1 text-white">
                                        {activeDetails.rating} <span className="text-yellow-400">★</span>
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Link href={`/estimator?bank=${activePartner.id}`} className="flex-1">
                                    <Button variant="gold" className="w-full">Check Eligibility</Button>
                                </Link>
                                <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/10" rightIcon={<ExternalLink className="w-4 h-4" />}>
                                    Visit Website
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </main>
            <Footer />
        </>
    );
}
