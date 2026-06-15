const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-stone-50 to-white px-4">
            <div className="text-center animate-scale-in">
                <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_32px_rgba(34,197,94,0.12)]"
                     style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                    <span className="text-3xl text-white font-bold">?</span>
                </div>
                <h1 className="text-7xl font-bold mb-3"
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}>
                    404
                </h1>
                <p className="text-lg text-stone-500 mb-2 font-medium">Oops! Page not found.</p>
                <p className="text-sm text-stone-400 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-7 py-3 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(34,197,94,0.35)] active:translate-y-0"
                    style={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        boxShadow: "0 2px 8px rgba(34,197,94,0.25)"
                    }}
                >
                    ← Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
