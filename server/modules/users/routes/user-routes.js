// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/user-control");
const userSchemas = require("../joi/user-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const userEndpoints = require("../user-endpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");
/*
//==// require express to create sub-object that will used to contains user apis
//==// userFunctions: it's an object that contains all user apis logic
//==// userSchemas: it's an object that contains all user apis schemas
//==// validateRequest: it's a function that used validate schema with sent request
*/

// ====== --- ====== > User Routes < ====== --- ====== //

// hello cmp api
router.get("/", (req, res) => {
  res.send("Hello, CMP!");
});

// signup api
router.post(
  "/user/signup",
  validateRequest(userSchemas.signupSchema),
  userFunctions.signUp
);

// signin api
router.post(
  "/user/signin",
  validateRequest(userSchemas.signinSchema),
  userFunctions.signIn
);

// google api
router.post(
  "/google",
  validateRequest(userSchemas.googleSigninSchema),
  userFunctions.googleSignIn
);

// refresh token api
router.post(
  "/token",
  validateRequest(userSchemas.refreshTokenSchema),
  isAuthorized(userEndpoints.REFRESH_TOKEN),
  userFunctions.refreshToken
);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
