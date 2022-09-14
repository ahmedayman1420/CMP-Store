// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { Outlet, Navigate, useLocation } from "react-router-dom";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Component |> ======= --- ======= //
const ProtectedRouteUser = () => {
  const location = useLocation();
  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let token = localStorage.getItem("CMPToken");
  let auth = false;

  try {
    var decoded = jwt_decode(token);
    auth = true;
  } catch (error) {
    localStorage.clear();
    auth = false;
  }
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin?return=" + location.pathname} />
  );
};

export default ProtectedRouteUser;
