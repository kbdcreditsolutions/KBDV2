'use client';

import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


const blogPosts = [
    {
        id: 'understanding-personal-loan-eligibility',
        title: 'Understanding Personal Loan Eligibility in 2025',
        excerpt: 'Learn about the key factors banks consider when evaluating your personal loan application, from credit score to income stability.',
        category: 'Guides',
        date: '2025-02-10',
        readTime: '5 min read',
        featured: true,
    },
    {
        id: 'home-loan-vs-lap',
        title: 'Home Loan vs Loan Against Property: Which is Right for You?',
        excerpt: 'A comprehensive comparison of home loans and loans against property to help you make the best financial decision.',
        category: 'Comparison',
        date: '2025-02-05',
        readTime: '7 min read',
        featured: true,
    },
    {
        id: 'improve-cibil-score',
        title: '10 Proven Ways to Improve Your CIBIL Score Fast',
        excerpt: 'Boost your credit score with these actionable tips that can help you qualify for better loan terms and lower interest rates.',
        category: 'Tips',
        date: '2025-01-28',
        readTime: '6 min read',
        featured: false,
    },
    {
        id: 'rbi-repo-rate-impact',
        title: 'How RBI Repo Rate Changes Affect Your EMI',
        excerpt: 'Understand the relationship between RBI monetary policy and your loan EMIs, and what the latest rate decisions mean for borrowers.',
        category: 'News',
        date: '2025-01-20',
        readTime: '4 min read',
        featured: false,
    },
    {
        id: 'business-loan-documentation',
        title: 'Complete Guide to Business Loan Documentation',
        excerpt: 'Everything you need to prepare before applying for a business loan — from financial statements to business plans.',
        category: 'Guides',
        date: '2025-01-15',
        readTime: '8 min read',
        featured: false,
    },
    {
        id: 'digital-lending-trends',
        title: 'Digital Lending Trends Reshaping India in 2025',
        excerpt: 'From AI-powered credit scoring to instant disbursal, discover how technology is transforming the Indian lending landscape.',
        category: 'Industry',
        date: '2025-01-10',
        readTime: '5 min read',
        featured: false,
    },
];

const categoryColors: Record<string, string> = {
    Guides: 'bg-blue-100 text-blue-700',
    Comparison: 'bg-emerald-100 text-emerald-700',
    Tips: 'bg-amber-100 text-amber-700',
    News: 'bg-rose-100 text-rose-700',
    Industry: 'bg-violet-100 text-violet-700',
};

export default function BlogPage() {
    const featured = blogPosts.filter((p) => p.featured);
    const regular = blogPosts.filter((p) => !p.featured);

    return (
        <main>
            {/* Hero */}
            <section className="bg-primary pt-32 pb-16 text-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            KBD Credit <span className="text-accent">Blog</span>
                        </h1>
                        <p className="mt-4 text-lg text-white/70 max-w-xl">
                            Expert insights on loans, credit scores, financial planning, and the latest trends in India&apos;s lending industry.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts */}
            <Section background="white" size="md">
                <SectionHeader title="Featured Articles" subtitle="Our most popular and insightful reads" />
                <div className="grid gap-8 md:grid-cols-2">
                    {featured.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-accent/30 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors mb-2">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" /> {post.readTime}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                                    Read more <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </Section>

            {/* All Posts */}
            <Section background="surface" size="md">
                <SectionHeader title="All Articles" subtitle="Browse our complete library of financial guides and insights" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {regular.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-accent/30 transition-all cursor-pointer"
                        >
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-3 ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                                {post.category}
                            </span>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-accent transition-colors mb-2 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {post.readTime}
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </Section>

            {/* Newsletter CTA */}
            <Section background="white" size="sm">
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
                    <p className="text-sm text-gray-500 mb-6">Get the latest loan tips and financial insights delivered to your inbox.</p>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        />
                        <button className="px-6 py-3 rounded-xl bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity">
                            Subscribe
                        </button>
                    </div>
                </div>
            </Section>
        </main>
    );
}
