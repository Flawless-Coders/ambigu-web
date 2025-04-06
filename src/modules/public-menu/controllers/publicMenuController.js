import {
  getCurrentMenu,
  getCurrentMenuCategories,
  getCurrentMenuCategoriesAndDishes,
  getCurrentMenuDishesByCategory,
} from "../services/publicMenuService";

export const handleGetCurrentMenu = async (setCurrentMenu, setLoading) => {
  setLoading(true);
  try {
    const response = await getCurrentMenu();
    setCurrentMenu(response);
  } catch {
    console.error("Ocurrió un error al obtener el menú, pero no es su culpa.");
  } finally {
    setLoading(false);
  }
};

export const handleGetCurrentMenuCategories = async (
  setCategories,
  setLoading
) => {
  setLoading(true);
  try {
    const response = await getCurrentMenuCategories();
    setCategories(response);
  } catch {
    console.error(
      "Ocurrió un error al obtener las categorías del menú, pero no es su culpa."
    );
  } finally {
    setLoading(false);
  }
};

export const handleGetCurrentMenuDishesByCategory = async (
  categoryId,
  setDishes,
  setLoading
) => {
  setLoading(true);
  try {
    const response = await getCurrentMenuDishesByCategory(categoryId);

    setDishes(response);
    setLoading(false);
  } catch {
    console.error(
      "Ocurrió un error al obtener los platillos del menú, pero no es su culpa."
    );
  }finally{
    setLoading(false);
  }
};

export const handleGetDishesByCategory = async (
  setDishesByCategory,
  setLoading
) => {
  setLoading(true);
  try {
    const response = await getCurrentMenuCategoriesAndDishes();
    setDishesByCategory(response);
  } catch {
    console.error(
      "Ocurrió un error al obtener los platillos del menú, pero no es su culpa."
    );
  } finally {
    setLoading(false);
  }
};
