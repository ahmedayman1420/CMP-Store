// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| Style |> ======= --- ======= //
import Style from "./ProductDetails.module.scss";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| React-Image-Magnify |> ======= --- ======= //
import ReactImageMagnify from "react-image-magnify";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { useParams, useNavigate } from "react-router-dom";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| FontAwesome |> ======= --- ======= //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faHollowStar } from "@fortawesome/free-regular-svg-icons";
import { getProductByIdAction } from "../../Redux/Actions/ProductActions";

// ======= --- ======= <| Component |> ======= --- ======= //
function ProductDetails() {
  let params = useParams();
  let error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let products = useSelector((state) => state.products);
  let [admin, setAdmin] = useState({ role: "user", isAdmin: false });
  let [waiting, setWaiting] = useState(false);
  let [imgIndex, setImgIndex] = useState(0);
  let [productId, setProductId] = useState("");
  let [product, setProduct] = useState({});

  // ======= --- ======= <| Component-Functions |> ======= --- ======= //
  const checkIsAdmin = async () => {
    let token = localStorage.getItem("CMPToken");
    let decoded = await jwt_decode(token);
    if (decoded.data.role === "admin" || decoded.data.role === "superAdmin") {
      setAdmin({ role: decoded.data.role, isAdmin: true });
    }
  };

  const getProductId = async () => {
    if (params.id) {
      setProductId(params.id);
      let result = products.filter((p) => {
        return p._id === params.id;
      });

      if (result.length) {
        setProduct(...result);
        return true;
      } else {
        return false;
      }
    } else {
      navigate("/products");
      return false;
    }
  };

  const excute = async () => {
    setWaiting(true);
    let res = await getProductId();
    if (!res) {
      setProduct(await dispatch(getProductByIdAction(params.id)));
    }
    checkIsAdmin();
    setWaiting(false);
  };
  useEffect(() => {
    excute();
  }, []);

  console.log({ product });

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
      {error.value &&
        error.type === "product" &&
        setTimeout(() => {
          navigate("/products");
        }, 1)}
      {!waiting && !error.value && Object.keys(product).length !== 0 && (
        <div className="my-5">
          <div className="container mt-5">
            <Card key={product._id} className="mt-3">
              <div className="row">
                <div className={["col-md-4", Style.imgCan].join(" ")}>
                  {product.discountPercentage ? (
                    <div
                      className={[
                        Style.sale,
                        "d-flex justify-content-center align-items-center",
                      ].join(" ")}
                    >
                      -{product.discountPercentage}%
                    </div>
                  ) : (
                    ""
                  )}
                  {/* // ======= --- ======= <| Image |> ======= --- ======= // */}
                  <div className="row">
                    <div className="col-md-3">
                      <div className="d-flex flex-column">
                        {product.images.map((val, i) => {
                          return (
                            <div
                              key={i}
                              className={[
                                Style.imgContainer,
                                i === product.images.length - 1 && "m-0",
                              ].join(" ")}
                            >
                              <Card.Img
                                key={i}
                                src={product.images[i]}
                                onClick={(e) => {
                                  let index = product.images.indexOf(
                                    e.target.src
                                  );
                                  setImgIndex(index);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-md-9">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            isFluidWidth: true,
                            src: product.images[imgIndex],
                          },
                          largeImage: {
                            src: product.images[imgIndex],
                            width: 1200,
                            height: 1800,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <Card.Body>
                    {/* // ======= --- ======= <| Title & Description |> ======= --- ======= // */}
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>

                    {/* // ======= --- ======= <| Rating |> ======= --- ======= // */}
                    <Card.Text>
                      {Array.from(
                        { length: Math.ceil(product.rating.rate) },
                        (_, i) => {
                          return (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              style={{ color: "#FFA41C" }}
                            />
                          );
                        }
                      )}
                      {Array.from(
                        { length: 5 - Math.ceil(product.rating.rate) },
                        (_, i) => {
                          return (
                            <FontAwesomeIcon
                              key={i}
                              icon={faHollowStar}
                              style={{ color: "#FFA41C" }}
                            />
                          );
                        }
                      )}
                      <span style={{ marginLeft: "7px" }}>
                        {product.rating.count}
                      </span>
                    </Card.Text>

                    {/* // ======= --- ======= <| Price |> ======= --- ======= // */}
                    {product.discountPercentage ? (
                      <div className="d-flex">
                        <Card.Text
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            marginRight: "10px",
                          }}
                        >
                          EGP{" "}
                          {product.price -
                            product.price * (product.discountPercentage / 100)}
                        </Card.Text>
                        <del>
                          <Card.Text
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              color: "#817f87",
                            }}
                          >
                            EGP {product.price}
                          </Card.Text>
                        </del>
                      </div>
                    ) : (
                      <Card.Text
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        EGP {product.price}
                      </Card.Text>
                    )}
                    {/* // ======= --- ======= <| Stock |> ======= --- ======= // */}
                    {product.stock > 0 ? (
                      <Card.Text
                        style={{
                          padding: "10px",
                          backgroundColor: "#099970",
                          borderRadius: "10px",
                          width: "fit-content",
                        }}
                      >
                        In stock
                      </Card.Text>
                    ) : (
                      <Card.Text
                        style={{
                          padding: "10px",
                          backgroundColor: "#b51b47",
                          borderRadius: "10px",
                          width: "fit-content",
                        }}
                      >
                        Out of stock
                      </Card.Text>
                    )}

                    {/* // ======= --- ======= <| Free-Shipping  |> ======= --- ======= // */}
                    {product.price > 500 ? (
                      <Card.Text>Free shipping by CMP</Card.Text>
                    ) : (
                      ""
                    )}

                    {/* // ======= --- ======= <| Buy-Cart |> ======= --- ======= // */}

                    <Card.Text className={["p-3"].join(" ")}>
                      <Form.Label>Quantity: </Form.Label>
                      <Form.Select>
                        {Array.from({ length: product.stock }, (_, i) => {
                          return (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Button variant="secondary" className="w-100 my-3">
                        Add to Cart
                      </Button>
                      <Button variant="warning" className="w-100">
                        Buy Now
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
