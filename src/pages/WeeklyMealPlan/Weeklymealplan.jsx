import { useEffect, useState } from "react";
import { getWeeklyView } from "../../service/MealPlanner.js";

/* ── Meal type icons (inline SVG) ── */
const mealIcons = {
    breakfast: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    ),
    lunch: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11h18M3 11a9 9 0 0 1 18 0M12 11v4M8 15h8M10 19h4" />
        </svg>
    ),
    snack: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
    ),
    dinner: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20M12 2a10 10 0 0 0-9.95 9h19.9A10 10 0 0 0 12 2z" />
        </svg>
    ),
};

const mealConfig = {
    breakfast: { label: "Breakfast", color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200", icon: mealIcons.breakfast },
    lunch:     { label: "Lunch",     color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: mealIcons.lunch },
    snack:     { label: "Snack",     color: "text-sky-600",    bg: "bg-sky-50",    border: "border-sky-200",    icon: mealIcons.snack },
    dinner:    { label: "Dinner",    color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", icon: mealIcons.dinner },
};

/* ── Day abbreviations ── */
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr) {
    if (!dateStr) return { day: "—", num: "—", full: "—" };
    const d = new Date(dateStr);
    return {
        day: DAY_SHORT[d.getDay()] ?? "—",
        num: d.getDate(),
        full: d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    };
}

/* ── Meal row inside a day card ── */
function MealRow({ type, meal }) {
    const cfg = mealConfig[type];
    return (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${cfg.bg} ${cfg.border}`}>
            <span className={`${cfg.color} flex-shrink-0`}>{cfg.icon}</span>
            <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${cfg.color} mb-0.5`}>{cfg.label}</p>
                <p className="text-sm font-medium text-stone-800 truncate leading-tight">
                    {meal?.name || <span className="text-stone-400 font-normal italic">Not assigned</span>}
                </p>
            </div>
        </div>
    );
}

/* ── Day card ── */
function DayCard({ day, isToday }) {
    const { day: dayShort, num, full } = formatDate(day.date);

    return (
        <div
            className={`group relative flex flex-col gap-3 rounded-2xl p-5 border transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                ${isToday
                    ? "bg-white border-green-300 shadow-lg shadow-green-100 ring-2 ring-green-400/20"
                    : "bg-white border-stone-100 shadow-sm"
                }`}
        >
            {/* Today badge */}
            {isToday && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500 text-white shadow">
                    Today
                </span>
            )}

            {/* Date header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{dayShort}</p>
                    <p className={`text-3xl font-bold leading-none ${isToday ? "text-green-600" : "text-stone-800"}`}>{num}</p>
                </div>
                {/* Calorie badge */}
                <div className={`flex flex-col items-end px-3 py-1.5 rounded-xl ${isToday ? "bg-green-50 border border-green-200" : "bg-stone-50 border border-stone-200"}`}>
                    <p className={`text-base font-bold leading-none ${isToday ? "text-green-700" : "text-stone-700"}`}>
                        {day.totalCalories ?? "—"}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-0.5">kcal</p>
                </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* Meals */}
            <div className="flex flex-col gap-2">
                <MealRow type="breakfast" meal={day.breakfast} />
                <MealRow type="lunch"     meal={day.lunch} />
                <MealRow type="snack"     meal={day.snack} />
                <MealRow type="dinner"    meal={day.dinner} />
            </div>
        </div>
    );
}

/* ── Loading skeleton ── */
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-3 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 w-8 bg-stone-200 rounded mb-2" />
                    <div className="h-8 w-6 bg-stone-200 rounded" />
                </div>
                <div className="h-10 w-16 bg-stone-200 rounded-xl" />
            </div>
            <div className="h-px bg-stone-100" />
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-stone-100 rounded-xl" />
            ))}
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

    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Page Header ── */}
            <header className="bg-white border-b border-stone-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-1">Meal Planning</p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-none"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            Weekly Plan
                        </h1>
                        {data && (
                            <p className="mt-2 text-sm text-stone-400">
                                Plan&nbsp;<span className="font-semibold text-stone-600">#{data.mealPlanId}</span>
                                &nbsp;·&nbsp;Week of&nbsp;
                                <span className="font-semibold text-stone-600">
                                    {new Date(data.weekStartDate).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Summary chips */}
                    {data && (
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Days", value: data.days?.length ?? 0 },
                                {
                                    label: "Total kcal",
                                    value: data.days?.reduce((s, d) => s + (d.totalCalories || 0), 0).toLocaleString() ?? "—"
                                },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex flex-col items-center px-4 py-2 rounded-xl bg-green-50 border border-green-200">
                                    <span className="text-lg font-bold text-green-700 leading-none">{value}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-green-500 mt-0.5">{label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* ── Main content ── */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(7)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center gap-4 py-24 text-center">
                        <span className="text-5xl">😕</span>
                        <p className="text-base text-stone-500">{error}</p>
                        <button
                            onClick={() => { setLoading(true); setError(null); }}
                            className="px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* No data */}
                {!loading && !error && !data && (
                    <div className="flex flex-col items-center gap-3 py-24 text-stone-400">
                        <span className="text-5xl">🗓️</span>
                        <p className="text-base">No meal plan found for this week.</p>
                    </div>
                )}

                {/* Day cards grid */}
                {!loading && !error && data && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {data.days?.map((day, index) => (
                            <DayCard
                                key={index}
                                day={day}
                                isToday={day.date === todayStr}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default WeeklyMealPlan;