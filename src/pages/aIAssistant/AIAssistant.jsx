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
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* ── Header Card ── */}
                <div className="relative overflow-hidden rounded-lg p-8 sm:p-10 mb-6 text-center bg-gray-900">
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/[0.03] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/[0.03] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center bg-white/10">
                            <span className="text-xl">🧠</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            AI Nutrition Assistant
                        </h1>
                        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                            Ask the AI to generate meal plans, nutrition tips, and healthy recipe suggestions.
                        </p>
                    </div>
                </div>

                {/* ── Main Content Card ── */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

                    {/* Input Section */}
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Ask something like: Create a weight loss meal plan"
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white hover:border-gray-400"
                            />
                            <button className="px-5 py-2.5 rounded-md text-white font-medium text-sm transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] cursor-pointer whitespace-nowrap">
                                Ask AI ✨
                            </button>
                        </div>
                    </div>

                    {/* Sample Prompts */}
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="w-1 h-5 rounded-full bg-gray-900"/>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Sample Prompts
                            </h2>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {suggestions.map((item, index) => (
                                <div
                                    key={index}
                                    className="group bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 transition-all duration-150 cursor-pointer flex items-center gap-3"
                                >
                                    <span className="w-7 h-7 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-xs flex-shrink-0 group-hover:bg-gray-300 transition-colors duration-150">
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
                            <span className="w-1 h-5 rounded-full bg-gray-900"/>
                            <h2 className="text-sm font-semibold text-gray-900">
                                AI Response
                            </h2>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-900">
                                    <span className="text-white text-xs font-bold">AI</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
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