import React, { useEffect, useState } from 'react';
import CustomCard from "../../../kernel/CustomCard";
import { Box, Typography, Grid, Alert, Button} from '@mui/material';
import FloatingAddButton from "../../categories/components/FloatingAddButton";
import { handleGetMenu, handleGetMenuPhotos,handleGetMenuById,handleCreateMenu} from "../controllers/MenuController";
import { useOutletContext } from "react-router-dom";
import LoaderAmbigu from '../../../kernel/LoaderAmbigu';
import { RegisterDialog } from '../components/RegisterDialog';

export default function MenuPage() {
    const [menuData, setMenuData] = useState(null);
    const [photos, setPhotos] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setSuccess, setError: setGlobalError } = useOutletContext();
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [dialogLoading, setDialogLoading] = useState(false); // Carga solo para el modal

    //Método para abrir el modal en caso de la creación de menú
    const handleOpenRegisterDialog = () => {
        setOpenRegisterDialog(true);
        setSelectedMenu(null);
      };

    //Método para abrir el modal y mostrar los datos
    const handleOpenUpdateDialog = async (id) => { //Este método guarda los datos del menu en SelectedMenu
          setOpenRegisterDialog(true);
          setDialogLoading(true);
          await handleGetMenuById(id, setSelectedMenu, setError, setDialogLoading); //Método que obtiene la información del menú en específico
    };

    const handleCloseRegisterDialog = () => setOpenRegisterDialog(false); //Método para cerrar el modal


    //Método para crear o actualizar menú
     const handleSubmitDialog = async (values) => { 
        setError(null);
        setSuccess(null);
    
        if (values.id) { //Si tiene id se actualiza, sino se crea
          await handleUpdateWaiter(values, setError, setSuccess, setLoading); //Mandar a traer mi actualizar menú
        } else {
          await handleCreateMenu(values, setError, setSuccess, setLoading); //Mandar a traer mi registrar menú
        }
    
        handleCloseRegisterDialog(); //Se cierra el menú
        handleGetMenu(setError, setLoading, setMenuData); //Se vuelve a traer la información de todos los menús con las actualizaciones
      };

    useEffect(() => {
        handleGetMenu(setError, setLoading, setMenuData);
    }, []);

    useEffect(() => {
        if (error) {
          setGlobalError(error);
        }
      }, [error, setGlobalError]);

    useEffect(() => {
        if (menuData) {
            handleGetMenuPhotos(menuData, setPhotos, setLoading);
        }
    }, [menuData]);


    useEffect(() => {
        return () => {
            // Libera las URLs de las imágenes cuando el componente se desmonte
            Object.values(photos).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [photos]);
      
    return (
        <>
            <Box>
                <Typography variant="h5">Menús</Typography>
                {menuData && Object.keys(photos).length === menuData.length ? (
                    <>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3} sx={{ p: 1 }}>
                            {menuData.map((menu) => (
                                <CustomCard
                                    key={menu.id}
                                    image={photos[menu.photoId]}
                                    title={menu.name}
                                    description={menu.description}
                                    chipTitle={menu.status? "Menú actual" : "Menú inactivo"}
                                    chipColor={menu.status? "success" : "error"}
                                />
                            ))}
                        </Grid>
                        <FloatingAddButton />
                        <Button onClick={handleOpenRegisterDialog}>Hola</Button>
                        <Button onClick={()=>{handleOpenUpdateDialog("67bd2c6d630ee505b3f4519c")}}>Actualizar</Button>
                    </>
                ): <LoaderAmbigu />}
            </Box>

                  <RegisterDialog
                    open={openRegisterDialog} //Sirve para abrir el modal
                    onClose={handleCloseRegisterDialog} //Sirve para cerrar el modal
                    menu={selectedMenu} //Si tiene un selected menú significa que se va a actualizar y muestra los datos en el modal
                    photo={selectedMenu ? photos[selectedMenu.photoId] : null}
                    onSubmit={handleSubmitDialog} //Permite crear o actualizar dependiendo de si hay o no menú
                    setSuccess={setSuccess} 
                    setError={setError}
                    loading={dialogLoading}
                    buttonLoading={loading} 
                  />
        </>
    );
}