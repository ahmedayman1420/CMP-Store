// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Category-Actions |> ======= --- ======= //
import { getCategoriesAction } from "../../Redux/Actions/CategoyActions";

import { useSearchParams } from "react-router-dom";

// ======= --- ======= <| Product-Regex |> ======= --- ======= //
import {
  validBrand,
  validCategory,
  validDescription,
  validDiscountPercentage,
  validPrice,
  validStock,
  validTitle,
} from "./ProductRegex";
import {
  creatProductAction,
  getProductByIdAction,
} from "../../Redux/Actions/ProductActions";

// ======= --- ======= <| Component |> ======= --- ======= //
function CreateProduct() {
  const dispatch = useDispatch();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let error = useSelector((state) => state.error);
  let categories = useSelector((state) => state.categories);
  let [validFile, setValidFile] = useState([]);
  let [waiting, setWaiting] = useState(false);
  const [searchParams] = useSearchParams();
  let [edit, setEdit] = useState(false);
  let [editId, setEditId] = useState("");
  let products = useSelector((state) => state.products);

  let [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    discountPercentage: "",
    brand: "",
    category: "",
    files: [],
  });

  let [validInput, setValidInput] = useState({
    title: false,
    price: false,
    description: false,
    stock: false,
    discountPercentage: false,
    brand: false,
    category: false,
    files: false,

    startTitle: true,
    startPrice: true,
    startDescription: true,
    startStock: true,
    startDiscountPercentage: true,
    startBrand: true,
    startCategory: true,
    startFiles: true,
  });
  // ======= --- ======= <| Component-Functions |> ======= --- ======= //

  const getBase64 = ({ target }, i, cb) => {
    let reader = new FileReader();

    if (!(target.files[i] && target.files[i].type.match("image.*"))) {
      setValidFile((prevState) => {
        return [...prevState, false];
      });
      target.value = "";
      return false;
    }

    setValidFile((prevState) => {
      return [...prevState, true];
    });
    reader.readAsDataURL(target.files[i]);

    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const getProduct = ({ target }, value, index = -1) => {
    if (index === 6)
      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          [target.name]: [...prevProduct[target.name], value],
        };
      });
    else
      setProduct((prevUser) => {
        return { ...prevUser, [target.name]: target.value };
      });
  };

  const isValidInput = (index, value) => {
    if (index === 0) {
      setValidInput((prevState) => {
        return { ...prevState, title: validTitle.test(value) };
      });
    } else if (index === 1) {
      setValidInput((prevState) => {
        return { ...prevState, price: validPrice.test(value) };
      });
    } else if (index === 2) {
      setValidInput((prevState) => {
        return { ...prevState, description: validDescription.test(value) };
      });
    } else if (index === 3) {
      setValidInput((prevState) => {
        return { ...prevState, stock: validStock.test(value) };
      });
    } else if (index === 4) {
      setValidInput((prevState) => {
        return { ...prevState, brand: validBrand.test(value) };
      });
    } else if (index === 5) {
      let state = false;
      if (value !== "Enter category") state = true;
      setValidInput((prevState) => {
        return { ...prevState, category: validCategory.test(value) && state };
      });
    } else if (index === 6) {
      console.log({ value });
      setValidInput((prevState) => {
        return { ...prevState, files: value };
      });
    } else if (index === 7) {
      setValidInput((prevState) => {
        return {
          ...prevState,
          discountPercentage: validDiscountPercentage.test(value),
        };
      });
    }
  };

  const getCategories = async () => {
    await dispatch(getCategoriesAction());
  };

  const createProduct = async (e) => {
    setWaiting(true);

    product.category = categories.filter((cat) => {
      return cat.name === product.category;
    });
    product.category = product.category[0]._id;

    let token = localStorage.getItem("CMPToken");
    let res = await dispatch(creatProductAction(product, token));

    e.target.files.value = "";

    setProduct({
      title: "",
      price: "",
      description: "",
      stock: "",
      discountPercentage: "",
      brand: "",
      category: "",
      files: [],
    });

    setValidInput({
      title: false,
      price: false,
      description: false,
      stock: false,
      discountPercentage: false,
      brand: false,
      category: false,
      files: false,

      startTitle: true,
      startPrice: true,
      startDescription: true,
      startStock: true,
      startDiscountPercentage: true,
      startBrand: true,
      startCategory: true,
      startFiles: true,
    });
    setWaiting(false);
  };

  const editProduct = async (e) => {
    console.log({ FinalProduct: product });
    setWaiting(true);

    product.category = categories.filter((cat) => {
      return cat.name === product.category;
    });
    product.category = product.category[0]._id;

    let token = localStorage.getItem("CMPToken");
    // let res = await dispatch(creatProductAction(product, token)); // call edit prodcut id

    e.target.files.value = "";

    setProduct({
      title: "",
      price: "",
      description: "",
      stock: "",
      discountPercentage: "",
      brand: "",
      category: "",
      files: [],
    });

    setValidInput({
      title: false,
      price: false,
      description: false,
      stock: false,
      discountPercentage: false,
      brand: false,
      category: false,
      files: false,

      startTitle: true,
      startPrice: true,
      startDescription: true,
      startStock: true,
      startDiscountPercentage: true,
      startBrand: true,
      startCategory: true,
      startFiles: true,
    });
    setWaiting(false);
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!edit) createProduct(e);
    else editProduct(e);
  };

  const getEditId = () => {
    let id = searchParams.get("id");
    if (id !== "" && id !== null) {
      console.log("Iam Here");
      setEdit(true);
      setEditId(id);
      let result = products.filter((p) => {
        return p._id === id;
      });

      if (result.length) {
        setProduct(...result);
        checkValidityOfProduct(result[0]);
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const excute = async (cb) => {
    setWaiting(true);
    let res = await getEditId();
    if (!res) {
      let pro = await dispatch(getProductByIdAction(searchParams.get("id")));
      console.log(pro);
      setProduct(pro);
      cb(pro);
    }
    setWaiting(false);
  };

  const checkValidityOfProduct = (pro) => {
    isValidInput(0, pro.title);
    isValidInput(1, pro.price);
    isValidInput(2, pro.description);
    isValidInput(3, pro.stock);
    isValidInput(4, pro.brand);
    isValidInput(5, pro.category);
    isValidInput(7, pro.discountPercentage);
    setValidFile([true]);
  };

  useEffect(() => {
    excute(checkValidityOfProduct);
    getCategories();
  }, []);

  // ======= --- ======= <| Component-JSX |> ======= --- ======= //
  return (
    <>
      {waiting && (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "500px",
            }}
          >
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="dark" />
          </div>
        </>
      )}
      {!waiting && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 m-auto text-center">
              <Form onSubmit={sendData}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Control
                    name="title"
                    type="text"
                    value={product.title}
                    placeholder="Enter title"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(0, e.target.value);

                      if (validInput.startTitle)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startTitle: false,
                          };
                        });
                    }}
                  />
                  {!validInput.title && !validInput.startTitle && (
                    <Alert variant="primary" className="mt-3">
                      Must start with character
                      {/* Minimum two characters, maximum 30 characters, no numbers or
                    special characters */}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Control
                    name="price"
                    value={product.price}
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(1, e.target.value);

                      if (validInput.startPrice)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startPrice: false,
                          };
                        });
                    }}
                  />
                  {!validInput.price && !validInput.startPrice && (
                    <Alert variant="primary" className="mt-3">
                      Only numbers are allowed
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicdesc">
                  <Form.Control
                    name="description"
                    value={product.description}
                    type="text"
                    placeholder="Enter description"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(2, e.target.value);

                      if (validInput.startDescription)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startDescription: false,
                          };
                        });
                    }}
                  />
                  {!validInput.description && !validInput.startDescription && (
                    <Alert variant="primary" className="mt-3">
                      Must start with character
                      {/* Minimum two characters, maximum 100 characters, no numbers
                    or special characters */}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                  <Form.Control
                    name="stock"
                    value={product.stock}
                    type="number"
                    placeholder="Enter stock"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(3, e.target.value);

                      if (validInput.startStock)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startStock: false,
                          };
                        });
                    }}
                  />
                  {!validInput.stock && !validInput.startStock && (
                    <Alert variant="primary" className="mt-3">
                      Only numbers are allowed
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                  <Form.Control
                    name="discountPercentage"
                    value={product.discountPercentage}
                    type="number"
                    placeholder="Enter discount percentage"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(7, e.target.value);

                      if (validInput.startDiscountPercentage)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startDiscountPercentage: false,
                          };
                        });
                    }}
                  />
                  {!validInput.discountPercentage &&
                    !validInput.startDiscountPercentage && (
                      <Alert variant="primary" className="mt-3">
                        Only numbers are allowed, maximum discount percentage is
                        100
                      </Alert>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBrand">
                  <Form.Control
                    name="brand"
                    value={product.brand}
                    type="text"
                    placeholder="Enter brand"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(4, e.target.value);

                      if (validInput.startBrand)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startBrand: false,
                          };
                        });
                    }}
                  />
                  {!validInput.brand && !validInput.startBrand && (
                    <Alert variant="primary" className="mt-3">
                      Must start with character
                      {/* Minimum two characters, maximum 30 characters, no numbers or
                    special characters */}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                  <Form.Select
                    name="category"
                    value={product.category}
                    aria-label="Default select example"
                    onChange={(e) => {
                      getProduct(e);
                      isValidInput(5, e.target.value);

                      if (validInput.startCategory)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startCategory: false,
                          };
                        });
                    }}
                  >
                    {categories.map((cat) => {
                      return (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                  {!validInput.category && !validInput.startCategory && (
                    <Alert variant="primary" className="mt-3">
                      Select a category
                      {/* Minimum two characters, maximum 30 characters, no numbers or
                    special characters */}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFileMultiple">
                  <Form.Control
                    onChange={async (e) => {
                      setProduct((prevProduct) => {
                        return {
                          ...prevProduct,
                          files: [],
                        };
                      });
                      setValidFile([]);
                      if (validInput.startFiles)
                        setValidInput((prevState) => {
                          return {
                            ...prevState,
                            startFiles: false,
                          };
                        });
                      for (var i = 0; i < e.target.files.length; i++) {
                        await getBase64(e, i, (result) => {
                          console.log({ result });
                          getProduct(e, result, 6);
                        });
                      }

                      if (validFile[validFile.length - 1])
                        isValidInput(6, true);
                      else isValidInput(6, false);
                    }}
                    type="file"
                    name="files"
                    multiple
                    required={!edit}
                  />

                  {!validInput.startFiles && !validFile[validFile.length - 1] && (
                    <Alert variant="primary" className="mt-3">
                      Allowed file types are jpg, jpeg, png
                    </Alert>
                  )}
                </Form.Group>

                <Button
                  className="w-100"
                  variant={edit ? "warning" : "primary"}
                  type="submit"
                  disabled={
                    !(
                      validInput.title &&
                      validInput.price &&
                      validInput.description &&
                      validInput.stock &&
                      validInput.brand &&
                      validInput.category &&
                      validFile[validFile.length - 1] &&
                      validInput.discountPercentage
                    ) || waiting
                  }
                >
                  {!waiting && !edit && "Create"}
                  {!waiting && edit && "Update"}
                  {waiting && "Wait ..."}
                </Button>
                {error.value && error.type === "product" && (
                  <Alert variant="danger" className="mt-3">
                    <Alert.Heading>{error.message}</Alert.Heading>
                  </Alert>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateProduct;
