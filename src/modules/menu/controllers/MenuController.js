import { getMenu, getMenuPhoto, getMenuById,createMenu, updateMenu, inactivateMenu, 
    assignAsCurrent, getCategoriesByMenu, getDishesByMenu, getAllCategories, addDish, 
    getDishByCategory, removeDish} from "../services/menuService";

export const handleGetMenu = async(setError, setLoading, setMenuData) =>{
    setLoading(true);
    try{
        const response = await getMenu();
        setMenuData(response);
    }catch{
        setError("Error al obtener los menus");
    }
}

export const handleGetMenuById = async(id,setSelectedMenu,setError, setDialogLoading) =>{
    setDialogLoading(true);
    try{
        const response = await getMenuById(id);
        setSelectedMenu(response);
    }catch{
        setError("Error al obtener el menú");
    }finally{
        setDialogLoading(false);
    }
}

export const handleGetMenuPhotos = async (menuData, setPhotos, setLoading) => {
    if (menuData) {
        setLoading(true);
        const newPhotos = {};

        try {
            await Promise.all(
                menuData.map(async (menu) => {
                    if (menu.photoId) {
                        try {
                            const photo = await getMenuPhoto(menu.photoId);
                            newPhotos[menu.photoId] = photo;
                        } catch (error) {
                            console.error(`Error obteniendo la foto para photoId ${menu.photoId}:`, error);
                            newPhotos[menu.photoId] = "https://placehold.co/300x200"; // Imagen por defecto
                        }
                    }
                })
            );
            setPhotos(newPhotos); // Actualiza el estado con las URLs de las fotos
        } catch (error) {
            console.error("Error en handleGetMenuPhotos:", error);
        } finally {
            setLoading(false);
        }
    }
};


export const handleCreateMenu = async (menu, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("name", menu.name);
        formData.append("description", menu.description);
        formData.append("photo", menu.photo); // Aquí esperamos un objeto File

        const response = await createMenu(formData);
        setSuccess("Menú registrado correctamente");
        return response;
    } catch (error) {
        setError("Error al registrar el menú");
        throw error;
    } finally {
        setLoading(false);
    }
};


export const handleUpdateMenu = async (menu, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("name", menu.name);
        formData.append("description", menu.description);
        formData.append("photo", menu.photo); // Aquí esperamos un objeto File

        const response = await updateMenu(menu.id,formData);
        setSuccess("Menú actualizado correctamente");
        return response;
    } catch (error) {
        setError("Error al actualizar el menú");
        throw error;
    } finally {
        setLoading(false);
    }
};


export const handleInactivateMenu = async (id, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await inactivateMenu(id);
        setSuccess("Menú actualizado correctamente");
        return response;
    } catch (error) {
        setError("Error al actualizar el menú");
        throw error;
    } finally {
        setLoading(false);
    }
};


export const handleAssignAsCurrent = async (id, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await assignAsCurrent(id);
        response ? setSuccess("Menú actualizado correctamente"): setError("Sólo puede haber un menú actual");
        return response;
    } catch (error) {
        setError("Error al asignar como actual al menú");
        throw error;
    } finally {
        setLoading(false);
    }
};

export const handleGetCategories= async(setError, setLoading,setCategories, menuId) =>{
    setLoading(true);
    try{
        const response = await getCategoriesByMenu(menuId);
        setCategories(response);
    }catch{
        setError("Error obteniendo la información")
    }finally{
        setLoading(false);
    }
}

export const handleGetDishes = async(setError, setLoading, setDishes, menuId, categoryId)=>{
    setLoading(true);
    try{
        const response = await getDishesByMenu(menuId, categoryId);
        setDishes(response);
        
    }catch{
        setError("Error obteniendo los platillos")
    }finally{
        setLoading(false);
    }
}

export const handleGetAllCategories=async(setError, setDialogLoading, setDialogCategories)=>{
    setDialogLoading(true);
    try{
        const response = await getAllCategories();
        setDialogCategories(response);
    }catch{
        setError("Error obteniendo las categorías")
    }finally{
        setDialogLoading(false);
    }
}

export const handleAddDish = async (menuId, dishId, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await addDish(dishId, menuId);
        setSuccess("Platillo agregado al menú")
        return response;
    } catch (error) {
        setError("Error al agregar sel platillo al menú");
        throw error;
    } finally {
        setLoading(false);
    }
};

export const handleGetDishesByCategory = async(setDialogDishes, categoryId, setLoading) =>{
    setLoading(true);
    try{
        const response = await getDishByCategory(categoryId);
        setDialogDishes(response);
    }catch{
        console.log ("Error al obtener los menus");
    }finally{
        setLoading(false);
    }
}


export const handleRemoveDish = async (menuId, dishId, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await removeDish(dishId, menuId);
        setSuccess("Platillo removido del menú")
        return response;
    } catch (error) {
        setError("Error al remover platillo del menú");
        throw error;
    } finally {
        setLoading(false);
    }
};
