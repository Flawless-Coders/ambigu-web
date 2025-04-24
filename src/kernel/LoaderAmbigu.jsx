import {CircularProgress, Box} from '@mui/material';

const LoaderAmbigu = () => {
    return (
        <Box className="loader-container" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <img src="/assets/ambigu-icon.png" alt="Ambigú Logo" width="150" style={{ marginBottom: '30px' }} />
            {/* <Typography variant="h5" color="primary" gutterBottom>Los grandes restaurantes tienen grandes administradores... ¡Cargando tu panel!</Typography> */}
            <CircularProgress />
        </Box>
    );
};

export default LoaderAmbigu;
