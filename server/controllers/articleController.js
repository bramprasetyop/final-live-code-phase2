const Article = require("../model/articleModel");
var jwt = require("jsonwebtoken");
// ========================== create data ==============================
function newArticle(req, res) {

  var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
  console.log(decoded);

  let addArticle = {
    image: req.file.cloudStoragePublicUrl,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: decoded.id
  }
  Article.create(addArticle)
    .then(Articles => {
      res.status(200).json({
        message: 'new Article added',
        Articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

// ========================== create data ==============================



// ========================== get all data ==============================

function getArticle(req, res) {
  Article.find()
    .then(Articles => {
      res.status(200).json({
        message: 'get Article',
        Articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

// ========================== get all data ==============================

// ========================== delete data ==============================

function deleteArticle(req, res) {
  Article.findById({
      _id: req.params.id
    })
    .then(Articles => {
      res.status(200).json({
        message: 'delete Article',
        Articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

// ========================== delete data ==============================


// ========================== get one data ==============================

function getOneArticle(req, res) {
  Article.findOne({
      _id: req.params.id
    })
    .then(Articles => {
      res.status(200).json({
        message: 'get one Article',
        Articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

// ========================== get one data ==============================

// ========================== get one data with author ==============================

function getOneArticleWithAuthor(req, res) {
  Article.
  find().
  populate('author').
  exec(function (err, dataArticles) {
    if (err) {
      res.status(400).json({
        message: err.message
      })
    } else {
      res.status(200).json({
        message: 'berhasil',
        dataArticles
      })
      
    }
  });
}

// ========================== get one data with author ==============================


// ========================== edit data ==============================

function editArticle(req, res) {
  let id = req.params.id
  let obj = {
    title: req.body.title,
    content: req.body.content,
  }
  Article.findByIdAndUpdate(id, obj)
    .then(Articles => {
      res.status(200).json({
        message: 'update success',
        Articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'update failed'
      })
    })
}
// ========================== edit data ==============================








module.exports = {
  newArticle,
  getArticle,
  deleteArticle,
  getOneArticle,
  getOneArticleWithAuthor,
  editArticle

};