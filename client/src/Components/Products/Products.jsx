// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Product-Actions |> ======= --- ======= //
import { getProductsAction } from "../../Redux/Actions/ProductActions";

// ======= --- ======= <| Component |> ======= --- ======= //
function Products() {
  const dispatch = useDispatch();

  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let products = useSelector((state) => state.products);
  // ======= --- ======= <| Component-Functions |> ======= --- ======= //

  const getProduct = async () => {
    dispatch(getProductsAction(1, 0, null));
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(products);

  // ======= --- ======= <| Component-JSX |> ======= --- ======= //
  return (
    <>
      <div className="mt-5">
        <div className="container mt-5">
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
          {products.map((product) => {
            return (
              <Card key={product._id} className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <Card.Img variant="top" src={product.images[0]} />
                  </div>
                  <div className="col-md-9">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
