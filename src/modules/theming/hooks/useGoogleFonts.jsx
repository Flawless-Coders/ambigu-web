import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useGoogleFonts = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState({
    headerFont: "",
    bodyFont: "",
    paragraphFont: "",
  });

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const fontsResponse = await api.get("http://localhost:8080/api/theming/getfonts");
        setFonts(fontsResponse.data.fonts);

        const selectedFontsResponse = await api.get("http://localhost:8080/api/theming/fonts");
        setSelectedFonts({
          headerFont: selectedFontsResponse.data.headerFont || "Roboto",
          bodyFont: selectedFontsResponse.data.bodyFont || "Roboto",
          paragraphFont: selectedFontsResponse.data.paragraphFont || "Roboto",
        });
      } catch (error) {
        console.error("Error al obtener fuentes o configuración:", error);
      }
    };

    fetchFonts();
  }, []);

  const updateFont = async (field, font) => {
    try {
      const newFonts = { ...selectedFonts, [field]: font };
      await api.patch("http://localhost:8080/api/theming/fonts", newFonts);
      setSelectedFonts(newFonts);
    } catch (error) {
      console.error("Error al actualizar la fuente en el backend", error);
    }
  };

  return { fonts, selectedFonts, updateFont };
};

export default useGoogleFonts;