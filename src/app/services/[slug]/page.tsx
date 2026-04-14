import { Navbar, Footer, Section, SectionHeader } from '@/components/layout';
import { notFound } from 'next/navigation';
import { 
    User, 
    Briefcase, 
    Home, 
    ShieldCheck, 
    ChevronRight, 
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const services = {
    'personal-loan': {
        title: 'Personal Loan',
        description: 'Instant credit for your personal needs with minimal documentation.',
        icon: User,
        features: [
            'Interest rates starting from 10.5%',
            'Disbursal within 24-48 hours',
            'No collateral required',
            'Flexible tenure up to 5 years'
        ],
        longDescription: 'At KBD Credit Solutions, we specialize in high-speed personal loans for professionals. Whether it is for a medical emergency, wedding, or home renovation, our digital onboarding ensures you get the funds when you need them most.'
    },
    'business-loan': {
        title: 'Business Loan',
        description: 'Scalable financing for MSMEs and startups to fuel growth.',
        icon: Briefcase,
        features: [
            'Collateral-free up to ₹5 Crores',
            'GST-based lending models',
            'Working capital & term loans',
            'Special schemes for women entrepreneurs'
        ],
        longDescription: 'Fuel your business growth with our strategic business loan solutions. We help MSMEs navigate the complex lending landscape by providing access to collateral-free schemes and cash-flow based financing.'
    },
    'home-loan': {
        title: 'Home Loan',
        description: 'Turning your dream of homeownership into reality with the best rates.',
        icon: Home,
        features: [
            'Balance transfer at lower rates',
            'Top-up loan facilities',
            'Guidance on CIBIL repair for approval',
            'Tax benefits under Section 24 & 80C'
        ],
        longDescription: 'Your dream home shouldn\'t be a financial burden. We compare offers from 20+ top banks to find the lowest ROI and most favorable terms for your home purchase or balance transfer.'
    },
    'cibil-repair': {
        title: 'CIBIL Repair',
        description: 'Strategic guidance to improve your credit score and financial health.',
        icon: ShieldCheck,
        features: [
            'Detailed credit report analysis',
            'Settlement vs. Closure advice',
            'Dispute resolution assistance',
            'Roadmap to 750+ score'
        ],
        longDescription: 'A low credit score isn\'t a permanent stain. Our credit repair experts provide a data-driven roadmap to clear disputes, settle old debts, and build a robust credit profile that banks respect.'
    }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services[params.slug as keyof typeof services];

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <>
            <Navbar />
            <main className="pt-24 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#050A18] py-20 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full -translate-y-1/2" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8">
                                <Icon className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                                {service.title} <br className="hidden md:block" /> 
                                <span className="text-accent">Solutions</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                {service.description}
                            </p>
                            <Link 
                                href="/estimator"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-accent/20"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <Section background="white">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose KBD?</h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                {service.longDescription}
                            </p>
                            <div className="space-y-4">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-accent" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                               <Icon className="w-48 h-48" />
                           </div>
                           <h3 className="text-2xl font-bold mb-6 text-gray-900">How it Works</h3>
                           <div className="space-y-8 relative z-10">
                               {[
                                   { step: '01', title: 'Estimation', desc: 'Use our deep-tech estimator to check eligibility.' },
                                   { step: '02', title: 'Match', desc: 'Our algorithm finds the best bank partners for you.' },
                                   { step: '03', title: 'Process', desc: 'Dedicated case manager handles your file.' }
                               ].map((item, i) => (
                                   <div key={i} className="flex gap-4">
                                       <span className="text-accent font-mono font-bold text-xl">{item.step}</span>
                                       <div>
                                           <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                           <p className="text-sm text-gray-600">{item.desc}</p>
                                       </div>
                                   </div>
                               ))}
                           </div>
                        </div>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
