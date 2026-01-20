import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, ArrowUp } from 'lucide-react';
import { getBlogById } from '../../api/getPortfolioData.js';
import BlogSkeleton from '../ui/BlogSkeleton';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchBlog = async () => {
            setLoading(true);
            try {
                const data = await getBlogById(id);
                // Normalize date
                const formattedBlog = {
                    ...data,
                    date: new Date(data.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
                    content: data.content || data.main
                };
                setBlog(formattedBlog);

                // Restore scroll position securely
                // LocalStorage is isolated by origin (Same-Origin Policy), so other sites cannot access this.
                const savedPosition = localStorage.getItem(`blog_read_pos_${id}`);
                if (savedPosition) {
                    // Small delay to ensure content renders
                    setTimeout(() => {
                        window.scrollTo({
                            top: parseInt(savedPosition),
                            behavior: 'smooth'
                        });
                    }, 500);
                }
            } catch (error) {
                console.error("Failed to fetch blog:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    // Save scroll position with debounce
    useEffect(() => {
        if (loading || !blog) return;

        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.setItem(`blog_read_pos_${id}`, window.scrollY);
            }, 1000); // Save 1 second after user stops scrolling
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [loading, blog, id]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: `Check out this article: ${blog.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy link: ', err);
            }
        }
    };

    if (loading) {
        return <BlogSkeleton />;
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff1e5] text-slate-900">
                <div className="text-center">
                    <h2 className="text-2xl font-serif mb-4">Post not found</h2>
                    <button onClick={() => navigate('/blog')} className="text-emerald-900 hover:underline">
                        Return to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#fff1e5] text-[#1a1a1a] font-serif pt-32 pb-20 px-6 relative"
        >
            {/* Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-2">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        pathLength="1"
                        className="stroke-slate-300 fill-none"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        pathLength="1"
                        className="stroke-emerald-600 fill-none"
                        strokeWidth="8"
                        style={{ pathLength }}
                    />
                </svg>
                <span className="text-xs font-sans text-slate-500 font-medium tracking-wider">READ</span>
            </div>

            <div className="max-w-3xl mx-auto">
                <Link to="/blog" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-12 transition-colors font-sans text-sm tracking-wide uppercase font-bold">
                    <ArrowLeft size={16} className="mr-2" /> Back to Blog
                </Link>

                <article>
                    <header className="mb-12 border-b border-slate-300 pb-12">
                        <div className="flex items-center gap-4 text-slate-600 font-sans text-sm mb-6">
                            <span className="bg-[#f2dfce] px-3 py-1 rounded-full font-medium text-xs tracking-wider uppercase text-slate-800">Interpretability</span>
                            <span className="flex items-center gap-1 font-medium"><Calendar size={14} /> {blog.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 text-slate-900">
                            {blog.title}
                        </h1>
                    </header>

                    <div
                        className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 
                        prose-p:leading-relaxed prose-p:text-slate-800 prose-p:font-serif
                        prose-a:text-emerald-800 hover:prose-a:text-emerald-900 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-li:text-slate-800"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>

                <div className="mt-20 pt-10 border-t border-slate-300 md:hidden">
                    <button
                        onClick={handleShare}
                        className="w-full bg-emerald-600 text-white font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg shadow-emerald-500/20"
                    >
                        <Share2 size={20} />
                        SHARE ARTICLE
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-40 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-500 transition-colors"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BlogPost;
