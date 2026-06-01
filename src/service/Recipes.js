const BASE_URL = "http://localhost:1003/api/recipe";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

// Get all recipes
export const getAllRecipes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getall`, {
            headers: getAuthHeaders(),
        });

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
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: getAuthHeaders(),
        });

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
            headers: getAuthHeaders(),
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
            headers: getAuthHeaders(),
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
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error("Failed to delete recipe");
        }

        return await response.json();
        // If backend returns text:
        // return await response.text();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};