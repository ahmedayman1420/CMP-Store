// ======= --- ======= <| Redux |> ======= --- ======= //
import { combineReducers } from "redux";

// ======= --- ======= <| Reducers |> ======= --- ======= //
import errorReducer from "./ErrorReducer";
import categoryReducer from "./CategoryReducer";
import searchReducer from "./SearchReducer";

const reducers = combineReducers({
  error: errorReducer,
  categories: categoryReducer,
  searchWord: searchReducer,
});

export default reducers;
