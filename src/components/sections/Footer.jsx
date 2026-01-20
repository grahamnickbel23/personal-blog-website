import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getSystemHealth } from '../../api/getPortfolioData';
import HealthHoverCard from '../ui/HealthHoverCard';
import HealthDetailModal from '../ui/HealthDetailModal';

const Footer = () => {
    const { portfolioData, loading } = usePortfolio();
    const [healthData, setHealthData] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchHealth();
        const interval = setInterval(fetchHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchHealth = async () => {
        const data = await getSystemHealth();
        setHealthData(data);
    };

    if (loading) return null;

    return (
        <>
            <div className="relative z-20 max-w-2xl mx-auto text-center pb-8 px-4">
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono">
                    <div className="flex items-center gap-2">
                        <p>© {new Date().getFullYear()} Dipan Lahiri.</p>
                        <div
                            className="relative cursor-pointer group flex items-center gap-2"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="text-slate-600">|</span>
                            <div className={`w-2 h-2 rounded-full ${healthData?.status === 'healthy' || !healthData ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="group-hover:text-emerald-400 transition-colors">System Active.</span>
                            <HealthHoverCard healthData={healthData} isVisible={isHovered} />
                        </div>
                    </div>

                    <div className="flex gap-6 mt-4 md:mt-0 relative z-30 pointer-events-auto">
                        <a href={portfolioData.contact.leetcode} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">Leetcode</a>
                        <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">LinkedIn</a>
                        <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors cursor-pointer">GitHub</a>
                    </div>
                </div>
            </div>

            <HealthDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                healthData={healthData}
            />
        </>
    );
};

export default Footer;
