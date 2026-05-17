const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Full Screen 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-3rem)]">

                {/* Top Left */}
                <div className="bg-white rounded-3xl shadow-md flex items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-gray-700">
                        Dashboard Top Left
                    </h1>
                </div>

                {/* Top Right */}
                <div className="bg-white rounded-3xl shadow-md flex items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-gray-700">
                        Dashboard Top Right
                    </h1>
                </div>

                {/* Bottom Left */}
                <div className="bg-white rounded-3xl shadow-md flex items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-gray-700">
                        Dashboard Bottom Left
                    </h1>
                </div>

                {/* Bottom Right */}
                <div className="bg-white rounded-3xl shadow-md flex items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-gray-700">
                        Dashboard Bottom Right
                    </h1>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;