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

// edit category api
router.put(
  "/category/edit/:id",
  validateRequest(categorySchemas.editCategorySchema),
  isAuthorized(categoryEndpoints.editCategoryEndpoint),
  categoryFunctions.editCategory
);

// delete category api
router.delete(
  "/category/delete/:id",
  validateRequest(categorySchemas.deleteCategorySchema),
  isAuthorized(categoryEndpoints.deleteCategoryEndpoint),
  categoryFunctions.deleteCategory
);

// get categories api
router.get("/category/all", categoryFunctions.getCategories);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
