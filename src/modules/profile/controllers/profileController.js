import { getProfileInfo, updateProfileInfo, updateProfileImage, updatePassword } from '../services/profileService';

export const handleGetUser = async (userEmail, setUser, setError, setLoading) => {
    setLoading(true);
    try {
        const response = await getProfileInfo(userEmail);
        setUser(response);
    } catch {
        setError("Error al actualizar la contraseña");
    } finally {
        setLoading(false);
    }
}

export const handleUpdateAdmin = async (data, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await updateProfileInfo(data);
        setSuccess(response);
    } catch {
        setError("Error al actualizar los datos");
        setSuccess(null);
    } finally {
        setLoading(false);
    }
}

export const handleUpdateAvatar = async (id, file, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await updateProfileImage(id, file);
        setSuccess(response);
    } catch{
        setError("Error al actualizar la imagen de perfil");
        setSuccess(null);
    } finally {
        setLoading(false);
    }
}

export const handleUpdatePassword = async (id, currentPassword, newPassword, setError, setSuccess, setLoading) => {
    setLoading(true);
    try {
        const response = await updatePassword({ id, currentPassword, newPassword });
        setSuccess(response);
    } catch {
        setError("Error al actualizar la contraseña");
        setSuccess(null);
    } finally {
        setLoading(false);
    }
}
