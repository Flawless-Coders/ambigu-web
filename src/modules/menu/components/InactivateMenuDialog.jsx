import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, CircularProgress, Button } from '@mui/material'
import { Warning } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { handleInactivateMenu } from '../controllers/MenuController'

export const InactivateMenuDialog = ({ open, onClose, menuId, menuName, setSuccess, setError, onInactivateMenu}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await handleInactivateMenu(menuId, setError, setSuccess, setLoading);
    onInactivateMenu();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="assign-as-current-dialog-title">
      <DialogTitle sx={{ textAlign: "center", color: "red" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {<Warning sx={{ fontSize: 50 }} color="error" />}
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">El menú será inactivado. ¿Estás seguro?</Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{menuName}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="secondary" variant="outlined" sx={{marginRight: 2 }}>
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
  )
}