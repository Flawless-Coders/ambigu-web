import { Routes, Route } from "react-router-dom"
import PasswordRecoveryPage from "../modules/auth/screens/PasswordRecoveryPage"


const AppRoutes = () => {
  return (
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/reset-password/:token" element={<PasswordRecoveryPage />} />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} /> */}
        {/* </Route> */}
      </Routes>
  )
}

export default AppRoutes