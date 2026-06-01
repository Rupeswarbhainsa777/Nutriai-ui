const BASE_URL = "http://localhost:1003/api/meal-plans";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

// POST /api/meal-plans/create?userId=&weekStartDate=
export const createMealPlan = async (userId, weekStartDate) => {
    try {
        const params = new URLSearchParams({
            userId,
            weekStartDate,
        });

        const response = await fetch(
            `${BASE_URL}/create?${params}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create meal plan");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// GET /api/meal-plans/{mealPlanId}
export const getMealPlanById = async (mealPlanId) => {
    const response = await fetch(
        `${BASE_URL}/${mealPlanId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch meal plan");
    }

    return await response.json();
};

// GET /api/meal-plans/{mealPlanId}/entries
export const getMealPlanEntries = async (mealPlanId) => {
    const response = await fetch(
        `${BASE_URL}/${mealPlanId}/entries`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch meal plan entries");
    }

    return await response.json();
};

// POST /api/meal-plans/{mealPlanId}/entries
export const addOrUpdateEntry = async (
    mealPlanId,
    mealDate,
    mealType,
    recipeId
) => {
    const response = await fetch(
        `${BASE_URL}/${mealPlanId}/entries`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                mealDate,
                mealType,
                recipeId,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add/update entry");
    }

    return await response.json();
};

// DELETE /api/meal-plans/{mealPlanId}/entries
export const deleteEntry = async (
    mealPlanId,
    mealDate,
    mealType
) => {
    const params = new URLSearchParams({
        mealDate,
        mealType,
    });

    const response = await fetch(
        `${BASE_URL}/${mealPlanId}/entries?${params}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete entry");
    }

    return await response.json();
};

// DELETE /api/meal-plans/{mealPlanId}
export const deleteMealPlan = async (mealPlanId) => {
    const response = await fetch(
        `${BASE_URL}/${mealPlanId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete meal plan");
    }

    return await response.json();
};

// GET /api/meal-plans/{mealPlanId}/weekly-view
export const getWeeklyView = async (mealPlanId) => {
    const response = await fetch(
        `${BASE_URL}/${mealPlanId}/weekly-view`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weekly view");
    }

    return await response.json();
};