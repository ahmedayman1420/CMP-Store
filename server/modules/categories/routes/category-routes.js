// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const categoryFunctions = require("../controller/category-controller");
const categorySchemas = require("../joi/category-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const categoryEndpoints = require("../category-endpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");

// ====== --- ====== > Category Routes < ====== --- ====== //

// add category api
router.post(
  "/category/add",
  validateRequest(categorySchemas.addCategorySchema),
  isAuthorized(categoryEndpoints.addCategoryEndpoint),
  categoryFunctions.addCategory
);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
