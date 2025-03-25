import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";

export const AddDishDialog = ({ open, onClose, onSubmit, loading, buttonLoading, menuId, categories, handleGetDishesByCategory }) => {
    const [dishes, setDishes] = useState([]);

    const validationSchema = Yup.object({
        category: Yup.string().required("La categoría es obligatoria"),
        dishId: Yup.string().required("El platillo es obligatorio")
    });

    const handleCategoryChange = async (categoryId, setFieldValue) => {
        try {
            const response = await handleGetDishesByCategory(setDishes, categoryId);
            setFieldValue("dishId", ""); // Resetear el valor del platillo
        } catch (error) {
            console.error("Error al obtener los platillos:", error);
        }
    };

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
            <DialogTitle>Agregar platillo</DialogTitle>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" minWidth="400px">
                    <CircularProgress />
                </Box>
            ) : (
                <Formik
                    initialValues={{
                        menuId: menuId,
                        category: "",
                        dishId: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <DialogContent>
                                <Field
                                    as={TextField}
                                    select
                                    label="Categoría"
                                    name="category"
                                    fullWidth
                                    error={Boolean(touched.category && errors.category)}
                                    helperText={touched.category && errors.category}
                                    onChange={(e) => {
                                        setFieldValue("category", e.target.value);
                                        handleCategoryChange(e.target.value, setFieldValue);
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    ))}
                                </Field>

                                <Box mt={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        label="Platillo"
                                        name="dishId"
                                        fullWidth
                                        error={Boolean(touched.dishId && errors.dishId)}
                                        helperText={touched.dishId && errors.dishId}
                                    >
                                        {dishes.map((dish) => (
                                            <MenuItem key={dish.id} value={dish.id}>{dish.name}</MenuItem>
                                        ))}
                                    </Field>
                                </Box>
                            </DialogContent>

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
                                    ) : "Agregar"}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            )}
        </Dialog>
    );
};