

export const API_URL = "http://localhost:2020/api";

export const registerAdmin = async (admin) => {
    const response = await fetch(`${API_URL}/register_admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
    });
    return response.text();
};

export const loginUser = async (admin) => {
    const response = await fetch(`${API_URL}/login_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
    });
    return response.text();
};

export const addPlant = async (plant) => {
    const response = await fetch(`${API_URL}/add_plant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant),
    });
    return response.json();
};

export const deletePlant = async (id) => {
    const response = await fetch(`${API_URL}/delete_plant/${id}`, {
        method: "DELETE",
    });
    return response.text();
};

export const updatePlant = async (id, plant) => {
    const response = await fetch(`${API_URL}/update_plant/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant),
    });
    return response.json();
};

// userService.js
export async function getAllPlants() {
    try {
        const response = await fetch("http://localhost:2020/api/get_allplants"); // Adjust the URL to your backend API
        if (!response.ok) {
            throw new Error("Failed to fetch plants");
        }
        const data = await response.json();
        return data; // Ensure it returns an array of plant objects
    } catch (error) {
        console.error("Error fetching plants:", error);
        return []; // Return an empty array in case of error
    }
}


