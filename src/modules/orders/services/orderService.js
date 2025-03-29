import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL; 

export const getOrders = async ()=>{
    try{
        const response = await api.get(`${API_URL}/order`)
        return response.data;
    }catch(error){
        console.log("Error obteniendo los pedidos", error);
        throw error;
    }
}