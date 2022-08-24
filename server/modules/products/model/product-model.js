// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > product schema < ====== --- ====== //

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String, required: true },

    content: { type: String, required: true },

    images: { type: Array, required: true },

    ckecked: { type: Boolean, default: false },

    sold: { type: Number, default: 0 },

    category: { type: String, required: true }, // Relate this with categories collection

    creator: { type: String, required: true }, // Relate this with users collection

    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > product model < ====== --- ====== //
const products = mongoose.model("products", productSchema); // create product collection with given (name, schema).

// ====== --- ====== > export user model < ====== --- ====== //
module.exports = products;
