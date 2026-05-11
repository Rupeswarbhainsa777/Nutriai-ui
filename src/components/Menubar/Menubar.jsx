import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Menubar.css";

/* ─── Icons ─────────────────────────────────────────────── */
const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
    ),
    recipes: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-4.5 9-10S17 2 12 2z" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <path d="M8 12s1-3 4-3 4 3 4 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M9 9V7M15 9V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    mealPlanner: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 4V2M16 4V2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M7 13h4M7 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M17 9l2-2M19 9l-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="20" cy="6" r="1.2" fill="currentColor" />
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
    ),
    leaf: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
            <path d="M4 21l8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
};

/* ─── Nav link definitions ───────────────────────────────── */
const links = [
    { label: "Dashboard",    path: "/",              icon: icons.dashboard,   end: true  },
    { label: "Recipes",      path: "/recipes",       icon: icons.recipes,     end: false },
    { label: "Meal Planner", path: "/meal-planner",  icon: icons.mealPlanner, end: false },
    { label: "AI Assistant", path: "/ai-assistant",  icon: icons.ai,          end: false },
    { label: "Profile",      path: "/profile",       icon: icons.profile,     end: false },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Menubar() {
    const [open, setOpen]       = useState(false);
    const [scrolled, setScrolled] = useState(false);

    /* Scroll detection → thicker shadow */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Close mobile menu on route change / outside scroll */
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* ── Fixed Navbar ── */}
            <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
                <div className="navbar-inner">

                    {/* Brand */}
                    <NavLink to="/" className="navbar-brand" aria-label="NutriAI Home">
                        <span className="navbar-brand-icon" aria-hidden="true">
                            {icons.leaf}
                        </span>
                        <span className="navbar-brand-text">NutriAI</span>
                    </NavLink>

                    {/* Desktop links */}
                    <ul className="navbar-links" role="list">
                        {links.map(({ label, path, icon, end }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    end={end}
                                    className={({ isActive }) =>
                                        `navbar-link${isActive ? " active" : ""}`
                                    }
                                >
                                    {icon}
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* CTA button (desktop) */}
                    <div className="navbar-actions">
                        <NavLink to="/meal-planner" className="navbar-cta" aria-label="Plan your meal">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Plan Meal
                        </NavLink>
                    </div>

                    {/* Hamburger (mobile) */}
                    <button
                        id="mobile-menu-toggle"
                        className={`navbar-hamburger${open ? " open" : ""}`}
                        onClick={() => setOpen(prev => !prev)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                    >
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            <div
                id="mobile-menu"
                className={`navbar-mobile-menu${open ? " open" : ""}`}
                aria-hidden={!open}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                {links.map(({ label, path, icon, end }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={end}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `mobile-link${isActive ? " active" : ""}`
                        }
                    >
                        {icon}
                        {label}
                    </NavLink>
                ))}

                <div className="mobile-divider" />

                <NavLink
                    to="/meal-planner"
                    className="navbar-cta"
                    onClick={() => setOpen(false)}
                    style={{ justifyContent: "center", marginTop: "0.25rem" }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Plan My Meal
                </NavLink>
            </div>
        </>
    );
}