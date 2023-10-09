import { useAuth } from "../../providers/Auth";

const Login = () => {
  const { setToken } = useAuth();

  const handleLogin = () => {
    setToken("token");
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
