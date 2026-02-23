import { Navbar, Footer } from '@/components/layout';
import {
    Hero,
    HowItWorks,
    LoanCategories,
    WhyKBD,
    Testimonials,
    CTASection,
} from '@/components/home';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <LoanCategories />
                <WhyKBD />
                <Testimonials />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
