// ======= --- ======= <| APIs |> ======= --- ======= //
// import { addPostAPI } from "../../APIs/APIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { ADD_POST } from "./ActionStrings";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const addPostAction = (post, googleAuth) => async (dispatch) => {
  // const res = await addPostAPI(post, googleAuth);
  dispatch({
    type: ADD_POST,
    // payload: res.data.post,
  });
};
