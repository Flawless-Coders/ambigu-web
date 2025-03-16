import * as React from "react";
import { Button,Card,CardContent,CardMedia,Typography,Chip,Grid, Box} from "@mui/material";

export default function CustomCard(props) {
    const { image, title, price, description, buttonTitle, chipTitle, chipColor } = props;
    return (
        
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ position: 'relative' }}>
                {chipTitle &&(
                    <Chip color={chipColor? chipColor : "error"} label={chipTitle} size="small" sx={{position:'absolute', right:4, top:4}}/>
                )}
                        <CardMedia
                            component="img"
                            image={image}
                            alt={title}
                            sx={{ maxHeight: 200 }}
                        />
                    </Box>  
                        <CardContent>

                            {price ? (
                                <Grid container width="100%">

                                    <Grid item xs={6}>
                                        <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                            {title}
                                        </Typography>
                                    </Grid>


                                    <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                            {price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ): (

                                <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                        {title}
                                    </Typography>
                                </Grid>
                            </Grid>
              )}




                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
                            >
                                {description}
                            </Typography>

                            {buttonTitle && (
                                <Button variant="contained" sx={{marginTop:2}}>{buttonTitle}</Button>
                            )}
                            
                        </CardContent>
                </Card>
            </Grid>
    );
}
