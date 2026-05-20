import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../service/Auth.js";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);

            // Save only user information (JWT removed for now)
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage("Login successful!");

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.message);
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
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
                         style={{background: "radial-gradient(circle, #4ade80, transparent 70%)"}}/>
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-15"
                         style={{background: "radial-gradient(circle, #86efac, transparent 70%)"}}/>

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)"}}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a10 10 0 1 0 10 10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight"
                                  style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                                Nutri AI
                            </span>
                        </div>
                        <p className="text-green-100 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-bold leading-tight mb-4"
                            style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                            Fuel your body,<br/>feed your goals.
                        </h2>
                        <p className="text-green-100 text-sm leading-relaxed opacity-90">
                            Track meals, plan your diet, and get AI-powered insights — all in one place.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🥗 Meal Planning", "🤖 AI Insights", "📊 Nutrition Tracking"].map((f) => (
                                <span key={f}
                                      className="text-xs text-white px-3 py-1 rounded-full font-medium"
                                      style={{background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)"}}>
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
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                             style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-green-700"
                              style={{fontFamily: "'Playfair Display', Georgia, serif"}}>NutriAI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">Sign in to continue to your dashboard</p>

                    {/* Status message */}
                    {message && (
                        <div className={`mb-5 flex items-center gap-2 text-sm px-4 py-3 rounded-lg border ${
                            isError
                                ? "text-red-700 bg-red-50 border-red-200"
                                : "text-green-700 bg-green-50 border-green-200"
                        }`}>
                            <span>{isError ? "✕" : "✓"}</span>
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-green-600 hover:text-green-700 transition-colors font-medium">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                            style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                boxShadow: "0 4px 14px rgba(34,197,94,0.35)"
                            }}
                        >
                            Sign In →
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200"/>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-gray-200"/>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/reg"
                              className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Login;
