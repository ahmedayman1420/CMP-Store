// ======= --- ======= <| Redux |> ======= --- ======= //
import { combineReducers } from "redux";

// ======= --- ======= <| Reducers |> ======= --- ======= //
import errorReducer from "./ErrorReducer";
import categoryReducer from "./CategoryReducer";
import searchReducer from "./SearchReducer";
import productReducer from "./ProductReducer";

const reducers = combineReducers({
  error: errorReducer,
  categories: categoryReducer,
  searchWord: searchReducer,
  products: productReducer,
});

export default reducers;
