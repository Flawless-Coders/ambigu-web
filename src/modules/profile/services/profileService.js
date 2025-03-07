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