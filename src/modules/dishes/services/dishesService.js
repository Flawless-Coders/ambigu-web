import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getCategories = async () => {
    try {
        const response = await api.get(`${API_URL}/categories`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error;
    }
};

export const getDishesByCategoryAndStatus = async (categoryId, status) => {
    try {
        const response = await api.get(`${API_URL}/dishes/byCategory/${categoryId}`, {
            params: { available: status }
        })
        return response.data;
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        throw error;
    }
};

export const createDish = async (data) => {
    try {
        const response = await api.post(`${API_URL}/dishes`, data);
        return response.data;
    }catch (error){
        console.error("Error al registrar el platillo:", error);
        throw error;
    }
}

export const getDishById = async (id) => {
    try {
        const response = await api.get(`${API_URL}/dishes/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener el platillo:", error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`${API_URL}/categories/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener el platillo:", error);
        throw error;
    }
};

export const updateDish = async (id, data) => {
    try {
        const response = await api.put(`${API_URL}/dishes/${id}`, data);
        return response.data;
    }catch (error){
        console.error("Error al modificar el platillo:", error);
        throw error;
    }
}

export const disableDish = async (id) => {
    try {
        const response = await api.put(`${API_URL}/dishes/status/${id}`);
        return response.data;
    }catch (error){
        console.error("Error al deshabilitar el platillo:", error);
        throw error;
    }
}