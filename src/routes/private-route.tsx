import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = () => {
  return Cookies.get('access') && Cookies.get('user') ? <Outlet /> : <Navigate to="/login" />;
};
