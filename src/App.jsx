import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import BackgroundGrid from './components/ui/BackgroundGrid';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BlogList from './components/sections/BlogList';
import BlogPost from './components/sections/BlogPost';

import AllProjects from './pages/AllProjects';
import ProjectDetails from './pages/ProjectDetails';

import { usePortfolio } from './context/PortfolioContext';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorScreen from './components/ui/ErrorScreen';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const location = useLocation();
  const { loading, error, retry } = usePortfolio();

  // Only show scroll progress on home page or long pages
  const showProgressBar = true;

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen onRetry={retry} />;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <BackgroundGrid />

      {/* Scroll Progress Bar */}
      {showProgressBar && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[60]"
          style={{ scaleX }}
        />
      )}

      <Navbar />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default function Portfolio() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}