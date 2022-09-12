// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > user schema < ====== --- ====== //
/*
//==// userSchema: it contains fields of user collection with some restrictions like
(required, max, min) and some options like (default value, enum).
user fields is [name, email, password, age, role, isDeleted].
*/
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },

    mobile: { type: Number, required: true },

    password: { type: String, required: true },

    cart: { type: Array, default: [] },

    role: { type: String, default: "user" },

    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > User Hooks < ====== --- ====== //
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 7);
});

// ====== --- ====== > user model < ====== --- ====== //
const users = mongoose.model("users", userSchema); // create user collection with given (name, schema).

// ====== --- ====== > export user model < ====== --- ====== //
module.exports = users;
