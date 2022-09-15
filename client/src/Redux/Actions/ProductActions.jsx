// ======= --- ======= <| APIs |> ======= --- ======= //
import { craeteProductAPI } from "../../APIs/ProductAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { ERROR_PRODUCT } from "./ActionStrings";

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
    
    dispatch(errorResetAction());
    return true;
  }
};
