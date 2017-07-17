var articlesModel = require('../models/articles.model');
var mongoose = require('mongoose');

/*Save method to save data*/
exports.saveArticle = (req, res) => {
    var model = new articlesModel(req.body)
    console.log(req.headers.authorization, "Header........");
    model.save((err, data) => {
        res.json(200, {
            data: data
        })
    },
    err => {
      res.status(400).json(err);
    });
}

exports.getArticles = (req, res) => {
    articlesModel.find({}).sort({_id:-1}).exec((err, articles) => {
        // console.log(articles, "articles");
        if (err)
            throw err;
        else if(articles.length == 0)
            return res.json(204, [])
        else
            return res.json(200, articles);
    });
}