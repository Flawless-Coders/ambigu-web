import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useColors = () => {
  const [savedColors, setSavedColors] = useState({
    primaryColor: "",
    secondaryColor: "",
    backgroundColor: "",
  });

  const [draftColors, setDraftColors] = useState({
    primaryColor: "",
    secondaryColor: "",
    backgroundColor: "",
  });

  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Efecto para calcular hasChanges
  useEffect(() => {
    const changesExist =
      draftColors.primaryColor !== savedColors.primaryColor ||
      draftColors.secondaryColor !== savedColors.secondaryColor ||
      draftColors.backgroundColor !== savedColors.backgroundColor;
    setHasChanges(changesExist);
  }, [draftColors, savedColors]);

  // Obtener colores iniciales
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/theming/colors");
        const fetched = {
          primaryColor: response.data.primaryColor || "#000000",
          secondaryColor: response.data.secondaryColor || "#000000",
          backgroundColor: response.data.backgroundColor || "#FFFFFF",
        };
        setSavedColors(fetched);
        setDraftColors(fetched);
      } catch (error) {
        console.error("Error al obtener colores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  // Función para actualizar un color en el draft
  const setDraftColor = (field, color) => {
    setDraftColors((prev) => ({ ...prev, [field]: color }));
  };

  // Función para guardar cambios (PATCH)
  const saveChanges = async () => {
    try {
      await api.patch("http://localhost:8080/api/theming/colors", draftColors);
      setSavedColors(draftColors); // Actualiza los colores guardados
    } catch (error) {
      console.error("Error al guardar colores:", error);
      throw error;
    }
  };

  return {
    draftColors,
    setDraftColor,
    saveChanges,
    hasChanges,
    loading,
  };
};

export default useColors;