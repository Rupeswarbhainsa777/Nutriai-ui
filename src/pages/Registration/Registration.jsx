import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {registration} from "../../service/Auth.js";

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
    const [msg, setMsg] = useState("");

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
            setMsg("Registration successfully!");
            setTimeout(() => { navigate("/login"); }, 1000);
        } catch (e) {
            console.error(e);
        }
    };

    const input = "w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition";
    const label = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-md w-full max-w-5xl p-8">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Registration</h1>
                <hr className="mb-6 border-gray-200"/>

                {/* Success message */}
                {msg && (
                    <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2">
                        ✓ {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Section heading */}
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Profile Information</h2>

                    {/* Row 1: Name | Email | Password */}
                    <div className="grid grid-cols-3 gap-5 mb-4">
                        <div>
                            <label className={label}>Name <span className="text-red-500">*</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Email <span className="text-red-500">*</span></label>
                            <input type="email" name="Email" value={formData.email} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Password <span className="text-red-500">*</span></label>
                            <input type="password" name="Password" value={formData.password} onChange={handleChange} required className={input}/>
                        </div>
                    </div>

                    {/* Row 2: Height | Weight | Age */}
                    <div className="grid grid-cols-3 gap-5 mb-4">
                        <div>
                            <label className={label}>Height (cm) <span className="text-red-500">*</span></label>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Weight (kg) <span className="text-red-500">*</span></label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Age <span className="text-red-500">*</span></label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required className={input}/>
                        </div>
                    </div>

                    {/* Row 3: Goal | Dietary Restrictions | Preferred Cuisine */}
                    <div className="grid grid-cols-3 gap-5 mb-4">
                        <div>
                            <label className={label}>Goal <span className="text-red-500">*</span></label>
                            <input type="text" name="goal" value={formData.goal} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Dietary Restrictions <span className="text-red-500">*</span></label>
                            <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Preferred Cuisine <span className="text-red-500">*</span></label>
                            <input type="text" name="preferredCuisine" value={formData.preference.preferredCuisine} onChange={handlePreferenceChange} required className={input}/>
                        </div>
                    </div>

                    {/* Row 4: Meal Plan 1 | Meal Plan 2 */}
                    <div className="grid grid-cols-3 gap-5 mb-6">
                        <div>
                            <label className={label}>Meal Plan 1 <span className="text-red-500">*</span></label>
                            <input type="text" name="mealPlan1" value={formData.mealPlans[0].mealName} onChange={(e) => handleMealPlanChange(0, e.target.value)} required className={input}/>
                        </div>
                        <div>
                            <label className={label}>Meal Plan 2 <span className="text-red-500">*</span></label>
                            <input type="text" name="mealPlan2" value={formData.mealPlans[1].mealName} onChange={(e) => handleMealPlanChange(1, e.target.value)} required className={input}/>
                        </div>
                    </div>

                    {/* Note */}
                    <p className="text-xs text-gray-500 mb-6">
                        In order to process your registration, we ask you to provide the following information. Please note that all fields marked with an asterisk (*) are required.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)}
                                className="px-8 py-2 rounded bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition">
                            CANCEL
                        </button>
                        <button type="submit"
                                className="px-8 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition flex items-center gap-2">
                            REGISTER →
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Registration;
