import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Typography, Box, Tabs, Tab, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import Backdrop from "@mui/material/Backdrop";
import * as Yup from "yup";
import TableCard from "../components/TableCard";
import { handleGetDisabledTables, handleGetEnabledTables, handleSaveTable } from "../controllers/tableController";
import FloatingAddButton from "../components/FloatingAddButton";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

export default function TablePage() {
    const [error, setError] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const { setSuccess, setError: setGlobalError, searchTerm } = useOutletContext();
    const [selectedTableName, setSelectedTableName] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setGlobalError(error);
        }
    }, [error, setGlobalError]);

        const filteredTables = dataTable
    ? dataTable.filter((mesa) =>
        mesa.tableIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];


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
        setError(null);
    };

    const handleSave = async (values, { resetForm }) => {
        try {
            await handleSaveTable(setError, setLoading, setSuccess, values.tableIdentifier);
            setSelectedTableName(values.tableIdentifier);
            fetchTables();
            resetForm();
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const validationSchema = Yup.object({
        tableIdentifier: Yup.string()
            .required("El identificador de la mesa es obligatorio")
            .max(5, "El identificador de la mesa no puede tener más de 5 caracteres")
            .min(1, "El identificador de la mesa debe tener al menos 1 carácter")
    });

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Mesas</Typography>
            <Box sx={{ justifyContent: "flex-start" }}>
                <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} sx={{ mb: 1 }}>
                    <Tab label="Habilitados" />
                    <Tab label="Deshabilitados" />
                </Tabs>
            </Box>

            {loading ? (
                <LoaderAmbigu />
            ) : (
                <>
                    {tabIndex === 0 ? (
                        <TableCard status="habilitados" data={filteredTables} loading={loading} fetchTables={fetchTables} setSuccess={setSuccess} />
                    ) : (
                        <TableCard status="deshabilitados" data={filteredTables} loading={loading} fetchTables={fetchTables} setSuccess={setSuccess} />
                    )}
                    {tabIndex === 0 && <FloatingAddButton action={handleOpen} />}
                </>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": { width: "90%", maxWidth: "450px" }
                }}
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: {
                            backdropFilter: "blur(8px)",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                    },
                }}
            >
                <DialogTitle id="dialog-title">Agregar mesa</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ tableIdentifier: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSave}
                    >
                        {({ errors, touched, isSubmitting, isValid, dirty }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="tableIdentifier"
                                    label="Identificador de mesa"
                                    fullWidth
                                    margin="normal"
                                    error={touched.tableIdentifier && Boolean(errors.tableIdentifier)}
                                    helperText={touched.tableIdentifier && errors.tableIdentifier}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancelar</Button>
                                    <Button 
                                        type="submit" 
                                        color="primary" 
                                        variant="contained"
                                    >
                                        {isSubmitting ? 'Guardando...' : 'Aceptar'}
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
}