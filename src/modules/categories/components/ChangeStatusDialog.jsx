import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, CircularProgress } from "@mui/material";
import { Warning, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { handleChangeCategoryStatus } from "../controllers/categoriesController";
import { useOutletContext } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";

const ChangeStatusDialog = ({ open, onClose, category, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const { setSuccess, setError } = useOutletContext();

  if (!category) return null;

  const newStatus = category.status ? "deshabilitar" : "habilitar";
  const confirmationText = `La categoría será ${category.status ? "deshabilitada" : "habilitada"}. ¿Estás seguro?`;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await handleChangeCategoryStatus(category.id, setSuccess, setError, setLoading, onStatusChange);
    } catch (error) {
      console.error("Error al cambiar el estado de la categoría:", error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={!loading ? onClose : null} 
      aria-labelledby="change-status-dialog-title" 
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", color: category.status ? "red" : "green" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {category.status ? <Warning sx={{ fontSize: 50 }} color="error" /> : <CheckCircle sx={{ fontSize: 50 }} color="success" />}
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">{confirmationText}</Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>{category.name}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button 
          onClick={onClose} 
          color="error" 
          variant="outlined" 
          sx={{ marginRight: 2 }} 
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color={category.status ? "error" : "success"}
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: category.status ? "red" : "green" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeStatusDialog;
