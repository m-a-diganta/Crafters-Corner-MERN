const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");

const getCustomers = async (req, res, next) => {
  let customers;
  try {
    customers = await Customer.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching customers failed", 500);
    return next(error);
  }
  res.json({
    customers: (await customers).map((customer) =>
      customer.toObject({ getters: true })
    ),
  });
};

const signupCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { name, email, password } = req.body;
  let existingCustomer;
  try {
    existingCustomer = await Customer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing Up failed", 500);
    return next(error);
  }

  if (existingCustomer) {
    const error = new HttpError("Customer already exists", 422);
    return next(error);
  }

  const createdCustomer = new Customer({
    name,
    email,
    image:
      "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=360",
    password,
    cart: [],
    orderList: [],
  });

  try {
    await createdCustomer.save();
  } catch (err) {
    const error = new HttpError("Sign Up Failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdCustomer.id,
        username: createdCustomer.name,
        userImage: createdCustomer.image,
        role: "customer",
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
      sellerId: createdCustomer.id,
      name: createdCustomer.name,
      email: createdCustomer.email,
    });
};

const loginCustomer = async (req, res, next) => {
  const { email, password } = req.body;
  let existingCustomer;
  try {
    existingCustomer = await Customer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed", 500);
    return next(error);
  }

  if (!existingCustomer || existingCustomer.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingCustomer.id,
        username: existingCustomer.name,
        userImage: existingCustomer.image,
        role: "customer",
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
      sellerId: existingCustomer.id,
      name: existingCustomer.name,
      email: existingCustomer.email,
    });
};

const deleteCustomer = async (req, res, next) => {
  const customerId = req.params.cid; // Assuming you're passing the customer ID as 'cid'
  console.log(customerId);
  let customer;
  try {
    customer = await Customer.findById(customerId); // Replace 'Customer' with your actual Customer model
  } catch (err) {
    console.error("Error finding customer:", err);
    const error = new HttpError(
      "Something went wrong, could not delete customer.",
      500
    );
    return next(error);
  }

  if (!customer) {
    console.log("Could not find customer with ID:", customerId);
    const error = new HttpError("Could not find customer for this id.", 404);
    return next(error);
  }

  try {
    // Remove Customer
    await Customer.findByIdAndDelete(customerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete customer.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted customer." });
};

exports.getCustomers = getCustomers;
exports.signupCustomer = signupCustomer;
exports.loginCustomer = loginCustomer;
exports.deleteCustomer = deleteCustomer;
