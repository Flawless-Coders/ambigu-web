import React, { useEffect, useState } from 'react';
import CustomCard from "../../../kernel/CustomCard";
import { Box, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme } from '@mui/material';
import FloatingAddButton from "../../../kernel/FloatingAddButton";
import { handleGetMenu, handleGetMenuPhotos, handleGetMenuById, handleCreateMenu, handleUpdateMenu } from "../controllers/MenuController";
import { useOutletContext } from "react-router-dom";
import LoaderAmbigu from '../../../kernel/LoaderAmbigu';
import { RegisterDialog } from '../components/RegisterDialog';
import { AssignAsCurrentDialog } from '../components/AssignAsCurrentDialog';
import { InactivateMenuDialog } from '../components/InactivateMenuDialog';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import { Page, Text, View, Document, StyleSheet, PDFViewer, pdf, Image } from '@react-pdf/renderer';

export default function MenuPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [menuData, setMenuData] = useState(null);
    const [photos, setPhotos] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setSuccess, setError: setGlobalError } = useOutletContext();
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openQRdialog, setOpenQRdialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [dialogLoading, setDialogLoading] = useState(false); // Carga solo para el modal
    const [openAssignAsCurrentDialog, setOpenAssignAsCurrentDialog] = useState(false);
    const [openInactivateMenuDialog, setOpenInactivateMenuDialog] = useState(false);
    const [isCurrentMenu, setIsCurrentMenu] = useState(false);

    const handleGetMenuDetails = (menu) => {
        navigate('/menu-details', {
            state: { id: menu.id, name: menu.name, dishes: menu.dishes }
        })
    }

    const generateQRCodeBase64 = () => {
        return new Promise((resolve) => {
            const qrElement = document.querySelector("#qr-code");
            if (!qrElement) return resolve(null);
    
            const svg = new XMLSerializer().serializeToString(qrElement);
            const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
    
            const img = new window.Image(); // Asegurar que es un HTMLImageElement
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
                URL.revokeObjectURL(url);
            };
            img.src = url;
        });
    };
    


    const handleDownloadPDF = async () => {
        const qrBase64 = await generateQRCodeBase64();
        if (!qrBase64) {
            console.error("QR Code generation failed!");
            return;
        }
        const blob = await pdf(<MyDocument qrImage={qrBase64} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "menu.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    


    const handleAssignAsCurrentDialog = () => setOpenAssignAsCurrentDialog(false);

    const handleOpenAssignAsCurrentDialog = (menu) => {
        setSelectedMenu(menu);
        setOpenAssignAsCurrentDialog(true);
    }

    const handleInactivateMenuDialog = () => setOpenInactivateMenuDialog(false);

    const handleOpenInactivateMenu = (menu) => {
        setSelectedMenu(menu);
        setOpenInactivateMenuDialog(true);
    }



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
            await handleUpdateMenu(values, setError, setSuccess, setLoading); //Mandar a traer mi actualizar menú
        } else {
            await handleCreateMenu(values, setError, setSuccess, setLoading); //Mandar a traer mi registrar menú
        }

        handleCloseRegisterDialog(); //Se cierra el modal
        handleGetMenu(setError, setLoading, setMenuData); //Se vuelve a traer la información de todos los menús con las actualizaciones
    };

    const handleCloseQRdialog = () => {
        setOpenQRdialog(false);
    }

    const fetchData = () => {
        setLoading(true);
        handleGetMenu(setError, setLoading, setMenuData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (menuData) {
            setIsCurrentMenu(menuData.some(menuData => menuData.status));
        }
    }, [menuData])

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


    const MyDocument = ({ qrImage }) => (
        <Document>
            <Page size="A6" style={styles.page}>
                <View style={{alignItems:'center', width:"100%"}}>
                    <Text style={{marginTop:50, fontFamily:theme.bodyFont}}>Consulta nuestro menú</Text>
                    <Image src={theme.logo} alt="Logo" style={{ height: 40, maxWidth: 200, marginTop:25}} />
                    {qrImage && <Image src={qrImage} style={{ width: 100, height: 100, marginTop: 25}} />}
                </View>
            </Page>
        </Document>
    );


    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginY: 3 }}>
                    <Typography variant="h4">Menús</Typography>
                    <Button variant="contained" color='primary' onClick={() => { setOpenQRdialog(true) }}>GENERAR QR</Button>
                </Box>

                {menuData && Object.keys(photos).length === menuData.length ? (
                    <>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3} sx={{ p: 1 }}>
                            {menuData.map((menu) => (
                                <CustomCard
                                    key={menu.id}
                                    image={photos[menu.photoId]}
                                    title={menu.name}
                                    description={menu.description}
                                    chipTitle={menu.status ? "Menú actual" : "Menú inactivo"}
                                    chipColor={menu.status ? "success" : "error"}
                                    update={() => { handleOpenUpdateDialog(menu.id) }}
                                    menuStatus={menu.status}
                                    isMenu={true}
                                    isEnable={true}
                                    enable={() => { handleOpenAssignAsCurrentDialog(menu) }}
                                    disable={() => { handleOpenInactivateMenu(menu) }}
                                    isCurrentMenu={isCurrentMenu}
                                    viewDishes={() => { handleGetMenuDetails(menu) }}
                                />
                            ))}
                        </Grid>
                        <FloatingAddButton action={handleOpenRegisterDialog} />
                    </>
                ) : <LoaderAmbigu />}
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

            <AssignAsCurrentDialog
                open={openAssignAsCurrentDialog}
                onClose={handleAssignAsCurrentDialog}
                menuId={selectedMenu?.id}
                menuName={`${selectedMenu?.name}`}
                setSuccess={setSuccess}
                setError={setError}
                onAssignAsCurrent={fetchData}
            />


            <InactivateMenuDialog
                open={openInactivateMenuDialog}
                onClose={handleInactivateMenuDialog}
                menuId={selectedMenu?.id}
                menuName={`${selectedMenu?.name}`}
                setSuccess={setSuccess}
                setError={setError}
                onInactivateMenu={fetchData}
            />


            <Dialog
                open={openQRdialog}
                onClose={handleCloseQRdialog}
                aria-labelledby="qr-dialog-title"
                aria-describedby="qr-dialog-description"
            >
                <DialogTitle id="qr-dialog-title" variant='h4'>
                    Escanea
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="qr-dialog-description" color='gray' fontSize={15}>
                       Escanea con la camara de tu teléfono el código QR de nuestro menú.
                    </DialogContentText>

                    <Box sx={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%", paddingY: 3 }}>
                        <QRCode
                            id="qr-code"
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={"http://localhost:5173"}
                            viewBox={`0 0 256 256`}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQRdialog} variant='outlined'>Cerrar</Button>
                    <Button onClick={handleDownloadPDF} variant='contained'>Descargar PDF</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

const styles = StyleSheet.create({
    page: {
        flexDirection:'column',
        display: 'flex', alignItems: 'center' 
    }
});