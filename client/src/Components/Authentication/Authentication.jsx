// ======= --- ======= <| React |> ======= --- ======= //
import React, { useEffect, useState } from "react";

// ======= --- ======= <| React-Bootstrap |> ======= --- ======= //
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { useLocation, useNavigate } from "react-router-dom";

// ======= --- ======= <| Component-Style |> ======= --- ======= //
import Style from "./Authentication.module.scss";

// ======= --- ======= <| Images |> ======= --- ======= //
import logo from "../../Images/logo-cmp2.jpg";

// ======= --- ======= <| Fontawesome |> ======= --- ======= //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faG } from "@fortawesome/free-solid-svg-icons";

// ======= --- ======= <| Google-Login |> ======= --- ======= //
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

// ======= --- ======= <| Action-Strings |> ======= --- ======= //
import {
  errorResetAction,
  googleAuthAction,
  signInAction,
  signUpAction,
  unexpectedErrorAction,
  ERROR_SIGNIN,
  ERROR_SIGNUP,
} from "../../Redux/Actions/UserActions";

// ======= --- ======= <| React-Redux |> ======= --- ======= //
import { useDispatch, useSelector } from "react-redux";

function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ======= --- ======= <| Initialization of gapi |> ======= --- ======= //
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "633147263244-hvd72t9m2kl63rsglmsdfdu68rg2l7e3.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  // ======= --- ======= <| Component states |> ======= --- ======= //
  let error = useSelector((state) => state.error);
  let [isSignIn, setIsSignIn] = useState(true);
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let [waiting, setWaiting] = useState(false);
  let [passwordShown, setPasswordShown] = useState(false);

  // ======= --- ======= <| Component functions |> ======= --- ======= //
  const SigninOrRegister = () => {
    if (location.pathname === "/signin") setIsSignIn(true);
    else setIsSignIn(false);
  };

  useEffect(() => {
    SigninOrRegister();
  }, [location]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const getUser = ({ target }) => {
    setUser((prevUser) => {
      return { ...prevUser, [target.name]: target.value };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    setWaiting(true);
    /*

    if (isSignIn) {
      // ======= --- ======= <| Sign-in case |> ======= --- ======= //
      let result =
        user.email !== "" &&
        !/^\s/.test(user.emai) &&
        user.password !== "" &&
        !/^\s/.test(user.password);
      if (result) {
        const res = await dispatch(
          signInAction({
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: `${user.first_name} ${user.last_name}`,
          })
        );
        if (res?.data?.message === "Sign in Successfully") {
          await dispatch(errorResetAction());
          navigate("/posts", { replace: true });
        } else {
          await dispatch(unexpectedErrorAction(ERROR_SIGNIN));
        }
      } else {
        await dispatch(unexpectedErrorAction(ERROR_SIGNIN));
      }
      setWaiting(false);
    } else {
      // ======= --- ======= <| Register case |> ======= --- ======= //
      let result = Object.values(user).every((p) => {
        return p !== "" && !/^\s/.test(p);
      });

      if (result) {
        const res = await dispatch(
          signUpAction({
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: `${user.first_name} ${user.last_name}`,
          })
        );
        if (res?.data?.message === "Sign up Successfully") {
          await dispatch(errorResetAction());
          setWaiting(false);
          navigate("/posts", { replace: true });
        } else {
          setWaiting(false);
          await dispatch(unexpectedErrorAction(ERROR_SIGNUP));
        }
      } else {
        await dispatch(unexpectedErrorAction(ERROR_SIGNUP));
      }
      setWaiting(false);
    }
*/
  };
  // ======= --- ======= <| Continue with Google |> ======= --- ======= //
  const responseGoogleSuccess = async (res) => {
    console.log("Google Sign Up success");
    const profile = res?.profileObj;
    const token = res?.tokenId;

    await dispatch(googleAuthAction(profile, token));
    navigate("/", { replace: true });
  };

  const responseGoogleFailure = async (error) => {
    console.log("Google Sign up failure");
    console.log(error);
  };

  return (
    <>
      <div className="pt-5">
        <div className={["text-center mt-5 mb-4 w-25 m-auto "].join(" ")}>
          <img src={logo} alt="" className={[Style.logo].join(" ")} />
        </div>
        <div
          className={[
            " d-flex justify-content-center align-items-center row",
          ].join(" ")}
        >
          <Form
            className={["col-md-6 col-10 p-3", Style.formCan].join(" ")}
            onSubmit={sendData}
          >
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Control
                  name="first_name"
                  type="text"
                  className={Style.formControl}
                  required={true}
                  placeholder="First name"
                  onChange={getUser}
                />
              </Form.Group>
            )}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicLirstName">
                <Form.Control
                  name="last_name"
                  type="text"
                  className={Style.formControl}
                  required={true}
                  placeholder="Last name"
                  onChange={getUser}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                className={Style.formControl}
                required={true}
                placeholder="Enter email"
                onChange={getUser}
              />
            </Form.Group>
            <Form.Group
              className={["mb-3", Style.password].join(" ")}
              controlId="formBasicPassword"
            >
              <Form.Control
                name="password"
                placeholder="Password"
                className={Style.formControl}
                required={true}
                onChange={getUser}
                type={passwordShown ? "text" : "password"}
              />

              <FontAwesomeIcon
                className={[Style.icon, Style.posswordIcon].join(" ")}
                size="lg"
                icon={passwordShown ? faEye : faEyeSlash}
                onClick={togglePassword}
              />
            </Form.Group>
            {!isSignIn && (
              <Form.Group
                className={["mb-3", Style.confirmPasswrod].join(" ")}
                controlId="formBasicConfirmPassword"
              >
                <Form.Control
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={Style.formControl}
                  required={true}
                  onChange={getUser}
                  type={passwordShown ? "text" : "password"}
                />

                <FontAwesomeIcon
                  className={[Style.icon, Style.confirmPasswrodIcon].join(" ")}
                  size="lg"
                  icon={passwordShown ? faEye : faEyeSlash}
                  onClick={togglePassword}
                />
              </Form.Group>
            )}
            {error.value && error.type === "auth" && (
              <Alert variant="danger">
                <Alert.Heading>{error.message}</Alert.Heading>
              </Alert>
            )}
            <Button
              className={["w-100 mb-3"].join(" ")}
              variant="warning"
              type="submit"
            >
              {waiting && "Waiting ... "}
              {!waiting && !isSignIn && "Signup"}
              {!waiting && isSignIn && "Signin"}
            </Button>

            <GoogleLogin
              clientId="633147263244-hvd72t9m2kl63rsglmsdfdu68rg2l7e3.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className="w-100 mb-3"
                  variant="success"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FontAwesomeIcon size="lg" icon={faG} />
                  <span> Google</span>
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />

            {isSignIn && (
              <Alert variant="warning" className="mb-0">
                <>
                  <span>New to CMP ?</span>{" "}
                  <span
                    className={Style.sign}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Create your CMP account
                  </span>
                </>
              </Alert>
            )}
            {!isSignIn && (
              <Alert variant="warning" className="mb-0">
                <>
                  <span>Already have an account ?</span>{" "}
                  <span
                    className={Style.sign}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </span>
                </>
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Authentication;
