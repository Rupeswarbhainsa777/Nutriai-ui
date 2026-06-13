import { useEffect, useState } from "react";
import { getWeeklyView } from "../../service/MealPlanner.js";

/* ── Day abbreviations ── */
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDate(dateStr) {
    if (!dateStr) return { day: "—", dayFull: "—", num: "—", month: "—", full: "—" };
    const d = new Date(dateStr);
    return {
        day: DAY_SHORT[d.getDay()] ?? "—",
        dayFull: DAY_FULL[d.getDay()] ?? "—",
        num: d.getDate(),
        month: d.toLocaleDateString("en-IN", { month: "short" }),
        full: d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    };
}

/* ── Meal config ── */
const mealConfig = [
    { key: "breakfast", label: "Breakfast", time: "7:00 – 9:00 AM",  emoji: "🌅", gradient: "from-orange-400 to-amber-300",  light: "bg-amber-50",   accent: "text-amber-600",  ring: "ring-amber-200"   },
    { key: "lunch",     label: "Lunch",     time: "12:00 – 1:30 PM", emoji: "☀️", gradient: "from-green-500 to-emerald-400", light: "bg-emerald-50", accent: "text-emerald-600", ring: "ring-emerald-200" },
    { key: "snack",     label: "Snack",     time: "4:00 – 5:00 PM",  emoji: "🍎", gradient: "from-pink-400 to-rose-300",    light: "bg-rose-50",    accent: "text-rose-600",   ring: "ring-rose-200"    },
    { key: "dinner",    label: "Dinner",    time: "8:00 – 9:30 PM",  emoji: "🌙", gradient: "from-indigo-500 to-violet-400", light: "bg-violet-50",  accent: "text-violet-600", ring: "ring-violet-200"  },
];

