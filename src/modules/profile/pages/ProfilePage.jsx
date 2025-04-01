import { useContext, useEffect, useState } from 'react'
import { Typography, Alert, Box } from '@mui/material'
import ProfileCard from '../components/ProfileCard'
import { AuthContext } from '../../../context/AuthContext'
import { handleGetUser } from '../controllers/profileController';
import LoaderAmbigu from '../../../kernel/LoaderAmbigu';
import { useOutletContext } from 'react-router-dom';

export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setSuccess, setError: setGlobalError } = useOutletContext();

    const fetchUserData = async () => {
        if (user?.email) { 
            handleGetUser(user.email, setProfileData, setError, setLoading);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    useEffect(() => {
        if (error) {
            setGlobalError(error);
        }
    }, [error, setGlobalError]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h1">Perfil</Typography>
            {loading && <LoaderAmbigu />}
            {error && <Alert severity="error">{error}</Alert>}
            {profileData && <ProfileCard user={profileData} onUpdate={fetchUserData} setSuccess={setSuccess} setError={setGlobalError} />}
        </Box>
    );
};

