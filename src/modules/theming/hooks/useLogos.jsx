import { useState, useEffect } from "react";
import api from "../../auth/services/api";

const useLogos = () => {
  const [logos, setLogos] = useState({
    logo: "",
    logoSmall: "",
  });

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logosResponse = await api.get("http://localhost:8080/api/theming/logos");
        setLogos({
          logo: logosResponse.data.logo || "",
          logoSmall: logosResponse.data.logoSmall || "",
        });
      } catch (error) {
        console.error("Error al obtener logos:", error);
      }
    };

    fetchLogos();
  }, []);

  const updateLogos = async (logo, logoSmall) => {
    try {
      const formData = new FormData();
      if (logo) formData.append("logo", logo);
      if (logoSmall) formData.append("logoSmall", logoSmall);

      const response = await api.patch("http://localhost:8080/api/theming/logos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLogos({
        logo: response.data.logo,
        logoSmall: response.data.logoSmall,
      });
    } catch (error) {
      console.error("Error al actualizar los logos en el backend", error);
    }
  };

  return { logos, updateLogos };
};

export default useLogos;