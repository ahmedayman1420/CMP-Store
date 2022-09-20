// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { useNavigate } from "react-router-dom";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Style |> ======= --- ======= //
import Style from "./Cart.module.scss";

// ======= --- ======= <| Cart-Actions |> ======= --- ======= //
import { getCartAction } from "../../Redux/Actions/UserActions";

// ======= --- ======= <| Component |> ======= --- ======= //
function Cart() {
  let cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let [waiting, setWaiting] = useState(false);

  // ======= --- ======= <| Component-Functions |> ======= --- ======= //
  const getUserCarts = async () => {
    setWaiting(true);
    let token = await localStorage.getItem("CMPToken");
    await dispatch(getCartAction(token));
    setWaiting(false);
  };
  useEffect(() => {
    getUserCarts();
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
      {!waiting && !cart.length && (
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              <h2>Cart is empty</h2>
            </Card.Title>
          </Card.Body>
        </Card>
      )}
      {!waiting && cart.length && (
        <div className="my-5">
          <div className="container mt-5">
            {cart.map((crt) => {
              let product = crt._id;
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
                            Q: {crt.quantity}
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
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* // ======= --- ======= <| BTN |> ======= --- ======= // */}
            <Button
              variant="warning"
              className="w-100 mt-3"
              onClick={() => {
                // handel buy product
              }}
            >
              Buy
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
