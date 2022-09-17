import "./App.css";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { Routes, Route, Navigate } from "react-router-dom";

// ======= --- ======= <| Components |> ======= --- ======= //
import Authentication from "./Components/Authentication/Authentication";
import Home from "./Components/Home/Home";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import Products from "./Components/Products/Products";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import Categories from "./Components/Categories/Categories";
import History from "./Components/History/History";
import ProtectedRouteAdmin from "./Components/ProtectedRoute/ProtectedRouteAdmin";
import ProtectedRouteUser from "./Components/ProtectedRoute/ProtectedRouteUser";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/register" exact element={<Authentication />} />
        <Route path="/signin" exact element={<Authentication />} />

        <Route path="/" exact element={<Home />} />
        <Route path="/product/details/:id" exact element={<ProductDetails />} />
        <Route path="/products" exact element={<Products />} />

        <Route element={<ProtectedRouteUser />}>
          <Route path="/orders" exact element={<Orders />} />
          <Route path="/cart" exact element={<Cart />} />
        </Route>

        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/product/curd" exact element={<CreateProduct />} />
          <Route path="/categories" exact element={<Categories />} />
          <Route path="/history" exact element={<History />} />
        </Route>

        <Route path="*" exact element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;
