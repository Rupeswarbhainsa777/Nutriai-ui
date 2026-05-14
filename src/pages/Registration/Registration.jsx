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
                  {/*//name*/}
                  <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className=""
                  />

                  {/*//email*/}
                  <input
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className=""
                  />

                  {/*//password*/}
                  <input
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className=""
                  />
                  <input
                      type="text"
                      name="goal"
                      placeholder="Enter your goal"
                      value={formData.goal}
                      onChange={handleChange}
                      required

                  />

                  {/* Dietary Restrictions */}
                  <input
                      type="text"
                      name="dietaryRestrictions"
                      placeholder="Dietary Restrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      required

                  />

                  {/* Height */}
                  <input
                      type="number"
                      name="height"
                      placeholder="Height (cm)"
                      value={formData.height}
                      onChange={handleChange}
                      required

                  />

                  {/* Weight */}
                  <input
                      type="number"
                      name="weight"
                      placeholder="Weight (kg)"
                      value={formData.weight}
                      onChange={handleChange}
                      required

                  />

                  {/* Age */}
                  <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required

                  />
                  <input
                      onChange={(e)=>handleMealPlanChange(0,e.target.value)}

                      type="text"
                      name="mealPlan1"
                      placeholder="Meal Plan 1"
                      value={formData.mealPlans[0].mealName}
                      required

                  />

                  {/* Meal Plan 2 */}
                  <input
                      onChange={(e)=>handleMealPlanChange(1,e.target.value)}
                      type="text"
                      name="mealPlan2"
                      placeholder="Meal Plan 2"
                      value={formData.mealPlans[1].mealName}
                      required

                  />
                  <input
                      onChange={handlePreferenceChange}
                      type="text"
                      name="preferredCuisine"
                      placeholder="Preferred Cuisine"
                      value={formData.preference.preferredCuisine}
                      required

                  />

                  {/* Submit Button */}
                  <button
                      type="submit"

                  >
                      Register
                  </button>



              </form>
          </div>
      </div>
    );
}
export default Registration;


































