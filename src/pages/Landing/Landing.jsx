import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────
   INLINE SVG ICONS
   ────────────────────────────────────────────────────────────── */
const LeafIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z" />
    <path d="M4 21l8-8" />
  </svg>
);

const AppleIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-1 0-2.5 1-2.5 1S8 2 7 2C5 2 3 4 3 7c0 4 4 9 9 14 5-5 9-10 9-14 0-3-2-5-4-5-1 0-2.5 1-2.5 1S13 2 12 2z" />
    <path d="M12 2V5" />
  </svg>
);

const ChartIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 17V13M12 17V9M17 17V5" />
  </svg>
);

const FireIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4-2 7-6 7-10 0-3-1.5-5-3-6.5-.5-.5-1.5 0-1.5.7 0 1-1 2-2 2-1.5 0-2-1.5-2-3 0-2-1-4-2.5-5.5C7.5-.8 6.5-.3 6 .3 4 3 3 6 3 9c0 6 4 11 9 13z" />
  </svg>
);

const TargetIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5", filled = true }) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BrainIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2a4 4 0 0 1 4-4z" />
    <path d="M6 8a4 4 0 0 0-2 7.5" />
    <path d="M18 8a4 4 0 0 1 2 7.5" />
    <path d="M4 15.5A3.5 3.5 0 0 0 7.5 22H12" />
    <path d="M20 15.5A3.5 3.5 0 0 1 16.5 22H12" />
    <path d="M12 8v14" />
  </svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   ANIMATED COUNTER HOOK
   ────────────────────────────────────────────────────────────── */
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return [count, ref];
}

/* ──────────────────────────────────────────────────────────────
   LANDING COMPONENT
   ────────────────────────────────────────────────────────────── */
