import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";

export const AddDishDialog = ({
  open,
  onClose,
  onSubmit,
  loading,
  buttonLoading,
  menuId,
  categories,
  handleGetDishesByCategory,
}) => {
  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setDishes([]);
      setError(null);
      setLoadingDishes(false);
    }
  }, [open]);

  const validationSchema = Yup.object({
    category: Yup.string().required("La categoría es obligatoria"),
    dishId: Yup.string()
      .required("El platillo es obligatorio")
      .test(
        "has-dishes",
        "No hay platillos disponibles",
        () => dishes.length > 0
      ),
  });

  const handleCategoryChange = async (categoryId, setFieldValue) => {
    if (!categoryId) return;

    try {
      setLoadingDishes(true);
      setError(null);
      setFieldValue("dishId", "");
      setDishes([]); // Limpiar platillos antes de cargar nuevos

      // Forzar un nuevo renderizado para mostrar el CircularProgress
      await new Promise((resolve) => setTimeout(resolve, 0));

      await handleGetDishesByCategory(
        (newDishes) => setDishes(newDishes || []),
        categoryId,
        () => {} // No usamos el setLoading del controlador
      );
    } catch (error) {
      console.error("Error al cargar platillos:", error);
      setError("Error al cargar platillos. Intente nuevamente.");
    } finally {
      setLoadingDishes(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="register-dialog-title"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)", // Desenfoque del fondo
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Color semitransparente
          },
        },
      }}
      sx={{ "& .MuiDialog-paper": { width: "400px" } }}
    >
      <DialogTitle>Agregar platillo</DialogTitle>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Formik
          initialValues={{ menuId, category: "", dishId: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <DialogContent>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

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
                  {categories.length === 0 ? (
                    <MenuItem value="" disabled>
                      No hay categorías
                    </MenuItem>
                  ) : (
                    categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  )}
                </Field>

                <Box sx={{ position: "relative", mt: 2 }}>
                  <Field
                    as={TextField}
                    select
                    label="Platillo"
                    name="dishId"
                    fullWidth
                    disabled={!values.category || loadingDishes}
                    error={Boolean(touched.dishId && errors.dishId)}
                    helperText={touched.dishId && errors.dishId}
                    placeholder={
                      loadingDishes
                        ? "Cargando platillos..."
                        : "Seleccione un platillo"
                    }
                  >
                    {!values.category ? (
                      <MenuItem value="" disabled>
                        Seleccione una categoría
                      </MenuItem>
                    ) : dishes.length === 0 && !loadingDishes ? (
                      <MenuItem value="" disabled>
                        No hay platillos
                      </MenuItem>
                    ) : (
                      dishes.map((dish) => (
                        <MenuItem key={dish.id} value={dish.id}>
                          {dish.name}
                        </MenuItem>
                      ))
                    )}
                  </Field>

                  {loadingDishes && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "45%",
                        right: "35px",
                        marginTop: "-12px",
                      }}
                    />
                  )}
                </Box>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  disabled={buttonLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={
                    buttonLoading || loadingDishes || dishes.length === 0
                  }
                >
                  {buttonLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Agregar"
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
