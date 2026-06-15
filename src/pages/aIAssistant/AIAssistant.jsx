import "./aIAssistant.css";

const AIAssistant = () => {
    // Temporary dummy data before integrating the real API
    const suggestions = [
        "Create a high-protein breakfast plan",
        "Suggest a vegetarian lunch under 500 calories",
        "Generate a weekly weight loss meal plan",
        "Recommend healthy snacks for muscle gain",
        "How much protein do I need per day?",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* ── Header Card ── */}
                <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 mb-8 text-center shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_40px_rgba(34,197,94,0.12)]"
                     style={{background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #15803d 100%)"}}>
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/8 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/8 blur-xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-white/10"
                             style={{background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)"}}>
                            <span className="text-2xl">🧠</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2"
                            style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                            AI Nutrition Assistant
                        </h1>
                        <p className="text-green-100/80 text-sm max-w-lg mx-auto leading-relaxed">
                            Ask the AI to generate meal plans, nutrition tips, and healthy recipe suggestions.
                        </p>
                    </div>
                </div>

                {/* ── Main Content Card ── */}
                <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_32px_rgba(0,0,0,0.04)] border border-stone-100/80 overflow-hidden">

                    {/* Input Section */}
                    <div className="p-6 sm:p-8 border-b border-stone-50">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Ask something like: Create a weight loss meal plan"
                                className="flex-1 border border-stone-200 rounded-xl px-5 py-3.5 text-sm text-stone-800 outline-none placeholder-stone-300 transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-stone-50/50 hover:border-stone-300"
                            />
                            <button className="px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(34,197,94,0.35)] active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                                    style={{
                                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                        boxShadow: "0 2px 8px rgba(34,197,94,0.25)"
                                    }}>
                                Ask AI ✨
                            </button>
                        </div>
                    </div>

                    {/* Sample Prompts */}
                    <div className="p-6 sm:p-8 border-b border-stone-50">
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"/>
                            <h2 className="text-base font-bold text-stone-800">
                                Sample Prompts
                            </h2>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {suggestions.map((item, index) => (
                                <div
                                    key={index}
                                    className="group bg-green-50/50 border border-green-100/60 rounded-xl p-4 text-sm text-stone-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,197,94,0.08)] transition-all duration-300 cursor-pointer flex items-center gap-3"
                                >
                                    <span className="w-8 h-8 rounded-lg bg-green-100/80 flex items-center justify-center text-green-600 text-sm flex-shrink-0 group-hover:bg-green-200/60 transition-colors duration-300">
                                        💬
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"/>
                            <h2 className="text-base font-bold text-stone-800">
                                AI Response
                            </h2>
                        </div>
                        <div className="bg-stone-50/80 border border-stone-100 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                     style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                                    <span className="text-white text-xs font-bold">AI</span>
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    Hello! I can help you create personalized meal plans, suggest
                                    healthy recipes, and provide nutrition advice based on your fitness
                                    goals and dietary preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;