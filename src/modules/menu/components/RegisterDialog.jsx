import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export const RegisterDialog = ({ open, onClose, menu, photo, onSubmit, loading, buttonLoading }) => {
    const placeholderMenu = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
    const [preview, setPreview] = useState(photo || placeholderMenu);

    useEffect(() => {
        setPreview(photo || placeholderMenu);
    }, [photo]);

    // Esquema de validación
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
        photo: Yup.mixed()
            .required("La foto es obligatoria")
            .test("fileType", "Formato de archivo no soportado. Usa JPEG o PNG.", (value) => {
                if (!value) return false; // Si no hay archivo, es inválido
                return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
            }),
    });

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="register-dialog-title">
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
                        photo: photo || null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, setFieldValue }) => (
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
                                        style={{
                                            width: "100%",
                                            maxWidth: "300px",
                                            borderRadius: "8px",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
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
                                            }
                                        }}
                                    />
                                    <label htmlFor="file-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            color="primary"
                                            startIcon={<CloudUploadOutlinedIcon />}
                                        >
                                            {menu ? ("Actualizar imagen") : ("Subir imagen")}
                                        </Button>
                                    </label>
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
                                    color="primary"
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