import {useState, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";

/* ─── Icons ─────────────────────────────────────────────── */
const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-[15px] h-[15px] flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        </svg>
    ),
    recipes: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-[15px] h-[15px] flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-4.5 9-10S17 2 12 2z" stroke="currentColor" strokeWidth="1.8"
                  fill="none"/>
            <path d="M8 12s1-3 4-3 4 3 4 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M9 9V7M15 9V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
    ),
    mealPlanner: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-[15px] h-[15px] flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M7 13h4M7 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-[15px] h-[15px] flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none"
                  strokeLinecap="round"/>
            <path d="M17 9l2-2M19 9l-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="20" cy="6" r="1.2" fill="currentColor"/>
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-[15px] h-[15px] flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none"
                  strokeLinecap="round"/>
        </svg>
    ),
    leaf: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-5 h-5 text-white fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
            <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
            <path d="M4 21l8-8"/>
        </svg>
    ),
    plus: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
             strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
        </svg>
    ),
};

/* ─── Nav link definitions ───────────────────────────────── */
const links = [
    {label: "Dashboard", path: "/dashboard", icon: icons.dashboard, end: true},
    {label: "Recipes", path: "/recipes", icon: icons.recipes, end: false},
    {label: "Meal Planner", path: "/meal-planner", icon: icons.mealPlanner, end: false},
    {label: "AI Assistant", path: "/ai-assistant", icon: icons.ai, end: false},
    {label: "Profile", path: "/profile", icon: icons.profile, end: false},
    {label: "Weekly Meal Plan", path: "/weeklyplan", icon: icons.profile, end: false},
];

/* ─── Mobile link icon style override ──────────────────── */
const mobileIconCls = "w-[18px] h-[18px] flex-shrink-0 opacity-60 transition-opacity duration-200";

const mobileIcons = {
    dashboard: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        </svg>
    ),
    recipes: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls}>
            <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-4.5 9-10S17 2 12 2z" stroke="currentColor" strokeWidth="1.8"
                  fill="none"/>
            <path d="M8 12s1-3 4-3 4 3 4 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M9 9V7M15 9V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
    ),
    mealPlanner: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls}>
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M7 13h4M7 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls}>
            <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none"
                  strokeLinecap="round"/>
            <path d="M17 9l2-2M19 9l-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="20" cy="6" r="1.2" fill="currentColor"/>
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none"
                  strokeLinecap="round"/>
        </svg>
    ),
};

const mobileLinksConfig = [
    {label: "Dashboard", path: "/dashboard", icon: mobileIcons.dashboard, end: true},
    {label: "Recipes", path: "/recipes", icon: mobileIcons.recipes, end: false},
    {label: "Meal Planner", path: "/meal-planner", icon: mobileIcons.mealPlanner, end: false},
    {label: "AI Assistant", path: "/ai-assistant", icon: mobileIcons.ai, end: false},
    {label: "Profile", path: "/profile", icon: mobileIcons.profile, end: false},
    {label: "Weekly Meal Plan", path: "/weeklyplan", icon: mobileIcons.profile, end: false}, // Add this
];

