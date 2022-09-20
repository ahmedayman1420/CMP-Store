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
    console.log({ error });
  }
};

export const signUpAPI = async (user) => {
  try {
    const res = await axios.post(`${baseURL}user/signup`, user);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInAPI = async (user) => {
  try {
    const res = await axios.post(`${baseURL}user/signin`, {
      email: user.email,
      password: user.password,
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const refreshTokenAPI = async (token) => {
  try {
    const res = await client.post(
      `token`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addToCartAPI = async (product, token) => {
  try {
    const res = await axios.post(
      `${baseURL}cart/add`,
      { product },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCartAPI = async (token) => {
  try {
    const res = await axios.get(
      `${baseURL}cart/get`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
