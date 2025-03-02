import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion"; 

const LoadingScreen = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)", // Agrega un desenfoque de fondo
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Hace el fondo más oscuro y elegante
      }}
      open={open}
    >
      {/* Efecto de rebote en el CircularProgress */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <CircularProgress size={60} thickness={5} />
      </motion.div>

      {/* Texto animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
          Cargando, por favor espera...
        </Typography>
      </motion.div>
    </Backdrop>
  );
};

export default LoadingScreen;