import type { Metadata } from 'next';
import { Navbar, Footer, Section } from '@/components/layout';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Disclaimer for KBD Credit Solutions',
};

export default function DisclaimerPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <section className="bg-gray-50 py-12">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
                        <p className="text-gray-600 mt-2">Important Disclosures</p>
                    </div>
                </section>
                <Section background="white">
                    <div className="container-md prose prose-blue max-w-4xl mx-auto">
                        <h3>1. General Disclaimer</h3>
                        <p>
                            The information provided on KBD Credit Solutions is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>

                        <h3>2. Financial Disclaimer</h3>
                        <p>
                            KBD Credit Solutions is not a lender or financial institution. We simply connect borrowers with potential lenders. We do not charge any fees to customers for this service. All loan terms, approvals, and rates are decided by the respective banks and NBFCs based on their internal policies.
                        </p>
                        <p>
                            We strongly advise you to read the terms and conditions of the loan agreement carefully before signing. We are not responsible for any financial loss or damage incurred by you.
                        </p>

                        <h3>3. Professional Advice</h3>
                        <p>
                            The site cannot and does not contain legal, tax, or financial advice. The legal, tax, and financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                        </p>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
