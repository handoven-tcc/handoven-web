import { Route, Routes } from "react-router-dom";
import Pages from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoutes from "./PublicRoute";
import PrivateRoutes from "./PrivateRoute";
import Home from "../pages/Home";
import Plates from "../pages/Plates";
import PlatesId from "../pages/PlatesId";
import Products from "../pages/Products";
import ProductsId from "../pages/ProductsId";
import Dashboard from "../pages/Dashboard";

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
          <Route path="/plates" element={<Plates />} />
          <Route path="/plates/:id" element={<PlatesId />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsId />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
