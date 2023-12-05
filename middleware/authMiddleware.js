const response = require("../helpers/response");
const jwt = require("jsonwebtoken");

// check user auth
const authMiddleware = async (req, res, next) => {
  const token = await req.cookies?.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        response(res, 401, "you are not logged in", null, true);
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    response(res, 401, "you are not logged in", null, true);
  }
};

module.exports = authMiddleware;
