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

    const inputCls = "w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 transition-all duration-150 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white hover:border-gray-400";
    const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl flex rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-200 animate-scale-in">

                {/* ── Left brand panel (Cal.com: dark) ── */}
                <div
                    className="hidden lg:flex flex-col justify-between w-5/12 p-10 relative overflow-hidden bg-gray-900"
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
                            Begin your<br/>health journey.
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Create your profile and let AI craft the perfect nutrition plan tailored to your goals.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {["✨ Personalized", "🎯 Goal-Based", "🧠 AI-Powered"].map((f) => (
                                <span key={f}
                                      className="text-xs text-gray-300 px-3 py-1.5 rounded-md font-medium bg-white/[0.06] border border-white/[0.08]">
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
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                 stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3C7 3 4 7 4 11c0 5 5 10 8 10 1.5 0 4-2 6-5 1.5-2.5 2-5 2-7 0-3-3-6-8-6z"/>
                                <path d="M4 21l8-8"/>
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-gray-900">NutriAI</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 mb-7">Set up your profile to get started</p>



                    <form onSubmit={handleSubmit}>

                        {/* Section heading */}
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-1 h-5 rounded-full bg-gray-900"/>
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Profile Information</h2>
                        </div>

                        {/* Row 1: Name | Email | Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Name <span className="text-red-500">*</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="Your name"/>
                            </div>
                            <div>
                                <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="you@example.com"/>
                            </div>
                            <div>
                                <label className={labelCls}>Password <span className="text-red-500">*</span></label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputCls} placeholder="••••••••"/>
                            </div>
                        </div>

                        {/* Row 2: Height | Weight | Age */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Height (cm) <span className="text-red-500">*</span></label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} required className={inputCls} placeholder="170"/>
                            </div>
                            <div>
                                <label className={labelCls}>Weight (kg) <span className="text-red-500">*</span></label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className={inputCls} placeholder="70"/>
                            </div>
                            <div>
                                <label className={labelCls}>Age <span className="text-red-500">*</span></label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} required className={inputCls} placeholder="25"/>
                            </div>
                        </div>

                        {/* Row 3: Goal | Dietary Restrictions | Preferred Cuisine */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className={labelCls}>Goal <span className="text-red-500">*</span></label>
                                <input type="text" name="goal" value={formData.goal} onChange={handleChange} required className={inputCls} placeholder="Weight loss"/>
                            </div>
                            <div>
                                <label className={labelCls}>Dietary Restrictions <span className="text-red-500">*</span></label>
                                <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} required className={inputCls} placeholder="Vegetarian"/>
                            </div>
                            <div>
                                <label className={labelCls}>Preferred Cuisine <span className="text-red-500">*</span></label>
                                <input type="text" name="preferredCuisine" value={formData.preference.preferredCuisine} onChange={handlePreferenceChange} required className={inputCls} placeholder="Indian"/>
                            </div>
                        </div>

                        {/* Row 4: Meal Plan 1 | Meal Plan 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className={labelCls}>Meal Plan 1 <span className="text-red-500">*</span></label>
                                <input type="text" name="mealPlan1" value={formData.mealPlans[0].mealName} onChange={(e) => handleMealPlanChange(0, e.target.value)} required className={inputCls} placeholder="Plan name"/>
                            </div>
                            <div>
                                <label className={labelCls}>Meal Plan 2 <span className="text-red-500">*</span></label>
                                <input type="text" name="mealPlan2" value={formData.mealPlans[1].mealName} onChange={(e) => handleMealPlanChange(1, e.target.value)} required className={inputCls} placeholder="Plan name"/>
                            </div>
                        </div>

                        {/* Note */}
                        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                            All fields marked with an asterisk (<span className="text-red-500">*</span>) are required to process your registration.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => navigate(-1)}
                                    className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:border-gray-400 hover:text-gray-900 transition-all duration-150 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit"
                                    className="px-5 py-2.5 rounded-md text-white text-sm font-medium transition-all duration-150 bg-gray-900 hover:bg-gray-800 active:scale-[0.99] flex items-center gap-2 cursor-pointer">
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
