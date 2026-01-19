import Typewriter from './Typewriter';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const [commandTyped, setCommandTyped] = useState(false);

    return (
        <div className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center font-mono">
            <div className="max-w-md w-full p-6">
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
                                pulling dipan's portfolio image and loading...
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
    );
};

export default LoadingScreen;
