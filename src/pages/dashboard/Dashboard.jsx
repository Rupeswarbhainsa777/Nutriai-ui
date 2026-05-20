const Dashboard = () => {
    // Dummy Data
    const stats = [
        { title: "Total Users", value: "1,245", icon: "👥" },
        { title: "Orders", value: "856", icon: "🛒" },
        { title: "Revenue", value: "₹1,25,000", icon: "💰" },
        { title: "Products", value: "320", icon: "📦" }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Full Screen 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-3rem)]">

                {/* Top Left */}
                <div className="bg-white rounded-3xl shadow-md p-8 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        User Statistics
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
                            <span className="text-lg font-medium text-gray-700">
                                👥 Active Users
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                                1,245
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl">
                            <span className="text-lg font-medium text-gray-700">
                                🆕 New Users
                            </span>
                            <span className="text-2xl font-bold text-green-600">
                                128
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-purple-50 p-4 rounded-xl">
                            <span className="text-lg font-medium text-gray-700">
                                ⭐ Premium Users
                            </span>
                            <span className="text-2xl font-bold text-purple-600">
                                324
                            </span>
                        </div>
                    </div>
                </div>

                {/* Top Right */}
                <div className="bg-white rounded-3xl shadow-md p-8 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Sales Overview
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm"
                            >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {item.title}
                                </h3>
                                <p className="text-2xl font-bold text-indigo-600 mt-2">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Left */}
                <div className="bg-white rounded-3xl shadow-md p-8 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Recent Orders
                    </h2>

                    <div className="space-y-4">
                        {[
                            { id: "#ORD001", customer: "Rupeswar", amount: "₹2,500" },
                            { id: "#ORD002", customer: "John", amount: "₹1,200" },
                            { id: "#ORD003", customer: "Priya", amount: "₹3,450" }
                        ].map((order, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b pb-3"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {order.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.customer}
                                    </p>
                                </div>
                                <span className="font-bold text-green-600">
                                    {order.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Right */}
                <div className="bg-white rounded-3xl shadow-md p-8 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Notifications
                    </h2>

                    <div className="space-y-4">
                        {[
                            "🚀 New feature deployed successfully.",
                            "📈 Revenue increased by 12% this month.",
                            "⚠️ 5 products are low in stock.",
                            "✅ 23 new orders received today."
                        ].map((note, index) => (
                            <div
                                key={index}
                                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg text-gray-700"
                            >
                                {note}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;