import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

const PublicRoutes = () => {
  const { getToken } = useAuth();

  return getToken() ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
