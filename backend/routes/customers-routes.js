const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const customersController = require("../controllers/customers-controller");

router.get("/", customersController.getCustomers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  customersController.signupCustomer
);

router.post("/login", customersController.loginCustomer);
router.delete("/:cid", customersController.deleteCustomer);

module.exports = router;
