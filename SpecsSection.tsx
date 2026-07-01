import { motion } from 'motion/react';
import { Award, ArrowUpRight, Target } from 'lucide-react';

export default function ProjectsSection() {
  const project = {
    title: 'AimGrid',
    short: 'Simple Web-Based Aim Training Game',
    desc: 'A simple, clean browser-based aim training game designed to test your reflexes, click speed, reaction latency, and mouse control with responsive targets and live score updates.',
    web: 'https://aimgrid.tiiny.site',
    tags: ['Aim Trainer', 'Web Game', 'Reflex Testing', 'React / JS'],
    badges: ['Web Game', 'Aim Trainer'],
    icon: <Target className="w-6.5 h-6.5 text-white" />
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      
      {/* Decorative vertical grid lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/[0.015] pointer-events-none" />

      {/* Visual Header */}
      <motion.div 
        className="flex flex-col items-center text-center gap-4 mb-16 md:mb-24"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
          <Award className="w-4 h-4 text-white" />
          <span>Featured Web Game</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Web Aim Trainer
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest max-w-lg">
          Simple game to test reaction speeds
        </p>
      </motion.div>

      {/* Centered Premium Project Card */}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative group flex flex-col justify-between liquid-glass rounded-3xl p-8 md:p-10 overflow-hidden hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.03)] hover:-translate-y-1 transition-all duration-500"
        >
          {/* Top subtle light accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:via-white/50 transition-all duration-500" />
          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl group-hover:bg-white/[0.02] transition-all duration-500" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {/* Icon */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-300 shrink-0">
                {project.icon}
              </div>
              <div className="flex gap-2">
                {project.badges.map((b, i) => (
                  <span key={i} className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {project.short}
              </p>
            </div>

            <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-light">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono text-neutral-400 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
            <a
              href={project.web}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 hover:-translate-y-0.5 transition-all duration-300 interactive-element"
            >
              <span>Play AimGrid Game</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
