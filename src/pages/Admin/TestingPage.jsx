

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
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center bg-gray-900">
                        <span className="text-xl">⚙️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Testing Page
                    </h1>
                    <p className="text-sm text-gray-500">Quick navigation to all app routes</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {routes.map((route) => (
                        <button
                            key={route.path}
                            onClick={() => navigate(route.path)}
                            className="group flex items-center gap-3 px-4 py-3.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 text-left cursor-pointer"
                        >
                            <span className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-base group-hover:bg-gray-200 transition-colors duration-150 flex-shrink-0">
                                {route.emoji}
                            </span>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
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