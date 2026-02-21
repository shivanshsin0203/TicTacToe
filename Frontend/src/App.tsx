import { useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";

const NEON_COLORS = ["#00fff5", "#ff00e5", "#b400ff", "#4d7cff"];

// Floating particle component
function Particle({
  delay,
  left,
  size,
  color,
  duration,
}: {
  delay: number;
  left: number;
  size: number;
  color: string;
  duration: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "-10px",
        background: `radial-gradient(circle, ${color}80, transparent)`,
        animation: `particle-drift ${duration}s linear ${delay}s infinite`,
      }}
    />
  );
}

// Animated Tic Tac Toe grid
function NeonGrid() {
  const symbols = ["X", "O", "X", "", "X", "O", "O", "", "O"];
  const delays = [0.2, 0.5, 0.3, 0, 0.8, 0.6, 0.4, 0, 1.0];

  return (
    <div className="relative animate-float">
      {/* Glow backdrop */}
      <div className="absolute -inset-8 bg-linear-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-magenta/10 rounded-3xl blur-3xl" />

      <div className="relative grid grid-cols-3 gap-0 w-64 h-64 md:w-80 md:h-80">
        {symbols.map((symbol, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center"
            style={{
              borderRight:
                i % 3 !== 2 ? "1px solid rgba(0, 255, 245, 0.3)" : "none",
              borderBottom: i < 6 ? "1px solid rgba(0, 255, 245, 0.3)" : "none",
              boxShadow: "inset 0 0 20px rgba(0, 255, 245, 0.03)",
            }}
          >
            {symbol && (
              <span
                className={`text-4xl md:text-5xl font-bold select-none ${
                  symbol === "X"
                    ? "text-neon-cyan drop-shadow-[0_0_12px_rgba(0,255,245,0.8)]"
                    : "text-neon-magenta drop-shadow-[0_0_12px_rgba(255,0,229,0.8)]"
                }`}
                style={{
                  animation: `symbol-pop 0.6s ease-out ${delays[i]}s both`,
                }}
              >
                {symbol}
              </span>
            )}
          </div>
        ))}

        {/* Neon border lines */}
        <div
          className="absolute top-0 w-[2px] h-full bg-linear-to-b from-transparent via-neon-cyan to-transparent"
          style={{
            left: "33.33%",
            boxShadow: "0 0 8px #00fff5, 0 0 20px rgba(0, 255, 245, 0.4)",
          }}
        />
        <div
          className="absolute top-0 w-[2px] h-full bg-linear-to-b from-transparent via-neon-cyan to-transparent"
          style={{
            left: "66.66%",
            boxShadow: "0 0 8px #00fff5, 0 0 20px rgba(0, 255, 245, 0.4)",
          }}
        />
        <div
          className="absolute left-0 h-[2px] w-full bg-linear-to-r from-transparent via-neon-magenta to-transparent"
          style={{
            top: "33.33%",
            boxShadow: "0 0 8px #ff00e5, 0 0 20px rgba(255, 0, 229, 0.4)",
          }}
        />
        <div
          className="absolute left-0 h-[2px] w-full bg-linear-to-r from-transparent via-neon-magenta to-transparent"
          style={{
            top: "66.66%",
            boxShadow: "0 0 8px #ff00e5, 0 0 20px rgba(255, 0, 229, 0.4)",
          }}
        />
      </div>
    </div>
  );
}

function App() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      duration: 8 + Math.random() * 6,
    })),
  );

  const heroRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = heroRef.current;
    if (el) {
      el.classList.remove("opacity-0", "translate-y-8");
      el.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06060f]">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 245, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 245, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow spots */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon-cyan/[0.07] blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-magenta/[0.07] blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/4 blur-[120px]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          delay={p.delay}
          left={p.left}
          size={p.size}
          color={p.color}
          duration={p.duration}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Navigation / top bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-[#06060f]/70 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-black font-bold text-sm">
              #
            </div>
            <span className="text-lg font-semibold tracking-tight text-white/90">
              TicTacToe
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="relative text-white/80 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 cursor-pointer"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="relative bg-linear-to-r from-neon-cyan to-neon-purple text-black font-semibold hover:shadow-[0_0_20px_rgba(0,255,245,0.4)] transition-all duration-300 border-0 cursor-pointer"
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </nav>

        {/* Hero section */}
        <div
          ref={heroRef}
          className="flex flex-col items-center gap-12 md:gap-16 transition-all duration-1000 opacity-0 translate-y-8"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-neon-pulse" />
            <span className="text-xs tracking-wider uppercase text-neon-cyan/80">
              Now in Season 1
            </span>
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter">
              <span className="bg-linear-to-r from-neon-cyan via-neon-purple to-neon-magenta bg-clip-text text-transparent animate-shimmer">
                Tic Tac Toe
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-md mx-auto font-light leading-relaxed">
              Challenge players worldwide in the classic game,{" "}
              <span className="text-neon-cyan/80">reimagined</span> with a neon
              twist.
            </p>
          </div>

          {/* Neon grid */}
          <NeonGrid />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto relative px-8 py-6 text-base font-semibold bg-linear-to-r from-neon-cyan to-neon-blue text-black rounded-xl hover:shadow-[0_0_30px_rgba(0,255,245,0.5)] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                🚀 Get Started
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl border-neon-purple/40 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/60 hover:shadow-[0_0_20px_rgba(180,0,255,0.3)] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <span className="flex items-center gap-2">🎮 How to Play</span>
            </Button>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-8 md:gap-12 mt-4">
            {[
              { value: "10K+", label: "Players" },
              { value: "50K+", label: "Games Played" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white/90">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#06060f] to-transparent pointer-events-none" />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
