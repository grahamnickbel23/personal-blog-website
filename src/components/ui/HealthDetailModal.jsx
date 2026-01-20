import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Database, Cloud, Activity, GitBranch, Terminal, Cpu } from 'lucide-react';

const HealthDetailModal = ({ isOpen, onClose, healthData }) => {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 w-[95%] max-w-2xl bg-slate-900 border border-slate-700 rounded-xl p-0 shadow-2xl z-[9999] overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Activity className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-100">System Status</h3>
                                    <p className="text-xs text-slate-400 font-mono">Real-time infrastructure monitoring</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-6 grid gap-3 md:gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                <div className="p-3 md:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-row md:flex-col items-center justify-between md:justify-start">
                                    <div className="flex items-center gap-2 mb-0 md:mb-2 text-slate-400">
                                        <Server className="w-4 h-4 md:w-4 md:h-4" />
                                        <span className="text-xs font-mono uppercase">Uptime</span>
                                    </div>
                                    <div className="text-lg md:text-2xl font-bold text-slate-100">
                                        {healthData?.uptime ? Math.floor(healthData.uptime / 60) + 'm' : '--'}
                                    </div>
                                </div>
                                <div className="p-3 md:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-row md:flex-col items-center justify-between md:justify-start">
                                    <div className="flex items-center gap-2 mb-0 md:mb-2 text-slate-400">
                                        <Terminal className="w-4 h-4 md:w-4 md:h-4" />
                                        <span className="text-xs font-mono uppercase">Version</span>
                                    </div>
                                    <div className="text-lg md:text-xl font-bold text-slate-100">
                                        {healthData?.services?.server?.nodejsVersion || '--'}
                                    </div>
                                </div>
                                <div className="p-3 md:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-row md:flex-col items-center justify-between md:justify-start">
                                    <div className="flex items-center gap-2 mb-0 md:mb-2 text-slate-400">
                                        <Cpu className="w-4 h-4 md:w-4 md:h-4" />
                                        <span className="text-xs font-mono uppercase">Memory</span>
                                    </div>
                                    <div className="text-lg md:text-xl font-bold text-slate-100">
                                        {healthData?.services?.server?.memory?.heapUsed
                                            ? `${Math.round(healthData.services.server.memory.heapUsed / 1024 / 1024)}MB`
                                            : '--'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                                <h4 className="text-xs md:text-sm font-mono text-slate-400 uppercase tracking-wider mb-2 md:mb-4">Service Health</h4>

                                <div className="flex items-center justify-between p-2 md:p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <Database className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                                        <span className="text-xs md:text-sm text-slate-200">MongoDB Atlas</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-[10px] md:text-xs font-mono text-slate-400">{healthData?.services?.database?.latency}</span>
                                        <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-bold ${healthData?.services?.database?.status === 'connected'
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {healthData?.services?.database?.status}
                                        </span>
                                    </div>
                                </div>

                                {/* S3 */}
                                <div className="flex items-center justify-between p-2 md:p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <Cloud className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                                        <span className="text-xs md:text-sm text-slate-200">AWS S3 Storage</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-[10px] md:text-xs font-mono text-slate-400">{healthData?.services?.s3?.latency}</span>
                                        <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-bold ${healthData?.services?.s3?.status === 'connected'
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {healthData?.services?.s3?.status}
                                        </span>
                                    </div>
                                </div>

                                {/* API */}
                                <div className="flex items-center justify-between p-2 md:p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                                        <span className="text-xs md:text-sm text-slate-200">API Gateway</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-[10px] md:text-xs font-mono text-slate-400">Online</span>
                                        <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-bold bg-emerald-500/20 text-emerald-400">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default HealthDetailModal;
