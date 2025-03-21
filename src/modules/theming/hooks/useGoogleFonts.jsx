import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useGoogleFonts = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState({
    headerFont: "",
    bodyFont: "",
    paragraphFont: "",
  });

  // Cargar una fuente en el DOM
  const loadFontInDOM = (font) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, "+")}`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const fontsResponse = await api.get("http://localhost:8080/api/theming/getfonts");
        setFonts(fontsResponse.data.fonts);

        const selectedFontsResponse = await api.get("http://localhost:8080/api/theming/fonts");
        const selected = {
          headerFont: selectedFontsResponse.data.headerFont || "Roboto",
          bodyFont: selectedFontsResponse.data.bodyFont || "Roboto",
          paragraphFont: selectedFontsResponse.data.paragraphFont || "Roboto",
        };
        setSelectedFonts(selected);

        // Cargar las fuentes seleccionadas en el DOM
        Object.values(selected).forEach((font) => loadFontInDOM(font));
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

      // Cargar la fuente seleccionada en el DOM
      loadFontInDOM(font);
    } catch (error) {
      console.error("Error al actualizar la fuente en el backend", error);
    }
  };

  return { fonts, selectedFonts, updateFont };
};

export default useGoogleFonts;