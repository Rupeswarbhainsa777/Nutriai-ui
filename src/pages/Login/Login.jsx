import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../service/Auth.js";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    console.log(formData.email);
    console.log(formData.password);



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


            localStorage.setItem("user", JSON.stringify(data.user));


            toast.success("Login successful!");


            navigate("/dashboard");
        } catch (error) {

            toast.error("Please check your email address and password");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">

            {/* Card */}
            <div className="w-full max-w-4xl flex rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-200 animate-scale-in">

                {/* ── Left brand panel (Cal.com: dark, flat) ── */}
                <div
                    className="hidden md:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden bg-gray-900"
                >
                    {/* Decorative subtle shapes */}
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-[0.04] bg-white"/>
                    <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-[0.03] bg-white"/>

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
                                    <path d="M4 21l8-8"/>
                                </svg>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">
                                NutriAI
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2 className="text-white text-2xl font-bold leading-tight mb-4">
                            Fuel your body,<br/>feed your goals.
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Track meals, plan your diet, and get AI-powered insights — all in one place.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🥗 Meal Planning", "🤖 AI Insights", "📊 Nutrition Tracking"].map((f) => (
                                <span key={f}
                                      className="text-xs text-gray-300 px-3 py-1.5 rounded-md font-medium bg-white/[0.06] border border-white/[0.08]">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex-1 bg-white p-10 sm:p-12 flex flex-col justify-center">

                    {/* Mobile brand */}
                    <div className="flex md:hidden items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
                                <path d="M4 21l8-8"/>
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-gray-900">NutriAI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">Sign in to continue to your dashboard</p>




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
                                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white hover:border-gray-400"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150 font-medium">
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
                                className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white hover:border-gray-400"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-md text-white text-sm font-medium tracking-wide transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.99] cursor-pointer"
                        >
                            Sign In →
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-7">
                        <div className="flex-1 h-px bg-gray-200"/>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-gray-200"/>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/reg"
                              className="font-medium text-gray-900 hover:underline transition-colors duration-150">
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
}
export default Login;
