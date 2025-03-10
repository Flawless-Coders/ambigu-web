import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, Alert } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import WaitersTable from "../components/WaitersTable";
import { AuthContext } from "../../../context/AuthContext";
import { handleGetWaiters } from "../controllers/waitersController";


export default function WaitersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSuccess, setError: setGlobalError } = useOutletContext();

  useEffect(() => {
    handleGetWaiters(setRows, setError, setLoading);
  }, []);

  useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error, setGlobalError]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Meseros</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary">
          + AGREGAR MESERO
        </Button>
      </Box>
      {loading && <LoaderAmbigu />}
      {error && <Alert severity="error">{error}</Alert>}
      {rows.length > 0 && <WaitersTable rows={rows} />}
    </Box>
  );
}