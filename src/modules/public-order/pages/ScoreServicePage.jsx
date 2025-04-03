import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, TextField, Button, Paper,Dialog, DialogContent} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import HeaderPublic from '../../../kernel/HeaderPublic';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';
import { Public } from '@mui/icons-material';
import { PublicThemeProvider } from '../../../context/PublicThemeContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function ScoreServicePage() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [waiterAvatar, setWaiterAvatar] = useState(null);
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/order/public/${token}`)
      .then(res => {
        const orderData = res.data;
        setOrder(orderData);

        axios.get(`${API_URL}/waiters/public`)
          .then(waiterRes => {
            const fullName = orderData.waiter.trim().toLowerCase();
            const matchedWaiter = waiterRes.data.find(w =>
              `${w.name} ${w.lastname_p} ${w.lastname_m}`.trim().toLowerCase() === fullName
            );

            if (matchedWaiter?.avatarBase64) {
              setWaiterAvatar(matchedWaiter.avatarBase64);
            }
          });
      });
  }, [token]);

  const handleSubmit = () => {
    if (!rating || comment.trim() === "") {
      alert("Debes calificar y escribir un comentario.");
      return;
    }

    axios.put(`${API_URL}/order/rateAndComment/${order.id}`, {
      qualification: rating,
      comment
    })
      .then(() => setOpenModal(true))
      .catch(err => {
        console.error(err);
        alert("Error al enviar la calificación.");
      });
  };

  if (!order) return null;

  return (
    <PublicThemeProvider>
      <HeaderPublic section="Califica tu servicio" />
      <Box sx={{ maxWidth: 420, mx: 'auto', mt: 5, p: 3 }}>
        <Typography variant="h6" mb={1} textAlign="center">¡Califica tu servicio!</Typography>
        <Typography mb={3} textAlign="center">
          ¿Cómo calificarías el trato brindado por tu mesero en tu visita?
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          {order.waiter}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={waiterAvatar || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
            sx={{ width: 40, height: 40, mr: 2 }}
          />

          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '30px',
              px: 2,
              py: 1,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                sx={{
                  cursor: 'pointer',
                  fontSize: 28,
                  color: (hover || rating) >= star ? '#fbbf24' : '#e0e0e0',
                  transition: 'color 0.2s'
                }}
              />
            ))}
          </Paper>
        </Box>

        <Typography mb={2}>¿Hay algo que te gustaría agregar sobre tu experiencia?</Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Experiencia aquí"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ backgroundColor: '#6a1b9a' }}
        >
          Enviar
        </Button>
      </Box>

      {/* ✅ MODAL DE CONFIRMACIÓN */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent sx={{ textAlign: 'center', py: 4, px: 6 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Formulario respondido
          </Typography>
          <Typography mb={2}>
            ¡Te agradecemos tu apoyo!
            <br />
            Tu opinión es lo que más nos importa
          </Typography>

          <MailIcon sx={{ fontSize: 50, mb: 2 }} />
          <Typography fontWeight="medium">Gracias por tu visita</Typography>
        </DialogContent>
      </Dialog>
      </PublicThemeProvider>
  );
}
