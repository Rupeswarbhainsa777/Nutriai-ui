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

    const inputCls = "w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 hover:border-gray-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-4xl flex rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-200">

                {/* Left Panel */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden bg-gray-900"
                >
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-[0.04] bg-white"/>
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-[0.03] bg-white"/>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">
                                NutriAI
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-white text-2xl font-bold leading-tight mb-4">
                            {step === 1
                                ? <>Plan your week,<br />fuel your life.</>
                                : <>Log your meal,<br />own your health.</>}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {step === 1
                                ? "Create a personalised weekly meal plan. Just pick your start date and we'll handle the rest."
                                : "Add meal entries for any day. Search recipes, pick a meal type, and track your nutrition effortlessly."}
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">

                    {/* Step tabs */}
                    <div className="flex gap-1 mb-8 p-1 bg-gray-100 rounded-md w-fit">
                        {["Create Plan", "Add Meals"].map((label, i) => (
                            <button
                                key={i}
                                disabled={i + 1 > step}
                                onClick={() => i + 1 <= step && setStep(i + 1)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                                    step === i + 1
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : step > i + 1
                                            ? "text-gray-500 hover:text-gray-700 cursor-pointer"
                                            : "text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {step > i + 1 ? "✓ " : ""}{label}
                            </button>
                        ))}
                    </div>

                    {/* Step 1 */}
                    {step === 1 && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
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
                                        className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Week Start Date</label>
                                    <input
                                        type="date"
                                        value={planForm.weekStartDate}
                                        onChange={(e) => setPlanForm((p) => ({ ...p, weekStartDate: e.target.value }))}
                                        required
                                        className={inputCls}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 rounded-md text-white text-sm font-medium tracking-wide transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.99]"
                                >
                                    Generate Meal Plan →
                                </button>
                            </form>
                        </>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
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
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Meal Type</label>
                                    <select
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className={`${inputCls} bg-white`}
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
                                        className={`${inputCls} placeholder-gray-400`}
                                    />
                                    {showResults.length > 0 && (
                                        <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {showResults.map((recipe) => (
                                                <li
                                                    key={recipe.id}
                                                    onClick={() => handleSelectRecipe(recipe)}
                                                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 border-b border-gray-100 last:border-0"
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
                                        className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 px-4 rounded-md text-white text-sm font-medium tracking-wide transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.99]"
                                    >
                                        Save Meal →
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/dashboard")}
                                        className="px-5 py-2.5 rounded-md text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-150"
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
