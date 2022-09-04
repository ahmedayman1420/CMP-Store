// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { ERROR_ADD_POST } from "../Actions/ActionStrings";

const errorReducer = (
  state = { value: false, message: "", type: "" },
  action
) => {
  switch (action.type) {
    case ERROR_ADD_POST:
      return { ...action.payload, type: "post" };

    default:
      return state;
  }
};

export default errorReducer;
