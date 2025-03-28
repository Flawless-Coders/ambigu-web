import {getOrders} from '../services/orderService'

export const handleGetOrder = async (setError, setLoading, setOrderData)=>{
    setLoading(true);
    try{
        const response = await getOrders();
        setOrderData(response);
    }catch{
        setError("Error obteniendo los pedidos");
    }finally{
        setLoading(false);
    }

}