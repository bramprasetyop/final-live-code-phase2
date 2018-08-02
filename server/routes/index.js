var express = require('express');
var router = express.Router();

const {
  loginUser,
  getUser
} = require("../controllers/userController");



/* GET home page. */
router
  .post('/login', loginUser)
  .get('/members', getUser)

module.exports = router;