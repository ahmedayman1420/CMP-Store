// ======= --- ======= <| Redux |> ======= --- ======= //
import { combineReducers } from "redux";

// ======= --- ======= <| Reducers |> ======= --- ======= //
import errorReducer from "./ErrorReducer";
import categoryReducer from "./CategoryReducer";
import searchReducer from "./SearchReducer";
import productReducer from "./ProductReducer";
import cartReducer from "./CartReducer";

const reducers = combineReducers({
  error: errorReducer,
  categories: categoryReducer,
  searchWord: searchReducer,
  products: productReducer,
  cart: cartReducer,
});

export default reducers;
