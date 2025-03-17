import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryModal from "./RegisterDialog";

const FloatingAddButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab 
        color="info" 
        aria-label="add"
        onClick={handleOpen}
        sx={{ 
          position: "fixed", 
          bottom: 24, 
          boxShadow: 3
        }}
      >
        <AddIcon />
      </Fab>
      <CategoryModal open={open} handleClose={handleClose} />
    </>
  );
};

export default FloatingAddButton;
