import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorScreen = ({ onRetry }) => {
    return (
        <div className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center font-mono p-4">
            <div className="max-w-md w-full bg-slate-900/50 border border-red-500/30 rounded-lg p-8 backdrop-blur-sm text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-500/10 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <h2 className="text-xl text-red-400 font-bold mb-2">SYSTEM FAILURE</h2>
                <p className="text-slate-400 mb-8">Unable to establish uplink with the mainframe.</p>

                <button
                    onClick={onRetry}
                    className="group flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 rounded transition-all"
                >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    RETRY UPLINK
                </button>
            </div>
        </div>
    );
};

export default ErrorScreen;
