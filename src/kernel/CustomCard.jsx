import * as React from "react";
import { Button, Card, CardContent, CardMedia, Typography, Chip, Grid, Box, Fab } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

export default function CustomCard(props) {
    const { image, title, price, description, buttonTitle, chipTitle, chipColor, update, disable, enable, isEnable, isMenu, viewDishes, menuStatus } = props;

    const [showFab, setShowFab] = React.useState(false);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    "&:hover": { filter: "brightness(0.95)" }
                }}
                onMouseEnter={() => setShowFab(true)}
                onMouseLeave={() => setShowFab(false)}
            >
                <Box sx={{ position: 'relative' }}>
                    {chipTitle && (
                        <Chip
                            color={chipColor || "error"}
                            label={chipTitle}
                            size="small"
                            sx={{ position: 'absolute', right: 4, top: 4 }}
                        />
                    )}
                    <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                        sx={{ maxHeight: { xs: 200 }, height: { md: 150 } }}
                    />

                    {isEnable && showFab ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '60%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="update"
                                onClick={update}
                            >
                                <ModeEditIcon />
                            </Fab>

                            {!isMenu && (
                                <Fab
                                    size="small"
                                    color={"error"}
                                    aria-label={"disable"}
                                    onClick={disable}
                                >
                                    <RemoveCircleOutlineIcon />
                                </Fab>
                            )}


                            {isMenu && (
                                <>
                                    <Fab
                                        size="small"
                                        color={menuStatus ? "error" : "primary"}
                                        aria-label={menuStatus ? "disable" : "enable"}
                                        onClick={menuStatus ? disable : enable}
                                    >
                                        {menuStatus ? <RemoveCircleOutlineIcon /> : <TaskAltOutlinedIcon />}
                                    </Fab>
                                    <Fab
                                        size="small"
                                        color="warning"
                                        aria-label="disable"
                                        onClick={viewDishes}
                                    >
                                        <FlatwareOutlinedIcon />
                                    </Fab>
                                </>
                            )}

                        </Box>
                    ) : ""}
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
                    ) : (
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    <Typography variant="body2" sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}>
                        {description}
                    </Typography>

                    {buttonTitle && (
                        <Button variant="contained" sx={{ marginTop: 2 }}>
                            {buttonTitle}
                        </Button>
                    )}


                    {!isEnable ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '0%',
                                left: '90%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Fab
                                size="small"
                                color={"primary"}
                                aria-label={"enable"}
                                onClick={enable}
                            >
                                {<TaskAltOutlinedIcon />}
                            </Fab>
                        </Box>
                    ) : ""}


                </CardContent>
            </Card>
        </Grid>
    );
}