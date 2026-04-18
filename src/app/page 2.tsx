import { Navbar, Footer } from '@/components/layout';
import {
    Hero,
    StatsCounter,
    HowItWorks,
    LoanCategories,
    WhyKBD,
    Testimonials,
    LatestInsights,
    CTASection,
} from '@/components/home';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <StatsCounter />
                <HowItWorks />
                <LoanCategories />
                <WhyKBD />
                <Testimonials />
                <LatestInsights />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
