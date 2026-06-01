const BASE_URL = "http://localhost:1003/api/user";

export const userDetails = async ({ id }) => {
    console.log(`User Details: ${id}`);

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user with id: ${id}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};