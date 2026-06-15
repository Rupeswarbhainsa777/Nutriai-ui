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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-green-50/30 to-stone-50 px-4 py-12">

            {/* Card */}
            <div className="w-full max-w-4xl flex rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden animate-scale-in">

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
                    <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10"
                         style={{background: "radial-gradient(circle, #bbf7d0, transparent 70%)"}}/>

                    {/* Brand logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)"}}>
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
                        <p className="text-green-100/80 text-sm mt-1 leading-relaxed">
                            Your intelligent nutrition companion
                        </p>
                    </div>

                    {/* Tagline block */}
                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-bold leading-tight mb-4"
                            style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                            Fuel your body,<br/>feed your goals.
                        </h2>
                        <p className="text-green-100/80 text-sm leading-relaxed">
                            Track meals, plan your diet, and get AI-powered insights — all in one place.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["🥗 Meal Planning", "🤖 AI Insights", "📊 Nutrition Tracking"].map((f) => (
                                <span key={f}
                                      className="text-xs text-white/90 px-3.5 py-1.5 rounded-full font-medium border border-white/10"
                                      style={{background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)"}}>
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
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]"
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

                    <h1 className="text-2xl font-bold text-stone-900 mb-1"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                        Welcome back
                    </h1>
                    <p className="text-sm text-stone-400 mb-8">Sign in to continue to your dashboard</p>




                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-stone-600 mb-2">
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
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none placeholder-stone-300 transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-stone-50/50 hover:border-stone-300"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-semibold text-stone-600">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-green-600 hover:text-green-700 transition-colors duration-200 font-semibold">
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
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none placeholder-stone-300 transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-stone-50/50 hover:border-stone-300"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            className="w-full py-3 px-4 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
                            style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                boxShadow: "0 2px 8px rgba(34,197,94,0.3), 0 1px 2px rgba(34,197,94,0.2)"
                            }}
                        >
                            Sign In →
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-7">
                        <div className="flex-1 h-px bg-stone-100"/>
                        <span className="text-xs text-stone-300 font-semibold uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-stone-100"/>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-stone-400">
                        Don't have an account?{" "}
                        <Link to="/reg"
                              className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200">
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
