import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectCard from '../ui/ProjectCard';
import { Link } from 'react-router-dom';

const Projects = () => {
    const { portfolioData, loading } = usePortfolio();

    if (loading) return null;

    return (
        <section className="px-4 pb-32">
            <div className="max-w-5xl mx-auto">
                <div className="mb-24 pl-4 border-l-2 border-emerald-500">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                        Selected <span className="text-slate-700">Works</span>
                    </h2>
                    <p className="text-slate-400 mt-2 text-lg">High-impact engineering solution deployed on cloud.</p>
                </div>

                <div className="space-y-32">
                    {(() => {
                        // User requested to show only IDs 0 and 1 on home page
                        const projectsToShow = portfolioData.projects.slice(0, 2);

                        return projectsToShow.map((project, idx) => {
                            // Global index matches the slice index since we start from 0
                            return (
                                <ProjectCard
                                    key={idx}
                                    project={project}
                                    index={idx}
                                    id={`project-${idx}`}
                                />
                            );
                        });
                    })()}
                </div>

                <div className="mt-32 text-center">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 border border-emerald-500/30 rounded-full text-emerald-400 font-bold text-lg hover:bg-emerald-500/10 hover:scale-105 transition-all group"
                    >
                        See All Projects
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;
