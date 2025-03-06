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

export const validateToken = async (token) => {
    try{
        const response = await axios.post(`${API_URL}/auth/validate-token`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error("Error al validar el token:", error);
        return false;
    }
}

export const forgotPasswordRequest = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
    } catch (error) {
    throw error.response?.data?.message || "Error con el servidor";
    }
};
