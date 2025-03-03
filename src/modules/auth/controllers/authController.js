import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";

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

        navigate("/dashboard");
    } catch (error) {
        setErrors(error);
    } finally {
        setLoading(false);
    }
}