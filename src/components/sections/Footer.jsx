import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Footer = () => {
    const { portfolioData, loading } = usePortfolio();

    if (loading) return null;

    return (
        <div className="relative z-20 max-w-2xl mx-auto text-center pb-8 px-4">
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono">
                <p>© 2025 Dipan Lahiri. System Active.</p>
                <div className="flex gap-6 mt-4 md:mt-0 relative z-30 pointer-events-auto">
                    <a href={portfolioData.contact.leetcode} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">Leetcode</a>
                    <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">LinkedIn</a>
                    <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">GitHub</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
