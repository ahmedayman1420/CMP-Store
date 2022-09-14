// ======= --- ======= <| JWT |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Axios |> ======= --- ======= //
import axios from "axios";
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ======= --- ======= <| APIs |> ======= --- ======= //
export const addCategoryAPI = async (category, token) => {
  try {
    const res = await client.post(
      "category/add",
      { name: category },
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

export const getCategoriesAPI = async () => {
  try {
    const res = await client.get("category/all");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteCategoryAPI = async (id, token) => {
  try {
    const res = await client.delete(`category/delete/${id}`, {
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

export const editCategoryAPI = async (category, id, token) => {
  try {
    const res = await client.put(
      `category/edit/${id}`,
      {
        name: category,
      },
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
