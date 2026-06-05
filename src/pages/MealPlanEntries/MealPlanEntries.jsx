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
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="max-w-4xl mx-auto">

                {/* ── Page Header ── */}
                <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-1">
                        Your Schedule
                    </p>
                    <h1
                        className="text-4xl font-bold text-gray-900 leading-none"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        Meal Plan Entries
                    </h1>
                </div>

                {/* ── Empty State ── */}
                {data.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center gap-3 py-16 text-stone-400">
                        <span className="text-5xl">🍽️</span>
                        <p className="text-base">No meal plan entries found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Green accent bar */}
                                <div
                                    className="h-1 w-full"
                                    style={{ background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)" }}
                                />

                                <div className="p-5 flex flex-col flex-1">

                                    {/* Header row – meal type badge + entry id */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full mb-2">
                                                {item.mealType}
                                            </span>
                                            {item.recipe && (
                                                <p
                                                    className="text-lg font-bold text-gray-900"
                                                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                                                >
                                                    {item.recipe.name}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-stone-400 bg-stone-50 border border-stone-200 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                                            #{item.id}
                                        </span>
                                    </div>

                                    {/* Meal date */}
                                    <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
                                                className="w-full h-40 object-cover rounded-xl mb-4"
                                            />

                                            {/* Description */}
                                            <p className="text-sm text-stone-500 leading-relaxed mb-4">
                                                {item.recipe.description}
                                            </p>

                                            {/* Recipe ID */}
                                            <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="flex-shrink-0">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                <span>Recipe ID: <span className="font-semibold text-gray-700">#{item.recipe.id}</span></span>
                                            </div>

                                            {/* Nutrition chips */}
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                                                    🔥 {item.recipe.calories} kcal
                                                </span>
                                                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                                                    💪 {item.recipe.protein}g protein
                                                </span>
                                                <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
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