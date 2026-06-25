import {useState, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";

/* ─── Icons (Cal.com-style — thin, 1.5 stroke) ───────────────── */
const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
    ),
    recipes: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-4.5 9-10S17 2 12 2z"/>
            <path d="M8 12s1-3 4-3 4 3 4 3"/>
            <path d="M9 9V7M15 9V7"/>
        </svg>
    ),
    mealPlanner: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="17" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M8 4V2M16 4V2"/>
            <path d="M7 13h4M7 17h8"/>
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            <path d="M17 9l2-2M19 9l-2-2"/>
            <circle cx="20" cy="6" r="1.2" fill="currentColor"/>
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
    ),
    leaf: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
            <path d="M4 21l8-8"/>
        </svg>
    ),
    plus: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
        </svg>
    ),
};

/* ─── Nav link definitions ───────────────────────────────── */
const links = [
    {label: "Dashboard", path: "/dashboard", icon: icons.dashboard, end: true},
    {label: "Recipes", path: "/recipes", icon: icons.recipes, end: false},
    {label: "Admin",path: "/admin", icon: icons.test, end: false},
    {label: "AI Assistant", path: "/ai-assistant", icon: icons.ai, end: false},
    {label: "Profile", path: "/profile", icon: icons.profile, end: false},
    {label: "Weekly Meal Plan", path: "/weeklyplan", icon: icons.profile, end: false},
];

/* ─── Mobile link icon style override ──────────────────── */
const mobileIconCls = "w-4 h-4 flex-shrink-0";

const mobileIcons = {
    dashboard: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
    ),
    recipes: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-4.5 9-10S17 2 12 2z"/>
            <path d="M8 12s1-3 4-3 4 3 4 3"/>
            <path d="M9 9V7M15 9V7"/>
        </svg>
    ),
    mealPlanner: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="17" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M8 4V2M16 4V2"/>
            <path d="M7 13h4M7 17h8"/>
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            <path d="M17 9l2-2M19 9l-2-2"/>
            <circle cx="20" cy="6" r="1.2" fill="currentColor"/>
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={mobileIconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
    ),
};

const mobileLinksConfig = [
    {label: "Dashboard", path: "/dashboard", icon: mobileIcons.dashboard, end: true},
    {label: "Recipes", path: "/recipes", icon: mobileIcons.recipes, end: false},
    {label: "Meal Planner", path: "/meal-planner", icon: mobileIcons.mealPlanner, end: false},
    {label: "AI Assistant", path: "/ai-assistant", icon: mobileIcons.ai, end: false},
    {label: "Profile", path: "/profile", icon: mobileIcons.profile, end: false},
    {label: "Weekly Meal Plan", path: "/weeklyplan", icon: mobileIcons.profile, end: false},
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
            {/* ── Fixed Navbar (Cal.com: solid white, subtle border) ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[9999] h-[56px] border-b transition-all duration-150
                    ${scrolled
                    ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-gray-200"
                    : "bg-white border-gray-200"
                }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center gap-8">

                    {/* Brand (Cal.com: flat text, no gradient) */}
                    <NavLink to="/" className="flex items-center gap-2 no-underline flex-shrink-0 group"
                             aria-label="NutriAI Home">
                        <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900 transition-transform duration-150
                                group-hover:scale-105"
                            aria-hidden="true"
                        >
                            {icons.leaf}
                        </span>
                        <span className="text-lg font-bold tracking-tight leading-none text-gray-900">
                            NutriAI
                        </span>
                    </NavLink>

                    {/* Desktop links (Cal.com: text-only, no uppercase, subtle hover) */}
                    {showFullNav && (
                        <ul className="hidden md:flex items-center gap-1 flex-1 list-none m-0 p-0">
                            {links.map(({label, path, end}) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        end={end}
                                        className={({isActive}) =>
                                            `relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                                            no-underline whitespace-nowrap transition-colors duration-150
                                            ${isActive
                                                ? "text-gray-900 bg-gray-100"
                                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* CTA button (Cal.com: solid dark, no gradient) */}
                    {showFullNav && (
                        <div className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0">
                            <NavLink
                                to="/meal-planner"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-white text-sm font-medium
                                    no-underline bg-gray-900 transition-all duration-150
                                    hover:bg-gray-800 active:scale-[0.98]"
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
                            className={`md:hidden flex flex-col justify-center items-center w-9 h-9 border-none rounded-md cursor-pointer gap-[5px]
                                ml-auto flex-shrink-0 transition-colors duration-150
                                ${open ? "bg-gray-100" : "bg-transparent hover:bg-gray-100"}`}
                            onClick={() => setOpen(prev => !prev)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            <span
                                className={`block w-[18px] h-0.5 rounded-full bg-gray-700 transition-all duration-200 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`}/>
                            <span
                                className={`block h-0.5 rounded-full bg-gray-700 transition-all duration-200 origin-center ${open ? "w-0 opacity-0" : "w-[18px] opacity-100"}`}/>
                            <span
                                className={`block w-[18px] h-0.5 rounded-full bg-gray-700 transition-all duration-200 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`}/>
                        </button>
                    )}
                </div>
            </nav>

            {/* ── Mobile Drawer (Cal.com: clean white, no blur) ── */}
            {showFullNav && (
                <div
                    id="mobile-menu"
                    className={`fixed top-[56px] left-0 right-0 bg-white border-b border-gray-200
                        shadow-[0_4px_12px_rgba(0,0,0,0.05)] px-4 pt-3 pb-5 flex flex-col gap-0.5 z-[9998]
                        transition-all duration-200 ease-out
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
                                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                                no-underline transition-colors duration-150
                                ${isActive
                                    ? "text-gray-900 bg-gray-100"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                }`
                            }
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}

                    <div className="h-px bg-gray-200 my-2"/>

                    <NavLink
                        to="/meal-planner"
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-white text-sm
                            font-medium no-underline bg-gray-900 transition-colors duration-150
                            hover:bg-gray-800 active:scale-[0.98]"
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