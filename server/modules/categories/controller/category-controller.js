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
        message: "Adding Category Success",
        payload: { category: newCategory },
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Category is Already Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// editCategory: is the logic of '/category/edit/:id' api that used to edit category with given (id) field.
the response of this function in success (Editing Category Success), in failure (show error message).
*/

const editCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let { id } = req.params;

    const isCategoryFound = await categories.findOne({
      _id: id,
      isDeleted: false,
    });
    if (isCategoryFound) {
      const oldCategory = await categories.findOne({ name, isDeleted: false });
      if (!oldCategory || oldCategory.id == isCategoryFound.id) {
        const data = await categories.findByIdAndUpdate(
          id,
          { name },
          {
            new: true,
          }
        );

        res.status(StatusCodes.OK).json({
          message: "Editing Category Success",
          payload: { category: data },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Category is Already Found" });
      }
    } else res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// deleteCategory: is the logic of '/category/delete/:id' api that used to delete category with given (id) field.
the response of this function in success (Deleting Category Success), in failure (show error message).
*/

const deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;

    const isCategoryFound = await categories.findOne({
      _id: id,
      isDeleted: false,
    });

    if (isCategoryFound) {
      const data = await categories.findByIdAndDelete(id);

      res.status(StatusCodes.OK).json({
        message: "Deleting Category Success",
        payload: { category: data },
      });
    } else res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// getCategories: is the logic of '/category/all' api that used to get categories.
the response of this function in success (Categories), in failure (show error message).
*/

const getCategories = async (req, res) => {
  try {
    const data = await categories.find({});

    res.status(StatusCodes.OK).json({
      message: "Get Categories Success",
      payload: { categories: data },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
};
