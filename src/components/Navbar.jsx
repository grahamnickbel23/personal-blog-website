
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { portfolioData, loading } = usePortfolio();

    if (loading) return null;


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4"
        >
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 flex items-center gap-6 shadow-lg shadow-emerald-900/10">
                <Link to="/" className="text-slate-200 font-bold tracking-tighter hover:text-emerald-400 transition-colors">DL.</Link>
                <div className="h-4 w-[1px] bg-slate-700" />
                <div className="flex gap-4">
                    <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all"><Github size={20} /></a>
                    <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 hover:scale-110 transition-all"><Linkedin size={20} /></a>
                    <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all"><Mail size={20} /></a>
                </div>
                <div className="h-4 w-[1px] bg-slate-700" />
                <Link
                    to="/blog"
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${!isHome
                        ? 'bg-emerald-500 text-slate-900 border-emerald-500 hover:bg-emerald-400'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        }`}
                >
                    Blog
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
