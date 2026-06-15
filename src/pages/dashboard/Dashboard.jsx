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
        <div className="relative overflow-hidden rounded-3xl p-7 mb-8 shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_40px_rgba(34,197,94,0.12)]"
             style={{background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #15803d 100%)"}}>
            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/8 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/8 blur-xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <p className="text-green-100/70 text-xs font-semibold tracking-[0.2em] uppercase mb-1.5">Welcome back 👋</p>
            <h1 className="text-white text-3xl font-bold tracking-tight mb-4"
                style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                Hi, {userData?.name || "—"}
            </h1>

            <div className="flex flex-wrap gap-2.5 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/10">
                    🎯 Goal: {userData?.goal || "—"}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/10">
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
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white px-4 py-8 md:px-10 lg:px-16">
            <div className="max-w-5xl mx-auto">

                {/* ── Hero / User Info ── */}
                <UserData />

                {/* ── Today's Meals ── */}
                <section className="mb-10">
                    <h2 className="text-stone-800 text-xl font-bold mb-5 flex items-center gap-2.5">
                        <span className="inline-block w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"></span>
                        Today's Meals
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-40">
                            <div className="w-10 h-10 rounded-full border-[3px] border-green-100 border-t-green-500 animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl bg-red-50 border border-red-100 text-red-500 text-sm px-5 py-4 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {data?.days?.map((item, idx) =>
                            item.date === today ? (
                                mealMeta.map((meal) => (
                                    <div
                                        key={meal.key}
                                        className="group relative rounded-2xl bg-white border border-stone-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Colour accent bar */}
                                        <div className={`h-1.5 w-full bg-gradient-to-r ${meal.color}`} />

                                        <div className="p-5">
                                            <div className="flex items-center gap-2.5 mb-3">
                                                <span className="text-2xl">{meal.emoji}</span>
                                                <div>
                                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{meal.label}</p>
                                                    <p className="text-[11px] text-stone-300">{meal.time}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-stone-800 font-semibold text-sm leading-snug mb-3">
                                                {item[meal.key]?.name || `${meal.label} not assigned`}
                                            </h3>

                                            <div className="inline-flex items-center gap-1.5 bg-stone-50 text-stone-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-100">
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
                    <h2 className="text-stone-800 text-xl font-bold mb-5 flex items-center gap-2.5">
                        <span className="inline-block w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"></span>
                        Weekly Overview
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {data?.days?.map((day, index) => {
                            const isToday = day.date === today;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                                        isToday
                                            ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_32px_rgba(34,197,94,0.2)] scale-105"
                                            : "bg-white border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04)] text-stone-700 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                                    }`}
                                >
                                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isToday ? "text-green-100" : "text-stone-400"}`}>
                                        {new Date(day.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </h3>

                                    <p className={`text-lg font-extrabold leading-none ${isToday ? "text-white" : "text-stone-800"}`}>
                                        {day.totalCalories}
                                    </p>
                                    <p className={`text-xs mt-1 ${isToday ? "text-green-100" : "text-stone-400"}`}>kcal</p>

                                    {isToday && (
                                        <span className="mt-2 inline-block bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
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