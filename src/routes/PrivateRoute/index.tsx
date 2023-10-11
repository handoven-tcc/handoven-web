import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

const PrivateRoutes = () => {
  const { getToken } = useAuth();

  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
