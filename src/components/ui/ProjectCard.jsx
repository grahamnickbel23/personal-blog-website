import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, Layers, Cpu, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectTheme } from '../../utils/projectTheme.jsx';

const ProjectCard = ({ project, index, id }) => {
    const navigate = useNavigate();
    const theme = getProjectTheme(index);

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sticky top-24 mb-24 w-full max-w-4xl mx-auto cursor-pointer"
            onClick={() => navigate(`/project/${project.id || index}`, { state: { index } })}
        >
            <div className={`relative bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 0 ? 'border-l-4' : 'border-r-4'} ${theme.borderColor}`}>

                {/* Decorative Background Blob */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 ${theme.blobColor} rounded-full blur-3xl pointer-events-none`} />

                <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badge}`}>
                                Project 0{index + 1}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">{project.period}</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black text-slate-100 uppercase tracking-tighter">
                            {project.title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <p className={`${theme.textAccent} font-bold text-sm mb-4 flex items-center gap-2`}>
                                <Zap size={16} /> {project.stats}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold ${theme.button} transition-colors`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    View Project <ExternalLink size={18} />
                                </motion.a>
                                {project.github && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Source Code <Github size={18} />
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Visual Representation (Abstract/Iconic or Image) */}
                    <div className="relative h-full min-h-[200px] flex items-center justify-center bg-slate-950/50 rounded-2xl border border-slate-800 overflow-hidden group">
                        {project.image ? (
                            <div className="relative w-full h-full min-h-[300px]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60`} />
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                                {/* Animated Icon Container */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className={`w-32 h-32 rounded-full border-2 border-dashed ${theme.dashedBorder} flex items-center justify-center`}
                                >
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="text-slate-200"
                                    >
                                        {index % 2 === 0 ? <Layers size={48} /> : <Cpu size={48} />}
                                    </motion.div>
                                </motion.div>

                                {/* Floating Particles */}
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            opacity: [0.2, 0.6, 0.2]
                                        }}
                                        transition={{
                                            duration: 2 + i,
                                            repeat: Infinity,
                                            delay: i * 0.5
                                        }}
                                        className={`absolute w-2 h-2 rounded-full ${theme.particle}`}
                                        style={{
                                            left: `${20 + i * 15}%`,
                                            top: `${30 + (i % 2) * 40}%`
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
