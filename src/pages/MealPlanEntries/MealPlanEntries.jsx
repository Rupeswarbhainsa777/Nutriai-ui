import { useEffect, useState } from "react";
import { getMealPlanEntries } from "../../service/MealPlanner.js";

const MealPlanEntries = () => {
    const planId = localStorage.getItem("mealPlanId");
    const [data, setData] = useState([]);

    const loadEntries = async () => {
        try {
            const details = await getMealPlanEntries(planId);
            setData(details || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (planId) {
            loadEntries();
        }
    }, [planId]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-4xl mx-auto">

                {/* ── Page Header ── */}
                <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">
                        Your Schedule
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900 leading-none">
                        Meal Plan Entries
                    </h1>
                </div>

                {/* ── Empty State ── */}
                {data.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 flex flex-col items-center gap-3 py-16 text-gray-400">
                        <span className="text-5xl">🍽️</span>
                        <p className="text-sm">No meal plan entries found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 overflow-hidden flex flex-col"
                            >
                                {/* Accent bar */}
                                <div className="h-1 w-full bg-gray-900" />

                                <div className="p-5 flex flex-col flex-1">

                                    {/* Header row – meal type badge + entry id */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-md mb-2">
                                                {item.mealType}
                                            </span>
                                            {item.recipe && (
                                                <p className="text-base font-semibold text-gray-900">
                                                    {item.recipe.name}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md flex-shrink-0 ml-2">
                                            #{item.id}
                                        </span>
                                    </div>

                                    {/* Meal date */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            className="flex-shrink-0">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span>{item.mealDate}</span>
                                    </div>

                                    {/* Recipe section */}
                                    {item.recipe && (
                                        <>
                                            {/* Recipe image */}
                                            <img
                                                src={item.recipe.imageUrl}
                                                alt={item.recipe.name}
                                                className="w-full h-40 object-cover rounded-md mb-4"
                                            />

                                            {/* Description */}
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                                {item.recipe.description}
                                            </p>

                                            {/* Recipe ID */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                                    className="flex-shrink-0">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                <span>Recipe ID: <span className="font-medium text-gray-700">#{item.recipe.id}</span></span>
                                            </div>

                                            {/* Nutrition chips */}
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                <span className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                                                    🔥 {item.recipe.calories} kcal
                                                </span>
                                                <span className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                                                    💪 {item.recipe.protein}g protein
                                                </span>
                                                <span className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                                                    🌾 {item.recipe.carbs}g carbs
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealPlanEntries;