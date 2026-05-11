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
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-green-600 mb-3">
                    AI Nutrition Assistant
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Ask the AI to generate meal plans, nutrition tips, and healthy recipe
                    suggestions.
                </p>

                {/* Input Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Ask something like: Create a weight loss meal plan"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md">
                        Ask AI
                    </button>
                </div>

                {/* Sample Prompts */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Sample Prompts
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {suggestions.map((item, index) => (
                            <div
                                key={index}
                                className="bg-green-50 border border-green-200 rounded-xl p-4 text-gray-700 hover:bg-green-100 transition cursor-pointer"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Response */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        AI Response
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Hello! I can help you create personalized meal plans, suggest
                        healthy recipes, and provide nutrition advice based on your fitness
                        goals and dietary preferences.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;