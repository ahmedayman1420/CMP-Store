// ====== --- ====== > Modules endpoints < ====== --- ====== //
const Rbac = require("easy-rbac");
const categoryEndpoints = require("../../modules/categories/category-endpoints");
const productEndpoints = require("../../modules/products/product-endpoints");
const roles = require("../Enum/roles");

// ====== --- ====== > Roles policies < ====== --- ====== //
const userPolicies = [];

const adminPolicies = [
  categoryEndpoints.addCategoryEndpoint,
  categoryEndpoints.editCategoryEndpoint,
  categoryEndpoints.deleteCategoryEndpoint,

  productEndpoints.createProductEndpoint,
  productEndpoints.editProductEndpoint,
  productEndpoints.deleteProductEndpoint,
];
const superAdminPolicies = [];

// ====== --- ====== > Match Between Roles & Them EndPoints < ====== --- ====== //
const opts = {
  [roles.USER]: {
    can: userPolicies,
  },
  [roles.ADMIN]: {
    can: adminPolicies,
    inherits: [roles.USER],
  },
  [roles.SUPER_ADMIN]: {
    can: superAdminPolicies,
    inherits: [roles.ADMIN, roles.USER],
  },
};

// ====== --- ====== > Create rbac of user module < ====== --- ====== //
userRbac = Rbac.create(opts);

// ====== --- ====== > Exports userRabac < ====== --- ====== //
module.exports = userRbac;
