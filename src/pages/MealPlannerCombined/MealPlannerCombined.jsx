import { useState, useEffect } from "react";
import { createMealPlan, addOrUpdateEntry } from "../../service/MealPlanner.js";
import { getAllRecipes } from "../../service/Recipes.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MealPlannerCombined = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1
    const [planForm, setPlanForm] = useState({ userId: "", weekStartDate: "" });

    // Step 2
    const [mealDate, setMealDate] = useState("");
    const [mealType, setMealType] = useState("BREAKFAST");
    const [recipeId, setRecipeId] = useState("");
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showResults, setShowResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) setPlanForm((prev) => ({ ...prev, userId }));
    }, []);

    useEffect(() => {
        if (step === 2) {
            getAllRecipes().then(setRecipes).catch(console.error);
        }
    }, [step]);

    const handlePlanSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createMealPlan(planForm.userId, planForm.weekStartDate);
            localStorage.setItem("mealPlanId", response.id);
            toast.success("Meal Plan created successfully.");
            setStep(2);
        } catch {
            toast.error("Failed to create Meal Plan.");
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        if (!value.trim()) { setShowResults([]); return; }
        setShowResults(recipes.filter((r) => r.name.toLowerCase().includes(value.toLowerCase())));
    };

    const handleSelectRecipe = (recipe) => {
        setRecipeId(recipe.id);
        setSearch(recipe.name);
        setShowResults([]);
    };

    const handleEntrySubmit = async (e) => {
        e.preventDefault();
        const mealPlanId = Number(localStorage.getItem("mealPlanId"));
        try {
            await addOrUpdateEntry(mealPlanId, mealDate, mealType, Number(recipeId));
            toast.success("Meal added successfully!");
            setMealDate("");
            setSearch("");
            setRecipeId("");
            setMealType("BREAKFAST");
        } catch {
            toast.error("Failed to add meal.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">

                {/* Left Panel */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden"
                    style={{ background: "linear-gradient(145deg, #16a34a 0%, #15803d 45%, #166534 100%)" }}
                >
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
                         style={{ background: "radial-gradient(circle, #4ade80, transparent 70%)" }} />
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-15"
                         style={{ background: "radial-gradient(circle, #86efac, transparent 70%)" }} />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight"
                                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                NutriAI
                            </span>
                        </div>
                        <p className="text-green-100 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-bold leading-tight mb-4"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            {step === 1
                                ? <>"Plan your week,<br />fuel your life.</>
                                : <>Log your meal,<br />own your health.</>}
                        </h2>
                        <p className="text-green-100 text-sm leading-relaxed opacity-90">
                            {step === 1
                                ? "Create a personalised weekly meal plan. Just pick your start date and we'll handle the rest."
                                : "Add meal entries for any day. Search recipes, pick a meal type, and track your nutrition effortlessly."}
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">

                    {/* Step tabs */}
                    <div className="flex gap-1 mb-8 p-1 bg-gray-100 rounded-xl w-fit">
                        {["Create Plan", "Add Meals"].map((label, i) => (
                            <button
                                key={i}
                                disabled={i + 1 > step}
                                onClick={() => i + 1 <= step && setStep(i + 1)}
                                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    background: step === i + 1 ? "white" : "transparent",
                                    color: step === i + 1 ? "#16a34a" : step > i + 1 ? "#6b7280" : "#9ca3af",
                                    boxShadow: step === i + 1 ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                    cursor: i + 1 > step ? "not-allowed" : "pointer",
                                }}
                            >
                                {step > i + 1 ? "✓ " : ""}{label}
                            </button>
                        ))}
                    </div>

                    {/* Step 1 */}
                    {step === 1 && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Create Meal Plan
                            </h1>
                            <p className="text-sm text-gray-500 mb-8">
                                Set up your personalised weekly nutrition plan
                            </p>

                            <form onSubmit={handlePlanSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">User ID</label>
                                    <input
                                        type="number"
                                        value={planForm.userId}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Week Start Date</label>
                                    <input
                                        type="date"
                                        value={planForm.weekStartDate}
                                        onChange={(e) => setPlanForm((p) => ({ ...p, weekStartDate: e.target.value }))}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                                    style={{
                                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                        boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                                    }}
                                >
                                    Generate Meal Plan →
                                </button>
                            </form>
                        </>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Add Meal Entry
                            </h1>
                            <p className="text-sm text-gray-500 mb-8">
                                Log a meal by selecting the date, type, and recipe
                            </p>

                            <form onSubmit={handleEntrySubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                                    <input
                                        type="date"
                                        value={mealDate}
                                        onChange={(e) => setMealDate(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Meal Type</label>
                                    <select
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
                                    >
                                        <option value="BREAKFAST">Breakfast</option>
                                        <option value="LUNCH">Lunch</option>
                                        <option value="DINNER">Dinner</option>
                                        <option value="SNACK">Snack</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Search Recipe</label>
                                    <input
                                        type="text"
                                        placeholder="Search recipe..."
                                        value={search}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                    {showResults.length > 0 && (
                                        <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            {showResults.map((recipe) => (
                                                <li
                                                    key={recipe.id}
                                                    onClick={() => handleSelectRecipe(recipe)}
                                                    className="px-4 py-3 cursor-pointer hover:bg-green-50 hover:text-green-700 transition-colors border-b border-gray-100 last:border-0"
                                                >
                                                    <div className="font-medium text-sm">{recipe.name}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">ID: {recipe.id}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Selected Recipe ID</label>
                                    <input
                                        type="number"
                                        value={recipeId}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 px-4 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                                        style={{
                                            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                            boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                                        }}
                                    >
                                        Save Meal →
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/dashboard")}
                                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Done
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export default MealPlannerCombined;
