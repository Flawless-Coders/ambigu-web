import { createDish, disableDish, getCategories, getCategoryById, getDishById, updateDish, getDishesByCategoryAndStatus } from "../services/dishesService";

export const handleGetCategories = async (setCategories, setError, setLoading) => {
    setLoading(true);
    try {
        const data = await getCategories();
        setCategories(data);
    } catch {
        setError("Error al obtener las categorías");
    } finally {
        setLoading(false);
    }
};

export const handleGetDishesByCategoryAndStatus = async (categoryId, available, setDishes, setError, setLoading) => {
    setLoading(true);
    try {
        const data = await getDishesByCategoryAndStatus(categoryId, available);
        setDishes(data);
    } catch {
        setError("Error al obtener detalles del mesero");
    } finally {
        setLoading(false);
    }
};


export const handleCreateDish = async (data, setSuccess, setLoading, setCreatedDish, setError) => {
    setLoading(true);
    try {
        await createDish(data);
        setSuccess("Platillo registrado correctamente");
        setCreatedDish(true);
    } catch {
        setError("Error al registrar el platillo");
    } finally {
        setLoading(false);
    }
}

export const handleGetDishById = async (id, setSelectedDish, setModalLoading, setCategoryDish) => {
    setModalLoading(true);
    try {
        const response = await getDishById(id);
        const category = await getCategoryById(response.category);

        if (category) {
            setCategoryDish(category);
        } else {
            console.error("Category is undefined or null");
        }
        setSelectedDish(response);        
    } catch (error) {
        console.error("Error al encontrar el platillo:", error);
    } finally {
        setModalLoading(false);
    }
}

export const handleGetCategoryById = async (id, setDishCategory, setModalLoading, setError) => {
    setModalLoading(true);
    try {
        const response = await getCategoryById(id);   
        setDishCategory(response);
    } catch {
        setError("Error al encontrar la categoría del platillo");
    } finally {
        setModalLoading(false);
    }
}


export const handleUpdateDish = async (id, data, setSuccess, setLoading, setUpdatedDish, setError) => {
    setLoading(true);
    try {
        await updateDish(id, data);
        setSuccess("Platillo modificado correctamente");
        setUpdatedDish(true);
    } catch {
        setError("Error al modificar el platillo");
    } finally {
        setLoading(false);
    }
}

export const handleChangeStatusDish = async (id, setSuccess, setLoading, setError, setUpdatedDish, setOpenModal, disable) => {    
    setLoading(true);
    try {
        await disableDish(id);
        setOpenModal(false);
        if(disable){
            setSuccess("Platillo deshabilitado correctamente");
        }else{
            setSuccess("Platillo habilitado correctamente");
        }
        setUpdatedDish(true);
    } catch {
        if(disable){
            setError("Error al deshabilitar el platillo");
        }else{
            setError("Error al habilitar el platillo");
        }
    } finally {
        setLoading(false);
    }
}