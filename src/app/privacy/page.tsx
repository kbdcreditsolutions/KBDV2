import type { Metadata } from 'next';
import { Navbar, Footer, Section } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for KBD Credit Solutions',
};

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <section className="bg-gray-50 py-12">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                        <p className="text-gray-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </section>
                <Section background="white">
                    <div className="container-md prose prose-blue max-w-4xl mx-auto">
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to KBD Credit Solutions. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h3>2. Data We Collect</h3>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Financial Data:</strong> includes bank account and payment card details (if applicable).</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>

                        <h3>3. How We Use Your Data</h3>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul>
                            <li>To process your loan application and share it with our partner banks.</li>
                            <li>To manage our relationship with you.</li>
                            <li>To improve our website, products/services, marketing or customer relationships.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>

                        <h3>5. Contact Us</h3>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: privacy@kbdcredit.com.
                        </p>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
