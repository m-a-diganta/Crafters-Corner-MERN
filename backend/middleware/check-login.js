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

const logout = (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

module.exports.checkLogin = checkLogin;
module.exports.logout = logout;
