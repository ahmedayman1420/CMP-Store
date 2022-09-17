// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| Style |> ======= --- ======= //
import Style from "./Navigationbar.module.scss";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ======= --- ======= <| Images |> ======= --- ======= //
import logo from "../../Images/logo-cmp2.jpg";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Fontawesome |> ======= --- ======= //
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

// ======= --- ======= <| Actions |> ======= --- ======= //
import {
  resetSearchAction,
  setSearchAction,
} from "../../Redux/Actions/SearchActions";
import { refreshTokenAction } from "../../Redux/Actions/UserActions";

function Navigationbar() {
  const dispatch = useDispatch();
  let location = useLocation();

  // ======= --- ======= <| Component states |> ======= --- ======= //
  let [user, setUser] = useState(null);
  let [showOrHide, setShowOrHider] = useState("d-none");
  let [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  let [admin, setAdmin] = useState({ role: "user", isAdmin: false });
  let [start, setStart] = useState(true);

  // ======= --- ======= <| Component Functinos |> ======= --- ======= //
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ShowOrHideNavbar = () => {
    if (location.pathname === "/signin" || location.pathname === "/register")
      setShowOrHider("d-none");
    else setShowOrHider("d-block");
  };

  const getUserFromLocalstorage = async () => {
    let userImg = JSON.parse(localStorage.getItem("CMPProfile"))?.imageUrl;
    let userName = localStorage.getItem("CMPUser");
    let token = localStorage.getItem("CMPToken");

    if (userName) {
      setUser({ userImg, userName });

      let decoded = await jwt_decode(token);
      if (decoded.data.role === "admin" || decoded.data.role === "superAdmin") {
        setAdmin({ role: decoded.data.role, isAdmin: true });
      }
    }
  };

  const Execute = async () => {
    ShowOrHideNavbar();
    await getUserFromLocalstorage();
  };

  const refreshToken = async () => {
    let token = localStorage.getItem("CMPToken");
    dispatch(refreshTokenAction(token));

    setTimeout(() => {
      refreshToken(token);
    }, 1000 * 60 * 50);
  };

  useEffect(() => {
    Execute();
    setSearch("");
    dispatch(resetSearchAction());

    let token = localStorage.getItem("CMPToken");
    if (token && start) {
      setStart(false);
      refreshToken(token);
    }
  }, [location]);

  const handleSearch = (searchWord) => {
    dispatch(setSearchAction(searchWord));
  };
  // ======= --- ======= <| Here need to create useEffect function to check the user token when changing the location, or may be use protected route instead of that |> ======= --- ======= //
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className={showOrHide}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" className={Style.navBrand}>
            {admin.isAdmin && <h3>{admin.role}</h3>}
            {!admin.isAdmin && (
              <img src={logo} style={{}} alt="" className="w-100" />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />{" "}
          <Navbar.Collapse id="navbarScroll" className="row">
            <div className="col-md-8 offset-md-1">
              <Form className="d-flex">
                <Form.Control
                  onChange={async (e) => {
                    await setSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  type="search"
                  placeholder="Search"
                  className={["me-2", Style.formControl].join(" ")}
                  aria-label="Search"
                  value={search}
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
            </div>
            <div className="col-md-3">
              <Nav
                className="ml-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {!user && (
                  <Nav.Link as={NavLink} to="/signin" className="text-white">
                    Sign in
                  </Nav.Link>
                )}
                <>
                  <Nav.Link as={NavLink} to="/orders" className="text-white">
                    Orders
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" className="text-white">
                    <FontAwesomeIcon icon={faCartShopping} />
                    Cart
                  </Nav.Link>
                </>

                {user && (
                  <Button
                    className={["rounded-circle", Style.dropdown].join(" ")}
                    onClick={handleShow}
                  >
                    {user?.userImg && (
                      <div
                        className={["rounded-circle", Style.dropdownImg].join(
                          " "
                        )}
                      >
                        <img
                          src={user.userImg}
                          alt=""
                          className="w-100 rounded-circle"
                        />
                      </div>
                    )}
                    {!user?.userImg && (
                      <strong
                        style={{
                          fontSize: "21px",
                          fontWeight: "bold",
                        }}
                        className={[Style.dropdownText].join(" ")}
                      >
                        {user.userName[0]}
                      </strong>
                    )}
                  </Button>
                )}

                {user && (
                  <Offcanvas placement="end" show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>
                        <h4>{user.userName}</h4>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {admin.isAdmin && (
                        <>
                          <Tab.Container
                            id="list-group-tabs-example"
                            defaultActiveKey="#link1"
                          >
                            <Row>
                              <Col>
                                <ListGroup>
                                  <ListGroup.Item
                                    as={NavLink}
                                    action
                                    to="/products"
                                  >
                                    Products
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    as={NavLink}
                                    action
                                    to="/product/curd"
                                  >
                                    Create Product
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    as={NavLink}
                                    action
                                    to="/categories"
                                  >
                                    Categories
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    as={NavLink}
                                    action
                                    to="/history"
                                  >
                                    History
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    onClick={() => {
                                      localStorage.clear();
                                      setUser(null);
                                      setAdmin({
                                        role: "user",
                                        isAdmin: false,
                                      });
                                      handleClose();
                                    }}
                                    as={NavLink}
                                    action
                                    to="/signin"
                                  >
                                    Logout
                                  </ListGroup.Item>
                                </ListGroup>
                              </Col>
                            </Row>
                          </Tab.Container>
                        </>
                      )}
                      {!admin.isAdmin && (
                        <>
                          <Tab.Container
                            id="list-group-tabs-example"
                            defaultActiveKey="#link1"
                          >
                            <Row>
                              <Col>
                                <ListGroup>
                                  <ListGroup.Item
                                    as={NavLink}
                                    action
                                    to="/products"
                                  >
                                    Products
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    onClick={() => {
                                      localStorage.clear();
                                      setUser(null);
                                      setAdmin({
                                        role: "user",
                                        isAdmin: false,
                                      });
                                      handleClose();
                                    }}
                                    as={NavLink}
                                    action
                                    to="/signin"
                                  >
                                    Logout
                                  </ListGroup.Item>
                                </ListGroup>
                              </Col>
                            </Row>
                          </Tab.Container>
                        </>
                      )}
                    </Offcanvas.Body>
                  </Offcanvas>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
