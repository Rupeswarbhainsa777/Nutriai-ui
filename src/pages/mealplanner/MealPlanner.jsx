import './mealplanner.css';
import {useState} from "react";
import {createMealPlan} from "../../service/MealPlanner.js";

const MealPlanner = () => {
    const [formData, setFormData] = useState({
        userId: "",
        weekStartDate: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await createMealPlan({
                userId: Number(formData.userId),
                weekStartDate: formData.weekStartDate,
            });

            setMessage(response.message || "Meal Plan created successfully.");

            // Clear form after successful submission
            setFormData({
                userId: "",
                weekStartDate: "",
            });
        } catch (error) {
            setMessage(error.message || "Failed to create Meal Plan.");
        }
    };


    return (
        <div>
            <h1>Create Meal Plan</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Week Start Date:</label>
                    <input
                        type="date"
                        name="weekStartDate"
                        value={formData.weekStartDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <button type="submit">Create Meal Plan</button>
            </form>
        </div>
    );
}

export default MealPlanner;