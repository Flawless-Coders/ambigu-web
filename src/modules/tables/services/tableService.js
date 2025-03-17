import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getEnabledTables = async () => {
    try{
        const response = await api.get(`${API_URL}/tables/getEnabledTables`)
        return response.data
    }catch(error){
        console.error("Error al obtener mesas habilitadas: ", error);
        throw error;
    }
}

export const getDisabledTables = async () => {
    try{
        const response = await api.get(`${API_URL}/tables/getDisabledTables`)
        return response.data
    }catch(error){
        console.error("Error al obtener mesas deshabilitadas: ", error);
        throw error;
    }
}

export const saveTable = async (table) => {
    try {
        const response = await api.post(`${API_URL}/tables`, table)
        return response.data
    } catch (error) {
        console.error("Error al guardar la mesa: ", error);
        throw error
    }
}