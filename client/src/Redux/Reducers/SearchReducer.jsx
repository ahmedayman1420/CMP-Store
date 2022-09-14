// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { RESET_SEARCH_WORD, SET_SEARCH_WORD } from "../Actions/ActionStrings";

const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SET_SEARCH_WORD:
      return action.payload;

    case RESET_SEARCH_WORD:
      return action.payload;

    default:
      return state;
  }
};

export default searchReducer;
