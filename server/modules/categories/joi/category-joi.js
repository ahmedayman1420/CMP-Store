/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> Category Joi Validations <==> /// ================ */

const categoryJoi = {
  addCategorySchema: {
    body: joi.object().required().keys({
      name: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  editCategorySchema: {
    body: joi.object().required().keys({
      name: joi.string().required(),
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

  deleteCategorySchema: {
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

};

/* ============= /// <==> Exports }ategory Joi Validations <==> /// ============= */
module.exports = categoryJoi;
