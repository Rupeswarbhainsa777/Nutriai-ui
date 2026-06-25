import {useState, useEffect} from "react";
import {addOrUpdateEntry} from "../../service/MealPlanner.js";
import {getAllRecipes} from "../../service/Recipes.js";
import {toast, ToastContainer} from "react-toastify";

const AddOrUpdateEntry = () => {
    const [mealDate, setMealDate] = useState("");
    const [mealType, setMealType] = useState("");
    const [recipeId, setRecipeId] = useState("");

    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showResults, setShowResults] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const data = await getAllRecipes();
            setRecipes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);

        if (!value.trim()) {
            setShowResults([]);
            return;
        }

        const filtered = recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(value.toLowerCase())
        );

        setShowResults(filtered);
    };

    const handleSelectRecipe = (recipe) => {
        setRecipeId(recipe.id);
        setSearch(recipe.name);
        setShowResults([]);
    };
    const mealPlanId = localStorage.getItem("mealPlanId");
    const Id = Number(mealPlanId);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addOrUpdateEntry(
                Id,
                mealDate,
                mealType,
                Number(recipeId)
            );


            toast.success("Meal added successfully!")


        } catch (error) {

            console.log(error)
            toast.error("Failed to add meal");
        }
    };

    const inputCls = "w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 hover:border-gray-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">

            {/* Card */}
            <div className="w-full max-w-4xl flex rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-200">

                {/* ── Left brand panel ── */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden bg-gray-900"
                >
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-[0.04] bg-white"/>
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-[0.03] bg-white"/>

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
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

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2 className="text-white text-2xl font-bold leading-tight mb-4">
                            Log your meal,<br/>own your health.
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Add or update a meal entry for any day. Search recipes, pick a meal type, and track your
                            nutrition effortlessly.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🍽️ Any Meal Type", "🔍 Recipe Search", "📅 Date Tracking"].map((f) => (
                                <span key={f}
                                      className="text-xs text-gray-300 px-3 py-1.5 rounded-md font-medium bg-white/[0.06] border border-white/[0.08]">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">

                    {/* Mobile brand */}
                    <div className="flex md:hidden items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-gray-900">NutriAI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Add Meal Entry
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">
                        Log a meal by selecting the date, type, and recipe
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Date
                            </label>
                            <input
                                type="date"
                                value={mealDate}
                                onChange={(e) => setMealDate(e.target.value)}
                                className={inputCls}
                                required
                            />
                        </div>

                        {/* Meal Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Meal Type
                            </label>
                            <select
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                className={`${inputCls} bg-white`}
                            >
                                <option value="BREAKFAST">Breakfast</option>
                                <option value="LUNCH">Lunch</option>
                                <option value="DINNER">Dinner</option>
                                <option value="SNACK">SNACK</option>
                            </select>
                        </div>

                        {/* Recipe Search */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Search Recipe
                            </label>
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
                                            <div className="font-medium text-sm">
                                                {recipe.name}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">
                                                ID: {recipe.id}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Selected Recipe ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Selected Recipe ID
                            </label>
                            <input
                                type="number"
                                value={recipeId}
                                readOnly
                                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-md text-white text-sm font-medium tracking-wide transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.99]"
                        >
                            Save Meal →
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export default AddOrUpdateEntry;