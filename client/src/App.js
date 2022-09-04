import "./App.css";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { Routes, Route, Navigate } from "react-router-dom";

// ======= --- ======= <| Components |> ======= --- ======= //
import Authentication from "./Components/Authentication/Authentication";
import Home from "./Components/Home/Home";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/register" exact element={<Authentication />} />
        <Route path="/signin" exact element={<Authentication />} />

        <Route path="/" exact element={<Home />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="*" exact element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;
