import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider, IconButton } from '@mui/material';
import { number } from 'yup';
import { handleGetOrder } from '../controllers/orderController';
import { useOutletContext } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import Backdrop from "@mui/material/Backdrop";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setError: setGlobalError, searchTerm } = useOutletContext();
  const [orderData, setOrderData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isComment, setIsComment] = useState(false);

  const filteredOrder = orderData
    ? orderData.filter((order) =>
      (order.waiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toString().includes(searchTerm) || // Convertir a string si es numérico
        order.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.finalized.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.qualification.toString().includes(searchTerm)) && // Convertir a string si es numérico
      (selectedDate ? order.originalDate === selectedDate : true) // Filtrado por fecha
    )
    : [];


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
          dishes: order.dishes.map(dish => (dish)),
          finalized: order.finalized ? "Completado" : "En curso",
          tableName: order.tableName || "Sin mesa"
        };
      });
      setOrderData(transformedData);
    });
  }, []);

  const handleClickOpen = (order, comment) => {
    setSelectedOrder(order);
    setIsComment(comment);
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
    { field: 'tableName', headerName: 'MESA', flex: 1, headerAlign: "center", align: "center" },
    {
      field: "actions",
      headerName: "ACCIONES",
      flex: 1.5,
      headerAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      display: 'flex',
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">

          <IconButton color="warning" onClick={() => handleClickOpen(params.row, false)}>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>

          <IconButton sx={{ color: '#3d5afe' }} onClick={() => handleClickOpen(params.row, true)}>
            <SmsOutlinedIcon />
          </IconButton>

        </Box>
      ),
    },
    { field: 'finalized', headerName: 'ESTADO', flex: 1, headerAlign: "center", align: "center" },
  ];

  // Obtener la fecha de hoy en formato YYYY-MM-DD (sin hora)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegura que no haya hora para evitar problemas de zona horaria
  const formattedToday = today.toISOString().split("T")[0]; // Solo la parte de la fecha (YYYY-MM-DD)

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      <Box sx={{ marginY: 3, display: "flex", justifyContent: { md: "space-between" }, alignItems: 'center' }}>
        <Typography variant='h1'>
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
              rows={filteredOrder}
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
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: 'blur(8px)', // Desenfoque del fondo
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Color semitransparente
              },
            },
          }}
          sx={{
            "& .MuiDialog-paper": {
              width: "450px",
              borderRadius: 2,
              padding: "20px"
            }
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="dish-dialog-title"
        >
          <DialogTitle id="dish-dialog-title" sx={{ textAlign: 'center' }}>
            {isComment ? "Comentario del Pedido" : "Platillos del Pedido"}
          </DialogTitle>
          <DialogContent>
            <Box>
              {!isComment ? (
                <>
                  <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                      Cantidad
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', flex: 3, textAlign: 'center' }}>
                      Platillo
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                      Precio
                    </Typography>
                  </Box>

                  {selectedOrder && selectedOrder.dishes.length > 0 ? (
                    selectedOrder.dishes.map((dish, index) => (
                      <Box key={index} sx={{ marginBottom: '10px', justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant="body2">
                          {dish.quantity}
                        </Typography>
                        <Typography variant="body2">
                          {dish.dishName}
                        </Typography>
                        <Typography variant="body2">
                          {`$${dish.unitPrice}`}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No hay platillos disponibles para este pedido.
                    </Typography>
                  )}

                  <Divider />
                  {selectedOrder && (
                    <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6">${selectedOrder.total}</Typography>
                    </Box>
                  )}
                </>
              ) :
                (
                  <>
                    <Typography sx={{ textAlign: 'center', marginBottom: 2 }}>Orden #{selectedOrder?.orderNumber}</Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, textAlign: 'center' }}><b>Mesero:</b> {selectedOrder?.waiter}</Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, textAlign: 'center' }}><b>Comentario:</b> {selectedOrder?.opinion?.comment}</Typography>
                    <Typography variant="body2" sx={{  textAlign: 'center' }}><b>Calificación:</b></Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Stack spacing={1}>
                        <Rating name="size-large" defaultValue={selectedOrder?.opinion?.qualification} size="large" readOnly />
                      </Stack>
                    </Box>
                  </>
                )}

            </Box>
          </DialogContent>
          <DialogActions>

            <Button onClick={handleClose} variant="contained" color="primary" sx={{ width: '100%' }}>
              Cerrar
            </Button>


          </DialogActions>
        </Dialog>

      </React.Fragment>
    </>
  );
}
