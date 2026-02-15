import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { LoanComparison } from './loan-comparison';

export const metadata: Metadata = {
    title: 'Compare Loans',
    description: 'Compare personal, home, vehicle, and business loans from top Indian banks. Find the best interest rates and terms.',
};

export default function LoansPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-hero py-16 lg:py-20">
                    <div className="container-wide">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-bold text-white lg:text-4xl">
                                Compare <span className="text-accent">Loan Options</span>
                            </h1>
                            <p className="mt-4 text-lg text-white/70">
                                Find the best loan offers from RBI-regulated banks. Compare interest rates,
                                processing fees, and terms side by side.
                            </p>
                        </div>
                    </div>
                </section>

                <LoanComparison />
            </main>
            <Footer />
        </>
    );
}
