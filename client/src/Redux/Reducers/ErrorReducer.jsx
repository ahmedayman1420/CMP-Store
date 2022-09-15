// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  ERROR_CATEGORY,
  ERROR_PRODUCT,
  ERROR_RESET,
  Error_SIGNIN,
  ERROR_SIGNUP,
} from "../Actions/ActionStrings";

const errorReducer = (
  state = { value: false, message: "", type: "" },
  action
) => {
  switch (action.type) {
    case ERROR_SIGNUP:
      return { ...action.payload };

    case Error_SIGNIN:
      return { ...action.payload };

    case ERROR_CATEGORY:
      return { ...action.payload };

    case ERROR_PRODUCT:
      return { ...action.payload };

    case ERROR_RESET:
      return { ...action.payload };

    default:
      return state;
  }
};

export default errorReducer;
