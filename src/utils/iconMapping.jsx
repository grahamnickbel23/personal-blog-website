import React from 'react';
import {
    SiCplusplus,
    SiPython,
    SiFlutter,
    SiFastapi,
    SiExpress,
    SiPytorch,
    SiMongodb,
    SiPrisma,
    SiRedis,
    SiDocker,
    SiAmazon,
    SiJavascript,
    SiGo
} from 'react-icons/si';
import { Layers } from 'lucide-react';

export const iconMapping = {
    "C/C++": <SiCplusplus size={16} />,
    "GO": <SiGo size={16} />,
    "JavaScript": <SiJavascript size={16} />,
    "Python": <SiPython size={16} />,
    "Flutter": <SiFlutter size={16} />,
    "FastAPI": <SiFastapi size={16} />,
    "Express.js": <SiExpress size={16} />,
    "PyTorch": <SiPytorch size={16} />,
    "LangChain": <Layers size={16} />,
    "MongoDB": <SiMongodb size={16} />,
    "Prisma": <SiPrisma size={16} />,
    "Redis": <SiRedis size={16} />,
    "Docker": <SiDocker size={16} />,
    "AWS": <SiAmazon size={16} />
};

export const getSkillIcon = (skillName) => {
    return iconMapping[skillName] || null;
};
