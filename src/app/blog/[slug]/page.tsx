import { blogPosts } from '@/lib/blog-data';
import { blogIconMap } from '@/lib/blog-icons';
import { Navbar, Footer, Section } from '@/components/layout';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const Icon = blogIconMap[post.icon] || Clock;

    return (
        <>
            <Navbar />
            <main className="pt-24 min-h-screen bg-surface">
                <Section background="surface" size="md">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumbs */}
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Article Header */}
                        <header className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-between py-6 border-y border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">KBD Editorial</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {post.readTime}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </header>

                        {/* Article Content */}
                        <article 
                            className="prose prose-lg prose-slate max-w-none 
                                prose-headings:font-bold prose-headings:text-gray-900 
                                prose-p:text-gray-600 prose-p:leading-relaxed 
                                prose-strong:text-gray-900 prose-strong:font-bold
                                prose-ul:list-disc prose-ol:list-decimal"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Related Insights (Simplified placeholder for now) */}
                        <div className="mt-16 pt-10 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Insights</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {blogPosts
                                    .filter((p) => p.category === post.category && p.slug !== post.slug)
                                    .slice(0, 2)
                                    .map((related) => {
                                        const RelatedIcon = blogIconMap[related.icon] || Clock;
                                        return (
                                            <Link 
                                                key={related.id}
                                                href={`/blog/${related.slug}`}
                                                className="group p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors mb-4">
                                                    <RelatedIcon className="w-5 h-5" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors mb-2 line-clamp-2">
                                                    {related.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-0">
                                                    {related.excerpt}
                                                </p>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
