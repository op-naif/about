import { motion } from 'motion/react';
import { Layers, Video, Users, Gamepad2 } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: 'Minecraft',
      desc: 'Creating custom worlds, survival gameplay, and community projects with high-fidelity design.',
    },
    {
      icon: <Video className="w-6 h-6 text-white" />,
      title: 'Content Creator',
      desc: 'Publishing gameplay guides, tutorials, and short-form highlights on YouTube and TikTok.',
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Community Manager',
      desc: 'Managing and owning active online gaming networks and multiplayer server communities.',
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      title: 'Multi-Genre Explorer',
      desc: 'Exploring diverse titles, including interactive car simulators and next-gen gaming experiences.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section id="about" className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      
      {/* Premium Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Layout: Biography (Left) & Bento Glass Focus Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Biography Text */}
        <motion.div 
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Profile</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Welcome! I'm <span className="underline decoration-white/20 decoration-wavy underline-offset-8">OP NAiF</span>
          </h2>

          <div className="text-neutral-300 space-y-4 text-base md:text-lg leading-relaxed font-sans font-light">
            <p>
              I'm a gaming content creator focused on building immersive communities, exploring diverse virtual environments, and crafting tailored Minecraft experiences.
            </p>
            <p>
              By continuously refining content pipelines and managing active communities, I aim to provide unique, highly engaging, and entertaining digital spaces for players around the globe.
            </p>
          </div>
        </motion.div>

        {/* Right Column - Bento Grid of Focus Areas (100% Glassmorphism) */}
        <div className="lg:col-span-7 w-full">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group liquid-glass rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Internal Glow Accent */}
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors duration-500" />
                
                {/* Icon block */}
                <div className="relative z-10 p-3 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-300 mb-5">
                  {pillar.icon}
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-heading font-semibold text-white text-lg tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
