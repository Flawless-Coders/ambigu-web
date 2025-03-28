import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { number } from 'yup';
import { handleGetOrder } from '../controllers/orderController';
import { useOutletContext } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setError: setGlobalError } = useOutletContext();
  const [orderData, setOrderData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error, setGlobalError]);

  useEffect(() => {
    handleGetOrder(setError, setLoading, (data) => {
      const transformedData = data.map((order) => {
        const dateTime = new Date(order.date);

        const formattedDate = dateTime.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '-'); // Para mostrar

        const hour = dateTime.toLocaleTimeString(); // Para mostrar

        const localDate = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
        const isoDate = localDate.toISOString().split("T")[0]; 

        return {
          ...order,
          date: formattedDate,    // Muestra DD-MM-YYYY
          originalDate: isoDate,  // Guarda YYYY-MM-DD para filtrar
          hour,
          qualification: order.opinion?.qualification || 0,
          dishes: order.dishes.map(dish => dish.dishName),
          finalized: order.finalized ? "Completado" : "En curso"
        };
      });
      setOrderData(transformedData);
    });
  }, []);

  const handleClickOpen = (dishes) => {
    setSelectedDishes(dishes);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'orderNumber', headerName: '# PEDIDO', flex: 1, headerAlign: "center", align: "center" },
    { field: 'date', headerName: 'FECHA', flex: 1, headerAlign: "center", align: "center" },
    { field: 'hour', headerName: 'HORA', flex: 1, headerAlign: "center", align: "center" },
    { field: 'waiter', headerName: 'MESERO', flex: 2, headerAlign: "center", align: "center" },
    {
      field: "actions",
      headerName: "PLATILLOS",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      justifyContent: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          <Button size="small" color="warning" variant="contained" onClick={() => handleClickOpen(params.row.dishes)}>
            <RemoveRedEyeOutlinedIcon />
          </Button>
        </Box>
      ),
    },
    { field: 'finalized', headerName: 'ESTADO', flex: 1, headerAlign: "center", align: "center" },
    { field: 'qualification', headerName: 'CALIFICACIÓN', flex: 1, headerAlign: "center", align: "center", type: number },
  ];

  // Obtener la fecha de hoy en formato YYYY-MM-DD (sin hora)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegura que no haya hora para evitar problemas de zona horaria
  const formattedToday = today.toISOString().split("T")[0]; // Solo la parte de la fecha (YYYY-MM-DD)

  const paginationModel = { page: 0, pageSize: 10 };

  const filteredRows = orderData?.filter((order) => {
    return selectedDate ? order.originalDate === selectedDate : true;
  });


  return (
    <>
      <Box sx={{ marginY: 3, display: "flex", justifyContent: { md: "space-between"}, alignItems: 'center' }}>
        <Typography variant='h4'>
          Historial de pedidos
        </Typography>

        <TextField
          label="Selecciona una fecha"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: formattedToday, // Bloquea las fechas después de hoy
          }}
        />
      </Box>

      {loading && !orderData ? <LoaderAmbigu /> : (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '600px' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15, 20]}
          sx={{ border: 0 }}
        />
        </div>
        </Box>
      )}

      <React.Fragment>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: "450px",
              maxHeight: "400px"
            }
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="dish-dialog-title"
          aria-describedby="dish-dialog-description"
        >
          <DialogTitle id="dish-dialog-title">
            Platillos
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dish-dialog-description">
              <ul>
                {selectedDishes.map((dish, index) => (
                  <li key={index}>{dish}</li>
                ))}
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">Cerrar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
