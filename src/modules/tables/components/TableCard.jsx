import { useEffect } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import LoadingScreen from "../../../kernel/LoadingScreen";

export default function TableCard({ data, loading, status }) {
   
    return (
        <Box sx={{ mt: 2 }}>
            {loading ? (
                <LoadingScreen />
            ) : data && data.length > 0 ? (
                <Grid container spacing={2}>
                    {data.map((table) => (
                        <Grid item xs={12} sm={4} md={2} key={table.id}>
                            <Card sx={{ width: "100%" }}>
                                <Box sx={{ paddingX: 2 }}>
                                    <CardContent>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="100%"
                                            viewBox="0 -960 960 960"
                                            width="100%"
                                            fill="black"
                                        >
                                            <path d="M173-600h614l-34-120H208l-35 120Zm307-60Zm192 140H289l-11 80h404l-10-80ZM160-160l49-360h-89q-20 0-31.5-16T82-571l57-200q4-13 14-21t24-8h606q14 0 24 8t14 21l57 200q5 19-6.5 35T840-520h-88l48 360h-80l-27-200H267l-27 200h-80Z" />
                                        </svg>
                                        <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                                            {table.tableIdentifier}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
           ) : (
              <Typography sx={{ textAlign: "center" }}>
                  {status === "habilitados" ? "No hay mesas habilitadas" : "No hay mesas deshabilitadas"}
              </Typography>
          )}
        
        </Box>
    );
}
