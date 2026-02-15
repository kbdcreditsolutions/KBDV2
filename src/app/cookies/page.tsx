import type { Metadata } from 'next';
import { Navbar, Footer, Section } from '@/components/layout';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Cookie Usage Policy for KBD Credit Solutions',
};

export default function CookiePolicyPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <section className="bg-gray-50 py-12">
                    <div className="container-md text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
                        <p className="text-gray-600 mt-2">Effective Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </section>
                <Section background="white">
                    <div className="container-md prose prose-blue max-w-4xl mx-auto">
                        <h3>1. What Are Cookies</h3>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>

                        <h3>2. How We Use Cookies</h3>
                        <p>
                            We use cookies for the following purposes:
                        </p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> strictly necessary for the operation of our website.</li>
                            <li><strong>Analytical/Performance Cookies:</strong> allow us to recognize and count the number of visitors and to see how visitors move around our website.</li>
                            <li><strong>Functionality Cookies:</strong> used to recognize you when you return to our website.</li>
                        </ul>

                        <h3>3. Managing Cookies</h3>
                        <p>
                            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
                        </p>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
