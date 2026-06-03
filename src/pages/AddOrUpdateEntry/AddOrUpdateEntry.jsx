import { useState } from "react";
import { addOrUpdateEntry } from "../../service/MealPlanner.js";

const AddOrUpdateEntry = ()=>{
    const [mealDate, setMealDate] = useState("");
    const [mealType, setMealType] = useState("BREAKFAST");
    const [recipeId, setRecipeId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addOrUpdateEntry(
                22, // mealPlanId
                mealDate,
                mealType,
                Number(recipeId)
            );

            console.log("Success:", response);
            alert("Meal added successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to add meal");
        }
    };

    return (
        <div>
            <h2>Add Meal Entry</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={mealDate}
                        onChange={(e) => setMealDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>Meal Type:</label>
                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                    >
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                    </select>
                </div>

                <div>
                    <label>Recipe ID:</label>
                    <input
                        type="number"
                        value={recipeId}
                        onChange={(e) => setRecipeId(e.target.value)}
                    />
                </div>

                <button type="submit">Save Meal</button>
            </form>
        </div>
    );
}
export default AddOrUpdateEntry;