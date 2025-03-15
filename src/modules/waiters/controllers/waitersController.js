import { getWaiterDetails, getWaiters, registerWaiter, updateWaiter, uploadWaiterAvatar } from "../services/waitersService";

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

export const handleRegisterWaiter = async (data, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await registerWaiter(data);
        const waiterId = response.id;

        if(data.avatar instanceof File) {
            await uploadWaiterAvatar(waiterId, data.avatar);

        }
        setSuccess("Mesero registrado correctamente");
    } catch {
        setError("Error al registrar mesero");
    } finally {
        setLoading(false);
    }
}

export const handleUpdateWaiter = async (data, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        await updateWaiter(data);

        if(data.avatar instanceof File) {
            await uploadWaiterAvatar(data.id, data.avatar);
        }
        setSuccess("Mesero actualizado correctamente");
    } catch {
        setError("Error al actualizar mesero");
    } finally {
        setLoading(false);
    }
}