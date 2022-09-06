// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";
import Style from "./Navigationbar.module.scss";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ======= --- ======= <| Images |> ======= --- ======= //
import logo from "../../Images/logo-cmp2.jpg";

// ======= --- ======= <| React-Redux |> ======= --- ======= //

// ======= --- ======= <| Fontawesome |> ======= --- ======= //
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navigationbar() {
  let location = useLocation();

  // ======= --- ======= <| Component states |> ======= --- ======= //
  let [user, setUser] = useState(null);
  let [showOrHide, setShowOrHider] = useState("d-none");

  // ======= --- ======= <| Component Functinos |> ======= --- ======= //
  const ShowOrHideNavbar = () => {
    if (location.pathname === "/signin" || location.pathname === "/register")
      setShowOrHider("d-none");
    else setShowOrHider("d-block");
  };

  const getUserFromLocalstorage = () => {
    let userImg = JSON.parse(localStorage.getItem("CMPProfile"))?.imageUrl;
    let userName = localStorage.getItem("CMPUser");

    if (userName) setUser({ userImg, userName });
  };

  useEffect(() => {
    ShowOrHideNavbar();
    getUserFromLocalstorage();
  }, [location]);
  // ======= --- ======= <| Here need to create useEffect function to check the user token when changing the location, or may be use protected route instead of that |> ======= --- ======= //

  return (
    <>
      <Navbar bg="light" expand="lg" className={showOrHide}>
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" className={Style.navBrand}>
            <img src={logo} style={{}} alt="" className="w-100" />
          </Navbar.Brand>

          {user && (
            <div className="d-flex align-items-center">
            
              <div
                className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <strong
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    fontColor: "",
                  }}
                  className="text-success"
                >
                  {user.userName[0]}
                </strong>
              </div>
            </div>
          )}

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className={["me-2", Style.formControl].join(" ")}
                aria-label="Search"
              />
              <Button variant="outline-warning">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="magnifying-glass"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-magnifying-glass"
                >
                  <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                  ></path>
                </svg>
              </Button>
            </Form>
            <Nav
              className="ml-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                }}
                as={NavLink}
                to="/signin"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}
      {/* =============================================================== */}

      {/* <Navbar bg="light" expand="lg" className={showOrHide}>
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" className={Style.navBrand}>
            <img src={logo} style={{}} alt="" className="w-100" />
          </Navbar.Brand>

          {user && (
            <Navbar.Brand className={Style.navBrand}>
              <span>{user.userName[0]}</span>
              <img
                src={user?.userImg}
                style={{}}
                alt=""
                className={["w-100", Style.profileImg]}
              />
            </Navbar.Brand>
          )}

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-end bg-info"
          >
            <Form className={["d-flex bg-dark ", Style.W40].join(" ")}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="magnifying-glass"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-magnifying-glass"
                >
                  <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                  ></path>
                </svg>
              </Button>
            </Form>

            <Nav
              className={[
                "d-flex justify-content-end me-auto my-2 my-lg-0 bg-danger",
                Style.W40,
              ].join(" ")}
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                }}
                as={NavLink}
                to="/signin"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
}

export default Navigationbar;
