import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddVehicle from "../pages/admin/AddVehicle";
import EditVehicle from "../pages/admin/EditVehicle";
import ErrorPage from "../pages/error/ErrorPage";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import PublicRoute from "../components/layout/PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

     
      <Route element={<ProtectedRoute />}>
         {/* User Routes  */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vehicles/new" element={<AddVehicle />} />
        <Route path="/admin/vehicles/edit/:id" element={<EditVehicle />} />
      </Route>

      {/* Error Routes */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}