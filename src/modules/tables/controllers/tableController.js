import { changeStatusTable, getDisabledTables, getEnabledTables, saveTable, updateTable } from "../services/tableService";

export const handleGetEnabledTables = async (setError, setLoading, setDataTable) => {
    setLoading(true)
    try {
        const data = await getEnabledTables()
        setDataTable(data)
    } catch (error) {
        console.error("error: ", error);
        setError("Error al obtener mesas")
    }finally{
        setLoading(false)
    }
}

export const handleGetDisabledTables = async (setError, setLoading, setDataTable) => {
    setLoading(true)
    try {
        const data = await getDisabledTables()
        setDataTable(data)
    } catch (error) {
        console.error("error: ", error);
        setError("Error al obtener mesas")
    }finally{
        setLoading(false)
    }
}

export const handleSaveTable = async (setError, setLoading, setSuccess, tableIdentifier) => {
    setLoading(true);

    const tableData = {
        tableIdentifier: tableIdentifier, 
    };

    try {
        const response = await saveTable(tableData);
        console.log("respuesta del back: ", response);
        setSuccess("Mesa registrada correctamente");
        return response;
    } catch (error) {
        console.error("error al registrar la mesa: ", error);
        setError("Error al registrar la mesa");
    } finally {
        setLoading(false);
    }
};

export const handleUpdateTable = async (setError, setLoading, setSuccess, tableData) => {
    setLoading(true);

    try {
        const response = await updateTable(tableData);
        console.log("respuesta del back: ", response);
        setSuccess("Mesa actualizada correctamente");
        return response;
    } catch (error) {
        console.error("error al registrar la mesa: ", error);
        setError("Error al actualizar la mesa");
    } finally {
        setLoading(false);
    }
};

export const handleChangeStatusTable = async (setError, setLoading, setSuccess, id) => {
    setLoading(true)
    try {
        const response = await changeStatusTable(id)
        setSuccess("Cambio de estado de mesa actualizado")
        return response        
    } catch (error) {
        console.error("Error al cambiar estado de la mesa: ", error);
        setError("Error al cambiar el estado de la mesa")
    }finally{
        setLoading(false)
    }
}