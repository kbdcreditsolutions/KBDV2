'use client';

import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { Navbar, Footer } from '@/components/layout';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { blogIconMap } from '@/lib/blog-icons';

const categoryColors: Record<string, string> = {
    'Tech & Finance': 'bg-blue-500/10 text-blue-400',
    'CIBIL & Credit': 'bg-rose-500/10 text-rose-400',
    'Legal & Credit': 'bg-amber-500/10 text-amber-400',
    'Personal Loans': 'bg-emerald-500/10 text-emerald-400',
    'Wealth Management': 'bg-violet-500/10 text-violet-400',
    'Freelancer Economy': 'bg-cyan-500/10 text-cyan-400',
    'Home Loans': 'bg-indigo-500/10 text-indigo-400',
    'Business Loans': 'bg-orange-500/10 text-orange-400',
    'Partner Program': 'bg-emerald-500/10 text-emerald-400',
};

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="bg-gradient-hero pt-32 pb-16 text-white border-b border-white/10">
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

                {/* All Posts */}
                <Section background="surface" size="md">
                    <SectionHeader 
                        title="Latest Insights" 
                        subtitle="Browse our comprehensive library of 15 financial guides and strategic research." 
                    />
                    
                    {/* Category Filter Placeholder (Simplified for now) */}
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {['All', 'CIBIL', 'Personal', 'Business', 'Housing', 'Partners'].map((cat) => (
                            <button 
                                key={cat}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                    cat === 'All' ? 'bg-accent text-primary shadow-lg' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map((post, i) => {
                            const Icon = blogIconMap[post.icon] || Clock;
                            return (
                                <Link 
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border border-current ${categoryColors[post.category] || 'bg-white/10 text-white/60'}`}>
                                                {post.category}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:bg-accent/10 group-hover:text-accent transition-colors border border-white/5">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-3 leading-tight min-h-[3rem]">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-3 text-xs text-white/30">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {post.readTime}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.article>
                                </Link>
                            );
                        })}
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
