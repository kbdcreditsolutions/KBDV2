'use client';

import * as React from 'react';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { blogPosts } from '@/lib/blog-data';
import { blogIconMap } from '@/lib/blog-icons';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const LatestInsights: React.FC = () => {
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <Section background="white" size="md">
            <SectionHeader
                title="Latest Insights"
                subtitle="Expert analysis and practical guides to help you make smarter financial decisions"
            />

            <div className="grid gap-8 md:grid-cols-3">
                {latestPosts.map((post, index) => {
                    const Icon = blogIconMap[post.icon] || Clock;
                    return (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card variant="default" hover className="h-full group cursor-pointer">
                                    <CardContent className="flex flex-col h-full">
                                        {/* Category & Icon */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                                                {post.category}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors mb-3 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-500 line-clamp-3 flex-1 mb-4">
                                            {post.excerpt}
                                        </p>

                                        {/* Read more */}
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                            <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* View All CTA */}
            <div className="text-center mt-10">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent/10 text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300"
                >
                    View All Insights
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </Section>
    );
};
