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

export const getProductsAPI = async (page, sort, filter) => {
  try {
    const res = await client.get(
      `product/all?page=${page}&sort=${sort}&filter=${filter}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProductByIdAPI = async (id) => {
  try {
    const res = await client.get(`product/get/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editProductAPI = async (product, id, token) => {
  try {
    const res = await client.put(
      `product/edit/${id}`,
      {
        title: product.title,
        price: product.price,
        description: product.description,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        images: product.images,
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

export const deleteCategoryAPI = async (id, token) => {
  try {
    const res = await client.delete(`product/delete/${id}`, {
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
