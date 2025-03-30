import { jwtDecode } from "jwt-decode";
import { forgotPasswordRequest, loginUser } from "../services/authService";

export const handleLogin = async (email, password, setErrors, setLoading, login, navigate) => {
    setLoading(true);
    try{
        const response = await loginUser(email, password);
        const decodedToken = jwtDecode(response.token);

        if(decodedToken.role !== "ADMIN") {
            throw new "Acceso denegado. Solo los administradores pueden iniciar sesión en la plataforma web."
        }

        login({
            email: decodedToken.sub,
            role: decodedToken.role,
            token: response.token
        });

    } catch (error) {
        setErrors(error);
        setLoading(false);
    } 
}


export const handleForgotPassword = async (email, setErrors, setLoading, onSuccess) => {
    setLoading(true);
    try {
        await forgotPasswordRequest(email);
        onSuccess(); 
    } catch (error) {
        setErrors(error);
    } finally {
        setLoading(false);
    }
};