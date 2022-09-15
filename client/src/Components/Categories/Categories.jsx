// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| Style |> ======= --- ======= //
import Style from "./CategoryForm.module.scss";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Category-Actions |> ======= --- ======= //
import {
  addCategoryAction,
  deleteCategoriesAction,
  eidtCategoryAction,
  getCategoriesAction,
} from "../../Redux/Actions/CategoyActions";

// ======= --- ======= <| Component |> ======= --- ======= //
function Categories() {
  const dispatch = useDispatch();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let [isValidCategory, setIsValidCategory] = useState(false);
  let [start, setStart] = useState(true);
  let [category, setCategory] = useState("");
  let [editId, setEditId] = useState("");
  let [waiting, setWaiting] = useState(false);
  let [deleteState, setDeleteState] = useState(false);
  let [edit, setEdit] = useState(false);
  let error = useSelector((state) => state.error);
  let categories = useSelector((state) => state.categories);
  let searchWord = useSelector((state) => state.searchWord);

  // ======= --- ======= <| Component-Functions |> ======= --- ======= //
  const validateCategory = (val) => {
    const validCategory = new RegExp(
      //Minimum two characters, Maximum 30 characters, no number and one special character;
      /^[a-zA-Z ]{2,30}$/
    );

    if (start) setStart(false);

    let result = validCategory.test(val);
    setIsValidCategory(result);
  };

  const getCategory = ({ target }) => {
    setCategory(target.value);
  };

  const getCategories = async () => {
    await dispatch(getCategoriesAction());
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    setWaiting(true);

    let token = await localStorage.getItem("CMPToken");
    await dispatch(addCategoryAction(category, token));

    setCategory("");
    setIsValidCategory(false);
    setStart(true);
    setWaiting(false);
  };

  const editCategory = async (e) => {
    e.preventDefault();
    setWaiting(true);

    let token = await localStorage.getItem("CMPToken");
    await dispatch(eidtCategoryAction(category, editId, token));

    setCategory("");
    setIsValidCategory(false);
    setStart(true);
    setEdit(false);
    setEditId("");
    setWaiting(false);
  };

  const sendData = (e) => {
    if (!edit) addCategory(e);
    else editCategory(e);
  };

  const deleteCategory = async (e, id) => {
    e.preventDefault();
    setWaiting(true);
    setDeleteState(true);

    let token = await localStorage.getItem("CMPToken");
    await dispatch(deleteCategoriesAction(id, token));

    setDeleteState(false);
    setWaiting(false);
  };
  // ======= --- ======= <| Component-JSX |> ======= --- ======= //
  return (
    <>
      {/* // ======= --- ======= <|======|> ======= --- ======= // */}
      {/* // ======= --- ======= <|Category-Form|> ======= --- ======= // */}
      {/* // ======= --- ======= <|======|> ======= --- ======= // */}

      <Form className="w-50 text-center m-auto mt-5" onSubmit={sendData}>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>
            <h4>CATRGORY</h4>
          </Form.Label>

          <Form.Control
            className={edit && Style.formControl}
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => {
              getCategory(e);
              validateCategory(e.target.value);
            }}
          />

          {!isValidCategory && !start && (
            <Alert variant="primary" className="mt-3">
              Category minimum characters are two and maximum characters are
              thirty
            </Alert>
          )}
        </Form.Group>
        <Button
          variant={(!edit && "primary") || (edit && "warning")}
          type="submit"
          disabled={!isValidCategory || waiting}
        >
          {!waiting && !edit && "Add"}
          {!waiting && edit && "Edit"}
          {waiting && "Wait ..."}
        </Button>
        {error.value && error.type === "category" && (
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>{error.message}</Alert.Heading>
          </Alert>
        )}
      </Form>

      {/* // ======= --- ======= <|======|> ======= --- ======= // */}
      {/* // ======= --- ======= <|Category-Section|> ======= --- ======= // */}
      {/* // ======= --- ======= <|======|> ======= --- ======= // */}
      <div className="container mt-5">
        <div className="row mb-3">
          {categories.map((cat) => {
            if (cat.name.toLowerCase().includes(searchWord.toLowerCase()))
              return (
                <div key={cat._id} className="col-md-4 mt-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body className="text-center">
                      <Card.Title className="mb-4">{cat.name}</Card.Title>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            deleteCategory(e, cat._id);
                          }}
                          disabled={(waiting && deleteState) || edit}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={(e) => {
                            setEdit(true);
                            setCategory(cat.name);
                            setStart(false);
                            setIsValidCategory(true);
                            setEditId(cat._id);
                          }}
                          disabled={waiting && edit}
                        >
                          Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            else return null;
          })}
        </div>
      </div>
    </>
  );
}

export default Categories;
