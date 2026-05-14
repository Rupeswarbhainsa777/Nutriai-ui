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

        setFormData({
            ...formData,
            [name]: value,
        });
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
        setFormData({
            ...formData,
            preference: {...formData.preference, [name]: value}
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registration(formData);
            setMsg("Registration successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (e) {
            console.error(e);
        }

    }
    return (
        <h1>Reg</h1>
    );
}
export default Registration;


































