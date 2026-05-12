const BASE_URL = "http://localhost:1003/api/recipe";

// Get all recipes
export const getAllRecipes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getall`);

        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// Get recipe by ID
export const getRecipeById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch recipe");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// Add new recipe
export const addRecipe = async (recipeData) => {
    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            throw new Error("Failed to add recipe");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// Update recipe
export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            throw new Error("Failed to update recipe");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// Delete recipe
export const deleteRecipe = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete recipe");
        }

        // If backend returns JSON
        return await response.json();

        // If backend returns plain text, use:
        // return await response.text();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};