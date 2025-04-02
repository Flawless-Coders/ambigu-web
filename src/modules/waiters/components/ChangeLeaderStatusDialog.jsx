import { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, Button, CircularProgress } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { handleChangeLeaderStatus } from '../controllers/waitersController';

export const ChangeLeaderStatusDialog = ({ open, onClose, waiterId, waiterName, oldWaiterName, setSuccess, setError, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await handleChangeLeaderStatus(waiterId, setError, setSuccess, setLoading);
    onStatusChange();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="change-leader-status-dialog-title">
      <DialogTitle sx={{ textAlign: "center", color: "orange" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <HelpOutline sx={{ fontSize: 50 }} color="warning" />
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">¿Estás seguro de asignar a <strong>{waiterName}</strong> como nuevo líder de meseros?</Typography>
        <Typography variant="body1" sx={{ marginTop: 2}}>Se reemplazará a <strong>{oldWaiterName}</strong></Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="error" variant="outlined" sx={{ marginRight: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="success"
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: 'orange' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Asignar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};