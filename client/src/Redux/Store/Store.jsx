// ======= --- ======= <| Redux |> ======= --- ======= //
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// ======= --- ======= <| Reducers |> ======= --- ======= //
import reducers from "../Reducers";

const initialState = {
  error: { value: false, message: "", type: "" },
  categories: [],
  searchWord: "",
  products: [],
  cart: [],
};

export const store = createStore(
  reducers,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
