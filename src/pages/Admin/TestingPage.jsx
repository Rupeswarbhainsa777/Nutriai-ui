

import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    const routes = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Meal Planner", path: "/meal-planner" },
        { name: "Profile", path: "/profile" },
        { name: "AI Assistant", path: "/ai-assistant" },
        { name: "Recipes", path: "/recipes" },
        { name: "Login", path: "/login" },
        { name: "Registration", path: "/reg" },
        { name: "Weekly Meal Plan", path: "/weeklyplan" },
        { name: "Add Entry", path: "/addentry" },
        { name: "Meal Plan Details", path: "/mealplandetails" },
        { name: "MealPlannerCombined", path: "/combined" },
        { name: "Not Found", path: "/random-page" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Testing Page
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {routes.map((route) => (
                    <button
                        key={route.path}
                        onClick={() => navigate(route.path)}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        {route.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Admin;