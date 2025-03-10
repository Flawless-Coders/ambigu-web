import api from "../../auth/services/api";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfileInfo = async ( email ) => {
    try {
        const response = await api.get(`${API_URL}/admin/${email}`);
        return response.data;
    }catch (error){
        console.error("Error al obtener la información del perfil");
        throw error;
    }
};

export const updateProfileInfo = async ( data ) => {
    try {
        const response = await api.put(`${API_URL}/admin`, data);
        return response.data;
    }catch (error){
        console.error("Error al actualizar la información del perfil");
        throw error;
    }
};

export const updateProfileImage = async ( id, file ) => {
    try {
        console.log("Archivo desde service",file);
        const formData = new FormData();
        formData.append("avatar", file);
        const response = await api.patch(`${API_URL}/admin/avatar/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la imagen de perfil");
        throw error;
    }
}