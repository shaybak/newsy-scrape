var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
  db.Article.find({})
    .limit(20)
    .then((dbArticles) => {
      // Handlebars/Mongoose compatibility issues
      var articleArray = dbArticles.map((article) => {
        return {
          title: article.title,
          link: article.link,
        };
      });
      // console.log(articleArray);
      res.render("index", { articles: articleArray });
    });
});

router.get("/saved", function (req, res) {
  db.Article.find({ saved: true }).then((dbArticles) => {
    // Handlebars/Mongoose compatibility issues
    var savedArray = dbArticles.map((article) => {
      return {
        title: article.title,
        link: article.link,
      };
    });
    // console.log(articleArray);
    res.render("saved", { articles: savedArray });
  });
});

module.exports = router;
