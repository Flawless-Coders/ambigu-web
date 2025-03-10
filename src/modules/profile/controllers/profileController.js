import { getProfileInfo, updateProfileInfo, updateProfileImage } from '../services/profileService';

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

export const handleUpdateAdmin = async (data, setErrors, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await updateProfileInfo(data);
        setSuccess(response);
    } catch (error) {
        setErrors(error);
    } finally {
        setLoading(false);
    }
}

export const handleUpdateAvatar = async (id, file, setErrors, setSuccess, setLoading) => {
    setLoading(true);
    try {
        console.log("Archivo desde controller",file);
        const response = await updateProfileImage(id, file);
        setSuccess(response);
    } catch (error) {
        setErrors(error);
    } finally {
        setLoading(false);
    }
}
