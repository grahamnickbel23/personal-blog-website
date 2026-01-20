import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cloud, Activity } from 'lucide-react';

const HealthHoverCard = ({ healthData, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 bg-slate-900 border border-slate-700/50 rounded-lg p-3 shadow-xl shadow-black/50 z-50 pointer-events-none"
                >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
                        <div className={`w-2 h-2 rounded-full ${healthData?.status === 'healthy' || !healthData ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-xs font-bold text-slate-200">
                            {healthData?.status === 'healthy' || !healthData ? 'All Systems Normal' : 'System Degraded'}
                        </span>
                    </div>

                    <div className="flex justify-between px-2">
                        <div className="flex flex-col items-center gap-1">
                            <Database size={14} className={healthData?.services?.database?.status === 'connected' ? 'text-emerald-400' : 'text-red-400'} />
                            <span className="text-[10px] text-slate-500 font-mono">DB</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Cloud size={14} className={healthData?.services?.s3?.status === 'connected' ? 'text-emerald-400' : 'text-red-400'} />
                            <span className="text-[10px] text-slate-500 font-mono">S3</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Activity size={14} className={healthData?.services?.server?.status === 'active' ? 'text-emerald-400' : 'text-red-400'} />
                            <span className="text-[10px] text-slate-500 font-mono">API</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HealthHoverCard;
