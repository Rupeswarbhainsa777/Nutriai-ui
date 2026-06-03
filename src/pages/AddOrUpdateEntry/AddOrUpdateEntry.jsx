import { useState, useEffect } from "react";
import { addOrUpdateEntry } from "../../service/MealPlanner.js";
import { getAllRecipes } from "../../service/Recipes.js";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addOrUpdateEntry(
                22,
                mealDate,
                mealType,
                Number(recipeId)
            );

            console.log("Success:", response);
            alert("Meal added successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to add meal");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Meal Entry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={mealDate}
                            onChange={(e) => setMealDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Meal Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meal Type
                        </label>
                        <select
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="BREAKFAST">Breakfast</option>
                            <option value="LUNCH">Lunch</option>
                            <option value="DINNER">Dinner</option>
                            <option value="SNACK">SNACK</option>
                        </select>
                    </div>

                    {/* Recipe Search */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Recipe
                        </label>

                        <input
                            type="text"
                            placeholder="Search recipe..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {showResults.length > 0 && (
                            <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {showResults.map((recipe) => (
                                    <li
                                        key={recipe.id}
                                        onClick={() => handleSelectRecipe(recipe)}
                                        className="px-4 py-3 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <div className="font-medium">
                                            {recipe.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            ID: {recipe.id}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Selected Recipe */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Selected Recipe ID
                        </label>
                        <input
                            type="number"
                            value={recipeId}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Save Meal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrUpdateEntry;