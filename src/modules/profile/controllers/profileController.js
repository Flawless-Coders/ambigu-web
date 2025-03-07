import { getProfileInfo } from '../services/profileService';

export const handleGetUser = async (userEmail, setUser, setErrors, setLoading) => {
    setLoading(true);
    try {
        const response = await getProfileInfo(userEmail);
        setUser(response);
    } catch (error) {
        setErrors(error);
    } finally {
        setLoading(false);
    }
}

