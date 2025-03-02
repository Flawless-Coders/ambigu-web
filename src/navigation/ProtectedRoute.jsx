import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);  

    return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute