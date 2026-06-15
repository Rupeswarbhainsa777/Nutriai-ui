import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {registration} from "../../service/Auth.js";
import {toast, ToastContainer} from "react-toastify";

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        goal: "",
        dietaryRestrictions: "",
        height: "",
        weight: "",
        age: "",
        mealPlans: [
            {mealName: ""},
            {mealName: ""}
        ],
        preference: {
            preferredCuisine: ""
        }
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Handler for meal plans
    const handleMealPlanChange = (index, value) => {
        const updatedMealPlans = [...formData.mealPlans];
        updatedMealPlans[index] = {mealName: value};
        setFormData({...formData, mealPlans: updatedMealPlans});
    };

    // Handler for preference
    const handlePreferenceChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, preference: {...formData.preference, [name]: value}});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registration(formData);

            toast.success("Registration successfully!");
            setTimeout(() => { navigate("/login"); }, 1000);
        } catch (e) {
            console.error(e);
            toast.error("Registration error!");
        }
    };

    const inputCls = "w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none placeholder-stone-300 transition-all duration-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-stone-50/50 hover:border-stone-300";
    const labelCls = "block text-sm font-semibold text-stone-600 mb-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50/30 to-stone-50 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl flex rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden animate-scale-in">

                {/* ── Left brand panel ── */}
                <div
                    className="hidden lg:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden"
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
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)"}}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
                                    <path d="M4 21l8-8"/>
                                </svg>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight"
                                  style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                                NutriAI
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
                            Begin your<br/>health journey.
                        </h2>
                        <p className="text-green-100/80 text-sm leading-relaxed">
                            Create your profile and let AI craft the perfect nutrition plan tailored to your goals.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["✨ Personalized", "🎯 Goal-Based", "🧠 AI-Powered"].map((f) => (
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
                <div className="flex-1 bg-white p-8 sm:p-10 flex flex-col justify-center">

                    {/* Mobile brand */}
                    <div className="flex lg:hidden items-center gap-2.5 mb-6">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)]"
                             style={{background: "linear-gradient(135deg, #22c55e, #16a34a)"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
                                <path d="M4 21l8-8"/>
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-green-700"
                              style={{fontFamily: "'Playfair Display', Georgia, serif"}}>NutriAI</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-stone-900 mb-1"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                        Create Account
                    </h1>
                    <p className="text-sm text-stone-400 mb-7">Set up your profile to get started</p>



                    <form onSubmit={handleSubmit}>

                        {/* Section heading */}
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"/>
                            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Profile Information</h2>
                        </div>

                        {/* Row 1: Name | Email | Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Name <span className="text-red-400">*</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="Your name"/>
                            </div>
                            <div>
                                <label className={labelCls}>Email <span className="text-red-400">*</span></label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="you@example.com"/>
                            </div>
                            <div>
                                <label className={labelCls}>Password <span className="text-red-400">*</span></label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputCls} placeholder="••••••••"/>
                            </div>
                        </div>

                        {/* Row 2: Height | Weight | Age */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Height (cm) <span className="text-red-400">*</span></label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} required className={inputCls} placeholder="170"/>
                            </div>
                            <div>
                                <label className={labelCls}>Weight (kg) <span className="text-red-400">*</span></label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className={inputCls} placeholder="70"/>
                            </div>
                            <div>
                                <label className={labelCls}>Age <span className="text-red-400">*</span></label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} required className={inputCls} placeholder="25"/>
                            </div>
                        </div>

                        {/* Row 3: Goal | Dietary Restrictions | Preferred Cuisine */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Goal <span className="text-red-400">*</span></label>
                                <input type="text" name="goal" value={formData.goal} onChange={handleChange} required className={inputCls} placeholder="Weight loss"/>
                            </div>
                            <div>
                                <label className={labelCls}>Dietary Restrictions <span className="text-red-400">*</span></label>
                                <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} required className={inputCls} placeholder="Vegetarian"/>
                            </div>
                            <div>
                                <label className={labelCls}>Preferred Cuisine <span className="text-red-400">*</span></label>
                                <input type="text" name="preferredCuisine" value={formData.preference.preferredCuisine} onChange={handlePreferenceChange} required className={inputCls} placeholder="Indian"/>
                            </div>
                        </div>

                        {/* Row 4: Meal Plan 1 | Meal Plan 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className={labelCls}>Meal Plan 1 <span className="text-red-400">*</span></label>
                                <input type="text" name="mealPlan1" value={formData.mealPlans[0].mealName} onChange={(e) => handleMealPlanChange(0, e.target.value)} required className={inputCls} placeholder="Plan name"/>
                            </div>
                            <div>
                                <label className={labelCls}>Meal Plan 2 <span className="text-red-400">*</span></label>
                                <input type="text" name="mealPlan2" value={formData.mealPlans[1].mealName} onChange={(e) => handleMealPlanChange(1, e.target.value)} required className={inputCls} placeholder="Plan name"/>
                            </div>
                        </div>

                        {/* Note */}
                        <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                            All fields marked with an asterisk (<span className="text-red-400">*</span>) are required to process your registration.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => navigate(-1)}
                                    className="px-6 py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm font-semibold hover:border-stone-300 hover:text-stone-700 transition-all duration-300 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit"
                                    className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                        boxShadow: "0 2px 8px rgba(34,197,94,0.3), 0 1px 2px rgba(34,197,94,0.2)"
                                    }}>
                                Register →
                            </button>
                        </div>

                    </form>
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
};

export default Registration;
