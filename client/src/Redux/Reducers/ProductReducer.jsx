// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { CREATE_PRODUCT, GET_PRODUCTS } from "../Actions/ActionStrings";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.payload];

    case GET_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
};

export default productReducer;
