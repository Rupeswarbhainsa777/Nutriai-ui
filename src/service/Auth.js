const BASE_URL = "http://localhost:1003/api/auth";

export const registration = async (credentials) => {
    const response = await fetch(`${BASE_URL}/reg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),

    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
    }
    return data;
}