import Typewriter from './Typewriter';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const [commandTyped, setCommandTyped] = useState(false);

    return (
        <div className="fixed inset-0 bg-slate-950 z-[100] font-mono overflow-hidden">
            {/* Desktop View: Centered Window */}
            <div className="hidden md:flex h-full items-center justify-center">
                <div className="max-w-md w-full p-6 bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm shadow-2xl">
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="space-y-2 text-emerald-500">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400">welcome@portfolio:~</span>
                            <span className="text-white">~ <Typewriter text="docker run dipan" onComplete={() => setCommandTyped(true)} /></span>
                        </div>

                        {commandTyped && (
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">$</span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    pulling dipan's portfolio image...
                                </motion.span>
                            </div>
                        )}

                        <motion.div
                            className="mt-8 flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile View: Full Screen Terminal */}
            <div className="md:hidden flex flex-col justify-center px-6 h-full space-y-12 bg-slate-950">
                <div className="space-y-6 text-emerald-500">
                    <div className="flex flex-col gap-3">
                        <span className="text-blue-400 text-lg opacity-80">welcome@portfolio:~</span>
                        <div className="text-white text-2xl font-bold tracking-tight">
                            <span className="mr-3">~</span>
                            <Typewriter text="docker run dipan" onComplete={() => setCommandTyped(true)} speed={50} />
                        </div>
                    </div>

                    {commandTyped && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start gap-3 text-lg text-slate-300 border-l-2 border-slate-800 pl-4 py-1">
                                <span className="text-blue-400 font-bold">$</span>
                                <span>Initialising Portfolio Protocol...</span>
                            </div>

                            <div className="flex items-center gap-4 text-emerald-400 bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full shrink-0"
                                />
                                <span className="font-bold tracking-wide">LOADING ASSETS</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Mobile Bottom Decoration */}
                <div className="absolute bottom-10 left-0 w-full text-center text-slate-700 text-xs uppercase tracking-widest font-bold">
                    System Ready / V2.0
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
