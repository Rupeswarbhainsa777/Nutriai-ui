import { useEffect, useState } from "react";

import "./recipes.css";
import {getAllRecipes} from "../../service/Recipes.js";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes()
            .then((data) => setRecipes(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>

            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                    <img src={recipe.imageUrl} alt={recipe.name} width="200" />
                    <p>Calories: {recipe.calories}</p>
                    <p>Protein: {recipe.protein}</p>
                    <p>Carbs: {recipe.carbs}</p>
                </div>
            ))}
        </div>
    );
};

export default Recipes;