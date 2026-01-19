import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typewriter from './ui/Typewriter';
import { usePortfolio } from '../context/PortfolioContext';

const TerminalWindow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();



    const { portfolioData, loading } = usePortfolio();

    // Trigger animation only when in view
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });


    const [sequenceStep, setSequenceStep] = useState(0);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    // Triggers to move to next steps
    const startSequence = useCallback(() => setSequenceStep(1), []);
    const finishWhoAmI = useCallback(() => setSequenceStep(2), []);
    const startLsSkills = useCallback(() => setSequenceStep(3), []);
    const finishLsSkills = useCallback(() => setSequenceStep(4), []);
    const startLsProjects = useCallback(() => setSequenceStep(5), []);
    const finishLsProjects = useCallback(() => setSequenceStep(6), []);
    const finishAll = useCallback(() => setSequenceStep(7), []);

    const scrollToProject = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };



    // Auto-scroll to bottom when content changes
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [sequenceStep]);

    useEffect(() => {
        if (loading) return;

        if (isInView && sequenceStep === 0) {
            
            const timer = setTimeout(() => {
                startSequence();
            }, 500);
            return () => clearTimeout(timer);
        } else if (sequenceStep === 2) {
            
            const timer = setTimeout(() => {
                startLsSkills();
            }, 1500);
            return () => clearTimeout(timer);
        } else if (sequenceStep === 4) {
            
            const timer = setTimeout(() => {
                startLsProjects();
            }, 1500);
            return () => clearTimeout(timer);
        } else if (sequenceStep === 6) {
            
            const timer = setTimeout(() => {
                finishAll();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isInView, sequenceStep, startSequence, startLsSkills, startLsProjects, finishAll, loading]);

    if (loading) {
        return (
            <div className="w-full max-w-3xl mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 h-[550px] flex items-center justify-center text-emerald-500 font-mono">
                Initializing System...
            </div>
        );
    }

    return (
        <motion.div
            ref={containerRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            className="w-full max-w-3xl mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-emerald-900/20 perspective-1000 h-[550px] flex flex-col relative"
        >
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800 shrink-0 relative z-20">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-mono">dipan@portfolio:~$</div>


            </div>

            {/* Terminal Content */}
            <div ref={contentRef} className="p-6 font-mono text-sm md:text-base text-slate-300 space-y-4 overflow-y-auto flex-1 custom-scrollbar scroll-smooth relative">


                {/* whoami */}
                <div className="flex gap-2 items-center">
                    <span className="text-emerald-400">ap-south-1:~</span>
                    <span className="text-blue-400">$</span>
                    <span className="text-slate-200">
                        {sequenceStep >= 1 && (
                            <Typewriter text="whoami" startDelay={500} onComplete={finishWhoAmI} />
                        )}
                    </span>
                </div>

                {/* Bio */}
                {sequenceStep >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-4 space-y-1 mb-6"
                    >
                        <p className="text-xl md:text-2xl font-bold text-slate-100">{portfolioData.name}</p>
                        <p className="text-emerald-400/90">{portfolioData.role}</p>
                        <p className="text-slate-500 text-xs mt-2">B.Tech CSE @ UEM Kolkata (SGPA: 9.1)</p>
                    </motion.div>
                )}

                {/* ls ./skills */}
                {sequenceStep >= 3 && (
                    <div className="flex gap-2 items-center">
                        <span className="text-emerald-400">ap-south-1:~</span>
                        <span className="text-blue-400">$</span>
                        <span className="text-slate-200">
                            <Typewriter text="ls ./skills" startDelay={500} onComplete={finishLsSkills} />
                        </span>
                    </div>
                )}

                {/* Skills Text Block */}
                {sequenceStep >= 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-4 mb-6 font-mono text-sm text-slate-300"
                    >
                        <p className="text-emerald-400 mb-1">Languages:</p>
                        <p className="mb-3">C/C++, Python</p>

                        <p className="text-emerald-400 mb-1">Frameworks & Tools:</p>
                        <p className="mb-3">Flutter, FastAPI, Express.js, PyTorch, LangChain, MongoDB</p>
                    </motion.div>
                )}

                {/* ls ./projects */}
                {sequenceStep >= 5 && (
                    <div className="flex gap-2 items-center">
                        <span className="text-emerald-400">ap-south-1:~</span>
                        <span className="text-blue-400">$</span>
                        <span className="text-slate-200">
                            <Typewriter text="ls ./projects" startDelay={500} onComplete={finishLsProjects} />
                        </span>
                    </div>
                )}

                {/* Projects List */}
                {sequenceStep >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-4 mb-6 font-mono text-sm text-slate-300 flex flex-col gap-1"
                    >
                        {portfolioData.projects.map((project, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToProject(`project-${idx}`)}
                                className="text-left text-emerald-400 hover:text-emerald-300 hover:underline transition-colors w-fit"
                            >
                                {project.title.toLowerCase().replace(/\s+/g, '-')}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Final Prompt */}
                {sequenceStep >= 7 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 items-center pt-2"
                    >
                        <span className="text-emerald-400">ap-south-1:~</span>
                        <span className="text-blue-400">$</span>
                        <span className="animate-pulse bg-slate-400 w-2.5 h-5 block"></span>
                    </motion.div>
                )}


            </div>
        </motion.div>
    );
};

export default TerminalWindow;

