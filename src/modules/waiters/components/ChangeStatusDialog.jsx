import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, CircularProgress, Button } from '@mui/material'
import { Warning, CheckCircle } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { handleChangeWaiterStatus } from '../controllers/waitersController';

export const ChangeStatusDialog = ({ open, onClose, waiterId, waiterName, status, setSuccess, setError, onStatusChange}) => {
  const [loading, setLoading] = useState(false);

  const newStatus = status ? "deshabilitar" : "habilitar";
  const confirmationText = `El mesero será ${status ? "deshabilitado" : "habilitado"}. ¿Estás seguro?`;

  const handleSubmit = async () => {
    await handleChangeWaiterStatus(waiterId, setError, setSuccess, setLoading);
    onStatusChange();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="change-status-dialog-title">
      <DialogTitle sx={{ textAlign: "center", color: status ? "red" : "green" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {status ? <Warning sx={{ fontSize: 50 }} color="error" /> : <CheckCircle sx={{ fontSize: 50 }} color="success" />}
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">{confirmationText}</Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{waiterName}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="error" variant="outlined" sx={{marginRight: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color={status ? "error" : "success"}
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: status ? 'red' : 'green' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}