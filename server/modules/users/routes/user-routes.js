// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const userFunctions = require("../conroller/user-control");
const userSchemas = require("../joi/user-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const userEndpoints = require("../endpoints");
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
  "/signup",
  validateRequest(userSchemas.signupSchema),
  userFunctions.signUp
);

// signin api
router.post(
  "/signin",
  validateRequest(userSchemas.signinSchema),
  userFunctions.signIn
);

// update api
router.post(
  "/user-update-password",
  validateRequest(userSchemas.updatePasswordSchema),
  isAuthorized(userEndpoints.updateUserPassword),
  userFunctions.updatePassword
);
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
