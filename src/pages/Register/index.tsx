import { LoginRequest, UserRequest } from "../../models";
import { useAuth } from "../../providers/Auth";

const Register = () => {
  const { createUser } = useAuth();

  const handleRegister = () => {
    const request = new UserRequest(
      //nome
      "teste",
      // birthDate
      "1990-11-11T02:00:00.000Z",
      // email
      "outroteste@gmail.com",
      //cell
      "11111111111",
      // familyName
      "familia Teste",
      // Password
      "testeteste"
    );
    createUser(request);
  };

  return (
    <>
      <h1>CriarConta</h1>
      <button onClick={handleRegister}>Criar Conta</button>
    </>
  );
};

export default Register;
