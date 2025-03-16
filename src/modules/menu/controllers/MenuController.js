import { getMenu, getMenuPhoto, getMenuById,createMenu } from "../services/menuService";

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