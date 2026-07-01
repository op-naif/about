import { ArrowDown, Gamepad2 } from 'lucide-react';

export default function InteractiveHero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('socials');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-20 pb-16 overflow-hidden select-none">
      {/* Decorative vertical lines on sides */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      {/* Hero Headline Group with Staggered Visual Entry */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center z-10">
        
        {/* Master Logo Text */}
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white uppercase glow-text leading-none select-none transition-transform duration-500 hover:scale-[1.02] whitespace-nowrap">
          OP NAiF
        </h1>

        <p className="mt-4 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-neutral-400">
          Minecraft Creator • Content Creator • Community Builder
        </p>

        {/* Short, elegant, high-contrast tagline/about description to replace the box */}
        <p className="mt-8 text-neutral-300 max-w-xl text-sm sm:text-base leading-relaxed font-sans font-light">
          Hi, I am OP NAiF. I manage gaming server networks, construct customized Minecraft environments, and create engaging digital tutorials and guides.
        </p>

        {/* Scroll CTA Indicator */}
        <button
          onClick={scrollToNext}
          className="mt-16 group flex flex-col items-center gap-2 cursor-pointer z-10 transition-all duration-300 hover:text-white text-neutral-400 font-mono text-[10px] tracking-[0.25em] uppercase"
        >
          <span>Explore Socials</span>
          <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300 animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-white" />
          </div>
        </button>

      </div>
    </section>
  );
}
