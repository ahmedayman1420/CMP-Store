// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const products = require("../model/product-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > Product Methods < ====== --- ====== //

/*
//==// createProduct: is the logic of '/product/create' api that used to create new product with (title, price, description, content, images, category, creator) fields.
the response of this function in success (Creating product success), in failure (show error message).
*/
const createProduct = async (req, res) => {
  try {
    let { title, price, description, content, images, category, creator } =
      req.body;

    const oldProduct = await products.findOne({ title, isDeleted: false });
    if (!oldProduct) {
      const newProduct = new products({
        title,
        price,
        description,
        content,
        images,
        category,
        creator,
      });

      const data = await newProduct.save();

      res.status(StatusCodes.CREATED).json({
        Message: "Creating product success",
        payload: { product: newProduct },
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "Product is Already Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// editProduct: is the logic of '/product/edit/:id' api that used to edit product.
the response of this function in success (Editing product success), in failure (show error message).
*/
const editProduct = async (req, res) => {
  try {
    let { title, price, description, content, images, category, creator } =
      req.body;
    let { id } = req.params;

    const oldProduct = await products.findOne({ _id: id, isDeleted: false });
    if (oldProduct) {
      const isProductFound = await products.findOne({
        title,
        isDeleted: false,
      });

      if (!isProductFound) {
        const data = await products.findByIdAndUpdate(
          id,
          {
            title,
            price,
            description,
            content,
            images,
            category,
            creator,
          },
          {
            new: true,
          }
        );

        res.status(StatusCodes.OK).json({
          Message: "Editing product success",
          payload: { product: data },
        });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ Message: "Product is already found" });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ Message: "Invalid Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// deleteProduct: is the logic of '/product/delete/:id' api that used to edit product.
the response of this function in success (Deleting product success), in failure (show error message).
*/
const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;

    const oldProduct = await products.findOne({ _id: id, isDeleted: false });
    if (oldProduct) {
      const data = await products.findByIdAndDelete(id);

      res.status(StatusCodes.OK).json({
        Message: "Deleting product success",
        payload: { product: data },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ Message: "Invalid Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// getProducts: is the logic of '/product/all' api that used to get all products.
the response of this function in success (products), in failure (show error message).
*/
const getProducts = async (req, res) => {
  try {
    const data = await products.find({});
    res.status(StatusCodes.OK).json({
      Message: "Deleting product success",
      payload: { product: data },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProducts,
};
