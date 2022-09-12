// ======= --- ======= <| APIs |> ======= --- ======= //
import { googleSigninAPI, signInAPI, signUpAPI } from "../../APIs/UserAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { Error_SIGNIN, ERROR_SIGNUP } from "./ActionStrings";

// ======= --- ======= <| ERROR Action |> ======= --- ======= //
import { errorResetAction, unexpectedErrorAction } from "./ErrorActions";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const googleAuthAction = (profile, token) => async (dispatch) => {
  const res = await googleSigninAPI(token);

  localStorage.setItem("CMPToken", res.data.payload.token);
  localStorage.setItem("CMPProfile", JSON.stringify(profile));
  localStorage.setItem("CMPUser", res.data.payload.user.name);

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
    localStorage.setItem("CMPToken", res.data.payload.token);
    localStorage.setItem("CMPUser", res.data.payload.user.name);

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
    localStorage.setItem("CMPToken", res.data.payload.token);
    localStorage.setItem("CMPUser", res.data.payload.user.name);

    dispatch(errorResetAction());
    return true;
  }
};
