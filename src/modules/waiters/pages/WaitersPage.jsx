import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, Alert } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import WaitersTable from "../components/WaitersTable";
import { handleGetWaiterDetails, handleGetWaiters } from "../controllers/waitersController";
import { RegisterDialog } from "../components/RegisterDialog";


export default function WaitersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSuccess, setError: setGlobalError } = useOutletContext();

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false);

  const handleOpenRegisterDailog = () => {
    setOpenRegisterDialog(true);
    setSelectedUser(null);
  }

  const handleOpenUpdateDialog = async (user) => {
    setOpenRegisterDialog(true);
    setDialogLoading(true);
    await handleGetWaiterDetails(user.email, setSelectedUser, setError, setLoading);
    setDialogLoading(false);
  };

  const handleCloseRegisterDialog = () => setOpenRegisterDialog(false);



  useEffect(() => {
    handleGetWaiters(setRows, setError, setLoading);
  }, []);

  useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error, setGlobalError]);

  const onUpdate = () => {
    handleGetWaiters(setRows, setError, setLoading);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Meseros</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpenRegisterDailog}>
            + AGREGAR MESERO
          </Button>
        </Box>
        {loading && <LoaderAmbigu />}
        {rows.length > 0 && <WaitersTable rows={rows} onEdit={handleOpenUpdateDialog}/>}
      </Box>

      <RegisterDialog open={openRegisterDialog} onClose={handleCloseRegisterDialog} user={selectedUser} onUpdate={onUpdate} setSuccess={setSuccess} setError={setError} loading={dialogLoading}/>
    </>
  );
}