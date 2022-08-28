// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > product schema < ====== --- ====== //

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },

    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    brand: { type: String, required: true },

    images: { type: Array, required: true },
    sold: { type: Number, default: 0 },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    }, // Relate this with categories collection
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    }, // Relate this with users collection
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
