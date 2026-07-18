import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/user/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddVehicle from '../pages/admin/AddVehicle';
import EditVehicle from '../pages/admin/EditVehicle';
import ErrorPage from '../pages/error/ErrorPage';

export const routesConfig = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/vehicles/new",
    element: <AddVehicle />,
  },
  {
    path: "/admin/vehicles/edit/:id",
    element: <EditVehicle />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
