import React from 'react';

const BlogSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#fff1e5] pt-32 pb-20 px-6 animate-pulse font-serif">
            <div className="max-w-3xl mx-auto">
                {/* Back Link Skeleton */}
                <div className="w-32 h-4 bg-slate-300/50 rounded mb-12"></div>

                <article>
                    {/* Header Section */}
                    <div className="mb-12 border-b border-slate-300 pb-12">
                        {/* Meta tags (Category + Date) */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-24 h-6 bg-[#f2dfce] rounded-full"></div>
                            <div className="w-32 h-4 bg-slate-300/50 rounded"></div>
                        </div>

                        {/* Title Skeleton */}
                        <div className="space-y-4 mb-8">
                            <div className="w-full h-12 md:h-16 bg-slate-800/10 rounded-lg"></div>
                            <div className="w-3/4 h-12 md:h-16 bg-slate-800/10 rounded-lg"></div>
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-6">
                        {/* Paragraph 1 */}
                        <div className="space-y-3">
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-11/12 h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                        </div>

                        {/* Image Placeholder */}
                        <div className="w-full h-64 md:h-96 bg-slate-800/5 rounded-xl my-8"></div>

                        {/* Paragraph 2 */}
                        <div className="space-y-3">
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-5/6 h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                        </div>

                        {/* Heading 2 Placeholder */}
                        <div className="w-1/2 h-8 bg-slate-800/20 rounded mt-10 mb-4"></div>

                        {/* Paragraph 3 */}
                        <div className="space-y-3">
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-full h-4 bg-slate-800/10 rounded"></div>
                            <div className="w-4/5 h-4 bg-slate-800/10 rounded"></div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogSkeleton;
