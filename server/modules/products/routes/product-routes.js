// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const productFunctions = require("../controller/product-controller");
const productSchemas = require("../joi/product-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const productEndpoints = require("../product-endpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");

// ====== --- ====== > Product Routes < ====== --- ====== //

// create product api
router.post(
  "/product/create",
  validateRequest(productSchemas.createProductSchema),
  isAuthorized(productEndpoints.createProductEndpoint),
  productFunctions.createProduct
);

// edit product api
router.put(
  "/product/edit/:id",
  validateRequest(productSchemas.editProductSchema),
  isAuthorized(productEndpoints.editProductEndpoint),
  productFunctions.editProduct
);

// delete product api
router.delete(
  "/product/delete/:id",
  validateRequest(productSchemas.deleteProductSchema),
  isAuthorized(productEndpoints.deleteProductEndpoint),
  productFunctions.deleteProduct
);

// get products api
router.get(
    "/product/all",
    productFunctions.getProducts
  );
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
