import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const Skills = () => {
    const { portfolioData, loading } = usePortfolio();

    if (loading) return null;

    return (
        <div className="w-full bg-slate-900/50 border-y border-slate-800 py-6 overflow-hidden mb-32 backdrop-blur-sm">
            <div className="flex whitespace-nowrap relative">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex gap-12 px-6"
                >
                    {[...portfolioData.skills, ...portfolioData.skills].map((skill, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 font-mono text-lg font-bold opacity-50 hover:opacity-100 hover:text-emerald-400 transition-all cursor-crosshair">
                            {skill.icon} {skill.name}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
