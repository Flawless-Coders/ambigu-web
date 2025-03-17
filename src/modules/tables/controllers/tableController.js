import { getDisabledTables, getEnabledTables, saveTable } from "../services/tableService";

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
