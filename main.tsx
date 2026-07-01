import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Monitor, HardDrive, Smartphone, CircuitBoard, LayoutGrid, Info } from 'lucide-react';

export default function SpecsSection() {
  const [activeDevice, setActiveDevice] = useState<'pc' | 'phone'>('pc');
  const [selectedPCComponent, setSelectedPCComponent] = useState<string>('CPU');

  const pcSpecs = [
    { key: 'CPU', val: 'AMD Ryzen 5 7500F', category: 'Processor', desc: '6-Core, 12-Thread desktop processor based on Zen 4 architecture with excellent gaming speeds.' },
    { key: 'GPU', val: 'ZOTAC RTX 3060 Twin Edge 12GB', category: 'Graphics Card', desc: '12GB VRAM supporting Real-Time Ray Tracing and DLSS AI upscaling for supreme frame rates.' },
    { key: 'Motherboard', val: 'MSI PRO B650M-E DDR5', category: 'Mainboard', desc: 'Solid AMD AM5 motherboard designed to host next-gen DDR5 and PCIe 4.0 storage standards.' },
    { key: 'RAM', val: '16GB (2×8GB) DDR5 4800MHz', category: 'System Memory', desc: 'Dual-Channel high-performance DDR5 configuration ensuring high-bandwidth game loading.' },
    { key: 'Storage', val: 'Team MP44L 1TB PCIe Gen4 NVMe SSD', category: 'Primary Drive', desc: 'Ultra-fast read/write NVMe storage with PCIe Gen 4 lanes for rapid booting & server loading.' },
    { key: 'CPU Cooler', val: 'DeepCool AK400', category: 'Thermal Cooling', desc: 'High-performance single-tower air cooler with solid dissipation power and low noise index.' },
    { key: 'Power Supply', val: 'OCPC Energia 650W 80+ Bronze', category: 'Power Unit', desc: 'Reliable 650-watt power supply unit certified 80+ Bronze for power efficiency.' },
    { key: 'Case', val: 'OVO F919-B Micro-ATX with 5 ARGB Fans', category: 'Chassis', desc: 'Chic micro-ATX cabinet populated with five addressable RGB fans for high airflow.' },
    { key: 'Monitor', val: 'ViewSonic VA2214-H 22" Full HD IPS 100Hz', category: 'Visual Display', desc: '22" Full HD display utilizing vibrant IPS colors with fluid 100Hz refresh latency.' },
  ];

  const phoneSpecs = [
    { key: 'Device', val: 'Redmi 12', icon: <Smartphone className="w-5 h-5" /> },
    { key: 'Processor', val: 'MediaTek Helio G88', icon: <Cpu className="w-5 h-5" /> },
    { key: 'Memory', val: '6GB RAM', icon: <LayoutGrid className="w-5 h-5" /> },
    { key: 'Storage', val: '128GB Storage', icon: <HardDrive className="w-5 h-5" /> },
  ];

  const activePCItem = pcSpecs.find(item => item.key === selectedPCComponent) || pcSpecs[0];

  const headerVariants = {
    hidden: { opacity: 0, y: -25, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="specs" className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white/[0.01] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-white/[0.01] pointer-events-none" />

      {/* Visual Header */}
      <motion.div 
        className="flex flex-col items-center text-center gap-4 mb-16"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
          <CircuitBoard className="w-4 h-4 text-white" />
          <span>My Setup</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Hardware & Specs
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest max-w-lg">
          The hardware I use for gaming and content creation
        </p>
      </motion.div>

      {/* Primary Console Switcher */}
      <div className="flex justify-center mb-12">
        <div className="p-1 rounded-xl bg-neutral-950/60 border border-white/10 flex gap-2 backdrop-blur-md">
          <button
            onClick={() => {
              setActiveDevice('pc');
              setSelectedPCComponent('CPU');
            }}
            className={`px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeDevice === 'pc' 
                ? 'bg-white text-black' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Desktop Rig</span>
          </button>
          
          <button
            onClick={() => {
              setActiveDevice('phone');
            }}
            className={`px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeDevice === 'phone' 
                ? 'bg-white text-black' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile Device</span>
          </button>
        </div>
      </div>

      {/* Main Specifications Visualizer Board */}
      <AnimatePresence mode="wait">
        {activeDevice === 'pc' ? (
          <motion.div 
            key="pc-specs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Left Block: Interactive Component Checklist (7 cols) */}
            <motion.div 
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {pcSpecs.map((spec) => {
                const isSelected = selectedPCComponent === spec.key;
                return (
                  <motion.button
                    key={spec.key}
                    variants={itemVariants}
                    onClick={() => setSelectedPCComponent(spec.key)}
                    className={`relative p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                      isSelected 
                        ? 'backdrop-blur-xl bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02]' 
                        : 'backdrop-blur-md bg-white/[0.03] text-white border-white/10 hover:border-white/20 hover:bg-white/[0.06] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    {/* Subtle Grid overlay inside checklist */}
                    <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-mono uppercase tracking-widest ${isSelected ? 'text-black/60' : 'text-neutral-500'}`}>
                        {spec.category}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-800' : 'text-neutral-400'}`}>
                        {spec.key}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm sm:text-base tracking-tight leading-tight">
                      {spec.val}
                    </h4>

                    {/* Visual selection tick indicator */}
                    {isSelected && (
                      <div className="absolute right-2 bottom-2 w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Right Block: Immersive 3D HUD Hardware Details (5 cols) */}
            <div className="lg:col-span-5 relative w-full h-full min-h-[380px]">
              <div className="sticky top-24 liquid-glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between min-h-[380px] overflow-hidden group">
                
                {/* Circuit matrix decorative backdrop */}
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activePCItem.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-6 transform-style-3d"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-white" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">Component Specs</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Selected Subsystem
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                        {activePCItem.key}
                      </h3>
                    </div>

                    <div className="space-y-3 bg-neutral-950/40 p-5 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Hardware Designation
                      </div>
                      <p className="text-base font-mono text-white tracking-tight leading-snug">
                        {activePCItem.val}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        <span>Technical Overview</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                        {activePCItem.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Technical footprint footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>STAGE: DESKTOP_Rig</span>
                  <span>HW-KEY: {activePCItem.key}</span>
                </div>

              </div>
            </div>

          </motion.div>
        ) : (
          /* Phone Specifications visual card representation */
          <motion.div 
            key="phone-specs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto liquid-glass rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
          >
            
            <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-white" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">Mobile Specs</span>
                </div>
                <span className="text-[10px] font-mono bg-white/10 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  Redmi Series
                </span>
              </div>

              {/* Simulated smartphone structural blueprint */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phoneSpecs.map((spec, i) => (
                  <motion.div 
                    key={spec.key}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                    className="p-5 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10 flex items-start gap-4 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white shrink-0">
                      {spec.icon}
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        {spec.key}
                      </span>
                      <span className="block font-display font-bold text-white text-base tracking-tight">
                        {spec.val}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive simulated phone render illustration */}
              <div className="pt-4 flex justify-center">
                <div className="w-full max-w-sm p-4 rounded-xl bg-neutral-950/40 border border-white/5 text-center text-[10px] font-mono text-neutral-400">
                  MediaTek Helio G88 Platform • 128GB Flash Architecture
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
