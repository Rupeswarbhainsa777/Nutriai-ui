const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="text-center animate-scale-in">
                <div className="w-16 h-16 rounded-lg mx-auto mb-6 flex items-center justify-center bg-gray-900">
                    <span className="text-2xl text-white font-bold">?</span>
                </div>
                <h1 className="text-7xl font-bold mb-3 text-gray-900">
                    404
                </h1>
                <p className="text-lg text-gray-600 mb-2 font-medium">Oops! Page not found.</p>
                <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-white rounded-md font-medium text-sm transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.98]"
                >
                    ← Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
