import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

const BlogList = () => {
    const { portfolioData } = usePortfolio();
    const blogs = portfolioData?.blogs || [];

    // Group blogs by date (Month, Year)
    const groupedBlogs = blogs.reduce((acc, blog) => {
        if (!acc[blog.date]) {
            acc[blog.date] = [];
        }
        acc[blog.date].push(blog);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-48 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 pb-2 leading-tight"
                >
                    My Blogs
                </motion.h1>

                {Object.entries(groupedBlogs).map(([date, blogs], index) => (
                    <motion.div
                        key={date}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-semibold text-slate-400 mb-8 border-b border-slate-800 pb-2">{date}</h2>
                        <div className="grid gap-8">
                            {blogs.map((blog) => {
                                const image = blog.image;

                                return (
                                    <Link to={`/blog/${blog.id}`} key={blog.id} className="group">
                                        <article className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                                            <div className="flex flex-col md:flex-row">
                                                {image && (
                                                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                                        <img
                                                            src={image}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}
                                                <div className={`p-6 ${image ? 'md:w-2/3' : 'w-full'} flex flex-col justify-between`}>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                                                            {blog.title}
                                                        </h3>
                                                        <p className="text-slate-400 line-clamp-2 mb-4">
                                                            {blog.summary}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center text-emerald-400 text-sm font-medium">
                                                        Read Post <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
