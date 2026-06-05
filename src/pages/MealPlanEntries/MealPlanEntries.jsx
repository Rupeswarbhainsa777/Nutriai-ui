import { useEffect, useState } from "react";
import { getMealPlanEntries } from "../../service/MealPlanner.js";

const MealPlanEntries = () => {
    const planId = localStorage.getItem("mealPlanId");
    const [data, setData] = useState([]);

    const loadEntries = async () => {
        try {
            const details = await getMealPlanEntries(planId);
            setData(details || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (planId) {
            loadEntries();
        }
    }, [planId]);

    return (
        <div>
            {data.length === 0 ? (
                <h2>No meal plan entries found</h2>
            ) : (
                data.map((item) => (
                    <div key={item.id}>
                        <h2>Id: {item.id}</h2>
                        <h2>Meal Date: {item.mealDate}</h2>
                        <h2>Meal Type: {item.mealType}</h2>

                        {item.recipe && (
                            <>
                                <h2>Recipe Id: {item.recipe.id}</h2>
                                <h2>Name: {item.recipe.name}</h2>
                                <h2>Description: {item.recipe.description}</h2>

                                <img
                                    src={item.recipe.imageUrl}
                                    alt={item.recipe.name}
                                    width="200"
                                />

                                <h2>Calories: {item.recipe.calories}</h2>
                                <h2>Protein: {item.recipe.protein}</h2>
                                <h2>Carbs: {item.recipe.carbs}</h2>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MealPlanEntries;