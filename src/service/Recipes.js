export const allRecipes = async () => {
    try {
        const response = await fetch('http://localhost:1003/api/recipe/getall');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};