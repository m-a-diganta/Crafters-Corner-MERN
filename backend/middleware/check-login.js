const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const checkLogin = (req, res, next) => {
  const nonVerifiedData = {
    verified: false,
    username: null,
    userId: null,
    role: null,
  };

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(nonVerifiedData);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const verifiedData = {
      verified: true,
      username: decodedToken.username,
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

    res.json(verifiedData);
  } catch (err) {
    res.json(nonVerifiedData);
  }
};

module.exports = checkLogin;
