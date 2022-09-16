// ======= --- ======= <| APIs |> ======= --- ======= //
import { craeteProductAPI, getProductsAPI } from "../../APIs/ProductAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { CREATE_PRODUCT, ERROR_PRODUCT, GET_PRODUCTS } from "./ActionStrings";

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
