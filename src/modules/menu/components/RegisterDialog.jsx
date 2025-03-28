import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Backdrop from "@mui/material/Backdrop";

export const RegisterDialog = ({ open, onClose, menu, photo, onSubmit, loading, buttonLoading }) => {
    const placeholderMenu = "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg";
    const [preview, setPreview] = useState(photo || placeholderMenu);
    const fileInputRef = React.useRef(null);

    const handleClick = () => {
        fileInputRef.current.click(); // Simula un clic en el input oculto
    };

    useEffect(() => {
        setPreview(photo || placeholderMenu);
    }, [photo]);

    // Esquema de validación
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
        photo: Yup.mixed()
            .test("fileType", "Formato de archivo no soportado. Usa JPEG o PNG.", (value) => {
                if (!value) return true; // Si no hay archivo, no se valida
                return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
            })
            .nullable(), // Permite que el campo sea null
    });

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="register-dialog-title" slots={{ backdrop: Backdrop }} sx={{"& .MuiDialog-paper": { 
            width: "400px"
        }}}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: 'blur(8px)', // Desenfoque del fondo
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Color semitransparente
            },
          },
        }}>
            <DialogTitle>{menu ? "Modificar menú" : "Registrar menú"}</DialogTitle>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" minWidth="400px">
                    <CircularProgress />
                </Box>
            ) : (
                <Formik
                    initialValues={{
                        id: menu?.id || null,
                        name: menu?.name || "",
                        description: menu?.description || "",
                        photo: null // Inicializa como null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <DialogContent>
                                {/* Campo para el nombre del menú */}
                                <Field
                                    as={TextField}
                                    label="Nombre del menú"
                                    name="name"
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />

                                {/* Campo para la descripción del menú */}
                                <Field
                                    as={TextField}
                                    label="Descripción"
                                    name="description"
                                    fullWidth
                                    margin="normal"
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />

                                {/* Vista previa de la imagen */}
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        onClick={handleClick}
                                        style={{
                                            width: "100%",
                                            marginBottom: "10px",
                                            maxHeight:"200px"
                                        }}
                                    />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPreview(reader.result); // Muestra la vista previa
                                                    setFieldValue("photo", file); // Guarda el archivo en Formik
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                setFieldValue("photo", null); // Si no hay archivo, establece el valor como null
                                            }
                                        }}
                                    />
                                    
                                    <Button
                                        variant="contained"
                                        component="span"
                                        onClick={handleClick}
                                        color="success"
                                        startIcon={<CloudUploadOutlinedIcon />}
                                    >
                                        {menu ? ("Actualizar imagen") : ("Subir imagen")}
                                    </Button>
                                    
                                    {touched.photo && errors.photo && (
                                        <div style={{ color: "red" }}>{errors.photo}</div>
                                    )}
                                </Box>
                            </DialogContent>

                            {/* Acciones del diálogo (Cancelar y Guardar) */}
                            <DialogActions>
                                <Button
                                    onClick={onClose}
                                    variant="outlined"
                                    color="secondary"
                                    disabled={buttonLoading}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    disabled={buttonLoading}
                                >
                                    {buttonLoading ? (
                                        <CircularProgress size={24} />
                                    ) : menu ? (
                                        "Actualizar"
                                    ) : (
                                        "Registrar"
                                    )}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};