import { getCategories, createCategory, updateCategory, changeCategoryStatus, updateCategoryImage } from "../services/categoriesService";

export const handleGetCategories = async (setCategories, setLoading, setError) => {
  setLoading(true);
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (error) {
    setError("Error al obtener categorías");
    console.error("Error al obtener categorías:", error);
  } finally {
    setLoading(false);
  }
};

export const handleCreateCategory = async (name, imageFile, setSuccess, setError, setLoading, onSuccess = () => {}) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      await createCategory(name, imageFile);
      setSuccess("Categoría agregada exitosamente");
  
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      setError("Error al crear la categoría");
      console.error("Error al crear la categoría:", error);
    } finally {
      setLoading(false);
    }
  };

export const handleUpdateCategory = async (id, name, imageBase64, status, imageFile, setSuccess, setError, setLoading, onSuccess) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    await updateCategory(id, name, imageBase64, status);
    if (imageFile) {
      await updateCategoryImage(id, imageFile);
    }
    setSuccess("Categoría actualizada correctamente");
    await onSuccess();
  } catch (error) {
    setSuccess(null);
    setError("Error al actualizar la categoría");
    console.error("Error al actualizar la categoría:", error);
  } finally {
    setLoading(false);
  }
};

export const handleChangeCategoryStatus = async (id, setSuccess, setError, setLoading, onStatusChange) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    await changeCategoryStatus(id);
    setSuccess("Estado de la categoría actualizado correctamente.");
    await onStatusChange(); 
  } catch (error) {
    setSuccess(null);
    setError("Error al cambiar el estado de la categoría.");
    console.error("Error al cambiar el estado de la categoría:", error);
  } finally {
    setLoading(false);
  }
};
