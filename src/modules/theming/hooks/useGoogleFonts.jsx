import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useGoogleFonts = () => {
  const [fonts, setFonts] = useState([]);
  const [totalFonts, setTotalFonts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFonts, setSelectedFonts] = useState({
    headerFont: "",
    bodyFont: "",
    paragraphFont: "",
  });
  const [page, setPage] = useState(1); // Página actual para la carga bajo demanda
  const [isLoading, setIsLoading] = useState(false); // Evitar múltiples cargas simultáneas

  // Cargar una fuente en el DOM
  const loadFontInDOM = (font) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, "+")}`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  // Cargar fuentes desde el backend
  const fetchFonts = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`http://localhost:8080/api/theming/getfonts?page=${page}&pageSize=20`);
      const { fonts: newFonts, totalFonts: total } = response.data;
  
      // Agregar nuevas fuentes al estado
      setFonts((prevFonts) => [...prevFonts, ...newFonts]);
      setTotalFonts(total);
  
      // Cargar las nuevas fuentes en el DOM
      newFonts.forEach((font) => loadFontInDOM(font));
  
      // Incrementar la página para la próxima carga
      setPage(page + 1);
    } catch (error) {
      console.error("Error al obtener fuentes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActualFonts = async () => {
    try {
      const response = await api.get("http://localhost:8080/api/theming/fonts");
      setSelectedFonts(response.data);
    } catch (error) {
      console.error("Error al obtener fuentes seleccionadas:", error);
    }
  }

  useEffect(() => {
    const loadFonts = async () => {
      setLoading(true);
      await fetchFonts(); // Cargar la primera página de fuentes al inicio
      await fetchActualFonts(); // Cargar las fuentes seleccionadas
      setLoading(false);
    };
  
    loadFonts();
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

  return { fonts, selectedFonts, updateFont, fetchFonts, isLoading, loadFontInDOM, loading };
};

export default useGoogleFonts;