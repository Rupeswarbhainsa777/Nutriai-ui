import { useEffect, useState } from "react";
import {
    deleteEntry,
    deleteMealPlan,
    getMealPlanById
} from "../../service/MealPlanner";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MealPlanDetails = () => {
    const mealPlanId = localStorage.getItem("mealPlanId");
    const myId = Number(mealPlanId);
    const [details, setDetails] = useState(null);

    const loading = async () => {
        try {
            const result = await getMealPlanById(myId);
            setDetails(result);
        } catch (e) {
            console.log(e);
        }
    };

    const navigate = useNavigate();

    const mealPlaneDelete = async () => {
        try {
            await deleteMealPlan(myId);
            setDetails(null);

            localStorage.removeItem("mealPlanId");
            toast.success("Meal plan has been removed.");

            setTimeout(() => {
                navigate("/meal-planner");
            }, 1500);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const deleteMealEntry = async (date, type) => {
        try {
            await deleteEntry(myId, date, type);

            toast.success("Meal entry removed.");

            await loading();
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        loading();
    }, [myId]);

    if (!details) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-6 bg-gray-900">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">
                        Meal plan has been removed.
                    </h1>
                    <p className="text-sm text-gray-500">Redirecting you back to the planner…</p>
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
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-4xl mx-auto">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">
                            Weekly Schedule
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900 leading-none">
                            Meal Plan Details
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate("/addentry")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Entry
                    </button>
                </div>


                {/* ── Plan Info Card ── */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                    {/* Dark header strip */}
                    <div className="h-1.5 w-full bg-gray-900" />

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Plan ID */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 bg-gray-100">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                        Plan ID
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        #{details.id}
                                    </p>
                                </div>
                            </div>

                            {/* Week Start Date */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 bg-gray-100">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                        Week Start Date
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {details.weekStartDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Delete Plan Button */}
                        <button
                            onClick={mealPlaneDelete}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 active:scale-[0.98] transition-all duration-150 self-start sm:self-auto"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                            Delete Plan
                        </button>
                    </div>
                </div>

                {/* ── Meal Entries ── */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Meal Entries
                    </h2>
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                        {details.entries.length} {details.entries.length === 1 ? "entry" : "entries"}
                    </span>
                </div>

                {details.entries.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 flex flex-col items-center gap-3 py-16 text-gray-400">
                        <span className="text-5xl">🍽️</span>
                        <p className="text-sm">No meal entries yet.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details.entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 overflow-hidden flex flex-col"
                        >
                            {/* Accent bar */}
                            <div className="h-1 w-full bg-gray-900" />

                            <div className="p-5 flex flex-col flex-1">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-md mb-2">
                                            {entry.mealType}
                                        </span>
                                        <p className="text-base font-semibold text-gray-900">
                                            {entry.recipe.name}
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md flex-shrink-0 ml-2">
                                        #{entry.id}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="space-y-2 text-sm flex-1">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            className="flex-shrink-0">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span>{entry.mealDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            className="flex-shrink-0">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        <span>Recipe ID: <span className="font-medium text-gray-700">#{entry.recipe.id}</span></span>
                                    </div>
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={() =>
                                        deleteMealEntry(
                                            entry.mealDate,
                                            entry.mealType
                                        )
                                    }
                                    className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-300 active:scale-[0.98] transition-all duration-150"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                    Remove Entry
                                </button>
                            </div>
                        </div>
                    ))}
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

export default MealPlanDetails;