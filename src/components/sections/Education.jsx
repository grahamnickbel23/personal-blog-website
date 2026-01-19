import React from 'react';
import { Code2 } from 'lucide-react';

const Education = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 mb-32">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Code2 className="text-emerald-500" /> Education & Intelligence
                </h2>

                <div className="space-y-8">
                    <div className="relative pl-8 border-l border-slate-800">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
                        <h3 className="text-xl font-bold text-slate-200">B.Tech in Computer Science & Engineering</h3>
                        <p className="text-emerald-400">University of Engineering and Management, Kolkata</p>
                        <p className="text-sm text-slate-500 mt-1 mb-4">2024 - 2028 | SGPA: 9.1</p>
                        <p className="text-slate-400 text-sm">
                            Coursework: Operating Systems, Data Structures (100+ LeetCode Solved), System Design.
                            Passionate about Cybersecurity and Low-level coding.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
