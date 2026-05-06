import { useEffect, useState } from "react";
import { getAllRecipes } from "../../service/Recipes.js";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then((data) => setRecipes(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 px-6 py-12 font-serif">
            {/* Header */}
            <div className="max-w-5xl mx-auto mb-12 border-b-2 border-stone-800 pb-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-1">
                    Today's Collection
                </p>
                <h1 className="text-6xl font-bold text-stone-900 leading-tight">
                    Recipes
                </h1>
            </div>

            {/* Recipe Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-stone-100"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden h-52">
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h2 className="text-xl font-bold text-stone-900 mb-1 leading-snug">
                                {recipe.name}
                            </h2>
                            <p className="text-sm text-stone-500 mb-4 line-clamp-2">
                                {recipe.description}
                            </p>

                            {/* Nutrition Stats */}
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-amber-600">
                                        {recipe.calories}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                        Kcal
                                    </p>
                                </div>
                                <div className="text-center border-x border-stone-100">
                                    <p className="text-lg font-bold text-emerald-600">
                                        {recipe.protein}g
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                        Protein
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-sky-600">
                                        {recipe.carbs}g
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                        Carbs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {recipes.length === 0 && (
                <div className="max-w-5xl mx-auto text-center py-24 text-stone-400">
                    <p className="text-5xl mb-4">🍽️</p>
                    <p className="text-lg tracking-wide">No recipes found yet.</p>
                </div>
            )}
        </div>
    );
};

export default Recipes;