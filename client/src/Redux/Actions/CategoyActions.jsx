// ======= --- ======= <| APIs |> ======= --- ======= //
import {
  addCategoryAPI,
  deleteCategoryAPI,
  editCategoryAPI,
  getCategoriesAPI,
} from "../../APIs/CategoryAPIs";
// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ERROR_CATEGORY,
  GET_CATEGORIES,
} from "./ActionStrings";

// ======= --- ======= <| ERROR Action |> ======= --- ======= //
import { errorResetAction, unexpectedErrorAction } from "./ErrorActions";

// ======= --- ======= <| Actions |> ======= --- ======= //
export const addCategoryAction = (category, token) => async (dispatch) => {
  const res = await addCategoryAPI(category, token);

  if (res?.data?.message !== "Adding Category Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "category",
    };
    dispatch(unexpectedErrorAction(ERROR_CATEGORY, payload));
    return false;
  } else {
    dispatch(errorResetAction());
    let payload = res.data.payload.category;
    dispatch({
      type: ADD_CATEGORY,
      payload,
    });

    return true;
  }
};

export const getCategoriesAction = () => async (dispatch) => {
  const res = await getCategoriesAPI();

  if (res?.data?.message !== "Get Categories Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "category",
    };
    dispatch(unexpectedErrorAction(ERROR_CATEGORY, payload));
    return false;
  } else {
    let payload = res.data.payload.categories;

    dispatch({
      type: GET_CATEGORIES,
      payload,
    });

    dispatch(errorResetAction());
    return true;
  }
};

export const deleteCategoriesAction = (id, token) => async (dispatch) => {
  const res = await deleteCategoryAPI(id, token);

  if (res?.data?.message !== "Deleting Category Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "category",
    };
    dispatch(unexpectedErrorAction(ERROR_CATEGORY, payload));
    return false;
  } else {
    // let payload = res.data.payload.category;

    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });

    dispatch(errorResetAction());
    return true;
  }
};

export const eidtCategoryAction = (category, id, token) => async (dispatch) => {
  const res = await editCategoryAPI(category, id, token);

  if (res?.data?.message !== "Editing Category Success") {
    let payload = {
      value: true,
      message: res.response.data.message,
      type: "category",
    };
    dispatch(unexpectedErrorAction(ERROR_CATEGORY, payload));
    return false;
  } else {
    let payload = res.data.payload.category;
    dispatch({
      type: EDIT_CATEGORY,
      payload,
    });

    dispatch(errorResetAction());
    return true;
  }
};
