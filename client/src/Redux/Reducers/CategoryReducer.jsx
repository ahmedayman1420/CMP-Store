// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES,
} from "../Actions/ActionStrings";

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];

    case GET_CATEGORIES:
      return [...action.payload];

    case DELETE_CATEGORY:
      return state.filter((cat) => {
        return cat._id !== action.payload;
      });

    case EDIT_CATEGORY:
      return state.map((cat) => {
        if (cat._id === action.payload._id) return action.payload;
        else return cat;
      });

    default:
      return state;
  }
};

export default categoryReducer;
