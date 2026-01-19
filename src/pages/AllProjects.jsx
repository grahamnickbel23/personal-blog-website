import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import GridProjectCard from '../components/ui/GridProjectCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const { portfolioData, loading } = usePortfolio();

    if (loading) return <div className="min-h-screen flex items-center justify-center text-emerald-500">Loading...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <div className="mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    All <span className="text-emerald-500">Projects</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl">
                    A comprehensive collection of my work, ranging from web applications to system engineering projects.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, idx) => (
                    <GridProjectCard
                        key={idx}
                        project={project}
                        index={idx}
                        id={`project-${idx}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllProjects;
