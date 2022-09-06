// ======= --- ======= <| APIs |> ======= --- ======= //
import { googleSigninAPI } from "../../APIs/UserAPIs";

// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {} from "./ActionStrings";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const googleAuthAction = (profile, token) => async (dispatch) => {
  const res = await googleSigninAPI(token);

  localStorage.setItem("CMPToken", res.data.payload.token);
  localStorage.setItem("CMPProfile", JSON.stringify(profile));
  localStorage.setItem("CMPUser", res.data.payload.user.name);
};
