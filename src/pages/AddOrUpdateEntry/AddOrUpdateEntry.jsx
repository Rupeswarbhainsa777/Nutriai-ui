import {useState, useEffect} from "react";
import {addOrUpdateEntry} from "../../service/MealPlanner.js";
import {getAllRecipes} from "../../service/Recipes.js";
import {toast, ToastContainer} from "react-toastify";

const AddOrUpdateEntry = () => {
    const [mealDate, setMealDate] = useState("");
    const [mealType, setMealType] = useState("BREAKFAST");
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


            toast.error("Failed to add meal");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">

            {/* Card */}
            <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">

                {/* ── Left brand panel ── */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(145deg, #16a34a 0%, #15803d 45%, #166534 100%)",
                    }}
                >
                    {/* Decorative blurred circles */}
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
                         style={{background: "radial-gradient(circle, #4ade80, transparent 70%)"}}/>
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-15"
                         style={{background: "radial-gradient(circle, #86efac, transparent 70%)"}}/>

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)"}}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                                </svg>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight"
                                  style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                                NutriAI
                            </span>
                        </div>
                        <p className="text-green-100 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-bold leading-tight mb-4"
                            style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                            Log your meal,<br/>own your health.
                        </h2>
                        <p className="text-green-100 text-sm leading-relaxed opacity-90">
                            Add or update a meal entry for any day. Search recipes, pick a meal type, and track your
                            nutrition effortlessly.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🍽️ Any Meal Type", "🔍 Recipe Search", "📅 Date Tracking"].map((f) => (
                                <span key={f}
                                      className="text-xs text-white px-3 py-1 rounded-full font-medium"
                                      style={{background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)"}}>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">

                    {/* Mobile brand */}
                    <div className="flex md:hidden items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                             style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-green-700"
                              style={{fontFamily: "'Playfair Display', Georgia, serif"}}>NutriAI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
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
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
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
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
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
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                            style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                boxShadow: "0 4px 14px rgba(34,197,94,0.35)"
                            }}
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