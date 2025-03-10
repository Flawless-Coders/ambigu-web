import { getWaiterDetails, getWaiters } from "../services/waitersService";

export const handleGetWaiters = async (setRows, setError, setLoading) => {
    setLoading(true);
    try {
        const data = await getWaiters();
        const formattedData = data.map((item, index) => ({
            id: index + 1, 
            name: `${item.name} ${item.lastname_p} ${item.lastname_m}`,
            email: item.email,
            phone: item.phone,
        }));
        setRows(formattedData);
    } catch {
        setError("Error al obtener la lista de meseros");
    } finally {
        setLoading(false);
    }
};

export const handleGetWaiterDetails = async (email, setSelectedUser, setError, setLoading) => {
    setLoading(true);
    try {
        const data = await getWaiterDetails(email);
        setSelectedUser(data);
    } catch {
        setError("Error al obtener detalles del mesero");
    } finally {
        setLoading(false);
    }
};