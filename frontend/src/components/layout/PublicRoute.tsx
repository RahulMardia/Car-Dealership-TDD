import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  // If already logged in, can't go back to login,register or landing
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise public route
  return <Outlet />;
}
