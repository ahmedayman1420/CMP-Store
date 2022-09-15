// ======= --- ======= <| JWT |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Axios |> ======= --- ======= //
import axios from "axios";
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ======= --- ======= <| APIs |> ======= --- ======= //
export const craeteProductAPI = async (product, token) => {
  try {
    const res = await client.post(`product/create`, product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
