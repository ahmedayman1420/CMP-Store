// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > category schema < ====== --- ====== //
const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > category model < ====== --- ====== //
const categories = mongoose.model("categories", categorySchema); // create category collection with given (name, schema).

// ====== --- ====== > export category model < ====== --- ====== //
module.exports = categories;
