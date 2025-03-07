import React, { useContext, useEffect, useState } from 'react'
import { Typography, Container, CircularProgress, Alert, Box } from '@mui/material'
import ProfileCard from '../components/ProfileCard'
import { AuthContext } from '../../../context/AuthContext'
import { handleGetUser } from '../controllers/profileController';

export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) { 
            handleGetUser(user.email, setProfileData, setError, setLoading);
        }
    }, [user]);

    return (
        <Box>
            <Typography variant="h4">Perfil</Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {profileData && <ProfileCard user={profileData} />}
        </Box>
    );
};

