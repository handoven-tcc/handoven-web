import { Route, Routes } from "react-router-dom";
import Pages from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoutes from "./PublicRoute";
import PrivateRoutes from "./PrivateRoute";
import Home from "../pages/Home";
import Plates from "../pages/Plates";
import PlateId from "../pages/PlateId";
import Products from "../pages/Products";
import ProductsId from "../pages/ProductsId";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Favoritos from "../pages/Favoritos/index.page";

const Router = () => {
  return (
    <Routes>
      <Route element={<Pages />}>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/receitas" element={<Plates />} />
          <Route path="/receitas/:id" element={<PlateId />} />
          <Route path="/estoque" element={<Products />} />
          <Route path="/estoque/:id" element={<ProductsId />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/favoritos" element={<Favoritos/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
