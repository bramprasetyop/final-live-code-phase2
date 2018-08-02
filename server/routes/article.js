var express = require('express');
var router = express.Router();
var images = require('../helpers/images')



const {
  newArticle,
  getArticle,
  deleteArticle,
  getOneArticle,
  getOneArticleWithAuthor,
  editArticle
} = require("../controllers/articleController");

var {
  logincheck
} = require("../helpers/auth");

/* GET article listing. */


router.post('/', logincheck, images.multer.single("image"), images.sendUploadToGCS, newArticle)
  .get('/blogs', getArticle)
  .delete('/blogs/delete/:id', logincheck, deleteArticle)
  .get('/blogs/:id', getOneArticle)
  .get('/blogs/author', getOneArticleWithAuthor)
  .put('/blogs/:id', editArticle)
module.exports = router;