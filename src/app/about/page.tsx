import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { Section, SectionHeader } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { Shield, Target, Eye, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about KBD Credit Solutions - your trusted fintech partner for loan comparison and financial guidance.',
};

const values = [
    {
        icon: Shield,
        title: 'Trust & Transparency',
        description: 'We partner only with RBI-regulated banks and display all fees upfront. No hidden charges, ever.',
    },
    {
        icon: Target,
        title: 'Customer First',
        description: 'Every decision we make is guided by what\'s best for our customers\' financial wellbeing.',
    },
    {
        icon: Eye,
        title: 'Clarity',
        description: 'We simplify complex financial products so you can make informed decisions confidently.',
    },
    {
        icon: Users,
        title: 'Accessibility',
        description: 'Quality financial guidance should be available to everyone, regardless of background.',
    },
];

const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '15+', label: 'Bank Partners' },
    { value: '₹500Cr+', label: 'Loans Facilitated' },
    { value: '4.9/5', label: 'Customer Rating' },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-hero py-16 lg:py-24">
                    <div className="container-default text-center">
                        <h1 className="text-3xl font-bold text-white lg:text-5xl">
                            About <span className="text-accent">KBD Credit Solutions</span>
                        </h1>
                        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
                            We&apos;re on a mission to democratize access to financial products
                            by making loan comparison simple, transparent, and stress-free.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="bg-white border-b">
                    <div className="container-default py-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story */}
                <Section background="white" size="md">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    KBD Credit Solutions was founded with a simple observation: getting a loan
                                    in India is unnecessarily complicated. Customers spend hours visiting banks,
                                    comparing rates, and navigating paperwork.
                                </p>
                                <p>
                                    We built KBD to change that. Our platform brings together offers from
                                    15+ RBI-regulated banks, allowing you to compare interest rates, tenures,
                                    and terms in one place. No more branch visits. No more guesswork.
                                </p>
                                <p>
                                    Today, we&apos;ve helped over 10,000 customers find their perfect loan match,
                                    facilitating over ₹500 crores in loan disbursements. But we&apos;re just getting started.
                                </p>
                            </div>
                        </div>
                        <div className="bg-surface-200 rounded-2xl p-8 lg:p-12">
                            <blockquote className="text-xl font-medium text-gray-900 italic">
                                &quot;To empower individuals by simplifying financial access and enabling
                                transparent decision-making.&quot;
                            </blockquote>
                            <p className="mt-4 text-gray-500">— Our Mission</p>
                        </div>
                    </div>
                </Section>

                {/* Testimonials */}
                <Section background="surface" size="md">
                    <SectionHeader
                        title="What Our Customers Say"
                        subtitle="Join thousands of satisfied customers who found their perfect loan"
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Priya Sharma',
                                location: 'Mumbai',
                                role: 'Software Engineer',
                                content: 'KBD Credit Solutions made my home loan process incredibly smooth. The comparison tool helped me save 0.5% on interest rate!',
                                image: '/testimonials/1.jpg'
                            },
                            {
                                name: 'Rajesh Kumar',
                                location: 'Delhi',
                                role: 'Business Owner',
                                content: 'As a business owner, getting a loan can be tough. The team guided me through the documentation and I got funded in 4 days.',
                                image: '/testimonials/2.jpg'
                            },
                            {
                                name: 'Anita Desai',
                                location: 'Bangalore',
                                role: 'Doctor',
                                content: 'Transparency was my biggest concern. KBD listed all charges upfront, and there were no surprises during disbursement.',
                                image: '/testimonials/3.jpg'
                            },
                        ].map((testimonial, i) => (
                            <Card key={i} className="h-full">
                                <CardContent className="p-8">
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="text-yellow-400">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Leadership */}
                <Section background="surface" size="md">
                    <SectionHeader
                        title="Meet Our Leadership"
                        subtitle="The visionaries behind KBD Credit Solutions"
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Kishore BD', role: 'Founder & CEO', image: '/team/founder.jpg' },
                            { name: 'Aishwarya P', role: 'Chief Operating Officer', image: '/team/coo.jpg' },
                            { name: 'Rahul Sharma', role: 'Head of Technology', image: '/team/cto.jpg' },
                        ].map((leader) => (
                            <Card key={leader.name} className="text-center overflow-hidden group">
                                <div className="h-64 bg-gray-200 w-full relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                        <Users className="w-16 h-16 opacity-50" />
                                    </div>
                                    {/* <Image src={leader.image} alt={leader.name} fill className="object-cover" /> */}
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                                    <p className="text-accent font-medium">{leader.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Presence */}
                <Section background="white" size="md">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Presence</h2>
                        <p className="text-gray-600">Serving customers across major Indian cities</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Chandigarh'].map((city) => (
                            <div key={city} className="p-4 rounded-lg bg-gray-50 text-center hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                                <span className="font-semibold">{city}</span>
                            </div>
                        ))}
                    </div>
                </Section>


                {/* Values */}
                <Section background="surface" size="md">
                    <SectionHeader
                        title="Our Values"
                        subtitle="The principles that guide everything we do"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <Card key={value.title} variant="default" className="text-center">
                                <CardContent>
                                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-7 h-7 text-accent" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-sm text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Compliance */}
                <Section background="white" size="md">
                    <div className="max-w-3xl mx-auto text-center">
                        <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Compliance & Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Your data security is our top priority. We use bank-grade encryption
                            and comply with all regulatory requirements. We never share your personal
                            information without explicit consent.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-4 py-2 bg-surface-200 rounded-lg text-sm text-gray-600">
                                🔒 256-bit SSL Encryption
                            </div>
                            <div className="px-4 py-2 bg-surface-200 rounded-lg text-sm text-gray-600">
                                ✓ RBI Regulated Partners Only
                            </div>
                            <div className="px-4 py-2 bg-surface-200 rounded-lg text-sm text-gray-600">
                                🛡️ GDPR Compliant
                            </div>
                        </div>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
