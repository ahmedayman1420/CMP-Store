// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { RESET_SEARCH_WORD, SET_SEARCH_WORD } from "./ActionStrings";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const setSearchAction = (search) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_WORD,
    payload: search,
  });
};

export const resetSearchAction = () => async (dispatch) => {
  dispatch({
    type: RESET_SEARCH_WORD,
    payload: "",
  });
};
