import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useLogos = () => {
  const [logos, setLogos] = useState({
    logo: "",
    logoSmall: "",
  });

  const [logoDraft, setLogoDraft] = useState({
    logo: null,
    logoSmall: null,
    previewLogo: null,
    previewLogoSmall: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/theming/logos");
        setLogos({
          logo: response.data.logo || "",
          logoSmall: response.data.logoSmall || "",
        });
      } catch (error) {
        console.error("Error al obtener logos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, []);

  const setDraftLogoFile = (type, file) => {
    setLogoDraft((prev) => ({
      ...prev,
      [type]: file,
      [`preview${type.charAt(0).toUpperCase() + type.slice(1)}`]: URL.createObjectURL(file),
    }));
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      if (logoDraft.logo) formData.append("logo", logoDraft.logo);
      if (logoDraft.logoSmall) formData.append("logoSmall", logoDraft.logoSmall);

      const response = await api.patch("http://localhost:8080/api/theming/logos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLogos({
        logo: response.data.logo,
        logoSmall: response.data.logoSmall,
      });

      setLogoDraft({
        logo: null,
        logoSmall: null,
        previewLogo: null,
        previewLogoSmall: null,
      });
    } catch (error) {
      console.error("Error al guardar logos:", error);
    }
  };

  const hasChanges = logoDraft.logo !== null || logoDraft.logoSmall !== null;

  return {
    logos,
    logoDraft,
    setLogoDraft: setDraftLogoFile,
    saveChanges,
    hasChanges,
    loading,
  };
};

export default useLogos;