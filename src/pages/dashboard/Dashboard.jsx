import { useEffect, useState } from "react";
import { getWeeklyView } from "../../service/MealPlanner.js";

import {userDetails} from "../../service/User.js";

const UserData = ()=>{

    const [userData, setUserData] = useState(null);
    const responseId = localStorage.getItem("userId");
    const id = Number(responseId)
    const defaultUser = {
        name: "N/A",
        goal: "N/A",
        dietaryRestrictions: "N/A",
    };
    useEffect(() => {
        userDetails({ id }).then((data) => {
            setUserData(data);
        }).catch((error) => {
            console.error("Error fetching user details:", error);
            setUserData(defaultUser)
        });
    }, [id]);

    return (
        <div className="relative overflow-hidden rounded-lg p-7 mb-8 bg-gray-900 border border-gray-800">
            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/[0.03] pointer-events-none" />

            <p className="text-gray-400 text-xs font-medium tracking-[0.15em] uppercase mb-1.5">Welcome back 👋</p>
            <h1 className="text-white text-2xl font-bold tracking-tight mb-4">
                Hi, {userData?.name || "—"}
            </h1>

            <div className="flex flex-wrap gap-2.5 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] text-gray-300 text-xs font-medium px-3 py-2 rounded-md border border-white/[0.08]">
                    🎯 Goal: {userData?.goal || "—"}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] text-gray-300 text-xs font-medium px-3 py-2 rounded-md border border-white/[0.08]">
                    🥗 Diet: {userData?.dietaryRestrictions || "—"}
                </span>
            </div>
        </div>
    );
}


const Dashboard = () => {
    let mealPlanId = localStorage.getItem("mealPlanId");
    let id = Number(mealPlanId);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWeeklyView(id);
                setData(response.data || response);
            } catch (err) {
                console.error("Error fetching weekly view:", err);
                setError("Failed to load your weekly meal plan. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const today = new Date().toISOString().split("T")[0];

    /* ── Meal card config ── */
    const mealMeta = [
        { key: "breakfast", label: "Breakfast", time: "7:30 AM", emoji: "🌅", color: "from-amber-400 to-amber-300" },
        { key: "lunch",     label: "Lunch",     time: "12:00 PM", emoji: "☀️", color: "from-emerald-500 to-emerald-400" },
        { key: "snack",     label: "Snack",     time: "4:00 PM",  emoji: "🍎", color: "from-rose-400 to-rose-300"    },
        { key: "dinner",    label: "Dinner",    time: "8:00 PM",  emoji: "🌙", color: "from-indigo-500 to-indigo-400"},
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10 lg:px-16">
            <div className="max-w-5xl mx-auto">

                {/* ── Hero / User Info ── */}
                <UserData />

                {/* ── Today's Meals ── */}
                <section className="mb-10">
                    <h2 className="text-gray-900 text-lg font-semibold mb-5 flex items-center gap-2.5">
                        <span className="inline-block w-1 h-5 rounded-full bg-gray-900"></span>
                        Today's Meals
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-40">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-5 py-4 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data?.days?.map((item, idx) =>
                            item.date === today ? (
                                mealMeta.map((meal) => (
                                    <div
                                        key={meal.key}
                                        className="group relative rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 overflow-hidden"
                                    >
                                        {/* Colour accent bar */}
                                        <div className={`h-1 w-full bg-gradient-to-r ${meal.color}`} />

                                        <div className="p-5">
                                            <div className="flex items-center gap-2.5 mb-3">
                                                <span className="text-xl">{meal.emoji}</span>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{meal.label}</p>
                                                    <p className="text-[11px] text-gray-400">{meal.time}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-gray-900 font-medium text-sm leading-snug mb-3">
                                                {item[meal.key]?.name || `${meal.label} not assigned`}
                                            </h3>

                                            <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-md">
                                                🔥 {item[meal.key]?.calories || 0} kcal
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : null
                        )}
                    </div>
                </section>

                {/* ── Weekly Calorie Overview ── */}
                <section>
                    <h2 className="text-gray-900 text-lg font-semibold mb-5 flex items-center gap-2.5">
                        <span className="inline-block w-1 h-5 rounded-full bg-gray-900"></span>
                        Weekly Overview
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {data?.days?.map((day, index) => {
                            const isToday = day.date === today;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-lg p-4 text-center transition-all duration-150 ${
                                        isToday
                                            ? "bg-gray-900 text-white"
                                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm"
                                    }`}
                                >
                                    <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isToday ? "text-gray-400" : "text-gray-400"}`}>
                                        {new Date(day.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </h3>

                                    <p className={`text-lg font-bold leading-none ${isToday ? "text-white" : "text-gray-900"}`}>
                                        {day.totalCalories}
                                    </p>
                                    <p className={`text-xs mt-1 ${isToday ? "text-gray-400" : "text-gray-400"}`}>kcal</p>

                                    {isToday && (
                                        <span className="mt-2 inline-block bg-white/10 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-md border border-white/10">
                                            Today
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Dashboard;