/* ─── Component ──────────────────────────────────────────── */
export default function Menubar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/reg" ||
        location.pathname === "/";

    const showFullNav = !isAuthPage;

    /* Scroll detection */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Lock body scroll when mobile menu is open */
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* ── Fixed Navbar ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[9999] h-[68px] border-b border-black/[0.07] transition-all duration-300
                    ${scrolled
                    ? "bg-white/92 shadow-[0_4px_32px_rgba(0,0,0,0.10)] backdrop-blur-[18px] saturate-160"
                    : "bg-white/72 shadow-[0_2px_24px_rgba(0,0,0,0.06)] backdrop-blur-[18px] saturate-160"
                }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center gap-10">

                    {/* Brand */}
                    <NavLink to="/" className="flex items-center gap-2 no-underline flex-shrink-0 group"
                             aria-label="NutriAI Home">
                        <span
                            className="w-9 h-9 rounded-[10px] flex items-center justify-center shadow-[0_2px_10px_rgba(34,197,94,0.35)] transition-all duration-200
                                group-hover:scale-[1.08] group-hover:-rotate-3 group-hover:shadow-[0_4px_18px_rgba(34,197,94,0.45)]"
                            style={{background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"}}
                            aria-hidden="true"
                        >
                            {icons.leaf}
                        </span>
                        <span
                            className="text-[1.35rem] font-bold tracking-tight leading-none"
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                background: "linear-gradient(135deg, #16a34a 0%, #15803d 60%, #166534 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            NutriAI
                        </span>
                    </NavLink>

                    {/* Desktop links */}
                    {showFullNav && (
                        <ul className="flex items-center gap-1 flex-1 list-none m-0 p-0">
                            {links.map(({label, path, icon, end}) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        end={end}
                                        className={({isActive}) =>
                                            `group relative flex items-center gap-1.5 px-3.5 py-[0.45rem] rounded-lg text-[0.815rem] font-medium
                                            tracking-[0.04em] uppercase no-underline whitespace-nowrap transition-all duration-200
                                            ${isActive
                                                ? "text-[#15803d] bg-green-500/10 font-semibold after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-green-400 after:to-green-600"
                                                : "text-[#78716c] hover:text-[#15803d] hover:bg-green-500/[0.08]"
                                            }`
                                        }
                                    >
                                        {icon}
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* CTA button (desktop) */}
                    {showFullNav && (
                        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
                            <NavLink
                                to="/meal-planner"
                                className="hidden md:flex items-center gap-1.5 px-[1.1rem] py-[0.45rem] rounded-lg text-white text-[0.815rem] font-semibold
                                    tracking-[0.03em] no-underline shadow-[0_2px_10px_rgba(34,197,94,0.3)] transition-all duration-[180ms]
                                    hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(34,197,94,0.4)] hover:opacity-93 active:translate-y-0"
                                style={{background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"}}
                                aria-label="Plan your meal"
                            >
                                {icons.plus}
                                Plan Meal
                            </NavLink>
                        </div>
                    )}

                    {/* Hamburger (mobile) */}
                    {showFullNav && (
                        <button
                            id="mobile-menu-toggle"
                            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 border-none rounded-lg cursor-pointer gap-[5px]
                                ml-auto flex-shrink-0 transition-colors duration-200
                                ${open ? "bg-green-500/10" : "bg-black/[0.04] hover:bg-green-500/10"}`}
                            onClick={() => setOpen(prev => !prev)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            <span
                                className={`block w-5 h-0.5 rounded-sm bg-[#57534e] transition-transform duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`}/>
                            <span
                                className={`block h-0.5 rounded-sm bg-[#57534e] transition-all duration-200 origin-center ${open ? "w-0 opacity-0" : "w-5 opacity-100"}`}/>
                            <span
                                className={`block w-5 h-0.5 rounded-sm bg-[#57534e] transition-transform duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`}/>
                        </button>
                    )}
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            {showFullNav && (
                <div
                    id="mobile-menu"
                    className={`fixed top-[68px] left-0 right-0 bg-white/97 backdrop-blur-[16px] border-b border-black/[0.08]
                        shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-6 pt-4 pb-6 flex flex-col gap-1 z-[9998]
                        transition-all duration-[250ms]
                        ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                    aria-hidden={!open}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                >
                    {mobileLinksConfig.map(({label, path, icon, end}) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={end}
                            onClick={() => setOpen(false)}
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-3 rounded-[10px] text-[0.9rem] font-medium
                                tracking-[0.04em] uppercase no-underline transition-all duration-200
                                ${isActive
                                    ? "text-[#15803d] bg-green-500/[0.08] font-semibold [&>svg]:opacity-100"
                                    : "text-[#57534e] hover:text-[#15803d] hover:bg-green-500/[0.08] [&>svg]:hover:opacity-100"
                                }`
                            }
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}

                    <div className="h-px bg-black/[0.06] my-2 rounded-sm"/>

                    <NavLink
                        to="/meal-planner"
                        className="flex items-center justify-center gap-1.5 px-[1.1rem] py-[0.45rem] rounded-lg text-white text-[0.815rem]
                            font-semibold tracking-[0.03em] no-underline mt-1 shadow-[0_2px_10px_rgba(34,197,94,0.3)]
                            transition-all duration-[180ms] hover:opacity-93 active:scale-[0.98]"
                        style={{background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"}}
                        onClick={() => setOpen(false)}
                    >
                        {icons.plus}
                        Plan My Meal
                    </NavLink>
                </div>
            )}
        </>
    );
}