import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    sm: 400,
  },
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function SeeMoreModal({ openModal, setOpenModal, dish }) {
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
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
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Box flex={1} flexDirection="column">
              <Box display="flex" justifyContent="center">
                <img
                  src={dish?.image ? dish.image : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"}
                  style={{ borderRadius: 10, maxWidth: "100%", maxHeight:250 }}
                />
              </Box>
              <Divider sx={{marginTop:2}}/>
              <Typography variant="h4" marginTop={2}>{dish?.name}</Typography>
              <Divider sx={{marginTop:2}}/>
              <Typography variant="subtitle2" marginTop={1}>{dish?.description}</Typography>
              <Divider sx={{marginTop:1}}/>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                marginTop={2}
              >
                <Typography variant="h5" fontWeight="bold">${dish?.price}</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
