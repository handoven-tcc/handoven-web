import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

const PublicRoutes = () => {
  const { token } = useAuth();

  return token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