/* ── Meal Card ── */
function MealCard({ config, meal }) {
    const name = meal?.name;
    const calories = meal?.calories;
    return (
        <div className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Gradient accent bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`} />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl leading-none">{config.emoji}</span>
                    <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold uppercase tracking-wider ${config.accent}`}>{config.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{config.time}</p>
                    </div>
                </div>

                {/* Meal name */}
                {name ? (
                    <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-3">{name}</h3>
                ) : (
                    <p className="text-sm text-gray-400 italic mb-3">Not assigned yet</p>
                )}

                {/* Calorie badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                        🔥 {calories ?? 0} kcal
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ── Day Selector Tab ── */
function DayTab({ day, isSelected, isToday, onClick }) {
    const { day: dayShort, num } = formatDate(day.date);
    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-center min-w-[4.5rem] px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer
                ${isSelected
                    ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200 scale-105"
                    : "bg-white border border-gray-100 text-gray-600 hover:border-green-200 hover:shadow-md"
                }`}
        >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-green-100" : "text-gray-400"}`}>
                {dayShort}
            </span>
            <span className={`text-xl font-extrabold leading-none mt-1 ${isSelected ? "text-white" : "text-gray-800"}`}>
                {num}
            </span>
            {isToday && (
                <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                    ${isSelected ? "bg-white/20 text-white" : "bg-green-100 text-green-600"}`}>
                    Today
                </span>
            )}
        </button>
    );
}

/* ── Loading Skeleton ── */
function SkeletonView() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Day tabs skeleton */}
            <div className="flex gap-3 overflow-hidden">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="min-w-[4.5rem] h-20 bg-gray-200 rounded-2xl" />
                ))}
            </div>
            {/* Cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-200 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════════════════ */
const WeeklyMealPlan = () => {
    const mealPlanId = localStorage.getItem("mealPlanId");
    const id = Number(mealPlanId);
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

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

    /* ── Today's date string for comparison ── */
    const todayStr = new Date().toISOString().split("T")[0];

    /* ── Selected day index (defaults to today, else first day) ── */
    const [selectedIdx, setSelectedIdx] = useState(0);

    useEffect(() => {
        if (data?.days) {
            const todayIndex = data.days.findIndex((d) => d.date === todayStr);
            setSelectedIdx(todayIndex >= 0 ? todayIndex : 0);
        }
    }, [data, todayStr]);

    const selectedDay = data?.days?.[selectedIdx] ?? null;
    const selectedDate = selectedDay ? formatDate(selectedDay.date) : null;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Page Header ── */}
            <header className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 shadow-xl shadow-green-200/40">
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <p className="text-green-100 text-sm font-medium tracking-widest uppercase mb-1">Meal Planning</p>
                    <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        Your Weekly Plan
                    </h1>
                    {data && (
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                📋 Plan #{data.mealPlanId}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                📅 Week of {new Date(data.weekStartDate).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                🔥 {data.days?.reduce((s, d) => s + (d.totalCalories || 0), 0).toLocaleString()} kcal total
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

                {/* Loading */}
                {loading && <SkeletonView />}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center gap-5 py-24 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-3xl">😕</span>
                        </div>
                        <p className="text-base text-gray-500 max-w-sm">{error}</p>
                        <button
                            onClick={() => { setLoading(true); setError(null); }}
                            className="px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-200 cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* No data */}
                {!loading && !error && !data && (
                    <div className="flex flex-col items-center gap-4 py-24 text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-3xl">🗓️</span>
                        </div>
                        <p className="text-base">No meal plan found for this week.</p>
                    </div>
                )}

                {/* ── Loaded State ── */}
                {!loading && !error && data && (
                    <div className="space-y-8">

                        {/* ── Day Selector Tabs ── */}
                        <section>
                            <h2 className="text-gray-800 text-base font-bold mb-3 flex items-center gap-2">
                                <span className="inline-block w-1 h-5 rounded-full bg-green-500" />
                                Select a Day
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {data.days?.map((day, index) => (
                                    <DayTab
                                        key={index}
                                        day={day}
                                        isSelected={index === selectedIdx}
                                        isToday={day.date === todayStr}
                                        onClick={() => setSelectedIdx(index)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* ── Selected Day Detail ── */}
                        {selectedDay && (
                            <section>
                                {/* Day Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div>
                                        <h2 className="text-gray-800 text-xl font-bold flex items-center gap-2">
                                            <span className="inline-block w-1 h-5 rounded-full bg-green-500" />
                                            {selectedDate.dayFull},&nbsp;
                                            <span className="text-green-600">{selectedDate.month} {selectedDate.num}</span>
                                        </h2>
                                        {selectedDay.date === todayStr && (
                                            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                                                Today
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                                        <span className="text-lg">🔥</span>
                                        <div>
                                            <p className="text-lg font-extrabold text-gray-800 leading-none">
                                                {selectedDay.totalCalories ?? "—"}
                                            </p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">kcal for the day</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Meal Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {mealConfig.map((cfg) => (
                                        <MealCard
                                            key={cfg.key}
                                            config={cfg}
                                            meal={selectedDay[cfg.key]}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Weekly Calorie Overview ── */}
                        <section>
                            <h2 className="text-gray-800 text-base font-bold mb-3 flex items-center gap-2">
                                <span className="inline-block w-1 h-5 rounded-full bg-green-500" />
                                Weekly Calorie Overview
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                                {data.days?.map((day, index) => {
                                    const isToday = day.date === todayStr;
                                    const { day: dayShort, num } = formatDate(day.date);
                                    const isSelected = index === selectedIdx;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedIdx(index)}
                                            className={`rounded-2xl p-4 text-center transition-all duration-200 cursor-pointer
                                                ${isToday
                                                    ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200 scale-105"
                                                    : isSelected
                                                        ? "bg-white border-2 border-green-400 shadow-md text-gray-700"
                                                        : "bg-white border border-gray-100 shadow-sm text-gray-700 hover:shadow-md"
                                                }`}
                                        >
                                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isToday ? "text-green-100" : "text-gray-400"}`}>
                                                {dayShort}
                                            </p>
                                            <p className={`text-xs mb-1 ${isToday ? "text-green-100" : "text-gray-400"}`}>
                                                {num}
                                            </p>
                                            <p className={`text-lg font-extrabold leading-none ${isToday ? "text-white" : "text-gray-800"}`}>
                                                {day.totalCalories ?? "—"}
                                            </p>
                                            <p className={`text-[10px] mt-0.5 ${isToday ? "text-green-100" : "text-gray-400"}`}>kcal</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                    </div>
                )}
            </main>
        </div>
    );
};

export default WeeklyMealPlan;