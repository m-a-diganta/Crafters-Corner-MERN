const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Seller = require("../models/seller");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError("Fetching products failed", 500);
    return next(error);
  }
  res.json({
    products: (await products).map((product) =>
      product.toObject({ getters: true })
    ),
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not find a product", 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Could not find a product for such product ID",
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

const getProductsBySellerId = async (req, res, next) => {
  const sellerId = req.params.sid;

  let products;
  try {
    products = Product.find({ seller: sellerId });
  } catch (err) {
    const error = new HttpError(
      "Could not find products for the given seller",
      500
    );
    return next(error);
  }

  if (!products || products.length === 0) {
    return next(new HttpError("No products found for the given seller", 404));
  }

  res.json({
    products: (await products).map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const getProductsByCategory = async (req, res, next) => {
  const category = req.params.category;

  let products;
  try {
    products = await Product.find({ category: category });
  } catch (err) {
    const error = new HttpError("Could not find products", 500);
    return next(error);
  }

  if (!products || products.length === 0) {
    return next(
      new HttpError("Could not find products for such category", 404)
    );
  }

  res.json({
    products: (await products).map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { title, description, price, category, stock } = req.body;

  const createdProduct = new Product({
    title,
    description,
    price,
    category,
    image: req.file.path,
    stock,
    rating: [],
    seller: req.userData.userId,
  });
  let user;
  try {
    user = await Seller.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating Product Failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldnt find user for the provided ID", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    user.productList.push(createdProduct);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Product Failed", 500);
    return next(err);
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const { title, description, price, category, image, stock } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not find a product", 500);
    return next(error);
  }

  if (title !== undefined) product.title = title;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (image !== undefined) product.image = image;
  if (stock !== undefined) product.stock = stock;

  console.log(product);

  try {
    await product.save();
  } catch (err) {
    if (err.name === "ValidationError") {
      // Handle validation errors
      const errors = Object.values(err.errors).map((error) => error.message);
      const error = new HttpError(
        `Product validation failed: ${errors.join(", ")}`,
        422
      );
      return next(error);
    } else {
      // Handle other errors
      console.error("Error updating product:", err);
      const error = new HttpError("Could not update a product", 500);
      return next(error);
    }
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not delete product", 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError("Could not find product for such id", 404);
    return next(error);
  }

  const sellerId = product.seller;
  const seller = await Seller.findById(sellerId);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.deleteOne({ session: sess });
    seller.productList.pull(product._id);
    await seller.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    if (err.name === "ValidationError") {
      // Handle validation errors
      const errors = Object.values(err.errors).map((error) => error.message);
      const error = new HttpError(
        `Product validation failed: ${errors.join(", ")}`,
        422
      );
      return next(error);
    } else {
      // Handle other errors
      //console.error('Error deleting product:', err);
      const error = new HttpError("Could not delete a product", 500);
      return next(error);
    }
  }

  res.status(200).json({ message: "Deleted Product" });
};

exports.getProducts = getProducts;
exports.getProductsBySellerId = getProductsBySellerId;
exports.getProductById = getProductById;
exports.getProductsByCategory = getProductsByCategory;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
