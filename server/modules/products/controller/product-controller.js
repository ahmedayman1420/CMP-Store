// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const products = require("../model/product-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const users = require("../../users/model/user-model");

// ====== --- ====== > Product Methods < ====== --- ====== //

/*
//==// createProduct: is the logic of '/product/create' api that used to create new product with (title, price, description, content, images, category, creator) fields.
the response of this function in success (Creating product success), in failure (show error message).
*/
const createProduct = async (req, res) => {
  try {
    let {
      title,
      price,
      description,
      discountPercentage,
      stock,
      brand,
      category,
      files,
    } = req.body;

    const oldUser = await users.findOne({ email: req.decoded.email });
    if (oldUser) {
      const oldProduct = await products.findOne({ title, isDeleted: false });
      if (!oldProduct) {
        const newProduct = new products({
          title,
          price,
          description,

          discountPercentage,
          stock,
          brand,

          category,
          images: files,
          creator: oldUser._id,
        });

        const data = await newProduct.save();

        res.status(StatusCodes.CREATED).json({
          message: "Creating product success",
          payload: { product: newProduct },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Product is Already Found" });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
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
    let {
      title,
      price,
      description,
      discountPercentage,
      stock,
      brand,
      category,
      images,
      creator,
    } = req.body;

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
            discountPercentage,
            stock,
            brand,
            category,
            images,
            creator,
          },
          {
            new: true,
          }
        );

        res.status(StatusCodes.OK).json({
          message: "Editing product success",
          payload: { product: data },
        });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Product is already found" });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// deleteProduct: is the logic of '/product/delete/:id' api that used to delete product.
the response of this function in success (Deleting product success), in failure (show error message).
*/
const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;

    const oldProduct = await products.findOne({ _id: id, isDeleted: false });
    if (oldProduct) {
      const data = await products.findByIdAndDelete(id);

      res.status(StatusCodes.OK).json({
        message: "Deleting product success",
        payload: { product: data },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id" });
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
    let { page, filter, sort } = req.query;
    let sortOptions = [
      { sold: -1 },
      { price: 1 },
      { price: -1 },
      { _id: 1 },
      { _id: -1 },
    ];

    const limit = 1;

    let skip = (Number(page) - 1) * limit;

    if (filter != "null") {
      var data = await products
        .find({ isDeleted: false, category: filter })
        .populate("creator")
        .populate("category")
        .limit(limit)
        .skip(skip)
        .sort(sortOptions[Number(sort)]);
    } else {
      var data = await products
        .find({ isDeleted: false })
        .populate("creator")
        .populate("category")
        .limit(limit)
        .skip(skip)
        .sort(sortOptions[Number(sort)]);
    }

    res.status(StatusCodes.OK).json({
      message: "Getting products success",
      payload: { products: data },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// getProductById: is the logic of '/product/get/:id' api that used to get specific product.
the response of this function in success (Getting product success), in failure (show error message).
*/
const getProductById = async (req, res) => {
  try {
    let { id } = req.params;

    const oldProduct = await products.findOne({ _id: id, isDeleted: false });
    if (oldProduct) {
      res.status(StatusCodes.OK).json({
        message: "Getting product success",
        payload: { product: oldProduct },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id" });
    }
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
  getProductById,
};
