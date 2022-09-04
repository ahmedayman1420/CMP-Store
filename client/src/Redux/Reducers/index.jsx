// ======= --- ======= <| Redux |> ======= --- ======= //
import { combineReducers } from "redux";

// ======= --- ======= <| Reducers |> ======= --- ======= //
import errorReducer from "./ErrorReducer";

const reducers = combineReducers({
  error: errorReducer,
});

export default reducers;
