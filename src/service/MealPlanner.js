const BASE_URL = "http://localhost:1003/api/meal-plan";

export const createMealPlan = async (plan) => {
    try {
        const response = await fetch(`${BASE_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plan),
        });
        if (!response.ok) {
            throw new Error("Failed to add recipe");
        }

        return await response.json();

    } catch
        (error) {
        console.error("API Error:", error);
        throw error;
    }
}