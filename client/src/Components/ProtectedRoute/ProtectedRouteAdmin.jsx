// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { Outlet, Navigate } from "react-router-dom";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Component |> ======= --- ======= //
const ProtectedRouteAdmin = () => {
  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let token = localStorage.getItem("CMPToken");
  let auth = false;

  try {
    var decoded = jwt_decode(token);
    if (decoded.data.role === "admin" || decoded.data.role === "superAdmin")
      auth = true;
    else localStorage.clear();
  } catch (error) {
    localStorage.clear();
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteAdmin;
