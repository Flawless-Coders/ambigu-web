import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getMenu = async ()=>{
    try{
        const response = await api.get(`${API_URL}/menu`)
        return response.data;
    }catch(error){
        console.error("Error al obtener los menús: ", error);
        throw error;
        
    }
}

export const getMenuPhoto = async (photoId) => {
    try {
        const response = await api.get(`${API_URL}/menu/photo/${photoId}`, {
            responseType: 'blob', // Indica que la respuesta es un blob
        });
        return URL.createObjectURL(response.data); // Convierte el blob en una URL
    } catch (error) {
        console.error("Error obteniendo la imagen: ", error);
        throw error;
    }
};


export const getMenuById = async (menuId) => {
    try {
        const response = await api.get(`${API_URL}/menu/${menuId}`)
        return response.data;
    } catch (error) {
        console.error("Error obteniendo el menú: ", error);
        throw error;
    }
};

export const createMenu = async (formData) => {
    try {
        const response = await api.post(`${API_URL}/menu`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Especifica el tipo de contenido
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el menú:", error);
        throw error;
    }
};


export const updateMenu = async (id,formData) => {
    try {
        const response = await api.put(`${API_URL}/menu/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Especifica el tipo de contenido
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el menú:", error);
        throw error;
    }
};


export const inactivateMenu = async (menuId) => {
    try {
        const response = await api.put(`${API_URL}/menu/inactivateMenu/${menuId}`)
        return response.data;
    } catch (error) {
        console.error("Error al inactivar el menú: ", error);
        throw error;
    }
};

export const assignAsCurrent = async (menuId) => {
    try {
        const response = await api.put(`${API_URL}/menu/assignAsCurrent/${menuId}`)
        return response.data;
    } catch (error) {
        console.error("Error al asignar como menú actual: ", error);
        throw error;
    }
};

export const getCategoriesByMenu = async (menuId) => {
    try {
        const response = await api.get(`${API_URL}/menu/getCategoriesByMenu/${menuId}`)
        return response.data;
    } catch (error) {
        console.error("Error obteniendo las categorias: ", error);
        throw error;
    }
};


export const getDishesByMenu= async (menuId, categoryId) => {
    try {
        const response = await api.get(`${API_URL}/menu/getDishes/${menuId}/${categoryId}`)
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los platillos: ", error);
        throw error;
    }
};


export const getAllCategories = async () => {
    try {
      const response = await api.get(`${API_URL}/categories/getByStatus/${true}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  };

  export const addDish = async (dishId, menuId)=>{
    try{
        const response = await api.put(`${API_URL}/menu/addDish/${dishId}/${menuId}`);
        return response.data;
    }catch(error){
        console.log("Error al agregar el platillo", error);
        throw error;
    }
  }

  export const getDishByCategory = async (categoryId)=>{
    try{
        const response = await api.get(`${API_URL}/dishes/byCategory/${categoryId}`, {
            params: { available: true},
          })
        return response.data;
    }catch(error){
        console.log("Error al obtener los platillos");
        throw error;
    }
  }


  export const removeDish = async (dishId, menuId)=>{
    try{
        const response = await api.put(`${API_URL}/menu/removeDish/${dishId}/${menuId}`);
        return response.data;
    }catch(error){
        console.log("Error al retirar el platillo", error);
        throw error;
    }
  }