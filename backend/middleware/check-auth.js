const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const checkAuth = (userRole) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        const error = new HttpError("Authetication Failed", 401);
        return next(error);
      }
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);

      if (userRole !== decodedToken.role && userRole !== "any") {
        const error = new HttpError("Authorization Failed", 401);
        return next(error);
      }

      req.userData = {
        userId: decodedToken.userId,
        role: decodedToken.role,
      };

      next();
    } catch (err) {
      const error = new HttpError(
        "Authetication Failed. Something went wrong.",
        401
      );
      return next(error);
    }
  };
};

module.exports = checkAuth;
