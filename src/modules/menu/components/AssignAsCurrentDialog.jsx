import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, CircularProgress, Button } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { handleAssignAsCurrent } from '../controllers/MenuController'

export const AssignAsCurrentDialog = ({ open, onClose, menuId, menuName, setSuccess, setError, onAssignAsCurrent}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await handleAssignAsCurrent(menuId, setError, setSuccess, setLoading);
    onAssignAsCurrent();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="assign-as-current-dialog-title">
      <DialogTitle sx={{ textAlign: "center", color: "green" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {<CheckCircle sx={{ fontSize: 50 }} color="success" />}
        </motion.div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">El menú será asignado como actual. ¿Estás seguro?</Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>{menuName}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="secondary" variant="outlined" sx={{marginRight: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color={"success"}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> :"Aceptar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}