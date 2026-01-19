import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, onComplete, startDelay = 0, volume = 0.5 }) => {
    const [currentText, setCurrentText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        // Key press sound
        audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2364/2364-preview.mp3");
        audioRef.current.volume = volume;
    }, [volume]);

    const playClick = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentText.length < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(text.slice(0, currentText.length + 1));
                playClick();
            }, 120 + Math.random() * 80); // Slower: 120ms to 200ms per character
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
