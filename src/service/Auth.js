const BASE_URL = "http://localhost:1003/api/auth";
// Done
export const registration = async (credentials) => {
    const response = await fetch(`${BASE_URL}/reg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
    }

    return data;
};
// Done
export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    // Store user data
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);

    return data;
};