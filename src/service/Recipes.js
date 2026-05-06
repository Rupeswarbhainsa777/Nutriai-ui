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