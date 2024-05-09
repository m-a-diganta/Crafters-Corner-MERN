const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Seller = require("../models/seller");
const jwt = require("jsonwebtoken");

const getSellers = async (req, res, next) => {
  let sellers;
  try {
    sellers = await Seller.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching sellers failed", 500);
    return next(error);
  }
  res.json({
    sellers: (await sellers).map((seller) =>
      seller.toObject({ getters: true })
    ),
  });
};

const signupSeller = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { name, email, password } = req.body;
  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing Up failed", 500);
    return next(error);
  }

  if (existingSeller) {
    const error = new HttpError("Seller already exists", 422);
    return next(error);
  }

  const createdSeller = new Seller({
    name,
    email,
    image:
      "https://i.pinimg.com/564x/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.jpg",
    password,
    productList: [],
    courseList: [],
  });

  try {
    await createdSeller.save();
  } catch (err) {
    const error = new HttpError("Sign Up Failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdSeller.id,
        username: createdSeller.name,
        role: "seller",
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, Please Try Again.", 500);
    return next(error);
  }

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(201)
    .json({
      sellerId: createdSeller.id,
      name: createdSeller.name,
      email: createdSeller.email,
    });
};

const loginSeller = async (req, res, next) => {
  const { email, password } = req.body;
  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed", 500);
    return next(error);
  }

  if (!existingSeller || existingSeller.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingSeller.id,
        username: existingSeller.name,
        role: "seller",
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, Please Try Again.", 500);
    return next(error);
  }

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(201)
    .json({
      sellerId: existingSeller.id,
      name: existingSeller.name,
      email: existingSeller.email,
    });
};

// const deleteSeller = async (req, res, next) => {
//     const sellerId = req.params.pid;
//     console.log(sellerId);
//     let seller;
//     try {
//       seller = await Seller.findById(sellerId).populate('productList courseList');
//     } catch (err) {
//       console.error('Error finding seller:', err);
//       const error = new HttpError('Something went wrong, could not delete seller.', 500);
//       return next(error);
//     }

//     if (!seller) {
//       console.log('Could not find seller with ID:', sellerId);
//       const error = new HttpError('Could not find seller for this id.', 404);
//       return next(error);
//     }

//     try {
//       // Remove seller products
//       for (const product of seller.productList) {
//         await Product.findByIdAndRemove(product._id);
//       }

//       // Remove seller courses
//       for (const course of seller.courseList) {
//         await Course.findByIdAndRemove(course._id);
//       }

//       // Remove seller
//       await Seller.findByIdAndDelete(sellerId);
//     } catch (err) {
//       const error = new HttpError('Something went wrong, could not delete seller.', 500);
//       return next(error);
//     }

//     res.status(200).json({ message: 'Deleted seller.' });
//   };

const deleteSeller = async (req, res, next) => {
  const sellerId = req.params.sid;
  console.log(sellerId);
  let seller;
  try {
    seller = await Seller.findById(sellerId);
  } catch (err) {
    console.error("Error finding seller:", err);
    const error = new HttpError(
      "Something went wrong, could not delete seller.",
      500
    );
    return next(error);
  }

  if (!seller) {
    console.log("Could not find seller with ID:", sellerId);
    const error = new HttpError("Could not find seller for this id.", 404);
    return next(error);
  }

  try {
    // Remove seller
    await Seller.findByIdAndDelete(sellerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete seller.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted seller." });
};

exports.getSellers = getSellers;
exports.signupSeller = signupSeller;
exports.loginSeller = loginSeller;
exports.deleteSeller = deleteSeller;
