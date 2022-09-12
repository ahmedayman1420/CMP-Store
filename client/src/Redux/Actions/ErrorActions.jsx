// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {ERROR_RESET} from "./ActionStrings";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const unexpectedErrorAction = (type, payload) => async (dispatch) => {
  dispatch({
    type,
    payload,
  });
};

export const errorResetAction = () => async (dispatch) => {
  dispatch({
    type: ERROR_RESET,
    payload: { value: false, message: "", type: "" },
  });
};
