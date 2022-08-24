// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const categories = require("../model/category-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > Category Methods < ====== --- ====== //

/*
//==// addCategory: is the logic of '/category/add' api that used to create new category with (name) field.
the response of this function in success (Adding Category Success), in failure (show error message).
*/

const addCategory = async (req, res) => {
  try {
    let { name } = req.body;

    const oldCategory = await categories.findOne({ name, isDeleted: false });
    if (!oldCategory) {
      const newCategory = new categories({ name });
      const data = await newCategory.save();

      res.status(StatusCodes.CREATED).json({
        Message: "Adding Category Success",
        payload: { category: newCategory },
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "Category is Already Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  addCategory,
};
