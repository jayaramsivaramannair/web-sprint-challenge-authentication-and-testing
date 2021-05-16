const { JWT_SECRET } = require("../secrets.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = async (req, res, next) => {

  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  try {
    const token = req.headers.authorization

    //Checks if the token is provided or not
    if (!token) {
      return res.status(401).json({
        message: "token required",
      })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "token invalid",
        })
      }

      req.token = decoded //This token will be accessible by middlewares downstream
      next();
    })

  } catch (err) {
    next(err)
  }
};
