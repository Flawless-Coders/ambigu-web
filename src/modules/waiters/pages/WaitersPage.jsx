import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, Tabs, Tab } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import WaitersTable from "../components/WaitersTable";
import { handleGetWaiterDetails, handleGetWaiters, handleRegisterWaiter, handleUpdateWaiter } from "../controllers/waitersController";
import { RegisterDialog } from "../components/RegisterDialog";
import { ChangeStatusDialog } from "../components/ChangeStatusDialog";
import { ChangeLeaderStatusDialog } from "../components/ChangeLeaderStatusDialog";

export default function WaitersPage() {
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false); // Carga solo para la tabla
  const [error, setError] = useState(null);
  const { setSuccess, setError: setGlobalError } = useOutletContext();

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [openChangeLeaderDialog, setOpenChangeLeaderDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false); // Carga solo para el modal
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleOpenChangeLeaderDialog = (user) => {
    setSelectedUser(user);
    setOpenChangeLeaderDialog(true);
  }

  const handleCloseChangeStatusDialog = () => setOpenChangeStatusDialog(false);

  const handleCloseChangeLeaderDialog = () => setOpenChangeLeaderDialog(false);

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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  }

  const filteredRows = rows.filter(row => tabIndex === 0 ? row.status : !row.status);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Meseros</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{mb: 1}}>
            <Tab label="Habilitados" />
            <Tab label="Deshabilitados" />
          </Tabs>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenRegisterDialog}
            sx={{mb: 1}}
          >
            + AGREGAR MESERO
          </Button>
        </Box>

        {tableLoading ? (
          <LoaderAmbigu />
        ) : (
          rows.length > 0 && (
            <WaitersTable
              rows={filteredRows}
              onEdit={handleOpenUpdateDialog}
              onCStatus={handleOpenChangeStatusDialog}
              onCLeader={handleOpenChangeLeaderDialog}
            />
          )
        )}
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
        waiterName={`${selectedUser?.name}`}
        status={selectedUser?.status}
        setSuccess={setSuccess}
        setError={setError}
        onStatusChange={fetchData}
      />

      {/* Dialog de cambio de líder */}
      <ChangeLeaderStatusDialog
        open={openChangeLeaderDialog}
        onClose={handleCloseChangeLeaderDialog}
        waiterId={selectedUser?.id}
        waiterName={`${selectedUser?.name}`}
        setSuccess={setSuccess}
        setError={setError}
        onStatusChange={fetchData}
      />
    </>
  );
}