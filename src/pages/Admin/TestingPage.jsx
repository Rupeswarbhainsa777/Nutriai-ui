

import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    const routes = [
        { name: "Dashboard", path: "/dashboard", emoji: "📊" },
        { name: "Meal Planner", path: "/meal-planner", emoji: "📅" },
        { name: "Profile", path: "/profile", emoji: "👤" },
        { name: "AI Assistant", path: "/ai-assistant", emoji: "🧠" },
        { name: "Recipes", path: "/recipes", emoji: "🍽️" },
        { name: "Login", path: "/login", emoji: "🔑" },
        { name: "Registration", path: "/reg", emoji: "📝" },
        { name: "Weekly Meal Plan", path: "/weeklyplan", emoji: "🗓️" },
        { name: "Add Entry", path: "/addentry", emoji: "➕" },
        { name: "Meal Plan Details", path: "/mealplandetails", emoji: "📋" },
        { name: "MealPlannerCombined", path: "/combined", emoji: "🔗" },
        { name: "Not Found", path: "/random-page", emoji: "❓" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[0_4px_16px_rgba(34,197,94,0.2)]"
                         style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                        <span className="text-2xl">⚙️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900 mb-2"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                        Testing Page
                    </h1>
                    <p className="text-sm text-stone-400">Quick navigation to all app routes</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {routes.map((route) => (
                        <button
                            key={route.path}
                            onClick={() => navigate(route.path)}
                            className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-stone-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer"
                        >
                            <span className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg group-hover:bg-green-100 transition-colors duration-300 flex-shrink-0">
                                {route.emoji}
                            </span>
                            <span className="text-sm font-semibold text-stone-700 group-hover:text-green-700 transition-colors duration-300">
                                {route.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;