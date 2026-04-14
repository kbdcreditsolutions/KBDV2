import * as React from 'react';
import { Section, SectionHeader } from '@/components/layout';
import { Navbar, Footer } from '@/components/layout';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { blogIconMap } from '@/lib/blog-icons';

const categoryColors: Record<string, string> = {
    'Tech & Finance': 'bg-blue-100 text-blue-700',
    'CIBIL & Credit': 'bg-rose-100 text-rose-700',
    'Legal & Credit': 'bg-amber-100 text-amber-700',
    'Personal Loans': 'bg-emerald-100 text-emerald-700',
    'Wealth Management': 'bg-violet-100 text-violet-700',
    'Freelancer Economy': 'bg-cyan-100 text-cyan-700',
    'Home Loans': 'bg-indigo-100 text-indigo-700',
    'Business Loans': 'bg-orange-100 text-orange-700',
    'Partner Program': 'bg-emerald-100 text-emerald-700',
};

export default function BlogPage() {
    return (
        <>
            <Navbar />
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
                                    cat === 'All' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50'
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
                                        className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                                                {post.category}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors mb-3 leading-tight min-h-[3rem]">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
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
