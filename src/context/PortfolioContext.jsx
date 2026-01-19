import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPortfolioData } from '../api/getPortfolioData';
import { getSkillIcon } from '../utils/iconMapping';
import profileImage from '../assets/my-face-photo.jpg';
// import { projectExtraData } from '../data/projectExtraData';

const PortfolioContext = createContext();

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

export const PortfolioProvider = ({ children }) => {
    const [backendData, setBackendData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPortfolioData();
            setBackendData(data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading portfolio data:", err);
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Calculate derived state directly to ensure HMR updates work
    let portfolioData = null;
    if (backendData) {
        const data = { ...backendData };

        if (data.skills) {
            data.skills = data.skills.map(skill => ({
                ...skill,
                icon: getSkillIcon(skill.name)
            }));
        }

        // Use backend projects directly
        if (backendData.projects) {
            data.projects = backendData.projects;
        }

        // Merging logic commented out to switch source of truth to API
        /*
        if (data.projects || Object.keys(projectExtraData).length > 0) {
            const backendProjects = data.projects || [];
            // Calculate max index based on backend data and extra data keys
            const maxIndex = Math.max(
                backendProjects.length - 1,
                ...Object.keys(projectExtraData).map(Number)
            );

            // Create combined array ensuring all projects are included
            data.projects = Array.from({ length: maxIndex + 1 }, (_, index) => {
                const backendProject = backendProjects[index] || {};
                const extraProject = projectExtraData[index] || {};
                // If neither exists (shouldn't happen given logic), return empty object
                return { ...backendProject, ...extraProject };
            }).filter(p => Object.keys(p).length > 0); // Filter out empty objects if any gaps
        }
        */

        portfolioData = {
            ...data,
            contact: {
                ...data.contact,
                // Fallback links since API might not return them
                linkedin: data.contact?.linkedin || "https://www.linkedin.com/in/dipan-lahiri/",
                github: data.contact?.github || "https://github.com/grahamnickbel23",
                leetcode: data.contact?.leetcode || "https://leetcode.com/u/cerAdC3rbi/"
            },
            about: {
                ...data.about,
                image: profileImage
            }
        };
    }

    const value = {
        portfolioData,
        loading,
        error,
        retry: loadData
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
