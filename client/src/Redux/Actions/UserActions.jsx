// ======= --- ======= <| APIs |> ======= --- ======= //
import {
  addToCartAPI,
  getCartAPI,
  googleSigninAPI,
  refreshTokenAPI,
  signInAPI,
  signUpAPI,
} from "../../APIs/UserAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  ADD_TO_CART,
  ERROR_CART,
  Error_SIGNIN,
  ERROR_SIGNUP,
  SET_CART,
} from "./ActionStrings";

// ======= --- ======= <| ERROR Action |> ======= --- ======= //
import { errorResetAction, unexpectedErrorAction } from "./ErrorActions";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const googleAuthAction = (profile, token) => async (dispatch) => {
  const res = await googleSigninAPI(token);

  await localStorage.setItem("CMPToken", res.data.payload.token);
  await localStorage.setItem("CMPProfile", JSON.stringify(profile));
  await localStorage.setItem("CMPUser", res.data.payload.user.name);

  return true;
};

export const signUpAction = (user) => async (dispatch) => {
  const res = await signUpAPI(user);
  if (res?.data?.message !== "Sign up Successfully") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "auth",
    };
    dispatch(unexpectedErrorAction(ERROR_SIGNUP, payload));
    return false;
  } else {
    await localStorage.setItem("CMPToken", res.data.payload.token);
    await localStorage.setItem("CMPUser", res.data.payload.user.name);

    dispatch(errorResetAction());
    return true;
  }
};

export const signInAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);
  if (res?.data?.message !== "Sign in Successfully") {
    console.log("HERE");
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "auth",
    };
    dispatch(unexpectedErrorAction(Error_SIGNIN, payload));
    return false;
  } else {
    await localStorage.setItem("CMPToken", res.data.payload.token);
    await localStorage.setItem("CMPUser", res.data.payload.user.name);

    dispatch(errorResetAction());
    return true;
  }
};

export const refreshTokenAction = (token) => async (dispatch) => {
  const res = await refreshTokenAPI(token);
  if (res?.data?.message !== "Refresh Token Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "auth",
    };
    dispatch(unexpectedErrorAction(Error_SIGNIN, payload));
    return false;
  } else {
    await localStorage.setItem("CMPToken", res.data.payload.token);

    dispatch(errorResetAction());
    return true;
  }
};

export const addToCartAction = (product, token) => async (dispatch) => {
  const res = await addToCartAPI(product, token);
  if (res?.data?.message !== "Add To Cart Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "cart",
    };
    dispatch(unexpectedErrorAction(ERROR_CART, payload));
    return false;
  } else {
    // Dispatch add to cart action
    let payload = res.data.payload;

    dispatch({
      type: ADD_TO_CART,
      payload,
    });
    dispatch(errorResetAction());
    return true;
  }
};

export const getCartAction = (token) => async (dispatch) => {
  const res = await getCartAPI(token);
  if (res?.data?.message !== "Get Cart Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "cart",
    };
    dispatch(unexpectedErrorAction(ERROR_CART, payload));
    return false;
  } else {
    // Dispatch add to cart action
    let payload = res.data.payload;

    dispatch({
      type: SET_CART,
      payload,
    });
    dispatch(errorResetAction());
    return true;
  }
};
