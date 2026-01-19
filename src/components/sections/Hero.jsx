import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../ui/GlitchText';
import TerminalWindow from '../TerminalWindow';
import { usePortfolio } from '../../context/PortfolioContext';
import { useGitHubStats } from '../../hooks/useGitHubStats';

const GitHubStats = () => {
    const { portfolioData } = usePortfolio();
    const githubLink = portfolioData?.contact?.github;
    const { stats, loading, error } = useGitHubStats(githubLink);

    if (loading) {
        return (
            <div className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-4 animate-pulse">
                LOADING SYSTEM DATA...
            </div>
        );
    }

    if (error) {
        return (
            <div className="inline-block px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
                SYSTEM ERROR: DATA UNAVAILABLE
            </div>
        );
    }

    return (
        <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-4 hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
            REPOS: {stats.repos} · COMMITS: {stats.commits > 1000 ? (stats.commits / 1000).toFixed(1) + 'k' : stats.commits} · LAST PUSH: {stats.lastPush}
        </a>
    );
};

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 space-y-4"
            >
                <GitHubStats />
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-2">
                    <GlitchText text="BUILD." /> <span className="text-slate-700">SHIP.</span> <GlitchText text="REPEAT." className="text-emerald-500" />
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-lg">
                    Crafting intelligent systems and immersive experiences from INDIA to the cloud.
                </p>
            </motion.div>

            <div className="w-full max-w-4xl px-4 relative">
                {/* Decorative behind terminal */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent blur-3xl -z-10 transform scale-y-50 top-1/2" />
                <TerminalWindow />
            </div>

        </section>
    );
};

export default Hero;
