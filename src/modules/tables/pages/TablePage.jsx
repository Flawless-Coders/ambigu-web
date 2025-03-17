import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, Alert, Card, CardContent, CardActions } from "@mui/material";
import TableCard from "../components/TableCard";

export default function TablePage() {
    const [error, setError] = useState(null);
    const { setSuccess, setError: setGlobalError } = useOutletContext();

    useEffect(() => {
        if (error) {
          setGlobalError(error);
        }
    }, [error, setGlobalError]);

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Mesas</Typography>

                <TableCard />
            </Box>
        </>
    );
}
