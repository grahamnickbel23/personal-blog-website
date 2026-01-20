import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectById } from '../api/getPortfolioData';
import { ArrowLeft, Github, ExternalLink, Calendar, Zap, Layers, Cpu, X } from 'lucide-react';
import { getProjectTheme } from '../utils/projectTheme.jsx';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProject = async () => {
            setLoading(true);
            try {
                const data = await getProjectById(id);
                setProject(data);
            } catch (error) {
                console.error("Failed to fetch project details:", error);
                // Optionally handle error, e.g. navigate to error page or show message
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-500">Loading...</div>;

    // Use index from state if available (preserves list theme), otherwise fallback to hash
    const projectIndex = location.state?.index ?? (project ? (parseInt(id.slice(-4), 16) || 0) : 0);
    const theme = getProjectTheme(projectIndex);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400">
                <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                <Link to="/projects" className="text-emerald-500 hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-8 max-w-5xl mx-auto bg-slate-950">
            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
            >
                {/* Header Section */}
                <div className="border-b border-slate-800 pb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div className="flex items-center gap-4">
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${theme.badge}`}>
                                Project 0{projectIndex + 1}
                            </span>
                            <span className="text-slate-500 font-mono flex items-center gap-2">
                                <Calendar size={16} /> {project.period}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-sm font-mono text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-md">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-nowrap gap-3 md:gap-4 w-full">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-3 text-sm md:text-base rounded-lg font-bold ${theme.button} transition-colors whitespace-nowrap`}
                            >
                                View Live <ExternalLink size={18} />
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-3 text-sm md:text-base rounded-lg font-bold text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors whitespace-nowrap"
                            >
                                Source Code <Github size={18} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <div className="prose prose-invert prose-lg max-w-none">
                            <h3 className={`text-2xl font-bold ${theme.textAccent} mb-4`}>Overview</h3>
                            <p className="text-slate-300 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mt-8 p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                <h4 className="text-lg font-bold text-white mb-3 md:mb-2">Key Features</h4>
                                {project.highlights && project.highlights.length > 0 && (
                                    <ul className="list-disc list-outside ml-4 md:ml-0 md:list-inside text-slate-300 md:text-slate-400 space-y-2 md:space-y-2 text-sm md:text-base leading-snug md:leading-normal">
                                        {project.highlights.map((highlight, index) => (
                                            <li key={index} className="pl-1 md:pl-0">{highlight}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {project.implementationDetails && (
                                <div className="mt-12">
                                    <h3 className={`text-2xl font-bold ${theme.textAccent} mb-4`}>Implementation Details</h3>
                                    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                                        {project.implementationDetails.split('\n').map((line, index) => {
                                            const trimmedLine = line.trim();
                                            const imageMatch = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);

                                            if (imageMatch) {
                                                const [_, alt, src] = imageMatch;
                                                return (
                                                    <div key={index} className="my-8">
                                                        <img
                                                            src={src}
                                                            alt={alt}
                                                            className={`w-full max-w-3xl mx-auto rounded-xl cursor-pointer border border-slate-800 ${theme.hoverBorder} transition-colors`}
                                                            onClick={() => { setSelectedImage({ src, alt }); setIsZoomed(false); }}
                                                        />
                                                        {alt && <p className="text-center text-sm text-slate-500 mt-2 italic">{alt}</p>}
                                                    </div>
                                                );
                                            } else if (trimmedLine.startsWith('### ')) {
                                                return <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
                                            } else if (trimmedLine.startsWith('## ')) {
                                                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                            } else if (trimmedLine.startsWith('# ')) {
                                                return <h1 key={index} className="text-3xl font-bold text-white mt-10 mb-5">{line.replace('# ', '')}</h1>;
                                            }
                                            return <p key={index} className="mb-4">{line}</p>;
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                                <Zap className="text-yellow-500" size={20} />
                                Project Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                                    <span className="text-slate-500">Impact</span>
                                    <span className={`${theme.textAccent} font-bold text-right`}>{project.stats}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                                    <span className="text-slate-500">Role</span>
                                    <span className="text-slate-200 font-bold text-right">{project.role}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`font-bold text-right ${(() => {
                                        const status = project.status?.toLowerCase() || '';
                                        if (status === 'completed') return 'text-emerald-400';
                                        if (status === 'work in progress' || status.includes('pogress')) return 'text-yellow-400';
                                        if (status === 'under maintenance') return 'text-rose-400';
                                        return 'text-slate-400';
                                    })()
                                        } `}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Decoration */}
                        <div className="hidden md:flex relative h-64 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden items-center justify-center group">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className={`relative w-24 h-24 rounded-full border-2 border-dashed ${theme.dashedBorder} flex items-center justify-center`}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="text-slate-200"
                                    >
                                        {projectIndex % 2 === 0 ? <Layers size={40} /> : <Cpu size={40} />}
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: isZoomed ? 1.5 : 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className={`max-w-full max-h-[90vh] rounded-lg shadow-2xl ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(!isZoomed);
                            }}
                        />
                        {selectedImage.alt && !isZoomed && (
                            <p className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-lg font-medium pointer-events-none">
                                {selectedImage.alt}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetails;
