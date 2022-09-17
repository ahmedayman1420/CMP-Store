/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> Product Joi Validations <==> /// ================ */

const productJoi = {
  createProductSchema: {
    body: joi
      .object()
      .required()
      .keys({
        title: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),

        discountPercentage: joi.number().required(),
        stock: joi.number().required(),
        brand: joi.string().required(),

        files: joi.array().items(joi.string()).required(),
        category: joi.string().required(),
      }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  editProductSchema: {
    body: joi
      .object()
      .required()
      .keys({
        title: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),

        discountPercentage: joi.number().required(),
        stock: joi.number().required(),
        brand: joi.string().required(),

        images: joi.array().items(joi.string()).required(),
        category: joi.string().required(),
        creator: joi.string().required(),
      }),
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  deleteProductSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  getProductsSchema: {
    query: joi.object().required().keys({
      page: joi.number().required(),
      filter: joi.string().required(),
      sort: joi.number().required(),
    }),
  },

  getProductSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
  },
};

/* ============= /// <==> Exports User Joi Validations <==> /// ============= */
module.exports = productJoi;
