import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

import { FileDown, Loader } from 'lucide-react';

import { downloadResume } from '../../api/getPortfolioData';

const About = () => {
    const { portfolioData, loading } = usePortfolio();
    const [isDownloading, setIsDownloading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
                        viewport={{ once: true, margin: isMobile ? "-40% 0px -40% 0px" : "-100px" }}
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: isMobile ? "-40% 0px -40% 0px" : "-30% 0px -30% 0px" }}
                        variants={{
                            hidden: isMobile
                                ? { opacity: 0, x: 50 }
                                : { opacity: 0, x: 100, rotate: -30 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                rotate: 0,
                                transition: isMobile
                                    ? { duration: 0.8, ease: "easeOut" }
                                    : {
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 8,
                                        delay: 0.5,
                                        when: "beforeChildren",
                                        staggerChildren: 0.1
                                    }
                            }
                        }}
                        className="relative perspective-1000"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-purple-500/10 rounded-3xl blur-3xl -z-20 transform scale-110"></div>

                        <div className="relative w-full aspect-square">
                            {/* Card 1 */}
                            <motion.div
                                variants={{
                                    hidden: { rotate: 0, x: 0, y: 0, opacity: 0 },
                                    visible: {
                                        rotate: -12,
                                        x: -40,
                                        y: 20,
                                        opacity: 0.8,
                                        transition: {
                                            type: "spring",
                                            stiffness: 160,
                                            damping: 8 
                                        }
                                    }
                                }}
                                className="absolute inset-0 bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-xl z-0 overflow-hidden"
                            >
                                <div className="flex gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="space-y-2 opacity-50">
                                    <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-5/6 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-full bg-slate-700 rounded"></div>
                                    <div className="h-2 w-4/5 bg-slate-700 rounded"></div>
                                </div>

                                <div className="absolute font-mono text-[10px] text-emerald-500/10 top-1/2 left-2 pointer-events-none whitespace-pre__">
                                    {`const developer = {\n  name: 'Portfolio',\n  skills: ['React', 'Node']\n};`}
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                variants={{
                                    hidden: { rotate: 0, x: 0, y: 0, opacity: 0 },
                                    visible: {
                                        rotate: 12,
                                        x: 40,
                                        y: 10,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 160,
                                            damping: 8, 
                                            delay: 0.1
                                        }
                                    }
                                }}
                                className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-2xl shadow-xl z-10 backdrop-blur-sm"
                            >
                                <div className="absolute bottom-4 right-4 text-emerald-500/20">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl z-20 border-2 border-slate-700/50 group"
                            >
                                <div className={`absolute inset-0 transition-colors duration-500 z-10 
                                    ${isInView ? 'bg-transparent' : 'bg-slate-950/20'} 
                                    group-hover:bg-transparent`}>
                                </div>

                                <img
                                    ref={imgRef}
                                    src={portfolioData.about.image}
                                    alt={portfolioData.name}
                                    className={`w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110
                                    ${isInView ? 'grayscale-0' : 'grayscale'}
                                    md:grayscale md:group-hover:grayscale-0`}
                                />

                                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
