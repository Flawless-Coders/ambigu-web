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

    useEffect(() => {
        if (error) {
            setGlobalError(error);
        }
    }, [error, setGlobalError]);

    // Función para obtener las mesas según la pestaña activa
    const fetchTables = () => {
        if (tabIndex === 0) {
            handleGetEnabledTables(setError, setLoading, setDataTable);
        } else {
            handleGetDisabledTables(setError, setLoading, setDataTable);
        }
    };

    // Ejecutar fetchTables cuando cambia la pestaña
    useEffect(() => {
        fetchTables();
    }, [tabIndex]);

    // Funciones para abrir y cerrar el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTableIdentifier(""); // Limpiar input al cerrar el modal
    };

    // Guardar la mesa cuando el usuario haga clic en "Aceptar"
    const handleSave = async () => {
        await handleSaveTable(setError, setLoading, setSuccess, tableIdentifier);
        fetchTables(); // Volver a cargar las mesas
        handleClose(); // Cerrar modal
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
                <TableCard status="habilitados" data={dataTable} loading={loading} />
            ) : (
                <TableCard status="deshabilitados" data={dataTable} loading={loading} />
            )}

            {/* Botón flotante para agregar mesa */}
            {tabIndex === 0 && <FloatingAddButton action={handleOpen} />}

            {/* Modal para agregar una nueva mesa */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                fullWidth // Hace que use todo el ancho disponible en pantallas pequeñas
                maxWidth="md" // Controla el ancho máximo en pantallas grandes
                sx={{
                    "& .MuiDialog-paper": { width: "90%", maxWidth: "600px" } // Ajusta el tamaño del modal
                }}
            >
                <DialogTitle id="dialog-title">Agregar mesa</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        freeSolo
                        value={tableIdentifier}
                        onInputChange={(event, newInputValue) => {
                            setTableIdentifier(newInputValue);
                        }}
                        id="table-identifier-input"
                        options={[]} // No hay opciones
                        sx={{ width: '100%', mt: 2 }}
                        renderInput={(params) => <TextField {...params} label="Identificador de mesa" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancelar</Button>
                    <Button onClick={handleSave} color="primary" autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>


           
        </Box>
    );
}
