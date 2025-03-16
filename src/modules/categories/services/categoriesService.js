import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (enabled) => {
  try {
    const response = await api.get(`${API_URL}/categories`, {
      params: { enabled },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
