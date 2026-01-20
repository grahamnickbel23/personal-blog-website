import React from 'react';

const ProjectSkeleton = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-8 max-w-5xl mx-auto bg-slate-950 animate-pulse">
            {/* Back Button Skeleton */}
            <div className="flex items-center gap-2 mb-8">
                <div className="w-5 h-5 bg-slate-800 rounded"></div>
                <div className="w-32 h-5 bg-slate-800 rounded"></div>
            </div>

            <div className="space-y-12">
                {/* Header Section */}
                <div className="border-b border-slate-800 pb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-8 bg-slate-800 rounded-full"></div>
                            <div className="w-32 h-6 bg-slate-800 rounded"></div>
                        </div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-12 md:h-16 w-3/4 bg-slate-800 rounded-lg mb-6"></div>

                    {/* Tech Tags Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-8 bg-slate-800 rounded-md"></div>
                        ))}
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-nowrap gap-3 md:gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none w-32 h-12 bg-slate-800 rounded-lg"></div>
                        <div className="flex-1 md:flex-none w-32 h-12 bg-slate-800 rounded-lg"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-2 space-y-8">
                        {/* Overview Skeleton */}
                        <div>
                            <div className="w-32 h-8 bg-slate-800 rounded mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-800 rounded w-full"></div>
                                <div className="h-4 bg-slate-800 rounded w-full"></div>
                                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                            </div>
                        </div>

                        {/* Key Features Skeleton */}
                        <div className="mt-8 p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                            <div className="w-40 h-6 bg-slate-800 rounded mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-slate-800 shrink-0"></div>
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Implementation Details Header Skeleton */}
                        <div className="mt-12">
                            <div className="w-48 h-8 bg-slate-800 rounded mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-800 rounded w-full"></div>
                                <div className="h-4 bg-slate-800 rounded w-11/12"></div>
                                <div className="h-4 bg-slate-800 rounded w-4/5"></div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-8">
                        {/* Stats Skeleton */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="w-32 h-6 bg-slate-800 rounded mb-8"></div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                                        <div className="w-16 h-4 bg-slate-800 rounded"></div>
                                        <div className="w-20 h-4 bg-slate-800 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image/Decoration Skeleton */}
                        <div className="hidden md:flex h-64 bg-slate-900 rounded-2xl border border-slate-800 items-center justify-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
