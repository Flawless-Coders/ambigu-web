import React from "react";
import { Box, Fab } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

export default function HoverActions({ isEnabled, update, showFab, enabled, disabled }) {
    console.log("isEnabled en HoverActions:", isEnabled); // Verificar si el prop llega bien

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {showFab && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        gap: 1.5, // Espaciado entre botones
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: "8px",
                    }}
                >
                    {/* Solo mostrar el botón de editar si isEnabled es true */}
                    {isEnabled && (
                        <Fab size="small" color="secondary" aria-label="update" onClick={update}>
                            <ModeEditIcon />
                        </Fab>
                    )}

                    {/* Botón de habilitar/deshabilitar cambia dinámicamente */}
                    <Fab
                        size="small"
                        color={isEnabled ? "error" : "primary"}
                        aria-label={isEnabled ? "disable" : "enable"}
                        onClick={isEnabled ? disabled : enabled}
                    >
                        {isEnabled ? <RemoveCircleOutlineIcon /> : <TaskAltOutlinedIcon />}
                    </Fab>
                </Box>
            )}
        </Box>
    );
}
