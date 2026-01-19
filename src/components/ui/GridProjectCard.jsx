import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjectTheme } from '../../utils/projectTheme.jsx';

const GridProjectCard = ({ project, index, id }) => {
    const theme = getProjectTheme(index);

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full"
        >
            <Link to={`/project/${project.id || index}`} state={{ index }} className="block h-full group">
                <div className={`relative bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 0 ? 'border-l-4' : 'border-r-4'} ${theme.borderColor} h-full transition-transform duration-300 group-hover:-translate-y-2`}>

                    {/* Decorative Background Blob */}
                    <div className={`absolute -top-20 -right-20 w-64 h-64 ${theme.blobColor} rounded-full blur-3xl pointer-events-none`} />

                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <div className="space-y-6 flex-1">
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badge}`}>
                                    Project 0{index + 1}
                                </span>
                                <span className="text-slate-500 text-xs font-mono">{project.period}</span>
                            </div>

                            <h3 className={`text-2xl md:text-3xl font-black text-slate-100 uppercase tracking-tighter ${theme.groupHoverText} transition-colors`}>
                                {project.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800 mt-auto">
                                <p className={`${theme.textAccent} font-bold text-sm flex items-center gap-2`}>
                                    <Zap size={16} /> {project.stats}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default GridProjectCard;
