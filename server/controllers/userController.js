const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");




function loginUser(req, res) {

  let pass = req.body.password;


  User.findOne({
      username: req.body.username
    })
    .then(user => {
      if (user) {
        let compare = bcrypt.compareSync(pass, user.password);

        if (compare) {
          jwt.sign({
              username: user.username,
              id: user._id
            },
            process.env.SECRET_KEY,
            (err, token) => {
              // console.log(token);

              res.status(200).json({
                message: 'Logged In Successfully',
                token
              });
            }
          );
        }
      } else {
        let objUser = {
          username: req.body.username,
          password: req.body.password
        };

        User.create(objUser)
          .then(users => {
            jwt.sign({
                username: users.username,
                id: users._id
              },
              process.env.SECRET_KEY,
              (err, token) => {
                // console.log(token);

                res.status(200).json({
                  message: 'Logged In Successfully',
                  token
                });
              }
            );

          })
          .catch(error => {
            res.status(400).json({
              message: "Login failed",
              error
            });
          });
      }


    })
    .catch(error => {
      res.status(400).json({
        message: "Wrong username/password",
        error
      });
    });
}

function getUser(req, res) {
  var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
  User.find({
      _id: decoded.id
    })
    .then(users => {
      res.status(200).json({
        message: 'get current user',
        users
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

module.exports = {
  loginUser,
  getUser
};