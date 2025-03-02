import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/auth/login`, { email, password, platform:"WEB" });
        return response.data;
    }catch (error) {
        throw error.response?.data?.message || "Error con el servidor";
    }
}
