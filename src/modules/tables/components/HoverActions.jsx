import React, { useState } from "react";
import { Box, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { handleChangeStatusTable, handleUpdateTable } from "../controllers/tableController";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Warning, CheckCircle } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";

export default function HoverActions({ isEnabled, showFab, fetchTables, id, tableIdentifier, setSuccess, tableClientStatus }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        updatedTableIdentifier: Yup.string()
            .required("El identificador es obligatorio")
            .max(5, "Máximo 5 caracteres")
            .min(1, "Mínimo 1 carácter"),
    });

    const handleOpenDialog = (action) => {
        setActionType(action);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmAction = async (values) => {
        try {
            setLoading(true);
            if (actionType === 'editar') {
                const tableData = {
                    id: id,
                    tableIdentifier: values.updatedTableIdentifier,
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
                            sx={{backgroundColor: "#673ab7", color: "white", "&:hover": { backgroundColor: "#651fff" },}}
                            aria-label="update"
                            onClick={() => handleOpenDialog('editar')}
                        >
                            <ModeEditIcon />
                        </Fab>
                    )}

                    {tableClientStatus === 'UNOCCUPIED' ? (
                        <Fab
                            size="small"
                            color={isEnabled ? "error" : "success"}
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

            <Dialog 
                open={openDialog} 
                onClose={!loading ? handleCloseDialog : null} 
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
                <DialogTitle sx={{ textAlign: "center", color: actionType === 'deshabilitar' ? "red" : "green" }}>
                    {actionType !== 'editar' && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            {actionType === 'deshabilitar' ? <Warning sx={{ fontSize: 50 }} color="error" /> : <CheckCircle sx={{ fontSize: 50 }} color="success" />}
                        </motion.div>
                    )}
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    ¿Estás seguro de que quieres {
                        actionType === 'deshabilitar' ? "deshabilitar" :
                        actionType === 'habilitar' ? "habilitar" :
                        actionType === 'editar' ? "actualizar" : ""
                    } esta mesa?
                    {actionType === 'deshabilitar' || actionType === 'habilitar' ? 
                        (<Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>{tableIdentifier}</Typography>)
                    : ("")}
                    
                    {actionType === 'editar' && (
                        <Formik
                            initialValues={{ updatedTableIdentifier: tableIdentifier }}
                            validationSchema={validationSchema}
                            onSubmit={handleConfirmAction}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="updatedTableIdentifier"
                                        label="Nuevo identificador"
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(touched.updatedTableIdentifier && errors.updatedTableIdentifier)}
                                        helperText={touched.updatedTableIdentifier && errors.updatedTableIdentifier}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="secondary" variant="outlined">Cancelar</Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            autoFocus
                                            variant="contained"
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : "Confirmar"}
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    )}
                </DialogContent>
                {actionType !== 'editar' && (
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button 
                            onClick={handleCloseDialog} 
                            color="error" 
                            variant="outlined" 
                            sx={{ marginRight: 2 }} 
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleConfirmAction({})}
                            color={actionType === 'deshabilitar' ? "error" : "success"}
                            variant="contained"
                            disabled={loading}
                            sx={{ backgroundColor: actionType === 'deshabilitar' ? "red" : "green" }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : actionType === 'deshabilitar' ? "Deshabilitar" : "Habilitar"}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </Box>
    );
}