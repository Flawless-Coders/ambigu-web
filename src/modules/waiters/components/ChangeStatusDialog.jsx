import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, CircularProgress, Button } from '@mui/material'
import { HelpOutline } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { handleChangeWaiterStatus } from '../controllers/waitersController';

export const ChangeStatusDialog = ({ open, onClose, waiterId, status, setSuccess, setError, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  console.log(status);
  const newStatus = status ? "deshabilitar" : "habilitar";
  const titleText = `¿Quieres ${newStatus} este mesero?`;
  const confirmationText = `El mesero será ${status ? "deshabilitado" : "habilitado"}. ¿Estás seguro?`;

  const handleSubmit = async () => {
    await handleChangeWaiterStatus(waiterId, setError, setSuccess, setLoading);
    onStatusChange();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="change-status-dialog-title">
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ display: "inline-block", marginBottom: 10 }}
        >
          <HelpOutline color="primary" sx={{ fontSize: 50 }} />
        </motion.div>
        <Typography variant="body1">{confirmationText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
