'use client';

import * as React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Section } from '@/components/layout';
import { Card, CardContent, Button, Input, Select } from '@/components/ui';
import { siteConfig } from '@/lib/constants';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const LazyMap = dynamic(() => import('@/components/ui/lazy-map'), {
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
    ssr: false
});

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Spam check
        const honeypot = (e.currentTarget as HTMLFormElement)['website-url'].value;
        if (honeypot) {
            // Silently fail for bots
            return;
        }

        setIsLoading(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <>
            <Navbar />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-hero py-16 lg:py-20">
                    <div className="container-default">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-bold text-white lg:text-4xl">
                                Get in <span className="text-accent">Touch</span>
                            </h1>
                            <p className="mt-4 text-lg text-white/70">
                                Have questions about loans or need guidance? Our team is here to help
                                you find the best financial solution.
                            </p>
                        </div>
                    </div>
                </section>

                <Section background="surface" size="md">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card variant="default">
                                <CardContent>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                        Quick Contact
                                    </h2>

                                    <div className="space-y-4">
                                        <a
                                            href={`tel:${siteConfig.phone}`}
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-accent transition-colors">
                                                    Call Us
                                                </p>
                                                <p className="text-sm text-gray-500">{siteConfig.phone}</p>
                                            </div>
                                        </a>

                                        <a
                                            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                                                    WhatsApp
                                                </p>
                                                <p className="text-sm text-gray-500">{siteConfig.whatsapp}</p>
                                            </div>
                                        </a>

                                        <a
                                            href={`mailto:${siteConfig.email}`}
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    Email
                                                </p>
                                                <p className="text-sm text-gray-500">{siteConfig.email}</p>
                                            </div>
                                        </a>

                                        <div className="flex items-start gap-4 p-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Office</p>
                                                <p className="text-sm text-gray-500">{siteConfig.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="surface">
                                <CardContent>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="w-5 h-5 text-accent" />
                                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                    <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                                        <p className="text-sm text-primary font-medium">
                                            ⚡ We typically respond within 1 business day
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card variant="default">
                                <CardContent className="p-8">
                                    {isSubmitted ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                Message Sent!
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Thank you for contacting us. Our team will get back to you within 24 hours.
                                            </p>
                                            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                                Send us a Message
                                            </h2>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <Input
                                                        label="Full Name"
                                                        placeholder="Enter your name"
                                                        required
                                                    />
                                                    <Input
                                                        label="Phone Number"
                                                        type="tel"
                                                        placeholder="+91 XXXXX XXXXX"
                                                        required
                                                    />
                                                </div>
                                                <Input
                                                    label="Email Address"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                                <Select
                                                    label="What can we help you with?"
                                                    placeholder="Select a topic"
                                                    options={[
                                                        { value: 'loan-query', label: 'Loan Related Query' },
                                                        { value: 'application-status', label: 'Application Status' },
                                                        { value: 'partnership', label: 'Partnership Inquiry' },
                                                        { value: 'feedback', label: 'Feedback' },
                                                        { value: 'other', label: 'Other' },
                                                    ]}
                                                />
                                                <div>
                                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                                        Your Message
                                                    </label>
                                                    <textarea
                                                        className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent hover:border-gray-400"
                                                        placeholder="Tell us how we can help you..."
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-full md:w-auto"
                                                    isLoading={isLoading}
                                                    leftIcon={<Send className="w-4 h-4" />}
                                                >
                                                    Send Message
                                                </Button>
                                            </form>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Section>

                {/* Map */}
                <section className="h-[400px] w-full bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-500">
                    <LazyMap
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995701775!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709664555000!5m2!1sen!2sin"
                        title="KBD Credit Solutions Office"
                        className="w-full h-full"
                    />
                </section>

            </main>
            <Footer />
        </>
    );
}
