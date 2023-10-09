import { useAuth } from "../../providers/Auth";

const Home = () => {
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken("");
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">home</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
