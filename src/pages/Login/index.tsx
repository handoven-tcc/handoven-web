import { LoginRequest } from "../../models";
import { useAuth } from "../../providers/Auth";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;
    const ADMIN_SENHA = import.meta.env.VITE_ADMIN_SENHA as string;
    const request = new LoginRequest(ADMIN_EMAIL, ADMIN_SENHA);
    login(request);
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
