import type { Metadata } from 'next';
import { Navbar, Footer, Section } from '@/components/layout';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms and Conditions for KBD Credit Solutions',
};

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <section className="bg-gray-50 py-12">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                        <p className="text-gray-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </section>
                <Section background="white">
                    <div className="container-md prose prose-blue max-w-4xl mx-auto">
                        <h3>1. Agreement to Terms</h3>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and KBD Credit Solutions ("we", "us", or "our"), concerning your access to and use of our website.
                        </p>

                        <h3>2. Services Provided</h3>
                        <p>
                            KBD Credit Solutions acts as a facilitator connecting users with potential lenders. We are not a lender and do not make credit decisions. All loan approvals are at the sole discretion of our partner banks and NBFCs.
                        </p>

                        <h3>3. User Representations</h3>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
                        </p>

                        <h3>5. Governing Law</h3>
                        <p>
                            These Terms shall be governed by and defined following the laws of India. KBD Credit Solutions and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
