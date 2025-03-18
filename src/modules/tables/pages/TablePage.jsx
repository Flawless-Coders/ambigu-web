import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Typography, Box, Tabs, Tab, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TableCard from "../components/TableCard";
import { handleGetDisabledTables, handleGetEnabledTables, handleSaveTable } from "../controllers/tableController";
import FloatingAddButton from "../components/FloatingAddButton";

export default function TablePage() {
    const [error, setError] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const { setSuccess, setError: setGlobalError } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    
    const [open, setOpen] = useState(false); // Estado para el modal
    const [tableIdentifier, setTableIdentifier] = useState('');
    const [inputError, setInputError] = useState(false); // Estado para manejar errores de validación

    useEffect(() => {
        if (error) {
            setGlobalError(error);
        }
    }, [error, setGlobalError]);

    const fetchTables = () => {
        if (tabIndex === 0) {
            handleGetEnabledTables(setError, setLoading, setDataTable);
        } else {
            handleGetDisabledTables(setError, setLoading, setDataTable);
        }
    };

    useEffect(() => {
        fetchTables();
    }, [tabIndex]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTableIdentifier(""); // Limpiar input al cerrar el modal
        setInputError(false); // Limpiar el estado de error
    };

    const handleSave = async () => {
        if (tableIdentifier.length < 1 || tableIdentifier.length > 5) {
            setInputError(true); // Mostrar error si no cumple con las reglas
            return;
        }
        await handleSaveTable(setError, setLoading, setSuccess, tableIdentifier);
        fetchTables(); 
        handleClose(); 
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Mesas</Typography>
            <Box sx={{ justifyContent: "flex-start" }}>
                <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} sx={{ mb: 1 }}>
                    <Tab label="Habilitados" />
                    <Tab label="Deshabilitados" />
                </Tabs>
            </Box>

            {tabIndex === 0 ? (
                <TableCard status="habilitados" data={dataTable} loading={loading} fetchTables={fetchTables} setSuccess={setSuccess} />
            ) : (
                <TableCard status="deshabilitados" data={dataTable} loading={loading} fetchTables={fetchTables} setSuccess={setSuccess} />
            )}

            {tabIndex === 0 && <FloatingAddButton action={handleOpen} />}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": { width: "90%", maxWidth: "600px" }
                }}
            >
                <DialogTitle id="dialog-title">Agregar mesa</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        freeSolo
                        value={tableIdentifier}
                        onInputChange={(event, newInputValue) => {
                            setTableIdentifier(newInputValue);
                            // Validar la longitud del input
                            if (newInputValue.length > 5) {
                                setInputError(true); // Mostrar error si supera los 5 caracteres
                            } else {
                                setInputError(false); // Limpiar el error si es válido
                            }
                        }}
                        id="table-identifier-input"
                        options={[]}
                        sx={{ width: '100%', mt: 2 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Identificador de mesa"
                                error={inputError} // Mostrar error visual
                                helperText={inputError ? "Máximo 5 caracteres" : ""} // Mensaje de error
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancelar</Button>
                    <Button 
                        onClick={handleSave} 
                        color="primary" 
                        autoFocus
                        disabled={tableIdentifier.length < 1 || tableIdentifier.length > 5} // Deshabilitar si no cumple las reglas
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}