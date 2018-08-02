var jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = {
  logincheck: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, function (err, decoded) {
      // console.log('masuk',req.headers.token);
      if (decoded) {
        console.log('masuk', decoded);
        next()
      } else {
        res.status(403).json({
          message: 'token invalid'
        })
      }
    })
  }
}