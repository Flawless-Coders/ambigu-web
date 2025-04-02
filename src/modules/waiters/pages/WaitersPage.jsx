import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import WaitersTable from "../components/WaitersTable";
import { handleGetWaiterDetails, handleGetWaiters, handleRegisterWaiter, handleUpdateWaiter } from "../controllers/waitersController";
import { RegisterDialog } from "../components/RegisterDialog";
import { ChangeStatusDialog } from "../components/ChangeStatusDialog";
import { ChangeLeaderStatusDialog } from "../components/ChangeLeaderStatusDialog";
import FloatingAddButton from "../../../kernel/FloatingAddButton";

export default function WaitersPage() {
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false); // Carga solo para la tabla
  const [error, setError] = useState(null);
  const { setSuccess, setError: setGlobalError } = useOutletContext();
  const [activeFilter, setActiveFilter] = useState(true);
  const [alignment, setAlignment] = useState("active");

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [openChangeLeaderDialog, setOpenChangeLeaderDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false); // Carga solo para el modal
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setActiveFilter(newAlignment === "active");
    }
  }

  const iconStyle = { marginLeft: 1 };
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


  const currentLeader = rows.find(row => row.leader)?.name || "N/A";

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h1">Meseros</Typography>
          <ToggleButtonGroup
            color={alignment === "active" ? "primary" : "error"}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="active-inactive waiters"
          >
            <ToggleButton value="active">
              Activos{alignment === "active" ? <CheckCircleIcon sx={iconStyle}/> : <CheckCircleOutlinedIcon sx={iconStyle}/>}
            </ToggleButton>
            <ToggleButton value="inactive">
              Inactivos{alignment === "inactive" ? <CancelIcon sx={iconStyle}/> : <CancelOutlinedIcon sx={iconStyle}/>}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
        {tableLoading ? (
          <LoaderAmbigu />
        ) : (
          rows.length > 0 && (
            <WaitersTable
              rows={rows}
              onEdit={handleOpenUpdateDialog}
              onCStatus={handleOpenChangeStatusDialog}
              onCLeader={handleOpenChangeLeaderDialog}
              activeFilter={activeFilter}
            />
          )
        )}

        <FloatingAddButton action={handleOpenRegisterDialog} />
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
        oldWaiterName={currentLeader}
        setSuccess={setSuccess}
        setError={setError}
        onStatusChange={fetchData}
      />
    </>
  );
}