import { motion } from 'motion/react';
import { Swords, ExternalLink, Compass, Shield, Heart, Zap, Sparkles, Flame } from 'lucide-react';

export default function LifestealSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="lifesteal" className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      
      {/* Decorative vertical grid lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/[0.01] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/[0.01] pointer-events-none" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        {/* Flag Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.25em] text-neutral-300 uppercase">
            <Shield className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Premier Network Highlight</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-2xl p-8 md:p-12 hover:border-white/20 hover:shadow-[0_0_80px_rgba(255,255,255,0.03)] transition-all duration-700">
          
          {/* Neon cyber glow overlay */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40 group-hover:via-white/70 transition-all duration-700" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl group-hover:bg-white/[0.02] transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Server Hero Banner Illustration Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                <Swords className="w-6 h-6 text-white" />
              </div>

              <div>
                <h2 className="text-[33px] font-display font-bold tracking-tight text-white uppercase leading-none">
                  LifeSteal <span className="block text-neutral-400">Bangladesh</span>
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                  Best Non-P2W server in Bangladesh
                </p>
              </div>

              {/* Server Key Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  Version 1.20+
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 animate-pulse">
                  ● play.lsbd.net
                </span>
              </div>
            </div>

            {/* Description & Interactive Segment Column */}
            <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-white/5 lg:pl-8">
              <p className="text-neutral-300 font-sans text-xs sm:text-sm font-light leading-relaxed">
                LifeSteal Bangladesh (LSBD) is a high-octane, competitive Minecraft survival server with a strict no-pay-to-win policy. Built for a highly active community, LSBD offers a pure, unfiltered survival experience where every battle has real stakes, hearts are stolen, and alliances are tested fairly.
              </p>

              {/* Quick Server Stats Grid (4 columns with white icons) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Fair Play</span>
                  </div>
                  <p className="text-xs font-sans font-semibold text-white uppercase">No Pay To Win</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 text-white" />
                    <span>Core Mode</span>
                  </div>
                  <p className="text-xs font-sans font-semibold text-white uppercase">Lifesteal</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span>Ping</span>
                  </div>
                  <p className="text-xs font-sans font-semibold text-white uppercase">Low Ping</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-white" />
                    <span>Experience</span>
                  </div>
                  <p className="text-xs font-sans font-semibold text-white uppercase">Vanilla</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://lsbd1.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span>Visit Server Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://dsc.gg/lsbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span>Connect On Discord</span>
                  <Compass className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </motion.div>

    </section>
  );
}
