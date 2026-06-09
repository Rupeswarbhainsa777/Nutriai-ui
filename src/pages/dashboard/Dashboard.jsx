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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 p-6 mb-8 shadow-xl shadow-green-200">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <p className="text-green-100 text-sm font-medium tracking-widest uppercase mb-1">Welcome back 👋</p>
            <h1 className="text-white text-3xl font-bold tracking-tight mb-3">
                Hi, {userData?.name || "—"}
            </h1>

            <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    🎯 Goal: {userData?.goal || "—"}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
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
        { key: "breakfast", label: "Breakfast", time: "7:30 AM", emoji: "🌅", color: "from-orange-400 to-amber-300" },
        { key: "lunch",     label: "Lunch",     time: "12:00 PM", emoji: "☀️", color: "from-green-500 to-emerald-400" },
        { key: "snack",     label: "Snack",     time: "4:00 PM",  emoji: "🍎", color: "from-pink-400 to-rose-300"    },
        { key: "dinner",    label: "Dinner",    time: "8:00 PM",  emoji: "🌙", color: "from-indigo-500 to-violet-400"},
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10 lg:px-16">
            <div className="max-w-5xl mx-auto">

                {/* ── Hero / User Info ── */}
                <UserData />

                {/* ── Today's Meals ── */}
                <section className="mb-10">
                    <h2 className="text-gray-800 text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="inline-block w-1 h-5 rounded-full bg-green-500"></span>
                        Today's Meals
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-40">
                            <div className="w-10 h-10 rounded-full border-4 border-green-200 border-t-green-500 animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-5 py-4">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data?.days?.map((item, idx) =>
                            item.date === today ? (
                                mealMeta.map((meal) => (
                                    <div
                                        key={meal.key}
                                        className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                                    >
                                        {/* Colour accent bar */}
                                        <div className={`h-1.5 w-full bg-gradient-to-r ${meal.color}`} />

                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-2xl">{meal.emoji}</span>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{meal.label}</p>
                                                    <p className="text-xs text-gray-400">{meal.time}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-gray-800 font-semibold text-sm leading-snug mb-2">
                                                {item[meal.key]?.name || `${meal.label} not assigned`}
                                            </h3>

                                            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
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
                    <h2 className="text-gray-800 text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="inline-block w-1 h-5 rounded-full bg-green-500"></span>
                        Weekly Overview
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {data?.days?.map((day, index) => {
                            const isToday = day.date === today;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl p-4 text-center transition-all duration-200 ${
                                        isToday
                                            ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200 scale-105"
                                            : "bg-white border border-gray-100 shadow-sm text-gray-700 hover:shadow-md"
                                    }`}
                                >
                                    <h3 className={`text-xs font-bold uppercase tracking-wide mb-2 ${isToday ? "text-green-100" : "text-gray-400"}`}>
                                        {new Date(day.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </h3>

                                    <p className={`text-lg font-extrabold leading-none ${isToday ? "text-white" : "text-gray-800"}`}>
                                        {day.totalCalories}
                                    </p>
                                    <p className={`text-xs mt-1 ${isToday ? "text-green-100" : "text-gray-400"}`}>kcal</p>

                                    {isToday && (
                                        <span className="mt-2 inline-block bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
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