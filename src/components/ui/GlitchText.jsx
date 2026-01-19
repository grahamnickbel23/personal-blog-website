import React from 'react';

const GlitchText = ({ text, className }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-emerald-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none pointer-events-none animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-pink-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none pointer-events-none animate-pulse delay-75">
                {text}
            </span>
        </div>
    );
};

export default GlitchText;
