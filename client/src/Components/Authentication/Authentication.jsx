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

// ======= --- ======= <| Regex |> ======= --- ======= //
import { validEmail, validPassword, validName, validMobile } from "./Regex";

// ======= --- ======= <| Google-Login |> ======= --- ======= //
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

// ======= --- ======= <| Action-Strings |> ======= --- ======= //
import { Error_SIGNIN, ERROR_SIGNUP } from "../../Redux/Actions/ActionStrings";

// ======= --- ======= <| User-Actions |> ======= --- ======= //
import {
  googleAuthAction,
  signInAction,
  signUpAction,
} from "../../Redux/Actions/UserActions";

// ======= --- ======= <| Error-Actions |> ======= --- ======= //
import { unexpectedErrorAction } from "../../Redux/Actions/ErrorActions";

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
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let [validInput, setValidInput] = useState({
    name: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,

    startName: false,
    startMobile: false,
    startEmail: false,
    startPassword: false,
    startConfirmPassword: false,
  });
  let [waiting, setWaiting] = useState(false);
  let [passwordShown, setPasswordShown] = useState(false);
  let [result, setResult] = useState(false);
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

  const isValidInput = (index, value) => {
    if (index === 0) {
      setValidInput((prevState) => {
        return { ...prevState, name: validName.test(value) };
      });
    } else if (index === 1) {
      setValidInput((prevState) => {
        return { ...prevState, mobile: validMobile.test(value) };
      });
    } else if (index === 2) {
      setValidInput((prevState) => {
        return { ...prevState, email: validEmail.test(value) };
      });
    } else if (index === 3) {
      setValidInput((prevState) => {
        return { ...prevState, password: validPassword.test(value) };
      });
    } else if (index === 4) {
      setValidInput((prevState) => {
        return {
          ...prevState,
          confirmPassword: validPassword.test(value) && value === user.password,
        };
      });
    }

    if (isSignIn) setResult(validInput.email && validInput.password);
    else
      setResult(
        validInput.name &&
          validInput.mobile &&
          validInput.email &&
          validInput.password &&
          validInput.confirmPassword
      );
  };

  const signin = async () => {
    const result = validInput.email && validInput.password;

    if (result) {
      const res = await dispatch(
        signInAction({
          email: user.email,
          password: user.password,
        })
      );

      if (res) {
        navigate("/", { replace: true });
      }
    } else {
      await dispatch(
        unexpectedErrorAction(Error_SIGNIN, {
          type: "auth",
          value: true,
          message: Error_SIGNIN,
        })
      );
    }
  };

  const register = async () => {
    const result =
      validInput.name &&
      validInput.mobile &&
      validInput.email &&
      validInput.password &&
      validInput.confirmPassword;

    if (result) {
      const res = await dispatch(
        signUpAction({
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          name: user.name,
          mobile: user.mobile,
        })
      );

      if (res) {
        navigate("/", { replace: true });
      }
    } else {
      await dispatch(
        unexpectedErrorAction(ERROR_SIGNUP, {
          type: "auth",
          value: true,
          message: ERROR_SIGNUP,
        })
      );
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    setWaiting(true);

    if (isSignIn) await signin();
    else await register();

    setWaiting(false);
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
      <div className="pt-5 ">
        <div className={["text-center mt-5 mb-4 w-25 m-auto "].join(" ")}>
          <img src={logo} alt="" className={[Style.logo].join(" ")} />
        </div>
        <div
          className={[
            " d-flex justify-content-center align-items-center row w-100 ",
          ].join(" ")}
        >
          <Form
            className={["col-md-6 col-sm-10 p-3 mb-5", Style.formCan].join(" ")}
            onSubmit={sendData}
          >
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Control
                  name="name"
                  type="text"
                  className={Style.formControl}
                  required={true}
                  placeholder="First and last name"
                  onChange={(e) => {
                    getUser(e);
                    isValidInput(0, e.target.value);
                    setValidInput((prevState) => {
                      return {
                        ...prevState,
                        startName: true,
                      };
                    });
                  }}
                />
                {!validInput.name && validInput.startName && (
                  <Alert variant="primary" className="mt-3">
                    Your name must start with a uppercase letter
                  </Alert>
                )}
              </Form.Group>
            )}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicLirstName">
                <Form.Control
                  name="mobile"
                  type="text"
                  className={Style.formControl}
                  required={true}
                  placeholder="Mobile number"
                  onChange={(e) => {
                    getUser(e);
                    isValidInput(1, e.target.value);
                    setValidInput((prevState) => {
                      return {
                        ...prevState,
                        startMobile: true,
                      };
                    });
                  }}
                />
                {!validInput.mobile && validInput.startMobile && (
                  <Alert variant="primary" className="mt-3">
                    Invalid mobile number
                  </Alert>
                )}
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                className={Style.formControl}
                required={true}
                placeholder="Enter email"
                onChange={(e) => {
                  getUser(e);
                  isValidInput(2, e.target.value);
                  setValidInput((prevState) => {
                    return {
                      ...prevState,
                      startEmail: true,
                    };
                  });
                }}
              />
              {!validInput.email && validInput.startEmail && (
                <Alert variant="primary" className="mt-3">
                  Please include a valid domain in the email address.
                </Alert>
              )}
            </Form.Group>
            <Form.Group
              className={["mb-3"].join(" ")}
              controlId="formBasicPassword"
            >
              <div className={[Style.password].join(" ")}>
                <Form.Control
                  name="password"
                  placeholder="Password"
                  className={[Style.formControl].join(" ")}
                  required={true}
                  onChange={(e) => {
                    getUser(e);
                    isValidInput(3, e.target.value);
                    setValidInput((prevState) => {
                      return {
                        ...prevState,
                        startPassword: true,
                      };
                    });
                  }}
                  type={passwordShown ? "text" : "password"}
                />
                <FontAwesomeIcon
                  className={[Style.icon, Style.posswordIcon].join(" ")}
                  size="lg"
                  icon={passwordShown ? faEye : faEyeSlash}
                  onClick={togglePassword}
                />
              </div>

              {!validInput.password && validInput.startPassword && (
                <Alert variant="primary" className="mt-3">
                  {!isSignIn && (
                    <div>
                      <p>Your password must:</p>
                      <ul>
                        <li>Contain at least 8 characters</li>
                        <li>
                          At least one uppercase letter, one lowercase letter,
                          one number and one special character
                        </li>
                      </ul>
                    </div>
                  )}
                  {isSignIn && (
                    <p
                      style={{
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      Enter a valid password
                    </p>
                  )}
                </Alert>
              )}
            </Form.Group>
            {!isSignIn && (
              <Form.Group
                className={["mb-3"].join(" ")}
                controlId="formBasicConfirmPassword"
              >
                <div className={[Style.confirmPasswrod].join(" ")}>
                  <Form.Control
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={Style.formControl}
                    required={true}
                    onChange={(e) => {
                      getUser(e);
                      isValidInput(4, e.target.value);
                      setValidInput((prevState) => {
                        return {
                          ...prevState,
                          startConfirmPassword: true,
                        };
                      });
                    }}
                    type={passwordShown ? "text" : "password"}
                  />
                  <FontAwesomeIcon
                    className={[Style.icon, Style.confirmPasswrodIcon].join(
                      " "
                    )}
                    size="lg"
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={togglePassword}
                  />
                </div>
                {!validInput.confirmPassword &&
                  validInput.startConfirmPassword && (
                    <Alert variant="primary" className="mt-3">
                      Password confirmation does not match password
                    </Alert>
                  )}
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
              disabled={
                (!(isSignIn && validInput.email && validInput.password) &&
                  !(
                    !isSignIn &&
                    validInput.name &&
                    validInput.mobile &&
                    validInput.email &&
                    validInput.password &&
                    validInput.confirmPassword
                  )) ||
                waiting
              }
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
