// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "../Actions/ActionStrings";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.payload];

    case GET_PRODUCTS:
      return [...action.payload];

    case EDIT_PRODUCT:
      return state.map((pro) => {
        if (pro._id === action.payload._id) return action.payload;
        else return pro;
      });

    case DELETE_PRODUCT:
      return state.filter((pro) => {
        return pro._id !== action.payload;
      });

    default:
      return state;
  }
};

export default productReducer;
