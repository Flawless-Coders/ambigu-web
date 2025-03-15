import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import WaitersTable from "../components/WaitersTable";
import { handleGetWaiterDetails, handleGetWaiters, handleRegisterWaiter, handleUpdateWaiter } from "../controllers/waitersController";
import { RegisterDialog } from "../components/RegisterDialog";
import { ChangeStatusDialog } from "../components/ChangeStatusDialog";

export default function WaitersPage() {
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false); // Carga solo para la tabla
  const [error, setError] = useState(null);
  const { setSuccess, setError: setGlobalError } = useOutletContext();

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false); // Carga solo para el modal
  const [loading, setLoading] = useState(false);

  // Abrir modal para registrar un nuevo mesero
  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
    setSelectedUser(null);
  };

  // Abrir modal para actualizar un mesero
  const handleOpenUpdateDialog = async (user) => {
    setOpenRegisterDialog(true);
    setDialogLoading(true);
    await handleGetWaiterDetails(user.email, setSelectedUser, setError, setDialogLoading);
  };

  const handleOpenChangeStatusDialog = (user) => {
    setSelectedUser(user);
    setOpenChangeStatusDialog(true);
  }
  const handleCloseChangeStatusDialog = () => setOpenChangeStatusDialog(false);

  const handleCloseRegisterDialog = () => setOpenRegisterDialog(false);

  const fetchData = () => {
    setTableLoading(true);
    handleGetWaiters(setRows, setError, setTableLoading);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error, setGlobalError]);

  const handleSubmitDialog = async (values) => {
    setError(null);
    setSuccess(null);

    if (values.id) {
      await handleUpdateWaiter(values, setError, setSuccess, setLoading);
    } else {
      await handleRegisterWaiter(values, setError, setSuccess, setLoading);
    }

    handleCloseRegisterDialog();
    handleGetWaiters(setRows, setError, setTableLoading);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Meseros</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpenRegisterDialog}>
            + AGREGAR MESERO
          </Button>
        </Box>

        {tableLoading ? <LoaderAmbigu /> : rows.length > 0 && <WaitersTable rows={rows} onEdit={handleOpenUpdateDialog} onCStatus={handleOpenChangeStatusDialog}/>}
      </Box>

      {/* Modal de registro/actualización */}
      <RegisterDialog
        open={openRegisterDialog}
        onClose={handleCloseRegisterDialog}
        user={selectedUser}
        onSubmit={handleSubmitDialog}
        setSuccess={setSuccess}
        setError={setError}
        loading={dialogLoading} 
        buttonLoading={loading}
      />

      {/* Dialog de cambio de estado */}
      <ChangeStatusDialog 
        open={openChangeStatusDialog}
        onClose={handleCloseChangeStatusDialog}
        waiterId={selectedUser?.id}
        status={selectedUser?.status}
        setSuccess={setSuccess}
        setError={setError}
        onStatusChange={fetchData}
      />
    </>
  );
}