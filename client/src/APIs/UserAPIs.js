// ======= --- ======= <| JWT |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Axios |> ======= --- ======= //
import axios from "axios";
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ======= --- ======= <| APIs |> ======= --- ======= //
export const googleSigninAPI = async (token) => {
  try {
    var decoded = jwt_decode(token);
    const res = await client.post(`google`, {
      email: decoded.email,
      name: decoded.name,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