const Landing = () => {
  const navigate = useNavigate();
  const [mealsCount, mealsRef] = useCountUp(23, 2000);
  const [usersCount, usersRef] = useCountUp(98, 1800);
  const [savedCount, savedRef] = useCountUp(200, 2200);
  const [healthCount, healthRef] = useCountUp(50, 1600);

  return (
    <>
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-2deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 4.5s ease-in-out infinite; }
        .animate-fade-up { animation: fadeInUp 0.8s ease-out both; }
        .animate-fade-left { animation: fadeInLeft 0.8s ease-out both; }
        .animate-fade-right { animation: fadeInRight 0.8s ease-out both; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out both; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div className="w-full overflow-x-hidden bg-white">

        {/* ╔═══════════════════════════════════════════════════════╗
           ║                   HERO SECTION                        ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(170deg, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 50%, #ffffff 75%)",
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large blurred circle top-right */}
            <div
              className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }}
            />
            {/* Small blurred circle bottom-left */}
            <div
              className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
            />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #166534 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-16 md:py-20">
            <div className="flex flex-col items-center text-center">

              {/* Eyebrow badge */}
              <div
                className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                  border border-green-200/60 bg-white/70 backdrop-blur-sm shadow-[0_2px_12px_rgba(34,197,94,0.1)]"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700 tracking-wide">
                  AI-Powered Nutrition Planning
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold
                  leading-[1.1] tracking-tight text-gray-900 max-w-4xl mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Elevate your health with{" "}
                <br className="hidden sm:block" />
                Elite{" "}
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl
                      shadow-[0_4px_15px_rgba(34,197,94,0.35)]"
                    style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                  >
                    <LeafIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </span>
                </span>{" "}
                <span
                  className="animate-gradient"
                  style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 25%, #15803d 50%, #16a34a 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  NutriAI
                </span>{" "}
                Expertise
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-up delay-200 text-base sm:text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
                We help health-conscious people optimize nutrition, generate AI-powered meal plans,
                and track macros — so you can achieve your wellness goals with expert-level precision.
              </p>

              {/* CTA buttons */}
              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center gap-4 mb-14">
                <button
                  id="hero-cta-primary"
                  onClick={() => navigate("/reg")}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-white
                    font-semibold text-base tracking-wide shadow-[0_4px_20px_rgba(34,197,94,0.35)]
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,197,94,0.45)]
                    active:translate-y-0 cursor-pointer overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                >
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRightIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 animate-shimmer rounded-xl" />
                </button>

                <button
                  id="hero-cta-secondary"
                  onClick={() => {
                    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-green-700
                    font-semibold text-base tracking-wide border-2 border-green-200 bg-white/60 backdrop-blur-sm
                    transition-all duration-300 hover:border-green-400 hover:bg-green-50/60 hover:-translate-y-0.5
                    hover:shadow-[0_4px_15px_rgba(34,197,94,0.15)] cursor-pointer"
                >
                  Learn More
                </button>
              </div>

              {/* Floating badges around hero */}
              <div className="relative w-full max-w-3xl h-[100px] sm:h-[120px]">

                {/* Badge: Meals Planned */}
                <div
                  className="animate-float absolute left-0 sm:left-8 top-0 flex items-center gap-2.5 px-4 py-2.5
                    rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100/80"
                  style={{ animationDelay: "0s" }}
                >
                  <span className="text-lg">🥗</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium leading-none">Meals Planned</span>
                    <span className="text-lg font-bold text-gray-900 leading-tight">
                      <span
                        className="animate-gradient"
                        style={{
                          background: "linear-gradient(135deg, #16a34a, #22c55e)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        2.3M+
                      </span>
                    </span>
                  </div>
                </div>

                {/* Badge: Active Users */}
                <div
                  className="animate-float-slow absolute right-0 sm:right-8 top-0 flex items-center gap-2.5 px-4 py-2.5
                    rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100/80"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">A</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">K</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">R</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium leading-none">Active Users</span>
                    <span className="text-lg font-bold text-gray-900 leading-tight">10K+</span>
                  </div>
                </div>

                {/* Badge: Get Started Free (center bottom) */}
                <div
                  className="animate-float-reverse absolute left-1/2 -translate-x-1/2 bottom-0
                    flex items-center gap-2 px-4 py-2 rounded-full
                    bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_4px_20px_rgba(34,197,94,0.3)]"
                  style={{ animationDelay: "0.6s" }}
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">AI-Powered Accuracy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom curve separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
              <path d="M0 80L1440 80L1440 30C1200 60 900 0 720 20C540 40 240 70 0 30L0 80Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║              TRUSTED BRANDS SECTION                   ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section id="trusted-brands" className="py-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-400 tracking-[0.15em] uppercase mb-8">
                Trusted by health-conscious brands
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-40 hover:opacity-60 transition-opacity duration-500">
                {[
                  { name: "GreenFit", icon: "🌿" },
                  { name: "CoreOS", icon: "⚡" },
                  { name: "FrequenCI", icon: "📊" },
                  { name: "KinetiQ", icon: "🔬" },
                  { name: "VitalEdge", icon: "💚" },
                ].map(({ name, icon }) => (
                  <div key={name} className="flex items-center gap-2 text-gray-600">
                    <span className="text-xl">{icon}</span>
                    <span className="text-base font-bold tracking-wide">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║           CORE PHILOSOPHY SECTION                     ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section
          id="philosophy"
          className="py-20 md:py-28"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8faf9 100%)" }}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: Text content */}
              <div className="animate-fade-left">
                <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600
                  text-xs font-semibold tracking-wide uppercase mb-5 border border-green-100">
                  Our Approach
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Our Core{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Nutrition
                  </span>{" "}
                  Philosophy
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                  We focus on blending creativity with performance to deliver
                  AI-driven meal plans that go far beyond generic recipes —
                  they create lasting health impressions and inspire action.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    "Personalized AI recommendations based on your goals",
                    "Smart macro & calorie tracking with real-time insights",
                    "Evidence-based nutrition backed by scientific research",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Floating dashboard cards */}
              <div className="relative animate-fade-right min-h-[380px] sm:min-h-[420px]">
                {/* Main card */}
                <div
                  className="animate-float-slow absolute top-0 right-0 sm:right-8 w-[280px] sm:w-[300px]
                    rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100/60 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Weekly Overview</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Live</span>
                  </div>
                  {/* Mini chart bars */}
                  <div className="flex items-end gap-2 h-[80px] mb-4">
                    {[65, 80, 45, 90, 70, 85, 60].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-md transition-all duration-300"
                        style={{
                          height: `${h}%`,
                          background: i === 3
                            ? "linear-gradient(180deg, #22c55e, #16a34a)"
                            : "linear-gradient(180deg, #e5e7eb, #d1d5db)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                    <span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Overlay card — Calories */}
                <div
                  className="animate-float absolute top-[180px] sm:top-[200px] left-0 sm:left-4 w-[200px]
                    rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-gray-100/60 p-4"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                    >
                      <FireIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Calories</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">1,847</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-green-600 font-semibold">↓ 12%</span>
                    <span className="text-xs text-gray-400">vs last week</span>
                  </div>
                </div>

                {/* Badge — improvement */}
                <div
                  className="animate-float-reverse absolute bottom-4 right-4 sm:right-12
                    flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white
                    shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-gray-100/60"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                  >
                    <ChartIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 leading-none">+72%</span>
                    <span className="text-[11px] text-gray-400 font-medium">Health Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║            FEATURES SECTION                           ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section
          id="features"
          className="py-20 md:py-28"
          style={{ background: "linear-gradient(180deg, #f8faf9 0%, #f0fdf4 50%, #f8faf9 100%)" }}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600
                text-xs font-semibold tracking-wide uppercase mb-4 border border-green-100">
                Features
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Everything You Need for{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Better Health
                </span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                Powerful AI tools designed to make nutrition effortless, personalized, and effective.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BrainIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
                  title: "AI Meal Planning",
                  desc: "Generate personalized meal plans in seconds using advanced AI that understands your dietary needs, preferences, and goals.",
                },
                {
                  icon: <FireIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #f97316, #ea580c)",
                  title: "Calorie Tracking",
                  desc: "Effortlessly log and monitor your daily caloric intake with smart auto-detection and real-time macro breakdowns.",
                },
                {
                  icon: <TargetIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  title: "Goal Setting",
                  desc: "Set weight loss, muscle gain, or maintenance goals and get AI-adjusted plans that evolve with your progress.",
                },
                {
                  icon: <AppleIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #ec4899, #db2777)",
                  title: "Smart Recipes",
                  desc: "Access thousands of curated recipes filtered by dietary preferences, cooking time, and nutritional requirements.",
                },
                {
                  icon: <ShieldIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  title: "Allergy Safe",
                  desc: "Automatically exclude allergens and dietary restrictions from all meal suggestions and recipe recommendations.",
                },
                {
                  icon: <ClockIcon className="w-6 h-6 text-white" />,
                  gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  title: "Weekly Plans",
                  desc: "Get complete 7-day meal plans with shopping lists, prep schedules, and nutritional balance analysis.",
                },
              ].map(({ icon, gradient, title, desc }, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white border border-gray-100/80
                    shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300
                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-green-100/60"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5
                      shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110"
                    style={{ background: gradient }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║           STATS / GROWTH SECTION                      ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section id="stats" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                See Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Health Transformation
                </span>
              </h2>
              <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
                Real results from real users who transformed their nutrition with NutriAI.
              </p>
            </div>

            {/* Star rating */}
            <div className="flex justify-center items-center gap-1.5 mb-12">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="w-6 h-6 text-amber-400" filled={star <= 4} />
              ))}
              <span className="text-sm text-gray-500 ml-2 font-medium">4.9 / 5.0 average rating</span>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Stat 1 — Meals */}
              <div
                ref={mealsRef}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1
                  border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mealsCount}.3M+
                </div>
                <div className="text-sm text-gray-400 font-medium mb-3">Meals planned globally</div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: "92%",
                      background: "linear-gradient(90deg, #22c55e, #16a34a)",
                    }}
                  />
                </div>
              </div>

              {/* Stat 2 — Accuracy */}
              <div
                ref={usersRef}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1
                  border-2 border-green-200 shadow-[0_4px_20px_rgba(34,197,94,0.12)]"
                style={{ background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-600 text-lg font-bold">↑</span>
                  <span className="text-3xl font-bold text-gray-900">{usersCount}%</span>
                </div>
                <div className="text-sm text-gray-500 font-medium mb-3">Nutrition accuracy rate</div>
                <div className="h-1.5 rounded-full bg-green-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: "98%",
                      background: "linear-gradient(90deg, #22c55e, #16a34a)",
                    }}
                  />
                </div>
              </div>

              {/* Stat 3 — Saved */}
              <div
                ref={savedRef}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1
                  border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${savedCount}+
                </div>
                <div className="text-sm text-gray-400 font-medium mb-3">Avg. monthly savings</div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: "78%",
                      background: "linear-gradient(90deg, #f97316, #ea580c)",
                    }}
                  />
                </div>
              </div>

              {/* Stat 4 — Health */}
              <div
                ref={healthRef}
                className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1
                  border-2 border-green-500 text-white shadow-[0_8px_30px_rgba(34,197,94,0.25)]"
                style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-lg font-bold">↑</span>
                  <span className="text-3xl font-bold text-white">{healthCount}%</span>
                </div>
                <div className="text-sm text-green-100 font-medium mb-3">Healthier meal choices</div>
                <div className="h-1.5 rounded-full bg-green-700/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 bg-white/80"
                    style={{ width: "88%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║          TESTIMONIALS SECTION                         ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section
          id="testimonials"
          className="py-20 md:py-28"
          style={{ background: "linear-gradient(180deg, #f8faf9 0%, #ffffff 100%)" }}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600
                text-xs font-semibold tracking-wide uppercase mb-4 border border-green-100">
                Testimonials
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 leading-[1.15]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What Our Users Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Mitchell",
                  role: "Fitness Enthusiast",
                  initial: "S",
                  gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
                  text: "NutriAI completely changed how I approach meal prep. The AI suggestions are incredibly accurate and save me hours every week.",
                  stars: 5,
                },
                {
                  name: "James Rodriguez",
                  role: "Personal Trainer",
                  initial: "J",
                  gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  text: "I recommend NutriAI to all my clients. The personalized meal plans and macro tracking make it the best nutrition tool available.",
                  stars: 5,
                },
                {
                  name: "Emily Chen",
                  role: "Nutritionist",
                  initial: "E",
                  gradient: "linear-gradient(135deg, #ec4899, #db2777)",
                  text: "The science-backed approach and AI precision in NutriAI is remarkable. It's like having a nutrition assistant that never sleeps.",
                  stars: 5,
                },
              ].map(({ name, role, initial, gradient, text, stars }, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-gray-100/80
                    shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300
                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, s) => (
                      <StarIcon key={s} className="w-4 h-4 text-amber-400" filled />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: gradient }}
                    >
                      {initial}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{name}</div>
                      <div className="text-xs text-gray-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║             FINAL CTA SECTION                         ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <section id="final-cta" className="py-20 md:py-28 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <div
              className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #15803d 0%, #22c55e 50%, #16a34a 100%)" }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-white/5" />

              <div className="relative z-10">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white leading-[1.15] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Ready to Transform Your Nutrition?
                </h2>
                <p className="text-green-100 text-base max-w-lg mx-auto mb-8 leading-relaxed">
                  Join thousands of users who have already revolutionized their
                  health journey with NutriAI's intelligent meal planning.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    id="cta-get-started"
                    onClick={() => navigate("/reg")}
                    className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                      bg-white text-green-700 font-semibold text-base
                      shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300
                      hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] cursor-pointer"
                  >
                    Get Started Free
                    <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    id="cta-login"
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                      text-white font-semibold text-base border-2 border-white/30
                      transition-all duration-300 hover:bg-white/10 hover:border-white/60 cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔═══════════════════════════════════════════════════════╗
           ║                    FOOTER                             ║
           ╚═══════════════════════════════════════════════════════╝ */}
        <footer className="py-10 border-t border-gray-100 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]"
                  style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                >
                  <LeafIcon className="w-4 h-4 text-white" />
                </span>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  NutriAI
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="hover:text-green-600 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-green-600 cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-green-600 cursor-pointer transition-colors">Contact</span>
              </div>

              {/* Copyright */}
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} NutriAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Landing;