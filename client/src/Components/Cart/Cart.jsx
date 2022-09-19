// ======= --- ======= <| React |> ======= --- ======= //
import React from "react";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Card from "react-bootstrap/Card";

function Cart() {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">
            <h2>Cart is empty</h2>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cart;
