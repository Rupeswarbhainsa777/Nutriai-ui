import { useState } from "react";
import { createMealPlan } from "../../service/MealPlanner.js";

const MealPlanner = () => {
    const [formData, setFormData] = useState({
        userId: "",
        weekStartDate: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await createMealPlan({
                userId: Number(formData.userId),
                weekStartDate: formData.weekStartDate,
            });

            setMessage(response.message || "Meal Plan created successfully.");

            // Clear form after successful submission
            setFormData({ userId: "", weekStartDate: "" });
        } catch (error) {
            setMessage(error.message || "Failed to create Meal Plan.");
        }
    };

    const isError = message && !message.toLowerCase().includes("success");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">

            {/* Card */}
            <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">

                {/* ── Left brand panel ── */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(145deg, #16a34a 0%, #15803d 45%, #166534 100%)",
                    }}
                >
                    {/* Decorative blurred circles */}
                    <div
                        className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
                        style={{ background: "radial-gradient(circle, #4ade80, transparent 70%)" }}
                    />
                    <div
                        className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-15"
                        style={{ background: "radial-gradient(circle, #86efac, transparent 70%)" }}
                    />

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                            >
                                {/* Calendar / meal plan icon */}
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </div>
                            <span
                                className="text-white font-bold text-2xl tracking-tight"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                NutriAI
                            </span>
                        </div>
                        <p className="text-green-100 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2
                            className="text-white text-3xl font-bold leading-tight mb-4"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            Plan your week,<br />fuel your life.
                        </h2>
                        <p className="text-green-100 text-sm leading-relaxed opacity-90">
                            Create a personalised weekly meal plan powered by AI. Just pick your start date and we'll handle the rest.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🥗 Weekly Plans", "🤖 AI-Powered", "📅 Easy Scheduling"].map((f) => (
                                <span
                                    key={f}
                                    className="text-xs text-white px-3 py-1 rounded-full font-medium"
                                    style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
                                >
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">

                    {/* Mobile brand */}
                    <div className="flex md:hidden items-center gap-2 mb-8">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        </div>
                        <span
                            className="font-bold text-xl text-green-700"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            NutriAI
                        </span>
                    </div>

                    <h1
                        className="text-2xl font-bold text-gray-900 mb-1"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        Create Meal Plan
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">
                        Set up your personalised weekly nutrition plan
                    </p>

                    {/* Status message */}
                    {message && (
                        <div
                            className={`mb-5 flex items-center gap-2 text-sm px-4 py-3 rounded-lg border ${
                                isError
                                    ? "text-red-700 bg-red-50 border-red-200"
                                    : "text-green-700 bg-green-50 border-green-200"
                            }`}
                        >
                            <span>{isError ? "✕" : "✓"}</span>
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* User ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                User ID
                            </label>
                            <input
                                id="meal-user-id"
                                type="number"
                                name="userId"
                                placeholder="Enter your user ID"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Week Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Week Start Date
                            </label>
                            <input
                                id="meal-week-start-date"
                                type="date"
                                name="weekStartDate"
                                value={formData.weekStartDate}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            id="meal-plan-submit"
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                            style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
                            }}
                        >
                            Generate Meal Plan →
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;