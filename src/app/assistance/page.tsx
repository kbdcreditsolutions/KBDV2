"use client";

import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Card, CardContent, Button, Accordion, AccordionItem, Timeline, TimelineItem } from '@/components/ui';
import { CheckCircle2, FileText, Clock, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const requiredDocuments = [
    { id: 'id_proof', label: 'Identity Proof (Aadhar/PAN/Passport)' },
    { id: 'address_proof', label: 'Address Proof (Utility Bill/Rent Agreement)' },
    { id: 'income_proof', label: 'Income Proof (Salary Slips/ITR)' },
    { id: 'bank_statement', label: 'Bank Statements (Last 6 months)' },
    { id: 'photos', label: 'Passport Size Photographs' },
    { id: 'processing_fee', label: 'Processing Fee Cheque' },
];

const faqs = [
    {
        id: 'q1',
        question: 'What is the minimum credit score required?',
        answer: 'Most banks require a minimum credit score of 700-750 for personal loans. However, some NBFCs may consider applicants with lower scores (650+) at higher interest rates.'
    },
    {
        id: 'q2',
        question: 'How long does the loan approval process take?',
        answer: 'For pre-approved offers, disbursement can happen instantly or within 24 hours. For regular applications, it typically takes 2-5 working days depending on document verification.'
    },
    {
        id: 'q3',
        question: 'Can I prepay my loan before the tenure ends?',
        answer: 'Yes, most banks allow part-payment or foreclosure after a lock-in period (usually 6-12 months). Foreclosure charges may apply ranging from 0% to 4% of the outstanding principal.'
    },
    {
        id: 'q4',
        question: 'Is collateral required for personal loans?',
        answer: 'No, personal loans are unsecured loans, meaning you do not need to pledge any asset or collateral like gold or property to avail them.'
    },
];

export default function AssistancePage() {
    const [checkedDocs, setCheckedDocs] = useState<string[]>([]);

    const toggleDoc = (id: string) => {
        setCheckedDocs(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-primary/5 py-16">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-white lg:text-4xl mb-4">
                            Loan <span className="text-accent">Assistance Center</span>
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Everything you need to know about the loan application process, documentation, and common queries.
                        </p>
                    </div>
                </section>

                <div className="container-wide py-12 grid lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-12">
                        {/* Process Timeline */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Clock className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl font-bold text-white">Application Timeline</h2>
                            </div>
                            <Card className="border-white/10 shadow-md bg-white/5 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <Timeline>
                                        <TimelineItem
                                            title="Application Submission"
                                            description="Fill out the online form with your personal and financial details."
                                            isCompleted={true}
                                        />
                                        <TimelineItem
                                            title="Document Verification"
                                            description="Bank representative verifies your documents (Identity, Address, Income)."
                                        />
                                        <TimelineItem
                                            title="Credit Assessment"
                                            description="Bank evaluates your credit score and repayment capacity."
                                        />
                                        <TimelineItem
                                            title="Loan Approval"
                                            description="Sanction letter issued with approved loan amount and interest rate."
                                        />
                                        <TimelineItem
                                            title="Disbursement"
                                            description="Loan amount credited to your bank account."
                                            isLast={true}
                                        />
                                    </Timeline>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Document Checklist */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <FileText className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl font-bold text-white">Document Checklist</h2>
                            </div>
                            <Card className="border-white/10 shadow-md bg-white/5 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <p className="text-white/50 mb-6">Keep these documents handy for a faster approval process.</p>
                                    <div className="space-y-3">
                                        {requiredDocuments.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${checkedDocs.includes(doc.id)
                                                    ? 'bg-accent/10 border-accent/30'
                                                    : 'hover:bg-white/5 border-white/10'
                                                    }`}
                                                onClick={() => toggleDoc(doc.id)}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${checkedDocs.includes(doc.id)
                                                    ? 'bg-accent border-accent text-primary'
                                                    : 'border-white/20 bg-white/5'
                                                    }`}>
                                                    {checkedDocs.includes(doc.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                </div>
                                                <span className={checkedDocs.includes(doc.id) ? 'text-white font-medium' : 'text-white/60'}>
                                                    {doc.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-between items-center text-sm text-white/50">
                                        <span>{checkedDocs.length} of {requiredDocuments.length} collected</span>
                                        <Button variant="ghost" size="sm" onClick={() => setCheckedDocs([])} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                            Reset
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-12">
                        {/* FAQ */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <HelpCircle className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl font-bold text-white">Common Questions</h2>
                            </div>
                            <Card className="border-white/10 shadow-md bg-white/5 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <Accordion type="single" defaultValue="q1">
                                        {faqs.map((faq) => (
                                            <AccordionItem
                                                key={faq.id}
                                                value={faq.id}
                                                trigger={faq.question}
                                            >
                                                {faq.answer}
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </section>

                        {/* CTA Box */}
                        <section>
                            <Card className="bg-gradient-hero text-white border-none shadow-lg overflow-hidden relative">
                                {/* Abstract Pattern */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <CardContent className="p-8 relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                            <MessageSquare className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold">Need Expert Advice?</h3>
                                    </div>
                                    <p className="text-white/80 mb-6">
                                        Our financial advisors are here to help you choose the right loan product for your needs.
                                        Get guidance on documents, eligibility, and hidden charges.
                                    </p>
                                    <div className="flex bg-white/10 rounded-lg p-1">
                                        <Link href="/contact" className="flex-1">
                                            <Button variant="gold" className="w-full justify-center">
                                                Schedule Call
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
