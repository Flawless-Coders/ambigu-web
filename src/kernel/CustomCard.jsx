import * as React from "react";
import { Button, Card, CardContent, CardMedia, Typography, Chip, Grid, Box, Fab } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomCard(props) {
    const { image, title, price, description, buttonTitle, chipTitle, chipColor, update, disable,
        enable, isEnable, isMenu, viewDishes, menuStatus, isCurrentMenu, remove } = props;
    const [showFab, setShowFab] = React.useState(false);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                   "&:hover": {
                                        filter: "brightness(0.95)",
                                      transform: "translateY(-5px)",
                                      boxShadow: 6,
                                  },
                    maxHeight:250
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
                        loading="lazy"
                        alt={title}
                        sx={{ height: 150 }}
                    />

                    {isEnable && showFab && (
                        <Box
                            sx={styles.buttonContainer}
                        >
                            <Fab size="small" sx={{backgroundColor: "#673ab7", color: "white", "&:hover": { backgroundColor: "#651fff" },}} aria-label="update" onClick={update}>
                                <ModeEditIcon />
                            </Fab>

                            {!isMenu || menuStatus ? (
                                <Fab size="small" color="error" aria-label="disable" onClick={disable}>
                                    <RemoveCircleOutlineIcon />
                                </Fab>
                            ) : null}

                            {isMenu && !menuStatus && !isCurrentMenu && (
                                <Fab size="small" color="success" aria-label="enable" onClick={enable}>
                                    <TaskAltOutlinedIcon />
                                </Fab>
                            )}

                            {isMenu && (
                                <Fab size="small" color="warning" aria-label="view-dishes" onClick={viewDishes}>
                                    <FlatwareOutlinedIcon />
                                </Fab>
                            )}
                        </Box>
                    )}

                    {remove && showFab &&(
                        <Box sx={styles.buttonContainer}>
                            <Fab size="small" color="error" aria-label="disable" onClick={remove}>
                                    <DeleteIcon />
                                </Fab>
                        </Box>
                    )}
                </Box>
                <CardContent>
                    <Grid container width="100%">
                        <Grid item xs={price? 8 : 12}>
                            <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                {title}
                            </Typography>
                        </Grid>
                        {price && (
                            <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Typography gutterBottom component="div" sx={{ fontWeight: "bold", fontSize: 15 }}>
                                    {price}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>

                    <Typography variant="body2" sx={{ color: "text.#3f51b5", display: { xs: "none", sm: "block" } }}>
                        {description.length > 65 ? description.slice(0, 65) + "..." : description}
                    </Typography>

                    {buttonTitle && (
                        <Button variant="contained" sx={{ marginTop: 2 }}>
                            {buttonTitle}
                        </Button>
                    )}

                    {!isMenu && !isEnable && (
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
                            <Fab size="small" color="success" aria-label="enable" onClick={enable}>
                                <TaskAltOutlinedIcon />
                            </Fab>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
}
