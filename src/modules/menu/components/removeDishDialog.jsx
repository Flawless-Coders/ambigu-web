import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { motion } from "framer-motion";
import { handleRemoveDish } from "../controllers/MenuController";
import Backdrop from "@mui/material/Backdrop";

export const RemoveDishDialog = ({
  open,
  onClose,
  menuId,
  dishId,
  dishName,
  setSuccess,
  setError,
  onRemoveDish,
  fetchCategory,
  resetTab,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await handleRemoveDish(menuId, dishId, setError, setSuccess, setLoading);
    fetchCategory();
    onRemoveDish();
    resetTab();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="remove-dish-dialog-title"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)", // Desenfoque del fondo
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Color semitransparente
          },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", color: "red" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {<Warning sx={{ fontSize: 50 }} color="error" />}
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">
          El platillo será retirado. ¿Estás seguro?
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
          {dishName}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          sx={{ marginRight: 2 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color={"error"}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Aceptar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
