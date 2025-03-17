import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useColors = () => {
  const [colors, setColors] = useState({
    primaryColor: "",
    secondaryColor: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsResponse = await api.get("http://localhost:8080/api/theming/colors");
        setColors({
          primaryColor: colorsResponse.data.primaryColor || "#000000",
          secondaryColor: colorsResponse.data.secondaryColor || "#000000",
          backgroundColor: colorsResponse.data.backgroundColor || "#FFFFFF",
        });
      } catch (error) {
        console.error("Error al obtener colores:", error);
      }
    };

    fetchColors();
  }, []);

  const updateColor = async (field, color) => {
    try {
      const newColors = { ...colors, [field]: color };
      await api.patch("http://localhost:8080/api/theming/colors", newColors);
      setColors(newColors);
    } catch (error) {
      console.error("Error al actualizar el color en el backend", error);
    }
  };

  return { colors, updateColor };
};

export default useColors;