// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| Style |> ======= --- ======= //
import Style from "./Products.module.scss";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { useNavigate } from "react-router-dom";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Product-Actions |> ======= --- ======= //
import { getProductsAction } from "../../Redux/Actions/ProductActions";

// ======= --- ======= <| FontAwesome |> ======= --- ======= //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faHollowStar } from "@fortawesome/free-regular-svg-icons";

// ======= --- ======= <| Component |> ======= --- ======= //
function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let products = useSelector((state) => state.products);
  let [waiting, setWaiting] = useState(false);

  // ======= --- ======= <| Component-Functions |> ======= --- ======= //

  const getProduct = async () => {
    setWaiting(true);
    await dispatch(getProductsAction(1, 0, null));
    setWaiting(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(products);

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
        <div className="my-5">
          <div className="container mt-5">
            {products.map((product) => {
              return (
                <Card key={product._id} className="mt-3">
                  <div className="row">
                    <div className={["col-md-3", Style.imgCan].join(" ")}>
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
                      <Card.Img
                        className={["w-100", Style.cardImg].join(" ")}
                        variant="top"
                        src={product.images[0]}
                        onClick={(e) => {
                          let index = product.images.indexOf(e.target.src);
                          e.target.src =
                            product.images[(index + 1) % product.images.length];
                        }}
                      />
                    </div>
                    <div className="col-md-9">
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
                                product.price *
                                  (product.discountPercentage / 100)}
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

                        {/* // ======= --- ======= <| BTN  |> ======= --- ======= // */}
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => {
                            navigate(`/product/details/${product._id}`);
                          }}
                        >
                          View
                        </Button>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
