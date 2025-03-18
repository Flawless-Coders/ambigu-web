import React, { useState } from "react";
import { Box, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Autocomplete, TextField, Chip } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { handleChangeStatusTable, handleUpdateTable } from "../controllers/tableController";

export default function HoverActions({ isEnabled, showFab, fetchTables, id, tableIdentifier, setSuccess, tableClientStatus }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [updatedTableIdentifier, setUpdatedTableIdentifier] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(false)

    const handleOpenDialog = (action) => {
        setActionType(action);
        setOpenDialog(true);
        if (action === 'editar') {
            setUpdatedTableIdentifier(tableIdentifier); // Inicializa con el valor actual
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUpdatedTableIdentifier('');
        setInputError(false); // Limpiar el estado de error al cerrar el diálogo
    };

    const handleConfirmAction = async () => {
        try {
            setLoading(true);
            if (actionType === 'editar') {
                if (updatedTableIdentifier.length < 1 || updatedTableIdentifier.length > 5) {
                    setInputError(true); 
                    return;
                }
                const tableData = {
                    id: id,
                    tableIdentifier: updatedTableIdentifier,
                };
                await handleUpdateTable(setError, setLoading, setSuccess, tableData);
            } else if (actionType === 'deshabilitar') {
                await handleChangeStatusTable(setError, setLoading, setSuccess, id);
            } else if (actionType === 'habilitar') {
                await handleChangeStatusTable(setError, setLoading, setSuccess, id);
            }
            fetchTables();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            handleCloseDialog();
        }
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {showFab && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        gap: 1.5,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: "8px",
                    }}
                >
                    {isEnabled && (
                        <Fab
                            size="small"
                            color="secondary"
                            aria-label="update"
                            onClick={() => handleOpenDialog('editar')}
                        >
                            <ModeEditIcon />
                        </Fab>
                    )}

                    {tableClientStatus === 'UNOCCUPIED' ? (
                        <Fab
                            size="small"
                            color={isEnabled ? "error" : "primary"}
                            aria-label={isEnabled ? "disable" : "enable"}
                            onClick={() => handleOpenDialog(isEnabled ? 'deshabilitar' : 'habilitar')}
                        >
                            {isEnabled ? <RemoveCircleOutlineIcon /> : <TaskAltOutlinedIcon />}
                        </Fab>
                    ) : (
                        ""
                    )}
                </Box>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que quieres {
                        actionType === 'deshabilitar' ? "deshabilitar" :
                        actionType === 'habilitar' ? "habilitar" :
                        actionType === 'editar' ? "actualizar" : ""
                    } esta mesa?

                    {actionType === 'editar' && (
                        <Autocomplete
                            freeSolo
                            value={updatedTableIdentifier}
                            onChange={(event, newValue) => {
                                setUpdatedTableIdentifier(newValue); // Captura el valor seleccionado
                            }}
                            onInputChange={(event, newInputValue) => {
                                setUpdatedTableIdentifier(newInputValue || ""); // Asegura que nunca sea null
                                // Validar la longitud del input
                                if (newInputValue && newInputValue.length > 5) {
                                    setInputError(true); // Mostrar error si supera los 5 caracteres
                                } else {
                                    setInputError(false); 
                                }
                            }}
                            
                            id="edit-table-identifier-input"
                            options={[]} // Opciones vacías ya que es freeSolo
                            sx={{ width: "100%", mt: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nuevo identificador"
                                    error={inputError} // Mostrar error visual
                                    helperText={inputError ? "Máximo 5 caracteres" : ""} // Mensaje de error
                                />
                            )}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
                    <Button
                        onClick={handleConfirmAction}
                        color="primary"
                        autoFocus
                        disabled={
                            actionType === 'editar' &&
                            (updatedTableIdentifier.length < 1 || updatedTableIdentifier.length > 5)
                        } 
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}