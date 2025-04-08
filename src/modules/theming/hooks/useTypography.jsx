import { useState, useEffect } from "react";
import api from "../../auth/services/api";
const API_URL = import.meta.env.VITE_API_URL;

const useTypography = () => {
  const [fonts, setFonts] = useState([]);
  const [totalFonts, setTotalFonts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [savedFonts, setSavedFonts] = useState({
    headerFont: "",
    bodyFont: "",
    paragraphFont: "",
  });

  const [draftFonts, setDraftFonts] = useState({
    headerFont: "",
    bodyFont: "",
    paragraphFont: "",
  });

  const loadFontInDOM = (font) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, "+")}`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const fetchFonts = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`${API_URL}/theming/getfonts?page=${page}&pageSize=20`);
      const { fonts: newFonts, totalFonts: total } = response.data;
      setFonts((prev) => [...prev, ...newFonts]);
      setTotalFonts(total);
      newFonts.forEach(loadFontInDOM);
      setPage(page + 1);
    } catch (error) {
      console.error("Error al obtener fuentes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActualFonts = async () => {
    try {
      const response = await api.get(`${API_URL}/theming/fonts`);
      const actual = response.data;
      setSavedFonts(actual);
      setDraftFonts(actual);
    } catch (error) {
      console.error("Error al obtener fuentes actuales:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchFonts();
      await fetchActualFonts();
      setLoading(false);
    };
    init();
  }, []);

  const setDraftFont = (field, font) => {
    setDraftFonts((prev) => ({ ...prev, [field]: font }));
    loadFontInDOM(font);
  };

  const saveChanges = async () => {
    try {
      await api.patch(`${API_URL}/theming/fonts`, draftFonts);
      setSavedFonts(draftFonts);
    } catch (error) {
      console.error("Error al guardar fuentes:", error);
    }
  };

  const hasChanges =
    draftFonts.headerFont !== savedFonts.headerFont ||
    draftFonts.bodyFont !== savedFonts.bodyFont ||
    draftFonts.paragraphFont !== savedFonts.paragraphFont;

  return {
    fonts,
    draftFonts,
    setDraftFont,
    saveChanges,
    hasChanges,
    fetchFonts,
    isLoading,
    loadFontInDOM,
    loading,
  };
};

export default useTypography;
