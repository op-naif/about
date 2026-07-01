import Background3D from './components/Background3D';
import InteractiveHero from './components/InteractiveHero';
import AboutSection from './components/AboutSection';
import LifestealSection from './components/LifestealSection';
import ProjectsSection from './components/ProjectsSection';
import SpecsSection from './components/SpecsSection';
import SocialHub from './components/SocialHub';

export default function App() {
  return (
    <div className="relative text-white min-h-screen bg-black font-sans selection:bg-white selection:text-black scroll-container overflow-x-hidden">
      
      {/* 1. Custom Interactive 3D Background */}
      <Background3D />

      {/* 5. Central Application Sections Container */}
      <main className="relative">
        
        {/* HERO STAGE */}
        <InteractiveHero />

        {/* SOCIAL CHANNELS HUBS */}
        <SocialHub />

        {/* BIOGRAPHY STAGE */}
        <AboutSection />

        {/* LIFESTEAL BANGLADESH HIGH-STAKES SECTION */}
        <LifestealSection />

        {/* SPECIFICATIONS BLUEPRINT STAGE */}
        <SpecsSection />

        {/* PROJECTS & AIM SANDBOX STAGE */}
        <ProjectsSection />

      </main>

      {/* 6. High-Contrast Immersive Footer */}
      <footer className="relative bg-[#020202] border-t border-white/5 py-12 px-4 md:px-8 z-10 text-center select-none overflow-hidden">
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          
          <p className="text-xl md:text-2xl font-display font-medium text-white tracking-tight italic max-w-lg">
            "The worst downfall brings the best comeback."
          </p>

          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.25em] max-w-sm leading-relaxed mt-2">
            © 2026 OP NAiF • Gaming Content Creator
          </p>

        </div>
      </footer>

    </div>
  );
}
