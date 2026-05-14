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
      <div>
          <div>
              <h1>Registration</h1>
              {msg && (
                  <p>{msg}</p>
              )}

              <form onSubmit={handleSubmit}>
                  //name
                  <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className=""
                  />

                  //email
                  <input
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className=""
                  />

                  //password
                  <input
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className=""
                  />


              </form>
          </div>
      </div>
    );
}
export default Registration;


































