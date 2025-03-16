import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FloatingAddButton = () => {
  return (
    <Fab 
      color="info" 
      aria-label="add"
      sx={{ 
        position: "fixed", 
        bottom: 24, 
        boxShadow: 3
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingAddButton;
