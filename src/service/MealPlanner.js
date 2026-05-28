const BASE_URL = "http://localhost:1003/api/meal-plan";

// POST /api/meal-plan/create
export const createMealPlan = async (plan) => {
    try {
        const response = await fetch(`${BASE_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error("Failed to create meal plan");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// GET /api/meal-plan/{id}
export const getMealPlanById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch meal plan");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// GET /api/meal-plan/{mealPlanId}/entries
export const getMealPlanEntries = async (mealPlanId) => {
    try {
        const response = await fetch(`${BASE_URL}/${mealPlanId}/entries`);
        if (!response.ok) throw new Error("Failed to fetch meal plan entries");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// POST /api/meal-plan/{mealPlanId}/entry?day=&mealType=&recipeId=
export const addOrUpdateEntry = async (mealPlanId, day, mealType, recipeId) => {
    try {
        const params = new URLSearchParams({ day, mealType, recipeId });
        const response = await fetch(`${BASE_URL}/${mealPlanId}/entry?${params}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Failed to add/update entry");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// DELETE /api/meal-plan/{mealPlanId}/entry?day=&mealType=
export const deleteEntry = async (mealPlanId, day, mealType) => {
    try {
        const params = new URLSearchParams({ day, mealType });
        const response = await fetch(`${BASE_URL}/${mealPlanId}/entry?${params}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete entry");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// DELETE /api/meal-plan/{id}
export const deleteMealPlan = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete meal plan");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};