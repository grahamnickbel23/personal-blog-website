import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import Typewriter from './Typewriter';

const TerminalOverlay = ({ isOpen, onClose, type = 'success', message }) => {
    const [commandTyped, setCommandTyped] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCommandTyped(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isSuccess = type === 'success';
    const commandText = isSuccess ? 'initiate_handshake --secure' : 'retry_connection --force';
    const highlightColor = isSuccess ? 'text-emerald-500' : 'text-red-500';
    const borderColor = isSuccess ? 'border-emerald-500/20' : 'border-red-500/20';
    const bgColor = isSuccess ? 'bg-emerald-500/10' : 'bg-red-500/10';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 font-mono"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            </div>
                            <div className="text-xs text-slate-400 font-bold flex items-center gap-2">
                                <Terminal size={14} />
                                notification_daemon
                            </div>
                            <div className="w-12"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 min-h-[300px] flex flex-col">
                            <div className="space-y-4 font-mono text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">visitor@portfolio:~$</span>
                                    <span className="text-slate-200">
                                        <Typewriter
                                            text={commandText}
                                            speed={30}
                                            onComplete={() => setCommandTyped(true)}
                                        />
                                    </span>
                                </div>

                                {commandTyped && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4 pt-2"
                                    >
                                        <div className="text-slate-400">
                                            {isSuccess ? 'Establishing secure connection...' : 'Connection interrupted...'}
                                        </div>

                                        <div className={`p-4 rounded border ${borderColor} ${bgColor} flex items-start gap-4`}>
                                            <div className={`mt-0.5 ${highlightColor}`}>
                                                {isSuccess ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg mb-1 ${highlightColor}`}>
                                                    {isSuccess ? 'TRANSMISSION SUCCESSFUL' : 'TRANSMISSION FAILED'}
                                                </h3>
                                                <p className="text-slate-300 leading-relaxed">
                                                    {message}
                                                </p>
                                            </div>
                                        </div>



                                        <button
                                            onClick={onClose}
                                            className={`w-full py-3 rounded font-bold transition-all mt-4 
                                                ${isSuccess
                                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                                                }`}
                                        >
                                            {isSuccess ? 'ACKNOWLEDGE' : 'CLOSE SESSION'}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalOverlay;
