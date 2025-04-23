import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getCurrentMenu = async () => {
    try {
        const response = await api.get(`${API_URL}/menu/public/currentMenu`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener el menú actual:", error);
        throw error;
    }
};

export const getCurrentMenuCategories = async () => {
    try {
        const response = await api.get(`${API_URL}/menu/public/category`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías del menú actual:", error);
        throw error;
    }
};

export const getCurrentMenuDishesByCategory = async (id) => {
    try {
        const response = await api.get(`${API_URL}/menu/public/getDishesByCategory/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener los platillos del menú actual:", error);
        throw error;
    }
};

export const getCurrentMenuCategoriesAndDishes = async () => {
    try {
        const response = await api.get(`${API_URL}/menu/public/currentMenuCategoriesAndDishes`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener los platillos del menú actual:", error);
        throw error;
    }
};

export const getCurrentLogo = async () => {
    try {
        const response = await api.get(`${API_URL}/theming/public-theme/default_theme`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener los platillos del menú actual:", error);
        throw error;
    }
};