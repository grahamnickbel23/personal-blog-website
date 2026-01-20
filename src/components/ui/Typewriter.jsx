import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, onComplete, startDelay = 0 }) => {
    const [currentText, setCurrentText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);



    useEffect(() => {
        const timer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentText.length < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(text.slice(0, currentText.length + 1));
            }, 120 + Math.random() * 80);
            return () => clearTimeout(timeout);
        } else {
            if (onComplete && !hasCompleted) {
                setHasCompleted(true);
                onComplete();
            }
        }
    }, [currentText, isStarted, text, onComplete, hasCompleted]);

    return <span>{currentText}</span>;
};

export default Typewriter;
