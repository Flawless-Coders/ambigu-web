import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getWaiters = async () => {
    try {
        const response = await api.get(`${API_URL}/waiters`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener meseros:", error);
        throw error;
    }
};
