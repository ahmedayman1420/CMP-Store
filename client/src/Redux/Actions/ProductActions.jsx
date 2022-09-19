// ======= --- ======= <| APIs |> ======= --- ======= //
import {
  craeteProductAPI,
  deleteCategoryAPI,
  editProductAPI,
  getProductByIdAPI,
  getProductsAPI,
} from "../../APIs/ProductAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ERROR_PRODUCT,
  GET_PRODUCTS,
} from "./ActionStrings";

// ======= --- ======= <| ERROR Action |> ======= --- ======= //
import { errorResetAction, unexpectedErrorAction } from "./ErrorActions";

// ======= --- ======= <| Actions |> ======= --- ======= //

export const creatProductAction = (product, token) => async (dispatch) => {
  const res = await craeteProductAPI(product, token);
  if (res?.data?.message !== "Creating product success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "product",
    };
    dispatch(unexpectedErrorAction(ERROR_PRODUCT, payload));
    return false;
  } else {
    let payload = res.data.payload.product;
    dispatch({
      type: CREATE_PRODUCT,
      payload,
    });
    dispatch(errorResetAction());
    return true;
  }
};

export const getProductsAction = (page, sort, filter) => async (dispatch) => {
  const res = await getProductsAPI(page, sort, filter);
  if (res?.data?.message !== "Getting products success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "product",
    };
    dispatch(unexpectedErrorAction(ERROR_PRODUCT, payload));
    return false;
  } else {
    let payload = res.data.payload.products;
    dispatch({
      type: GET_PRODUCTS,
      payload,
    });
    dispatch(errorResetAction());
    return true;
  }
};

export const getProductByIdAction = (id) => async (dispatch) => {
  const res = await getProductByIdAPI(id);
  if (res?.data?.message !== "Getting product success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "product",
    };
    dispatch(unexpectedErrorAction(ERROR_PRODUCT, payload));
    return false;
  } else {
    let payload = res.data.payload.product;
    return payload;
  }
};

export const editProductdAction = (product, id, token) => async (dispatch) => {
  const res = await editProductAPI(product, id, token);
  if (res?.data?.message !== "Editing product success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "product",
    };
    dispatch(unexpectedErrorAction(ERROR_PRODUCT, payload));
    return false;
  } else {
    let payload = res.data.payload.product;

    dispatch({
      type: EDIT_PRODUCT,
      payload,
    });
    dispatch(errorResetAction());
    return true;
  }
};

export const deleteProductAction = (id, token) => async (dispatch) => {
  const res = await deleteCategoryAPI(id, token);

  if (res?.data?.message !== "Deleting product success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "product",
    };
    dispatch(unexpectedErrorAction(ERROR_PRODUCT, payload));
    return false;
  } else {
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

    dispatch(errorResetAction());
    return true;
  }
};
