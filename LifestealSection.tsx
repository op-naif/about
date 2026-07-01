import { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    px: 0,
    py: 0,
    vx: 0,
    vy: 0,
    lastPx: 0,
    lastPy: 0,
    scrollSpeedFactor: 1.0,
    lastScrollY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grayscale Shifting Nebulas
    interface Nebula {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    const nebulas: Nebula[] = [
      { 
        x: width * 0.25, 
        y: height * 0.3, 
        radius: 400, 
        vx: 0.18, 
        vy: 0.12, 
        color: 'rgba(255, 255, 255, 0.04)' 
      },
      { 
        x: width * 0.75, 
        y: height * 0.75, 
        radius: 450, 
        vx: -0.15, 
        vy: -0.2, 
        color: 'rgba(200, 200, 200, 0.03)' 
      },
      { 
        x: width * 0.5, 
        y: height * 0.5, 
        radius: 350, 
        vx: 0.1, 
        vy: -0.1, 
        color: 'rgba(255, 255, 255, 0.035)' 
      },
      { 
        x: width * 0.8, 
        y: height * 0.2, 
        radius: 300, 
        vx: -0.1, 
        vy: 0.15, 
        color: 'rgba(180, 180, 180, 0.025)' 
      }
    ];

    // Star Particle definition
    interface Star {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      size: number;
      speedZ: number;
      color: string;
      seed: number;
      pulseSpeed: number;
      phase: number;
    }

    const stars: Star[] = [];
    const maxStars = 180; // Higher density for premium look

    for (let i = 0; i < maxStars; i++) {
      const px = (Math.random() - 0.5) * width * 2.0;
      const py = (Math.random() - 0.5) * height * 2.0;
      stars.push({
        x: px,
        y: py,
        z: Math.random() * width,
        baseX: px,
        baseY: py,
        size: Math.random() * 2.2 + 0.3,
        speedZ: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 
          ? '#ffffff' 
          : Math.random() > 0.5 
          ? '#e0e0e0' 
          : '#9d9d9d',
        seed: Math.random() * 300,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Floating Dust Particle definition
    interface Dust {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      phase: number;
    }

    const dustParticles: Dust[] = [];
    const maxDust = 40;
    for (let i = 0; i < maxDust; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.2 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const state = stateRef.current;
      state.targetX = (e.clientX / window.innerWidth) - 0.5;
      state.targetY = (e.clientY / window.innerHeight) - 0.5;
      state.px = e.clientX;
      state.py = e.clientY;
    };

    const handleScroll = () => {
      const state = stateRef.current;
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - state.lastScrollY);
      
      // Temporarily boost star speed factor based on scroll speed
      state.scrollSpeedFactor = Math.min(6.0, 1.0 + scrollDiff * 0.12);
      state.lastScrollY = currentScrollY;
    };

    // Simple elegant click effects
    interface ClickEffect {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }

    const clickEffects: ClickEffect[] = [];

    const handleMouseDown = (e: MouseEvent) => {
      const state = stateRef.current;
      const clickX = e.clientX;
      const clickY = e.clientY;

      clickEffects.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.9,
      });

      // Blast stars outward from click focus point
      stars.forEach((s) => {
        const scale = 400 / (400 + s.z);
        const mouseOffsetX = -state.x * (width * 0.12) * (1 - scale);
        const mouseOffsetY = -state.y * (height * 0.12) * (1 - scale);
        const screenX = width / 2 + (s.x + mouseOffsetX) * scale;
        const screenY = height / 2 + (s.y + mouseOffsetY) * scale;

        const dx = screenX - clickX;
        const dy = screenY - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 350) {
          const pushForce = (1 - dist / 350) * 110;
          const angle = Math.atan2(dy, dx);
          s.x += (Math.cos(angle) * pushForce) / scale;
          s.y += (Math.sin(angle) * pushForce) / scale;
        }
      });
    };

    // Shooting stars definitions
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      speed: number;
    }

    const shootingStars: ShootingStar[] = [];
    let orbitAngle = 0;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);

    const render = () => {
      const state = stateRef.current;
      
      // Decay scroll speed factor back to baseline of 1.0
      state.scrollSpeedFactor += (1.0 - state.scrollSpeedFactor) * 0.08;

      // Calculate mouse velocity for interactive drag inertia
      state.vx = state.px - state.lastPx;
      state.vy = state.py - state.lastPy;
      state.lastPx = state.px;
      state.lastPy = state.py;

      // Smooth mouse position interpolation (lerp)
      state.x += (state.targetX - state.x) * 0.035;
      state.y += (state.targetY - state.y) * 0.035;

      // Dark background fill
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      // Gradient white coming from above, slightly noticeable
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.5);
      topGrad.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
      topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height * 0.5);

      // 1. Render monochrome cosmic nebulas
      nebulas.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Soft boundaries bounce
        if (n.x < -150 || n.x > width + 150) n.vx *= -1;
        if (n.y < -150 || n.y > height + 150) n.vy *= -1;

        // Adjust for scroll and mouse drift
        const relativeX = n.x + state.x * 70;
        const relativeY = n.y + state.y * 70 - (state.lastScrollY * 0.15) % height;

        const adjustedY = ((relativeY + height) % height);

        const radGrad = ctx.createRadialGradient(
          relativeX,
          adjustedY,
          0,
          relativeX,
          adjustedY,
          n.radius
        );
        radGrad.addColorStop(0, n.color);
        radGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(relativeX, adjustedY, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 1.5 Render Shooting Stars (Diagonally falling streaks of light)
      if (Math.random() < 0.01 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.4),
          vx: Math.random() * 6 + 8,
          vy: Math.random() * 3 + 4,
          alpha: 1.0,
          speed: Math.random() * 0.04 + 0.02,
        });
      }

      for (let idx = shootingStars.length - 1; idx >= 0; idx--) {
        const ss = shootingStars[idx];
        const tailX = ss.x - ss.vx * 2;
        const tailY = ss.y - ss.vy * 2;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Move
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.alpha -= ss.speed;

        if (ss.alpha <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(idx, 1);
        }
      }

      // 1.6 Render Faint Rotating Orbit Paths and Planetesimals
      orbitAngle += 0.0015;
      const centerX = width / 2 + state.x * 60;
      const centerY = height / 2 + state.y * 60 - (state.lastScrollY * 0.1) % height;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;

      // Inner orbit circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.stroke();

      // Outer dashed orbit circle
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 420, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Orbiting points (planets)
      const orbiter1X = centerX + Math.cos(orbitAngle) * 240;
      const orbiter1Y = centerY + Math.sin(orbitAngle) * 240;
      ctx.beginPath();
      ctx.arc(orbiter1X, orbiter1Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

      // Soft glow for orbiter 1
      ctx.beginPath();
      ctx.arc(orbiter1X, orbiter1Y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();

      const orbiter2X = centerX + Math.cos(-orbitAngle * 0.6 + Math.PI) * 420;
      const orbiter2Y = centerY + Math.sin(-orbitAngle * 0.6 + Math.PI) * 420;
      ctx.beginPath();
      ctx.arc(orbiter2X, orbiter2Y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();

      // 2. Render highly responsive cyber grids (black and white theme)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.008)';
      ctx.lineWidth = 1;
      const gridCount = 16;
      for (let i = 1; i < gridCount; i++) {
        // Vertical grid lines with subtle perspective tilt
        const xPos = (width / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(xPos + state.x * 35, 0);
        ctx.lineTo(xPos + state.x * 15, height);
        ctx.stroke();

        // Horizontal grid lines that scroll down smoothly
        const yOffset = (state.lastScrollY * 0.4) % (height / gridCount);
        const yPos = (height / gridCount) * i - yOffset;
        ctx.beginPath();
        ctx.moveTo(0, yPos + state.y * 35);
        ctx.lineTo(width, yPos + state.y * 15);
        ctx.stroke();
      }

      // 3. Render and update simple click effects (replaces heavy ripples)
      for (let idx = clickEffects.length - 1; idx >= 0; idx--) {
        const eff = clickEffects[idx];
        eff.radius += 2.0;
        eff.alpha -= 0.045;
        if (eff.alpha <= 0 || eff.radius >= eff.maxRadius) {
          clickEffects.splice(idx, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${eff.alpha * 0.75})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(eff.x, eff.y, eff.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${eff.alpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(eff.x, eff.y, eff.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Update and render floating dust particles (drifting upwards)
      dustParticles.forEach((dust) => {
        dust.y += dust.speedY;
        dust.x += dust.speedX;
        dust.phase += 0.01;

        // Reset if goes off screen
        if (dust.y < -10) {
          dust.y = height + 10;
          dust.x = Math.random() * width;
        }
        if (dust.x < -10 || dust.x > width + 10) {
          dust.x = Math.random() * width;
        }

        const alphaPulse = dust.alpha * (0.6 + 0.4 * Math.sin(dust.phase));
        
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alphaPulse})`;
        ctx.fill();
      });

      // 5. Render 3D star space field
      const perspective = 400;
      stars.forEach((s) => {
        // Update deep field motion with dynamic speed boost on scroll
        s.z -= s.speedZ * state.scrollSpeedFactor;
        
        if (s.z <= 0) {
          s.z = width;
          s.x = (Math.random() - 0.5) * width * 2.0;
          s.y = (Math.random() - 0.5) * height * 2.0;
        }

        // Project coordinate math
        const scale = perspective / (perspective + s.z);
        
        // Parallax and interactive movement drag
        const mouseOffsetX = -state.x * (width * 0.12) * (1 - scale);
        const mouseOffsetY = -state.y * (height * 0.12) * (1 - scale);

        // Scroll offset drift
        const scrollOffset = state.lastScrollY * 0.25 * scale;

        // Inertia feedback based on mouse speed
        const inertiaX = state.vx * 0.015 * (width / s.z);
        const inertiaY = state.vy * 0.015 * (height / s.z);

        const screenX = width / 2 + (s.x + mouseOffsetX) * scale + inertiaX;
        const screenY = height / 2 + (s.y + mouseOffsetY) * scale - scrollOffset + inertiaY;

        // Warp stretching based on scroll speed factor
        const stretchHeight = s.size * scale * (1.0 + (state.scrollSpeedFactor - 1.0) * 1.5);
        const projectedSize = s.size * scale * 2.0;

        if (screenX >= 0 && screenX <= width && screenY >= -50 && screenY <= height + 50) {
          const alpha = Math.min(1.0, (1.0 - s.z / width) * 1.4);
          
          s.phase += s.pulseSpeed;
          const twinkle = 0.4 + 0.6 * Math.sin(s.phase + s.seed);

          ctx.beginPath();
          if (state.scrollSpeedFactor > 1.5) {
            // Stretch the star into a line (hyperdrive warp)
            ctx.ellipse(screenX, screenY, projectedSize, stretchHeight, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(screenX, screenY, projectedSize, 0, Math.PI * 2);
          }
          
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, alpha * twinkle * 0.6)})`;
          ctx.fill();

          // Connect cursor with magnetic threads (monochrome!)
          if (state.px > 0 && state.py > 0) {
            const dx = screenX - state.px;
            const dy = screenY - state.py;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            if (distToMouse < 200) {
              ctx.beginPath();
              ctx.moveTo(screenX, screenY);
              ctx.lineTo(state.px, state.py);
              
              const connectionIntensity = (1 - distToMouse / 200);
              const mouseConnAlpha = connectionIntensity * 0.08 * alpha;
              
              ctx.strokeStyle = `rgba(255, 255, 255, ${mouseConnAlpha})`;
              ctx.lineWidth = 0.6 + connectionIntensity * 0.5;
              ctx.stroke();
            }
          }

          // Constellation networking (monochrome)
          stars.forEach((s2) => {
            if (s === s2) return;
            const distZ = Math.abs(s.z - s2.z);
            if (distZ < 20) {
              const distX = Math.abs(s.x - s2.x);
              const distY = Math.abs(s.y - s2.y);
              if (distX < 40 && distY < 40) {
                const scale2 = perspective / (perspective + s2.z);
                const screenX2 = width / 2 + (s2.x + mouseOffsetX) * scale2;
                const screenY2 = height / 2 + (s2.y + mouseOffsetY) * scale2 - (state.lastScrollY * 0.25 * scale2);

                ctx.beginPath();
                ctx.moveTo(screenX, screenY);
                ctx.lineTo(screenX2, screenY2);
                
                const connectionTwinkle = 0.3 + 0.7 * Math.sin(s.phase + s2.phase);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.04 * connectionTwinkle})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
              }
            }
          });
        }
      });

      // Interactive mouse trail aura spotlight (monochrome)
      if (state.px > 0 && state.py > 0) {
        const spotlight = ctx.createRadialGradient(
          state.px,
          state.py,
          0,
          state.px,
          state.py,
          300
        );
        spotlight.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
        spotlight.addColorStop(0.5, 'rgba(200, 200, 200, 0.005)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(state.px, state.py, 300, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]"
      />
      {/* Gradient white coming from above, slightly noticeable & eye-catching */}
      <div className="fixed inset-x-0 top-0 h-[35vh] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent pointer-events-none z-[1]" />
    </>
  );
}
