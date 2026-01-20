import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

import { FileDown, Loader } from 'lucide-react';

import { downloadResume } from '../../api/getPortfolioData';

const About = () => {
    const { portfolioData, loading } = usePortfolio();
    const [isDownloading, setIsDownloading] = useState(false);

    const imgRef = useRef(null);
    const isInView = useInView(imgRef, { margin: "-40% 0px -40% 0px" });

    if (loading) return null; // Or a loading spinner

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const blob = await downloadResume();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading resume:", error);
            alert("Failed to download resume. Please try again later.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section className="py-20 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="mb-8 pl-4 border-l-2 border-emerald-500">
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                                About <span className="text-slate-700">Me</span>
                            </h2>
                        </div>

                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            {portfolioData.about.description}
                        </p>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group flex items-center gap-3 px-8 py-4 bg-slate-900/50 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl transition-all backdrop-blur-sm ${isDownloading
                                ? 'opacity-70 cursor-wait'
                                : 'hover:bg-slate-800 hover:border-emerald-500'
                                }`}
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {isDownloading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <FileDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            )}
                            {isDownloading ? 'Downloading...' : 'Download Resume'}
                        </motion.button>

                        <div className="flex gap-4 px-2 py-1">
                            <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                            <div className="h-1 w-10 bg-purple-500 rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 transform rotate-3 scale-105"></div>

                        <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-900/50 backdrop-blur-sm group">
                            <div className={`absolute inset-0 transition-colors duration-500 z-10 
                                ${isInView ? 'bg-transparent' : 'bg-slate-950/20'} 
                                md:bg-slate-950/20 md:group-hover:bg-transparent`}>
                            </div>
                            <img
                                ref={imgRef}
                                src={portfolioData.about.image}
                                alt={portfolioData.name}
                                className={`w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110
                                    ${isInView ? 'grayscale-0' : 'grayscale'}
                                    md:grayscale md:group-hover:grayscale-0`}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-lg"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-lg"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
