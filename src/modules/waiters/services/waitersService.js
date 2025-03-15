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

export const getWaiterDetails = async (email) => {
    try{
        const response = await api.get(`${API_URL}/waiters/email/avatar/${email}`);
        return response.data;
    }catch (error){
        console.error("Error al obtener la información del mesero");
        throw error;
    }
}

export const registerWaiter = async (data) => {
    try {
        const response = await api.post(`${API_URL}/waiters`, data);
        return response.data;
    }catch (error){
        console.error("Error al registrar mesero:", error);
        throw error;
    }
}

export const updateWaiter = async (data) => {
    try{
        const response = await api.put(`${API_URL}/waiters`, data);
        return response.data;
    }catch (error){
        console.error("Error al actualizar mesero:", error);
        throw error;
    }
}

export const uploadWaiterAvatar = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append("avatar", file);

        const response = await api.patch(`${API_URL}/waiters/avatar/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }catch (error){
        console.error("Error al actualizar la imagen del mesero:", error);
        throw error;
    }
}

export const changeWaiterStatus = async (id) => {
    try{
        await api.patch(`${API_URL}/waiters/status/${id}`);
    } catch (error){
        console.error("Error al cambiar el estado del mesero:", error);
        throw error;
    }
}