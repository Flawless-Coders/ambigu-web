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

export const createCategory = async (categoryName, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryName);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await api.post(`${API_URL}/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

export const changeCategoryStatus = async (id) => {
  try {
    await api.put(`${API_URL}/categories/status/${id}`);
  } catch (error) {
    console.error("Error al cambiar el estado de la categoría:", error);
    throw error;
  }
};

export const updateCategory = async (id, name, imageBase64, status) => {
  try {
    const response = await api.put(`${API_URL}/categories/${id}`, {
      id,
      name,
      imageBase64,
      status
    });

    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw error;
  }
};
export const updateCategoryImage = async (id, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.patch(`${API_URL}/categories/image/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al actualizar la imagen de la categoría:", error);
    throw error;
  }
};

